const router = require('express').Router();
const { getAllThoughts, getThoughtById, addNewThought, updateThought, deleteThought, addNewReaction } = require('../../controllers/thoughtController');
const { getAllThoughts, getThoughtById, addNewThought, updateThought, deleteThought, addNewReaction, deleteReaction } = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(addNewThought);
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);
router.route('/:thoughtId/reactions').post(addNewReaction);
router.route('/:thoughtId/reactions/:rId').delete(deleteReaction);

module.exports = router; 