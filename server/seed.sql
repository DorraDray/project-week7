CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
)

CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category_id INTEGER REFERENCES categories(id)
)

CREATE TABLE IF NOT EXISTS tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
)

CREATE TABLE IF NOT EXISTS posts_tags (
  post_id INTEGER REFERENCES posts(id),
  tag_id INTEGER REFERENCES tags(id),
  PRIMARY KEY (post_id, tag_id)
)

INSERT INTO categories(name) VALUES('Technology');
INSERT INTO categories(name) VALUES('Lifestyle');
INSERT INTO categories(name) VALUES('Education');

INSERT INTO posts(title, content, category_id) VALUES('Introduction to Node.js', 'Node.js is a JavaScript runtime...', 1);
INSERT INTO posts(title, content, category_id) VALUES('Daily Yoga Practices', 'Yoga is beneficial for health...', 2);
INSERT INTO posts(title, content, category_id) VALUES('Learning SQL Basics', 'SQL is a standard language for...', 3);

INSERT INTO tags(name) VALUES('Programming');
INSERT INTO tags(name) VALUES('Health');
INSERT INTO tags(name) VALUES('Education');

INSERT INTO posts_tags(post_id, tag_id) VALUES(1, 1);
INSERT INTO posts_tags(post_id, tag_id) VALUES(2, 2);
INSERT INTO posts_tags(post_id, tag_id) VALUES(3, 3);