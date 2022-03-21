const knex = require('./dbConnection');

module.exports = {

//User Controller Calls
  createUser: (first_name, last_name, username, hashpass) => {
    console.log('createUser in controller called, first_name: ', first_name);
    console.log('createUser in controller called, last_name: ', last_name);
    console.log('createUser in controller called, username: ', username);
    console.log('createUser in controller called, hashpass: ', hashpass);

    return knex('users').insert({first_name, last_name, username, hashpass})

  },

  getUserHashPass: (username) => {
    console.log('getUserHashPass called, username: ', username)

    return knex('users').select('hashpass').where({username});
  },

  getUserInfo: (username) => {
    console.log('getUserInfo called, username: ', username)

    return knex('users').select('first_name', 'last_name', 'username').where({username});

  }

//Posts Controller Calls




}