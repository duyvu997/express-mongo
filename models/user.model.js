import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;
const SALT_ROUNDS = 10;

const hashPassword = (password) => bcrypt.hash(password, SALT_ROUNDS);

const userSchema = new Schema(
  {
    userName: String,
    email: String,
    password: String,
    avatar: String,
    gender: String,
    lastActivateCode: String,
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (this.password) {
    this.password = await hashPassword(this.password);
  }
  next();
});

userSchema.pre('updateOne', async function (next) {
  if (this._update && this._update.password) {
    this._update.password = await hashPassword(this._update.password);
  }
  next();
});

userSchema.methods.verifyPassword = async function verifyPassword(input) {
  if (input && this.password) {
    return bcrypt.compare(input, this.password);
  }
};

const User = mongoose.model('users', userSchema);

export default User;
