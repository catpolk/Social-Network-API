const router = require('express').Router();
const {
  getSingleThought,
  getThought,
  createThought,
  updateThought
} = require('../../controllers/thoughtController');

router.route('/')
.get(getThought)
.post(createThought);

router.route('/:thoughtId')
.get(getSingleThought)
.post(updateThought);

module.exports = router;