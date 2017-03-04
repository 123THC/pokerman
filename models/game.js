const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

commentSchema.methods.ownedBy = function ownedBy(user) {
  return this.createdBy.id === user.id;
};

const gameSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.ObjectId, ref: 'User'},
  // address: { user.id.address }, // fix this on Monday
  buyIn: { type: String, required: true },
  players: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [ commentSchema ]
});

module.exports = mongoose.model('Game', gameSchema);
