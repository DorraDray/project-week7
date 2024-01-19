import { useState } from "react";

export default function AddPost() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    category_id: "",
  });
  const [passwordError, setPasswordError] = useState("");

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
  //   async function handleSubmit(event) {
  //     event.preventDefault();

  //     if (form.content.length > 10) {
  //       const formData = new FormData();

  //       // Append form values to FormData
  //       Object.entries(form).forEach(([key, value]) => {
  //         formData.append(key, value);
  //       });

  //       // send the post data to the API
  //       const response = await fetch("http://localhost:8080/addPosts", {
  //         method: "POST",
  //         body: formData,
  //       });

  //       const json = await response.json();
  //       console.log(json);

  //       setForm({
  //         title: "",
  //         content: "",
  //         category_id: "",
  //       });
  //       setPasswordError("");
  //     } else {
  //       // Moan about the content length
  //       setPasswordError("Your content isn't long enough");
  //     }
  //   }
  function handleChange(event) {
    setForm({
      ...form, // the spread operator will add all existing values of form
      [event.target.name]: event.target.value, // then we add the new value using the form field "name" attribute and the value
    });
  }

  //   function preFillForm() {
  //     setForm({
  //       username: "Wollivan",
  //       password: "poop",
  //     });
  //   }

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
          <option value="1">Technology</option>
          <option value="2">Science</option>
          <option value="3">Health</option>
        </select>

        <p>{passwordError}</p>

        <button>Add Post</button>
      </form>
    </div>
  );
}
