import { Router, Request, Response } from 'express';
import Controller from '../../interfaces/controller.interface';
import LikeService from '../services/like.service';

class LikeController implements Controller {
    public path = '/api/likes';
    public router = Router();
    private likeService = new LikeService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/', this.addLike);
        this.router.get('/count/:postId', this.getLikeCount);
        this.router.get('/check/:userId/:postId', this.checkLike);
        this.router.get('/bookmarks/:userId', this.getBookmarks);
        this.router.delete('/:userId/:postId', this.removeLike);
    }

    private addLike = async (request: Request, response: Response) => {
        const { userId, postId } = request.body;

        if (!userId || !postId) {
            return response.status(400).json({
                error: 'Wymagane pola: userId, postId'
            });
        }

        try {
            const like = await this.likeService.addLike(userId, postId);
            response.status(201).json({
                message: 'Post polubiony',
                like
            });
        } catch (error: any) {
            if (error.message === 'Już polubiłeś ten post') {
                return response.status(409).json({ error: error.message });
            }
            console.error('Błąd dodawania like:', error);
            response.status(500).json({ error: 'Błąd serwera' });
        }
    }

    private removeLike = async (request: Request, response: Response) => {
        const { userId, postId } = request.params;

        try {
            await this.likeService.removeLike(userId, postId);
            response.status(200).json({ message: 'Like usunięty' });
        } catch (error) {
            console.error('Błąd usuwania like:', error);
            response.status(500).json({ error: 'Błąd serwera' });
        }
    }

    private checkLike = async (request: Request, response: Response) => {
        const { userId, postId } = request.params;

        try {
            const isLiked = await this.likeService.checkLike(userId, postId);
            response.status(200).json({ isLiked });
        } catch (error) {
            console.error('Błąd sprawdzania like:', error);
            response.status(500).json({ error: 'Błąd serwera' });
        }
    }

    private getLikeCount = async (request: Request, response: Response) => {
        const { postId } = request.params;

        try {
            const count = await this.likeService.getLikesCountByPost(postId);
            response.status(200).json({ count, postId });
        } catch (error) {
            console.error('Błąd pobierania liczby like:', error);
            response.status(500).json({ error: 'Błąd serwera' });
        }
    }

    private getBookmarks = async (request: Request, response: Response) => {
        const { userId } = request.params;

        try {
            const postIds = await this.likeService.getLikedPostsByUser(userId);
            response.status(200).json({ postIds });
        } catch (error) {
            console.error('Błąd pobierania bookmarków:', error);
            response.status(500).json({ error: 'Błąd serwera' });
        }
    }
}

export default LikeController;
