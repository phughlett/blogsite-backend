const express = require('express');
const router = express.Router();
const db = require('../database/controllers');
const { hash, compare } = require('bcrypt');
const saltRounds = 10;

router.route('/')
  .get((req, res) => {
    res.status(200).json('Called Get /users')

  });

router.route('/create')
  .post((req, res) => {

    console.log('Post to /users/create, Req.body:', req.body);
    let { first_name, last_name, username, password } = req.body;

    hash(password, saltRounds).then((hashedPassword) => {
      db.createUser(first_name, last_name, username, hashedPassword)
        .then((data) => res.status(201).json('User created successfully!'))
        .catch((err) => res.status(500).json(err))
    })

  });

router.route('/login')
  .post((req, res) => {

    // console.log('Post to /users/login, Req.body:', req.body);
    let { username, password } = req.body;


    db.getUserHashPass(username)
      .then((hashpass) => {
        // console.log('hashpass', hashpass)
        compare(password, hashpass[0].hashpass)
          .then((isMatch) => {
            if (isMatch) {
              db.getUserInfo(username)
                .then(response => res.status(201).json(response))
                .catch(err => res.status(501).json(err))
            }
            else
              res.status(400).json('Incorrect Username or Password provided');
          })
          .catch((err) => {
            console.log('Error calling compare ', err);
            res.status(400).json('Incorrect Username or Password provided')
          });
      })
      .catch((err) => {
        console.log('Error calling db.getUserHashPass', err)
        res.status(400).json('Incorrect Username or Password provided')
      })
  });





module.exports = router;
