
//postgresql://postgres:[YOUR-PASSWORD]@db.ajopfuxkaqfwiytrrnmb.supabase.co:5432/postgre
import pg from "pg";
const dbConnectionString =
  "postgresql://postgres:5HiVruRTF_7%!?n@db.ajopfuxkaqfwiytrrnmb.supabase.co:5432/postgres";

export const db = new pg.Pool({ dbConnectionString: dbConnectionString });

async function getPosts() {
  const result = await db.query("SELECT * FROM posts");
  return result.rows;
}
console.log(getPosts());