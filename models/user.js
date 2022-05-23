const { Schema, model } = require('mongoose');

// Created a user schema which will be used to create the User model
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true //removes any whitespaces before or after the string
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
},
    {

        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false, //Setting this property to false ensures that mongoose does not create unwanted id's for the subdocuments
    }
);

// Virtual to get the count of the user's friends(array length)
userSchema.virtual('friendCount')
    .get(function () {
        return `${this.friends.length}`;
    });

const User = model('user', userSchema);

module.exports = User;