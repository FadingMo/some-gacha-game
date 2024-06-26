const Character = require("../models/character.js");

class CharacterService {
  async getCharacters() {
    try {
      const characters = await Character.findAll();
      return characters;
    } catch (error) {
      throw new Error("Failed to retrieve characters");
    }
  }

  async getRandomCharacter(user) {
    try {
      const user = await user.findByPk(userId);
      if (!user) {
        throw new Error("User not found");
      }

      const pullCount = user.pullCount;

      function determineRarity(pullCount) {
        let rarity = "Uncommon";
        if (pullCount % 40 === 0) rarity = "Legendary";
        else if (pullCount % 10 === 0) rarity = "Rare";
        else {
          if (Math.random() < 0.01) rarity = "Legendary";
          else if (Math.random() < 0.1) rarity = "Rare";
        }
        return rarity;
      }

      const rarity = determineRarity(pullCount);

      const characters = await Character.findAll({ where: { rarity } });
      if (!characters.length) {
        throw new Error(`No characters found with rarity ${rarity}`);
      }

      const randomIndex = Math.floor(Math.random() * characters.length);
      const character = characters[randomIndex];

      return character;
    } catch (error) {
      throw new Error("Failed to retrieve character", { cause: error });
    }
  }
}
module.exports = CharacterService;
