import { IPost, Query } from "../models/data.model";
import PostModel from "../schemas/data.schema";

class DataService {
    public async createPost(postParams: IPost) {
        try {
            const dataModel = new PostModel(postParams);
            return await dataModel.save();
        } catch (error) {
            console.error(error);
            throw new Error('Wystąpił błąd podczas tworzenia danych');
        }
    }

    public async getAll() {
        return await PostModel.find({}, { __v: 0 });
    }

    public async getAllPaginated(page: number = 1, limit: number = 5) {
        const skip = (page - 1) * limit;
        const posts = await PostModel.find({}, { __v: 0 }).skip(skip).limit(limit).sort({ _id: -1 });
        const total = await PostModel.countDocuments();
        return {
            posts,
            total,
            pages: Math.ceil(total / limit),
            currentPage: page
        };
    }

    public async query(query: Query<number | string | boolean>) {
        try {
            return await PostModel.find(query, { __v: 0 });
        } catch (error) {
            throw new Error(`Query failed: ${error}`);
        }
    }

    public async deleteData(query: Query<number | string | boolean>) {
        try {
            await PostModel.deleteMany(query);
        } catch (error) {
            throw new Error('Wystąpił błąd podczas usuwania danych');
        }
    }

    public async getById(id: string) {
        return await PostModel.findById(id, { __v: 0 });
    }

    public async deleteById(id: string) {
        await PostModel.findByIdAndDelete(id);
    }

    public async deleteAllPosts() {
        await PostModel.deleteMany({});
    }

    public async incrementViews(id: string) {
        return await PostModel.findByIdAndUpdate(
            id, 
            { $inc: { views: 1 } },
            { new: true }
        );
    }
}

export default DataService;