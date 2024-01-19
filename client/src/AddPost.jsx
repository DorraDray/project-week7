import { useEffect, useState } from "react";

export default function AddPost() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    category_id: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    handleGetCategories();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Form has been submitted");
    console.log(form);
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData);
    if (form.content.length > 10) {
      // send the joke to the API
      const response = await fetch("http://localhost:8080/addPosts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      const myresponse = await response.json();

      console.log(myresponse);

      setForm({
        title: "",
        content: "",
        category_id: "",
      });
      setPasswordError("");
    } else {
      // moan about the password
      setPasswordError("your content isn't long enough");
    }
  }
  async function handleGetCategories() {
    console.log("iam cold");
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();

    // set todoItems to be the response
    setCategories(data);
  }

  function handleChange(event) {
    setForm({
      ...form, // the spread operator will add all existing values of form
      [event.target.name]: event.target.value, // then we add the new value using the form field "name" attribute and the value
    });
  }

  return (
    <div>
      {/* <button onClick={preFillForm}>Prefill the Form</button> */}
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          name="title"
          onChange={handleChange}
          value={form.title}
          required
        />

        <label>content</label>
        <input
          name="content"
          type="text"
          onChange={handleChange}
          value={form.content}
          required
        />

        <label htmlFor="categorySelector">Select a category:</label>
        <select
          name="category_id"
          onChange={handleChange}
          value={form.category_id}
          required
          id="categorySelector"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <p>{passwordError}</p>

        <button>Add Post</button>
      </form>
    </div>
  );
}
