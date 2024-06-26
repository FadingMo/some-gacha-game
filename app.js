const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
app.use(express.json());
const port = 3001;

//маршруты http
const io = new Server(httpServer, {  cors: {
    origin: "http://localhost:8080",
  } });
//сокетов
io.on("connection", (socket) => {
 console.log("Client is running", socket)
});

const User = require("./models/user.js");
const Character = require("./models/character.js");

const UserController = new (require("./controllers/userController"))();
const CharacterController = new (require("./controllers/charaController"))();

const { authMiddleware } = require("./middleware/AuthMiddleware.js");

app.post("/register", UserController.register);

app.post("/login", UserController.login);

app.get("/me", authMiddleware, UserController.getMe);

app.post("/refresh-token", UserController.refresh);

app.delete("/delete-user", authMiddleware, UserController.deleteUser);

app.patch("/change-username", authMiddleware, UserController.changeUsername);

app.get("/character-gallery", CharacterController.getAllCharacters);

app.get("/random-character", authMiddleware, CharacterController.getRandomCharacter);

httpServer.listen(3030);

app.listen(port, async () => {
  await User.sync({
    alter: true,
    force: false,
  });
  await Character.sync({
    alter: true,
    force: false,
  });
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
