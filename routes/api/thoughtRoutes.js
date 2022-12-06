const router = require('express').Router();
const {
  getSingleThought,
  getThought,
  createThought,
  updateThought,
  deleteThought
} = require('../../controllers/thoughtController');

router.route('/')
.get(getThought)
.post(createThought)
.delete(deleteThought);

router.route('/:thoughtId')
.get(getSingleThought)
.post(updateThought);

module.exports = router;