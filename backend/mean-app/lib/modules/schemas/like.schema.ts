import { Schema, model } from 'mongoose';
import { ILike } from '../models/like.model';

export const LikeSchema: Schema = new Schema({
    userId: { type: String, required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post-KK', required: true },
    createdAt: { type: Date, default: Date.now }
});

// Unikatowy index - użytkownik może polubić post tylko raz
LikeSchema.index({ userId: 1, postId: 1 }, { unique: true });

export default model<ILike>('Like', LikeSchema);
