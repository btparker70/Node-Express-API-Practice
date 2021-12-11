const express = require('express')
const router = express.Router();

// once you have a router page, you can change app.get to router.get

// data
const users = [{name: 'Tony', email: 'tony@mail.com'}]

// home route and response
router.get('/', (_, res) => {
  res.send('Your Express App');
});

// get route that sends back full list of users as json data
router.get('/users', (_, res) => {
  res.json({ ok: true, users})
})

// give param
// look through all users and return first match
router.get('/user/:name', (req, res) => {
  const { name } = req.params;
  const user = users.filter((user) => user.name === name)[0];
  res.json({ ok: true, user })
})

// constructs name and email from request body
// checks if they exist
// if they do then add them to the users list
// and send back the new list of users
router.post('/adduser', (req, res) => {
  const { name, email } = req.body;
  if (name && email) {
    users.push({ name, email });
    res.json({ ok: true, users });
  }
})

module.exports = router;