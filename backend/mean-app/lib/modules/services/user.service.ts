import UserModel from '../schemas/user.schema';
import { IUser } from '../models/user.model';
import bcryptjs from 'bcryptjs';

class UserService {
    public async createUser(userData: IUser): Promise<IUser> {
        const hashedPassword = await bcryptjs.hash(userData.password, 10);
        const user = await UserModel.create({
            ...userData,
            password: hashedPassword
        });
        return user;
    }

    public async getUserByLogin(login: string): Promise<IUser | null> {
        return await UserModel.findOne({ login });
    }

    public async getUserByEmail(email: string): Promise<IUser | null> {
        return await UserModel.findOne({ email });
    }

    public async getUserById(id: string): Promise<IUser | null> {
        return await UserModel.findById(id);
    }

    public async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcryptjs.compare(password, hashedPassword);
    }

    public async loginUser(login: string, password: string): Promise<IUser | null> {
        const user = await this.getUserByLogin(login);
        if (!user) return null;
        
        const passwordMatch = await this.verifyPassword(password, user.password);
        if (!passwordMatch) return null;
        
        return user;
    }
}

export default UserService;
