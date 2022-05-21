const router = require('express').Router();
const { route } = require('express/lib/application');
const { getUsers, getUserById, addNewUser, updateUser, deleteUser, addNewFriend, deleteFriend } = require('../../controllers/userscontrollers');

router.route('/').get(getUsers).post(addNewUser);
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(addNewFriend).delete(deleteFriend);

module.exports = router;