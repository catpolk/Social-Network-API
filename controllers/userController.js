const { User } = require('../models');
 
module.exports = {
    getUsers(req, res) {
        User.find()
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err)); 
   },
   // Get a single user 
   getSingleUser(req, res) {
    User.findOne({_id: req.params.userId})
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
        .then((dbPostUser) => res.json(dbPostUser))
        .catch((err) => res.status(500).json(err));
   },
};