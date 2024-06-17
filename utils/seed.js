const connection = require('../config/connection');
const { Users, Student } = require('../models');
const { getRandomName, getRandomAssignments } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
      await connection.dropCollection('users');
    }

    let studentsCheck = await connection.db.listCollections({ name: 'students' }).toArray();
    if (studentsCheck.length) {
      await connection.dropCollection('students');
    }


  // Create empty array to hold the students
  const students = [];

  // Loop 20 times -- add students to the students array
  for (let i = 0; i < 20; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const assignments = getRandomAssignments(2);

    var fullName = getRandomName();
    var first = fullName.split(' ')[0];
    var last = fullName.split(' ')[1];
    var github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    students.push({
      first,
      last,
      github,
      assignments,
    });
  }

  // Add students to the collection and await the results
  const studentData = await Student.insertMany(students);

  // Add users to the collection and await the results
  await Users.insertMany({
    username: `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`,
    email: `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}@gmail.com`,
    students: [...studentData.map(({_id}) => _id)],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(students);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
