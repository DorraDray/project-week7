import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config(); // allow us to use the environment variables (like the DATABASE_URL)

const PORT = 8080;
const app = express();
app.use(cors());

// connect to my database
const dbConnectionString = process.env.DATABASE_URL;
const db = new pg.Pool({ connectionString: dbConnectionString });

// my endpoints
app.get("/", (request, response) => {
  response.json("This is my root route. How roude.");
});

app.get("/posts", async (request, response) => {
  const result = await db.query("SELECT * FROM posts");
  response.json(result.rows);
});
app.get("/categories", async (request, response) => {
  const result = await db.query("SELECT * FROM categories");
  response.json(result.rows);
});
app.get("/categories/:categoryId", async (request, response) => {
  const id = request.params.categoryId;
  const result = await db.query(
    "SELECT posts.title, posts.content FROM posts JOIN categories ON posts.category_id = categories.id WHERE categories.id = $1",
    [id]
  );
  response.json(result.rows);
});
// start my server
app.listen(PORT, () => console.log(`App is running on PORT ${PORT}`));
