const { Schema, model } = require('mongoose');

// Schema to create a users model
const usersSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
        {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
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
