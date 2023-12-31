const client = require('./client');

const periodDatamapper = {

   async findByGameId (gameId) {

      const result = await client.query('SELECT * FROM "period" WHERE "game_id" = $1 ORDER BY "position" ASC', [gameId]);

      if (result.rowCount === 0) {
            return null;
      }

      return result.rows;
   },

   async findAllByPosition (data) {
      console.log("data", data);
      const preparedQuery = {
            text: `SELECT * FROM "period" WHERE position >= $1 AND "game_id" = $2`,
            values: [data.previous_card_position + 1, data.parentId]
      };
      console.log("preparedQuery", preparedQuery);
      const result = await client.query(preparedQuery);   
      console.log("result.rows", result.rows);
      return result.rows;
   },
   
   async insert (data) {
      const preparedQuery = {
            text: `INSERT INTO "period" ("text", "tone", "position", "game_id") VALUES ($1, $2, $3, $4) RETURNING *`,
            values: [data.text, data.tone, data.previous_card_position + 1, data.parentId]
         };

      const result = await client.query(preparedQuery);
      return result.rows[0];

   },

   async updatePosition (cardId, newPosition) {

      const preparedQuery = {
         text: `UPDATE "period" SET
            position = $1
            WHERE id = $2
            RETURNING *`,
          values: [newPosition, cardId],
      };

      const savedCard = await client.query(preparedQuery);
   
      return savedCard.rows[0];
   }
}

module.exports = periodDatamapper;