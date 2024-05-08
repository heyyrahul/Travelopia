const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true
  },
  interests: {
    type: String,
    required: true
  },
  travelers: {
    type: Number,
    required: true
  },
  budget: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', 
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},{
    versionKey:false
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = {
  Trip
};
