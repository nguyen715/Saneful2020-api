const xss = require("xss");

const SavedGameService = {
    getAllSavedGames(db) {
        return db
        .from('saneful_saved_game AS sav')
        .select(
          'sav.saved_game_id',
          'sav.current_x_coord',
          'sav.current_y_coord',
          'sav.money_counter',
          'sav.health_points',
          'sav.sanity_points',
          'sav.energy_points',
          'sav.elapsed_time',
          
          db.raw(
            `json_strip_nulls(
              json_build_object(
                'user_id', usr.user_id,
                'user_name', usr.user_name,
                'user_email', usr.user_email,
                'date_created', usr.date_created
              )
            ) AS "user"`
          )
        )
        .leftJoin('saneful_user AS usr', 'sav.user_id', 'usr.user_id')
        .groupBy('sav.saved_game_id', 'usr.user_id');
        },
    
    getSavedGame(db, id) {
    return db
    .from('saneful_saved_game AS sav')
    .select(
      'sav.saved_game_id',
      'sav.current_x_coord',
      'sav.current_y_coord',
      'sav.money_counter',
      'sav.health_points',
      'sav.sanity_points',
      'sav.energy_points',
      'sav.elapsed_time',
      
      db.raw(
        `json_strip_nulls(
          json_build_object(
            'user_id', usr.user_id,
            'user_name', usr.user_name,
            'user_email', usr.user_email,
            'date_created', usr.date_created
          )
        ) AS "user"`
      )
    )
    .leftJoin('saneful_user AS usr', 'sav.user_id', 'usr.user_id')
    .where('usr.user_id', id)
    .groupBy('sav.saved_game_id', 'usr.user_id');
    },

    serializeSavedGame(save) {
        const { user } = save;
        return {
          saved_game_id: save.saved_game_id,
          current_x_coord: save.current_x_coord,
          current_y_coord: save.current_y_coord,
          money_counter: save.money_counter,
          health_points: save.health_points,
          sanity_points: save.sanity_points,
          energy_points: save.energy_points,
          elapsed_time: save.elapsed_time,
        //   user: {
        //     user_id: user.user_id,
        //     user_name: user.user_name,
        //     user_email: user.user_email,
        //     date_created: user.date_created
        //   },
        };
      },

    getById(db, id) {
        return SavedGameService.getAllSavedGames(db)
          .where('sav.saved_game_id', id)
          .first();
      },

    insertSave(db, newSave) {
        return db
          .insert(newSave)
          .into('saneful_saved_game')
          .returning('*')
          .then(([row]) => row)
        //   .then((row) => SavedGameService.getById(db, row.id));
      },
};

module.exports = SavedGameService;