const express =require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');


router.route('/')
                .get(PostController.AllPost)
                .post(PostController.CreatePost)
                .put(PostController.UpdatePost)
                .delete(PostController.DeletePost);

router.route('/:id').get(PostController.GetPost);


module.exports = router;