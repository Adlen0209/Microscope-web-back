const client = require('./client');

const paletteDatamapper = {

   async insert(gameId, content) {
      
      // if a status get true, it means that the card is on the YES part of the palette
      // if it's false, it's on the NO part
      const preparedQuery = {
         text : `INSERT INTO "palette" ("text", "status", "game_id") VALUES ($1, $2, $3)`,
         values: [ content.text, content.status, gameId]
      };

      await client.query(preparedQuery);
      
      return console.log("palette inserted");
   }
}

module.exports = paletteDatamapper;