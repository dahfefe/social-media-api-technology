const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/usersController.js');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:usersId
router
  .route('/:usersId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
