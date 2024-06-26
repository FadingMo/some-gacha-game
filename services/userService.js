const User = require("../models/user.js");
const bcrypt = require("bcrypt");

class UserService {
  async registerUser(data) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
      const userWithSameUsername = await User.findOne({
        where: { username: data.username },
      });
      if (userWithSameUsername) {
        throw new Error("Username already exists");
      }
      const userWithSameEmail = await User.findOne({
        where: { email: data.email },
      });
      if (userWithSameEmail) {
        throw new Error("Email already exists");
      }
      const user = await User.create({ ...data });
      return user.save();
    } catch (e) {
      throw e;
    }
  }
  async loginUser(data) {
    try {
      const user = await User.findOne({ where: { email: data.email } });
      if (!user) {
        throw new Error("Invalid email or password");
      }
      const isValid = await bcrypt.compare(data.password, user.password);
      if (!isValid) {
        throw new Error("Invalid email or password");
      }
      return user;
    } catch (e) {
      throw e;
    }
  }
  async getMe(data) {
    try {
      const user = await User.findOne({ where: { id: data.id } });
      return user;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  async deleteUser(userId) {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("User not found");
    }
    await user.destroy();
    return user;
  }

  async changeUsername(userId, newUsername) {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("User not found");
    }
    const userWithSameUsername = await User.findOne({
      where: { username: newUsername },
    });
    if (userWithSameUsername) {
      throw new Error("Username already exists");
    }
    user.username = newUsername;
    await user.save();
    return user;
  }
}

module.exports = UserService;
