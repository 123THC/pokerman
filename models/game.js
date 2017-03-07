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
  buyIn: { type: String, required: true },
  players: { type: Number, required: true },
  date: { type: Date, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
  description: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User'},
  comments: [ commentSchema ],
  going: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
});

gameSchema.methods.seatsRemaining = function seatsRemaining() {
  return this.players - this.going.length;
};

gameSchema.methods.userIsAttending = function userIsAttending(user) {
  return this.going.includes(user._id) || this.going.filter((going) => {
    return going.id === user.id;
  }).length > 0;
};


module.exports = mongoose.model('Game', gameSchema);
