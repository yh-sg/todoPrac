DROP DATABASE IF EXISTS todoprac;

CREATE DATABASE todoprac;

USE todoprac; 

CREATE TABLE todo(
    id int PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(20) NOT NULL,
    description VARCHAR(100) NOT NULL,
    CREATED_DATE DATETIME DEFAULT CURRENT_TIMESTAMP,
    UPDATED_DATE DATETIME ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO todo (title, description) VALUES ('Exercise', '100 pushups');
INSERT INTO todo (title, description) VALUES ('Study Frontend', 'React Props');
INSERT INTO todo (title, description) VALUES ('Buy present', 'John''s birthday');
INSERT INTO todo (title, description) VALUES ('Study backend', 'Node and express');

UPDATE todo SET title='Study frontend', description='Learn Typescript' WHERE title='Study Frontend';