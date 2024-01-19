import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function CategoriePosts() {
  const [CategoriePosts, setCategoriePosts] = useState([]);
  const { categoryId } = useParams();
  useEffect(() => {
    handleGetCategoriePosts();
  }, []);

  async function handleGetCategoriePosts() {
    const response = await fetch(
      `http://localhost:8080/categories/${categoryId}`
    );
    const data = await response.json();
    console.log(data);
    //set todoItems to be the response
    setCategoriePosts(data);
  }

  return (
    <div>
      <h1>List of Posts</h1>
      <ul>
        {CategoriePosts.map((item) => (
          <li key={item.id}>
            <h2>{item.title} </h2>
            <p>{item.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
