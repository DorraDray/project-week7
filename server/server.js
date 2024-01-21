import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config(); // allow us to use the environment variables (like the DATABASE_URL)

const PORT = 8080;
const app = express();
app.use(express.json());
app.use(cors());

// connect to my database
const dbConnectionString = process.env.DATABASE_URL;
const db = new pg.Pool({ connectionString: dbConnectionString });

// my endpoints
app.get("/", (request, response) => {
  response.json("This is my root route. How roude.");
});

app.get("/posts", async (request, response) => {
  const result = await db.query("SELECT * FROM posts order by id");
  response.json(result.rows);
  console.log(result.rows);
});
app.get("/categories", async (request, response) => {
  const result = await db.query("SELECT * FROM categories");
  response.json(result.rows);
});
app.get("/categories/:categoryId", async (request, response) => {
  const id = request.params.categoryId;
  const result = await db.query(
    "SELECT posts.title, posts.content FROM posts WHERE posts.category_id = $1",
    [id]
  );
  response.json(result.rows);
});

app.post("/addPosts", function (request, response) {
  console.log(request.body);
  const title = request.body.title;
  const content = request.body.content;
  const category_id = request.body.category_id;

  const newPost = db.query(
    "INSERT INTO posts (title, content, category_id) VALUES ($1, $2, $3) RETURNING *",
    [title, content, category_id]
  );
  response.json("RESPONSE");
});
app.post("/posts/:id/like", function (request, response) {
  const id = request.params.id;
  const post = db.query(
    "UPDATE posts SET like_count = like_count + $1 WHERE id = $2 RETURNING *",
    [1, id]
  );
  response.json(post);
});
app.post("/categories/addCategory", function (request, response) {
  console.log(request.body);
  const name = request.body.name;

  const newCategory = db.query(
    "INSERT INTO categories (name) VALUES ($1) RETURNING *",
    [name]
  );
  response.json("RESPONSE");
});
app.delete("/posts/:id/delete", function (request, response) {
  const id = request.params.id;
  const post = db.query("DELETE FROM posts WHERE id = $1", [id]);
  response.json(post);
});
// start my server
app.listen(PORT, () => console.log(`App is running on PORT ${PORT}`));
