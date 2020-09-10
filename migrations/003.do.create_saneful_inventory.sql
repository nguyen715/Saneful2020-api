CREATE TABLE saneful_inventory (
    inventory_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    saved_game_id INTEGER REFERENCES saneful_saved_game(saved_game_id) ON DELETE CASCADE NOT NULL,
    item TEXT NOT NULL,
    description TEXT,
    quantity INTEGER,
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL
);