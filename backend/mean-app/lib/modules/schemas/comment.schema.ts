import { Schema, model } from 'mongoose';
import { IComment } from '../models/comment.model';

export const CommentSchema: Schema = new Schema({
    text: { type: String, required: true },
    author: { type: String, required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post-KK', required: true },
    createdAt: { type: Date, default: Date.now }
});

export default model<IComment>('Comment', CommentSchema);
