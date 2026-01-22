import { Router, Request, Response } from 'express';
import Controller from '../../interfaces/controller.interface';
import CommentService from '../services/comment.service';

class CommentController implements Controller {
    public path = '/api/comments';
    public router = Router();
    private commentService = new CommentService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/', this.addComment);
        this.router.get('/post/:postId', this.getCommentsByPost);
        this.router.delete('/:id', this.deleteComment);
    }

    private addComment = async (request: Request, response: Response) => {
        const { text, author, postId } = request.body;

        if (!text || !author || !postId) {
            return response.status(400).json({
                error: 'Wymagane pola: text, author, postId'
            });
        }

        try {
            const comment = await this.commentService.createComment({
                text,
                author,
                postId
            });

            response.status(201).json({
                message: 'Komentarz dodany pomyślnie',
                comment
            });
        } catch (error) {
            console.error('Błąd dodawania komentarza:', error);
            response.status(500).json({ error: 'Błąd serwera' });
        }
    }

    private getCommentsByPost = async (request: Request, response: Response) => {
        const { postId } = request.params;

        try {
            const comments = await this.commentService.getCommentsByPostId(postId);
            response.status(200).json(comments);
        } catch (error) {
            console.error('Błąd pobierania komentarzy:', error);
            response.status(500).json({ error: 'Błąd serwera' });
        }
    }

    private deleteComment = async (request: Request, response: Response) => {
        const { id } = request.params;

        try {
            await this.commentService.deleteCommentById(id);
            response.status(200).json({ message: 'Komentarz usunięty' });
        } catch (error) {
            console.error('Błąd usuwania komentarza:', error);
            response.status(500).json({ error: 'Błąd serwera' });
        }
    }
}

export default CommentController;
