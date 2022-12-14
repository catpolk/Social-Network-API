const { User, Thought } = require('../models');
 
module.exports = {
    getUsers(req, res) {
        User.find()
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err)); 
   },
   // Get a single user 
    getSingleUser(req, res) {
    User.findOne({_id: req.params.userId})
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
        // addToSet allows to add an item to an array or to a subdoc
        { $set: req.body },
        { new: true }
    )
    .then((user) => 
        !user
        ? res.status(404).json({ message: 'User wiht this ID is not found!' })
        : res.json(user)
        )
   },
    // Delete User by ID 
    deleteUser(req, res) {
    User.findByIdAndDelete({ _id: req.params.userId })
    .then((user) => 
        !user
            ? res.status(404).json({ message: 'No User found withthis ID!'})
            : Thought.deleteMany({_id: {$in: user.thought} })
            )
            .then(() => res.json({ message: 'User and assosiated thought was deleted!'}))
            .catch((err) => res.status(500).json(err));
   },
//    add a friend route 
    addFriend(req, res) {
        User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $addToSet:  { friends: req.params.friendId } },
                { new: true }
            )
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user is found with this ID' })
                    : res.json(user)             
            )
            .catch((err) => res.status(500).json(err));
   },

   // Delete a friend 
   deleteFriend( req, res ) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
    )
    .then(
        (user) => 
            !user 
                ? res.status(400).json({ message: 'No user is found with ID' })
                : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
   },
};
    
