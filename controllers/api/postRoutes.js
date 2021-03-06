const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.post_title,
      post_test: req.body.post_text,
      user_id: req.session.user_id
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const existingPost = await Post.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: Comment,
        attributes: ['id', 'comment_text', 'user_id', 'post_id']
      }]
    });
    if (existingPost) {
      res.status(200).json(existingPost);
    } else {
      res.status(400).json({message: 'No post found with this id!'})
    };
  } catch (err) {
    res.status(500).json(err);
  };
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
