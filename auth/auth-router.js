const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./auth-model');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved)
    })
    .catch(error => {
      res.status(500).json(error);
});

});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)){
        const token = makeToken(user);

        const userId = user.id;

        res.status(200).json({ userId, token, message: 'logged in!' })
      } else {
        res.status(401).json({ message: 'Failed to log you in.' })
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});


function makeToken(user){
  const payload = {
    username: user.username,
    password: user.password,
  }
  const secret = process.env.JWT_SECRET || "This is a secret"

  const options = {
    expiresIn: "1h"
  }
  return jwt.sign(payload, secret, options);
}


module.exports = router;
