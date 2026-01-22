export interface IData {
    title: string;
    text: string;
    image: string;
    views?: number;
}

export interface IPost extends IData {
    _id?: string;
}

export type Query<T> = {
    [key: string]: T;
};