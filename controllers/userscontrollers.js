const { ObjectId } = require('mongoose').Types;
const { user, thoughts } = require('../models');
module.exports = {
 
    getUsers(req, res) {
        User.find({})
            .select('-__v')
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
  
    getUserById(req, res) {
        User.findById({
            _id: req.params.id
        }).select('-__v')
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'User not found!' });
                } else {
                    res.json(user);
                }
            }).catch((err) => res.status(500).json(err));
    },
    
    addNewUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
  
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true } 
        ).then((user) => {
            if (!user) {
                res.status(404).json({ message: 'User not found!' });
            } else {
                res.json(user);
            }
        }).catch((err) => res.status(500).json(err));
    },

   
    deleteUser(req, res) {
        console.log("in delete")
        User.findByIdAndDelete({
            _id: req.params.id
        }).then((user) => {
            if (!user) {
                res.status(404).json({ message: 'User not found!' });
            } else {
                Thought.deleteMany({ _id: { $in: user.thoughts } }); //Delete the thoughts associated to this user
            }
        }).then(() => res.json({ message: 'User was deleted' }))
        .catch((err) => res.status(500).json(err));
        }).then(() => res.json({ message: 'User and associated thoughts were deleted!' }))
            .catch((err) => res.status(500).json(err));
    },

       addNewFriend(req, res){
    addNewFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends : req.params.friendId}},
            {runValidators: true, new: true}
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        ).then((user) => {
            if (!user) {
                res.status(404).json({ message: 'User not found!' });
            } else {
                res.json(user);
            }
        }).catch((err) => res.status(500).json(err));
    },

    deleteFriend(req, res){
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends : req.params.friendId}},
            {new: true}
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        ).then((user) => {
            if (!user) {
                res.status(404).json({ message: 'User not found!' });
            } else {
                res.json(user);
            }
        }).catch((err) => res.status(500).json(err));
    }
};