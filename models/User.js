const { Schema, model } = require('mongoose');

// A new instance (called User) of the Mongoose schema to define shape of each document
const userSchema = new Schema(
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
            validate: {
                validator: () => Promise.resolve(false),
                message: 'Email validation failed'
              }
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
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
  userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });

//Initialising the User model 
const User = model('user', userSchema);

  module.exports = User;