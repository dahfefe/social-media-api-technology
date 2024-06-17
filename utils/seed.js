const connection = require('../config/connection');
const { Users, Thought } = require('../models');
const { getRandomName, getRandomReactions } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
      await connection.dropCollection('users');
    }

    let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtsCheck.length) {
      await connection.dropCollection('thoughts');
    }

    let friendsCheck = await connection.db.listCollections({ name: 'friends' }).toArray();
    if (friendsCheck.length) {
      await connection.dropCollection('friends');
    }


  // Create empty array to hold the thought(s) and friend(s)
  const thoughts = [];
  const friends = [];

  // Loop 3 times -- add thoughts to the thoughts array
  for (let i = 0; i < 3; i++) {
    // Get some random reaction objects using a helper function that we imported from ./data
    const reactions = getRandomReactions(2);

    var fullName = getRandomName();
    var first = fullName.split(' ')[0];
    var last = fullName.split(' ')[1];
    var github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    thoughts.push({
      first,
      last,
      github,
      reactions,
    });
  }

  // Add thoughts to the collection and await the results
  const thoughtData = await Thought.insertMany(thoughts);

  // Add users to the collection and await the results
  await Users.insertMany({
    username: `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`,
    email: `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}@gmail.com`,
    thoughts: [...thoughtData.map(({_id}) => _id)],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
