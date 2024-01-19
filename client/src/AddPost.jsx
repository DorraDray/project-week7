import { useState } from "react";

export default function AddPost() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    category_id: "",
  });
  const [passwordError, setPasswordError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Form has been submitted");
    console.log(form);
    if (form.content.length > 10) {
      // do something like logging in the user
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
          value={form.titleitle}
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

        <label>category</label>
        <input
          name="content"
          type="text"
          onChange={handleChange}
          value={form.content}
          required
        />
        <p>{passwordError}</p>

        <button>Add Post</button>
      </form>
    </div>
  );
}
