const { Thought, User } = require('../models');

module.exports = {
    getThought(req, res) {
        Thought.find()
            // .populate({ path: 'users', select: '-_v'})
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId})
            .then((thought) => 
                !thought 
                    ? res.status(404).json({ message: 'No thought is found with that ID'})
                    : res.json(thought)
            )
    }, 
    //create a new thought 
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
            })
            .then((user) => 
                !user
                    ? res  
                        .status(404)
                        .json({ message: 'Thought created, but found no user with that ID' })
                    : res.json('Created the thought 🎉')
                        )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Update a thought 
    updateThought(req, res) {
        Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
        )
            .then((user) => 
                !user
                ? res.status(404).json({ message: 'No thought was found with this ID' })
                : res.status(user)
            )
            .catch((err) => res.status(500).json(err));
    }, 
    //Delete a thought 
    deleteThought(req, res) {
        Thought.findByIdAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: "No thought is found with this ID!" })
                : User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                    )
        )
        .catch((err) => res.status(500).json(err));
    },


};
