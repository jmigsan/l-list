CREATE DATABASE llist;

CREATE TABLE llist(
  l_id UUID PRIMARY KEY,
  l_text VARCHAR(10000),
  l_image VARCHAR(255)
);

CREATE TABLE llist(
  l_id UUID PRIMARY KEY,
  l_text VARCHAR(10000),
  l_content VARCHAR(36),
  l_date TIMESTAMPTZ,
  l_uid CHAR(28)
);