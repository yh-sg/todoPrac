DROP DATABASE IF EXISTS todoprac;

CREATE DATABASE todoprac;

USE todoprac; 

CREATE TABLE todo(
    id int PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(20) NOT NULL,
    description VARCHAR(100) NOT NULL,
    deadline DATE NOT NULL,
    CREATED_DATE DATETIME DEFAULT CURRENT_TIMESTAMP,
    UPDATED_DATE DATETIME ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO todo (title, description, deadline) VALUES ('Exercise', '100 pushups', '2021-10-29');
INSERT INTO todo (title, description, deadline) VALUES ('Study Frontend', 'React Props', '2021-10-29');
INSERT INTO todo (title, description, deadline) VALUES ('Buy present', 'John''s birthday', '2021-10-29');
INSERT INTO todo (title, description, deadline) VALUES ('Study backend', 'Node and express', '2021-10-29');

UPDATE todo SET title='Study frontend', description='Learn Typescript' WHERE title='Study Frontend';