const mongoose = require('mongoose');
const { Schema } = mongoose;

const catSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Please provide a name for the cat.'],
    trim: true
  },
  age: {
    type: Number,
    min: 0
  },
  color: {
    type: String,
    enum: {
      values: ['orange', 'white', 'gray', 'black'],
      message: 'That is not an accepted cat color. Try another one.'
    }
  },
  sickness: {
    type: Boolean,
    default: false
  },
  adopted: {
    type: Date,
    default: Date.now()
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;