const { ObjectId } = require('mongoose').Types;
const { thought, user } = require('../models');
module.exports = {
    // method to get all the thoughts
    getAllThoughts(req, res) {
        // console.log('get all thoughts')
        thought.find({})
            .then((thoughts) => {
                // console.log(thoughts);
                res.json(thoughts);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },
   
    getThoughtById(req, res) {
        thought.findById({
            _id: req.params.id
        }).then((thought) => {
            // console.log(thought);
            if (!thought) {
                res.status(404).json({ message: 'Thought not found!' });
            } else {
                res.json(thought)
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    },
  
    addNewThought(req, res) {
        let thoughtId;
        thought.create(req.body)
            .then((thought) => {
                thoughtId = thought._id;
                // console.log(thoughtId);
                // res.json(thought);
                // })
                // .catch((err) => res.status(500).json(err));
                // console.log(req.body);

                User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thoughtId } },
                    { runValidators: true, new: true })
                    .then((user) => {
                        // console.log(user);
                        if (!user) {
                            res.status(404).json({ message: 'User not found' });
                        } else {
                            res.json(user);
                        }
                    }).catch((err) => res.status(500).json(err));
            }).catch((err) => res.status(500).json(err));
    },
    
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true })
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: 'Thought not found!' });
                } else {
                    res.json(thought);
                }
            }).catch((err) => res.status(500).json(err));
    },
   
    deleteThought(req, res) {
        thought.deleteOne({ _id: req.params.id })
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: 'Thought not found!' });
                } else {
                    res.json(thought);
                }
            }).catch((err) => res.status(500).json(err));
    },
   
    addNewReaction(req, res) {
        thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: { reactions: req.body}},
            {runValidators: true, new: true}
            ,{ _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        ).then((thought) => {
            if (!thought) {
                res.status(404).json({ message: 'Thought not found!' });
            } else {
                res.json(thought);
            }
        }).catch((err) => res.status(500).json(err));
    },

  
    deleteReaction(req, res){
    deleteReaction(req, res) ;{
        thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId : req.params.rId } } },
            { $pull: { reactions: { reactionId: req.params.rId } } },
            { runValidators: true, new: true }
        ).then((thought) => {
            if (!thought) {
                res.status(404).json({ message: 'Thought not found!' });
            } else {
                res.json(thought);
            }
        }).catch((err) => res.status(500).json(err));
    }
}};