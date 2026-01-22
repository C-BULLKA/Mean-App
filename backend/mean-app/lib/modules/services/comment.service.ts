import CommentModel from '../schemas/comment.schema';
import { IComment } from '../models/comment.model';

class CommentService {
    public async createComment(commentData: IComment): Promise<IComment> {
        const comment = await CommentModel.create(commentData);
        return comment;
    }

    public async getCommentsByPostId(postId: string): Promise<IComment[]> {
        return await CommentModel.find({ postId }).sort({ createdAt: -1 });
    }

    public async getCommentById(id: string): Promise<IComment | null> {
        return await CommentModel.findById(id);
    }

    public async deleteCommentById(id: string): Promise<void> {
        await CommentModel.findByIdAndDelete(id);
    }

    public async deleteCommentsByPostId(postId: string): Promise<void> {
        await CommentModel.deleteMany({ postId });
    }
}

export default CommentService;
