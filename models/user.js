const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const s3 = require('../lib/s3');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, lowercase: true },
  email: { type: String },
  address: {
    line1: { type: String},
    line2: { type: String },
    city: { type: String },
    postcode: { type: String },
    country: { type: String }
  },
  lat: { type: Number },
  lng: { type: Number },
  image: { type: String },
  password: {type: String }, // the required is a validation
  githubId: { type: Number }
});

userSchema.plugin(uniqueValidator);

userSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if(!this.image) return 'http://euniv.shooliniuniversity.com/erp/required/images/mprofile.png';
    if(this.image.match(/^http/)) return this.image;
    return `https://s3-eu-west-1.amazonaws.com/wdi-ldn-express-project2/${this.image}`;
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

userSchema.pre('remove', function removeImage (next) {
  console.log(this.imageSRC);
  if(this.imageSRC !== 'http://euniv.shooliniuniversity.com/erp/required/images/mprofile.png') {
    return s3.deleteObject({ Key: this.image }, next);
  }
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
