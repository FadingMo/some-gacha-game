const CharacterService = new (require("../services/characterService"))();

class CharacterController {
  getAllCharacters = async (req, res) => {
    try {
      const characters = await CharacterService.getCharacters();
      res.status(200).json(characters);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  getRandomCharacter = async (req, res) => {
    try {
      const user = req.authUser;
      const pullCount = user.pullCount;
      const character = await CharacterService.getRandomCharacter(pullCount);
      user.pullCount += 1;
      await user.save();
      res.status(200).json(character);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

module.exports = CharacterController;
