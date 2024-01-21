import { useEffect, useState } from "react";

export default function AddPost() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    category_id: "",
  });
  const [contentError, setContentError] = useState("");
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
      const response = await fetch(
        "https://project-week7-client.onrender.com/addPosts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        }
      );
      const myresponse = await response.json();

      console.log(myresponse);

      setForm({
        title: "",
        content: "",
        category_id: "",
      });
      setContentError("");
    } else {
      // moan about the content
      setContentError("your content isn't long enough");
    }
  }
  async function handleGetCategories() {
    console.log("iam cold");
    const response = await fetch(
      "https://project-week7-client.onrender.com/categories"
    );
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
    <div className="addPost">
      {/* <button onClick={preFillForm}>Prefill the Form</button> */}
      <form className="formAddpost" onSubmit={handleSubmit}>
        <label className="labelAddpost">Title</label>
        <input
          className="inputAddpost"
          name="title"
          onChange={handleChange}
          value={form.title}
          required
        />

        <label className="labelAddpost">content</label>
        <input
          className="inputAddpost inputAddpostContent"
          name="content"
          type="text"
          onChange={handleChange}
          value={form.content}
          required
        />

        <label className="labelAddpost" htmlFor="categorySelector">
          Select a category:
        </label>
        <select
          className="selectAddpost"
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

        <p className="contentError">{contentError}</p>

        <button className="addPostSubmit">Add Post</button>
      </form>
    </div>
  );
}
