const { Schema, model } = require('mongoose');

// Schema to create a users model
const usersSchema = new Schema(
  {
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'student',
      },
    ],
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
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
