
const express = require('express')
const app = express()
const port = process.env.PORT || 4004

app.use(express.json());
const { users } = require('./state')

/* BEGIN - create routes here */
app.get('/users', (req, res) => {
  res.json({users})
})

app.get('/users/:_id', (req, res) => {
  const _id = req.params._id
  const user = users.find((user) => user._id === Number(_id))
  res.json(user)
})

app.post('/users', (req, res) => {
  const newUser = {
    "_id": 6,
     "name": "Peyten Bevill",
    "occupation": "FBI Language Translator",
    "avatar": "https://upload.wikimedia.org/wikipedia/en/5/50/Agentpeytenbevill.jpg"
  };
  users.push(newUser);
  res.json(users[users.length - 1]);
})

app.put('/users/:_id', (req, res) => {
  const _id = req.params._id
  const updates = req.body
  const user = users.find((user) => user._id === Number(_id))
  const userIndex = users.findIndex((user) => user._id === Number(_id))
  const updateUser = {
    ...user,
    ...updates
  }
  users.splice(userIndex, 1, updateUser)
  res.json(updateUser)
})

app.delete('/users/:_id', (req, res) => {
  const _id = req.params._id
  const userIndex = users.findIndex((user) => user._id === Number(_id))
  users.splice(userIndex, 1)
  res.json(users)
})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))