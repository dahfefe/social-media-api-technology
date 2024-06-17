const { Schema, model } = require('mongoose');

// Schema to create a users model
const usersSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'student',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Users = model('users', usersSchema);

module.exports = Users;
