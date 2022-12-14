const router = require('express').Router();
const {
  getSingleThought,
  getThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

router.route('/')
.get(getThought)
.post(createThought)
.delete(deleteThought);

router.route('/:thoughtId')
.get(getSingleThought)
.post(updateThought);

router.route('/:thoughtId/reactions')
.post(createReaction);

router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;