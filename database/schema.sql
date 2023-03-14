CREATE DATABASE hike_finder;
\c hike_finder

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    points INTEGER,
    password_digest TEXT
);