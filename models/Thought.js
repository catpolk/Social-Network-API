const { Schema, mongoose, model } = require('mongoose');

const reactionSchema = new mongoose.Schema(
    {
        reactionId: mongoose.Types.ObjectId,
        reactionBody: { 
            type: String, 
            required: true, 
            minLength: 1,
            maxLength: 280
        },
        username: {
            type: String, 
            required: true,
        }, 
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    },
)


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String, 
            requires: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date, 
            default: Date.now,
        },
        userId: {
            type: String, 
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            vertuals: true, 
        },
        id: false,
    }
);

//Vertual property 
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reaction.length;
});

//Initialing thought model 
const Thought = model('thought', thoughtSchema);

module.exports = Thought;