const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  const allComments = await Comment.findAll({});
  res.json(allComments);
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const editComment = await Comment.update({
      comment_text: req.body.text,
    },
    {
      where: {
        id: req.params.id
      }
    }
    );
    if (editComment) {
      res.status(200).json(editComment);
    } else {
      res.status(400).json({message:'No comment found with this id!'})
    };
  } catch (err) {
    res.status(500).json(err);
  };
})

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;