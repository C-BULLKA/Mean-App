import { Router, Request, Response } from 'express';
import Controller from '../../interfaces/controller.interface';
import UserService from '../services/user.service';
import jwt from 'jsonwebtoken';
import { config } from '../../config';

class AuthController implements Controller {
    public path = '/api/user';
    public router = Router();
    private userService = new UserService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/register', this.register);
        this.router.post('/auth', this.login);
        this.router.delete('/logout/:userId', this.logout);
    }

    private register = async (request: Request, response: Response) => {
        const { email, login, password, name } = request.body;

        // Walidacja danych
        if (!email || !login || !password || !name) {
            return response.status(400).json({ 
                error: 'Wymagane pola: email, login, password, name' 
            });
        }

        try {
            // Sprawdź czy użytkownik już istnieje
            const existingUserEmail = await this.userService.getUserByEmail(email);
            if (existingUserEmail) {
                return response.status(409).json({ 
                    error: 'Użytkownik z tym adresem email już istnieje' 
                });
            }

            const existingUserLogin = await this.userService.getUserByLogin(login);
            if (existingUserLogin) {
                return response.status(409).json({ 
                    error: 'Użytkownik z tym loginem już istnieje' 
                });
            }

            // Utwórz nowego użytkownika
            const newUser = await this.userService.createUser({
                email,
                login,
                password,
                name
            });

            // Wygeneruj token JWT
            const token = jwt.sign(
                { 
                    userId: newUser._id, 
                    login: newUser.login,
                    email: newUser.email,
                    name: newUser.name
                },
                config.jwtSecret,
                { expiresIn: '7d' }
            );

            response.status(201).json({ 
                message: 'Użytkownik zarejestrowany pomyślnie',
                token,
                user: {
                    _id: newUser._id,
                    login: newUser.login,
                    email: newUser.email,
                    name: newUser.name
                }
            });
        } catch (error) {
            console.error('Błąd rejestracji:', error);
            response.status(500).json({ error: 'Błąd serwera' });
        }
    }

    private login = async (request: Request, response: Response) => {
        const { login, password } = request.body;

        if (!login || !password) {
            return response.status(400).json({ 
                error: 'Wymagane pola: login, password' 
            });
        }

        try {
            const user = await this.userService.loginUser(login, password);
            if (!user) {
                return response.status(401).json({ 
                    error: 'Nieprawidłowe dane logowania' 
                });
            }

            const token = jwt.sign(
                { 
                    userId: user._id, 
                    login: user.login,
                    email: user.email,
                    name: user.name
                },
                config.jwtSecret,
                { expiresIn: '7d' }
            );

            response.status(200).json({ 
                message: 'Zalogowano pomyślnie',
                token,
                user: {
                    _id: user._id,
                    login: user.login,
                    email: user.email,
                    name: user.name
                }
            });
        } catch (error) {
            console.error('Błąd logowania:', error);
            response.status(500).json({ error: 'Błąd serwera' });
        }
    }

    private logout = async (request: Request, response: Response) => {
        try {
            response.status(200).json({ message: 'Wylogowano pomyślnie' });
        } catch (error) {
            response.status(500).json({ error: 'Błąd serwera' });
        }
    }
}

export default AuthController;
