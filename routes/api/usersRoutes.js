const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend, 
  removeFriend,
} = require('../../controllers/usersController.js');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:usersId
router
  .route('/:usersId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:usersId/friends
router.route('/:usersId/friends/:friendId').post(addFriend);

// /api/users/:usersId/friends/:friendId
router.route('/:usersId/friends/:friendId').delete(removeFriend);

module.exports = router;
