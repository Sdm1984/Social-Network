const connection = require('../config/connection');
const { user, thoughts } = require('../models');
const { randomArrItem, addUsers } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // Delete existing users
    await User.deleteMany({});

    // Delete existing thoughts
    await thoughts.deleteMany({});

      const users = [];
    const thoughts = [];

    // for (let i = 0; i < 5; i++) {
        // const username = randomArrItem('username');
        const userArr = addUsers();
    for(let i = 0; i < userArr.length; i++){
        const username = userArr[i];
        const email = `${username}@test.com`;

        users.push({ username, email });
    }

    await User.collection.insertMany(users);

    for (let i = 0; i < 5; i++) {
        const thoughtText = randomArrItem('thoughts');
        const username = randomArrItem('username');
        const reactions = randomArrItem('reactions');

        thoughts.push({ thoughtText, username, reactions });
    }

    await Thought.collection.insertMany(thoughts);

    console.info('Seeding complete! 🌱');
    process.exit(0);
});