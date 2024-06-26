const UserService = new (require("../services/userService.js"))();
const { generateToken } = require("../utils/tokens.js");

class UserController {
  async register(req, res) {
    try {
      const user = await UserService.registerUser(req.body);
      delete user.password;
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
      console.log("error");
    }
  }

  async login(req, res) {
    try {
      const user = await UserService.loginUser(req.body);
      const payload = {
        userId: user.id,
        email: user.email,
        userName: user.username,
        pullCount: user.pullCount,
      };
      const tokens = await generateToken(payload);
      res.json({
        ...user.dataValues,
        ...tokens,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getMe(req, res) {
    try {
      return res.json({
        status: "OK",
      });
    } catch {
      res.status(400).json({ message: error.message });
    }
  }
  async refresh(req, res) {
    try {
      const { token } = req.body;
    } catch {
      res.status(400).json({ message: error.message });
    }
  }
  async deleteUser(req, res) {
    try {

      await UserService.deleteUser(req.authUser.userId);

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      if (error.message === "User not found") {
        res.status(404).json({ message: "User not found" });
      } else {
        res
          .status(500)
          .json({ message: "An error occurred while deleting the user" });
      }
    }
  }

  async changeUsername(req, res) {
    const userId = req.authUser.id;
    const newUsername = req.body.newUsername;
    try {
      await UserService.changeUsername(req.authUser.userId, newUsername);
      res.status(200).json({ message: "Username changed successfully" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = UserController;
