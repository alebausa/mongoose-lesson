const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://localhost:27017/animals';
const Cat = require('./models/Cat');
const User = require('./models/User');

const cats = [
  { 
    name: 'Garfield',
    age: 15,
    color: 'orange'
  },
  {
    name: 'Matilda',
    age: 3,
    color: 'gray'
  },
  {
    name: ' Hobbes ',
    age: 7,
    color: 'white'
  },
  {
    name: 'Princess',
    age: 9,
    color: 'white'
  },
]

mongoose.connect(MONGO_URI)
  .then(x => console.log(`Connected to the database: "${x.connection.name}"`))
  .then(() => {
    return Cat.create(cats)
  })
  .then(cat => {
    console.log('Created ', cat)
  })
  .then(() => {
    const cat = Cat.findOne({ name: 'Hobbes' })
    return cat;
  })
  .then((cat) => {
    const { _id } = cat;
    return Cat.findByIdAndUpdate(_id, { age: 12 }, { new: true })
  })
  .then((cat) => {
    console.log('Updated ', cat);
  })
  .then(() => {
    return Cat.create({ name: 'Ruca', age: 5, color: 'black' });
  })
  .then((cat) => {
    console.log('Created', cat);
    return Cat.findOneAndDelete({ name: 'Princess' });
  })
  .then((cat) => {
    console.log('Deleted ', cat)
  })
  .then(() => {
    return Cat.find({}).select({ name: 1, _id: 0 })
  })
  .then((catNames) => {
    console.log(catNames)
  })
  .then(() => {
    return User.create({ name: 'Ale', age: 31, email: 'ale@ironhack.com' })
  })
  .then((user) => {
    console.log('Created ', user);
    return Cat.findOneAndUpdate({ name: 'Matilda' }, { owner: user._id }, { new: true })
  })
  .then((cat) => {
    console.log('Updated cat', cat)
    return Cat.findById(cat._id).populate('owner');
  })
  .then((popuCat) => {
    console.log(popuCat)
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch(err => { console.log(err)})