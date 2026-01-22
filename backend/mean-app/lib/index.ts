import App from './app';
import PostController from './modules/controllers/post.controller';
import AuthController from './modules/controllers/auth.controller';
import CommentController from './modules/controllers/comment.controller';
import LikeController from './modules/controllers/like.controller';

const app = new App([
    new AuthController(),
    new PostController(),
    new CommentController(),
    new LikeController(),
]);

app.listen();