CREATE DATABASE my_community_db;

CREATE TABLE users(
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(25) NOT NULL,
    password VARCHAR(25) NOT NULL,
    PRIMARY KEY(user_id)
);

CREATE TABLE user_notes(
    note_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT,
    note_lat VARCHAR(255),
    note_long VARCHAR(255),
    note_text VARCHAR(255),
    PRIMARY KEY(note_id),
    CONSTRAINT fk_user
      FOREIGN KEY(user_id)
	  REFERENCES users(user_id)
);

-- sudo -u postgres psql
-- ALTER USER postgres PASSWORD 'postgres';
-- \c   to connect to database or show connected db
-- \l   lists dbs
-- \dt shows tables in current db
-- select * from users;

-- Inserting dummy data
INSERT INTO users(username, password)
VALUES('John', 'johnspass'),
      ('David', 'davidiscool');

INSERT INTO user_notes (user_id, note_lat, note_long, note_text)
VALUES(1,'-37.92','145.08','Bunnings Oakleigh'),
      (1,'-37.95','145.25','Beautiful view here'),
      (2,'37.82','144.97','Royal Botanic Gardens Victoria');
