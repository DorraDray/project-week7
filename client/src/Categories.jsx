import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  // const { item } = useParams();
  useEffect(() => {
    handleGetCategories();
  }, []);

  async function handleGetCategories() {
    const response = await fetch(
      "https://project-week7-client.onrender.com/categories"
    );
    const data = await response.json();

    // set todoItems to be the response
    setCategories(data);
  }

  return (
    <div>
      <h1>Categories List</h1>
      <Link to="/categories/addCategory">Add Category</Link>

      <ul>
        {categories.map((item) => {
          return (
            <li key={item.id + item.title}>
              <Link to={`/categories/${item.id}`}>
                <h2>{item.name} </h2>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
