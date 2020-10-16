CREATE DATABASE authentication; 

CREATE TABLE users (
  _id SERIAL PRIMARY KEY, 
  email VARCHAR (255), 
  password VARCHAR (255) 
)