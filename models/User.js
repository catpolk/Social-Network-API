const { Schema, model } = require('mongoose');

// A new instance (called User) of the Mongoose schema to define shape of each document
const userSchema = new mongoose.Schema(
    {
        username: { 
            type: String, 
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String, 
            required: true,
            unique: true, 
            trim: true,
            email: {
                validate: [ isEmail, 'invalid email']
            }
        },

        thoughts: [
            {
                type: Schema.Type.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type: Schema.Type.ObjectId,
                ref: 'User',
            }
        ]
    },
    {
        tpJSON: {
            vertuals: true, 
        },
        id: false,
    }
  );

  //Vertual property friendCount
  userSchema.vertual('friendCount').get(function () {
    return this.friends.length;
  });

  //Initialising the User model 
  const User = model('user', userSchema);

  module.exports = userSchema;