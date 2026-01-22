import { Schema, model } from 'mongoose';
import { IUser } from '../models/user.model';

export const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default model<IUser>('User', UserSchema);
