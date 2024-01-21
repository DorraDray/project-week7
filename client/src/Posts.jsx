import { useState, useEffect } from "react";

export default function Posts() {
  const [Posts, setPosts] = useState([]);

  useEffect(() => {
    handleGetPosts();
  }, []);

  async function handleGetPosts() {
    const response = await fetch(
      "https://project-week7-client.onrender.com/posts"
    );
    const data = await response.json();

    // set todoItems to be the response
    setPosts(data);
  }
  async function handleLike(id) {
    await fetch(`https://project-week7-client.onrender.com/posts/${id}/like`, {
      method: "POST",
    });
    handleGetPosts();
  }
  async function handleDelete(id) {
    await fetch(
      `https://project-week7-client.onrender.com/posts/${id}/delete`,
      {
        method: "DELETE",
      }
    );
    handleGetPosts();
  }

  return (
    <div className="post">
      <h1>Posts List</h1>
      <ul className="post">
        {Posts.map((item) => {
          return (
            <li key={item.id + item.title}>
              <h2>{item.title} :</h2>
              <br />
              <p> {item.content}</p>

              <button
                className=" like-button buttons "
                onClick={() => {
                  handleLike(item.id);
                }}
              >
                {item.like_count} Likes
              </button>
              <button
                className=" delete-button buttons"
                onClick={() => {
                  handleDelete(item.id);
                }}
              >
                DELETE
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
