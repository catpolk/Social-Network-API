const { User } = require('../models');
 
module.exports = {
    getUsers(req, res) {
        User.find()
            // .populate({ path: 'users', select: '-_v'})
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err)); 
   },
   // Get a single user 
   getSingleUser(req, res) {
    User.findOne({_id: req.params.userId})
        .populate('thoughts')
        .populte('friends')
        .select('-_v')
        .then((user) => 
        !user
            ? res.status(404).json({ message: 'No user found with that id' })
            : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
   },
   // Create a new user 
   createUser(req, res) {
    User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
   },

   // Update a user
   updateUser(req, res) {
    User.findByIdAndUpdate(
        {_id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
    )
    .then((user) => 
        !user
        ? res.status(404).json({ message: 'User wiht this ID is not found!' })
        : res.json(user)
        )
   }

};
    
