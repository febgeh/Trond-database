CREATE TABLE IF NOT EXISTS LoginT (
    id INTEGER PRIMARY KEY,
    name TEXT, 
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    cookie INTEGER 
);

INSERT INTO LoginT (name, email, password) VALUES ('h', 'h@h', 'h');