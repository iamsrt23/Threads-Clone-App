import express from "express";
import { createPost ,getPosts,deletePost,likeUnlikePost,replyToPost,getFeedPosts} from "../controllers/postController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router()


router.get('/feed',protectRoute,getFeedPosts)
router.get('/:id',getPosts)

router.post('/create',protectRoute,createPost)
router.post('/like/:id',protectRoute,likeUnlikePost)
router.post('/reply/:id',protectRoute,replyToPost)

router.delete('/:id',protectRoute,deletePost)







export default router