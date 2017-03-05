const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {type: String},
  email: {type: String},
  address: {
    line1: { type: String},
    line2: { type: String },
    city: { type: String },
    postcode: { type: String },
    country: { type: String }
  },
  image: { type: String, required: true },
  password: {type: String }, // the required is a validation
  githubId: { type: Number },
  attending: []
});

// this is virtual as we dont want to save it on the database but we do want to save it temporarily so that we can check it against the password
userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

// this is a lifecycle hook which is mongoose middleware
// the .pre('validate') means this will run before it runs the validation above
userSchema.pre('validate', function checkPassword(next) {
  if(!this.password && !this.githubId) {
    this.invalidate('password', 'required');
  }
  if(this.isModified('password') && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'does not match');
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
