import LikeModel from '../schemas/like.schema';
import { ILike } from '../models/like.model';

class LikeService {
    public async addLike(userId: string, postId: string): Promise<ILike> {
        try {
            const like = await LikeModel.create({ userId, postId });
            return like;
        } catch (error: any) {
            if (error.code === 11000) {
                throw new Error('Już polubiłeś ten post');
            }
            throw error;
        }
    }

    public async removeLike(userId: string, postId: string): Promise<void> {
        await LikeModel.deleteOne({ userId, postId });
    }

    public async checkLike(userId: string, postId: string): Promise<boolean> {
        const like = await LikeModel.findOne({ userId, postId });
        return !!like;
    }

    public async getLikesCountByPost(postId: string): Promise<number> {
        return await LikeModel.countDocuments({ postId });
    }

    public async getLikesByPost(postId: string): Promise<ILike[]> {
        return await LikeModel.find({ postId });
    }

    public async getLikedPostsByUser(userId: string): Promise<string[]> {
        const likes = await LikeModel.find({ userId });
        return likes.map((like) => like.postId);
    }
}

export default LikeService;
