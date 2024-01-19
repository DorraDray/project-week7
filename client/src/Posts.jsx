import { useState, useEffect } from "react";

export default function Posts() {
  const [Posts, setPosts] = useState([]);

  useEffect(() => {
    handleGetPosts();
  }, []);

  async function handleGetPosts() {
    const response = await fetch("http://localhost:8080/posts");
    const data = await response.json();

    // set todoItems to be the response
    setPosts(data);
  }

  return (
    <div>
      <h1>Posts List</h1>
      <ul>
        {Posts.map((item) => {
          return (
            <li key={item.id + item.title}>
              <h2>{item.title} :</h2>
              <br /> {item.content}
            </li>
          );
        })}
      </ul>
    </div>
  );
}