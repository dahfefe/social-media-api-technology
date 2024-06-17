const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  addAssignment,
  removeAssignment,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtsId
router.route('/:thoughtsId').get(getSingleThought).delete(deleteThought);

// /api/thoughts/:thoughtsId/assignments
router.route('/:thoughtsId/assignments').post(addAssignment);

// /api/thoughts/:thoughtsId/assignments/:assignmentId
router.route('/:thoughtsId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;
