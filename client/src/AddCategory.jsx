import { useState } from "react";

export default function AddCategory() {
  const [form, setForm] = useState({
    name: "",
  });
  const [nameError, setNameError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Form has been submitted");
    console.log(form);
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData);
    if (form.name.length > 3) {
      // send the joke to the API
      const response = await fetch(
        "https://project-week7-client.onrender.com/categories/addCategory",
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
        name: "",
      });

      setNameError("");
    } else {
      // moan about the password
      setNameError("The category name isn't long enough");
    }
  }

  function handleChange(event) {
    setForm({
      ...form, // the spread operator will add all existing values of form
      [event.target.name]: event.target.value, // then we add the new value using the form field "name" attribute and the value
    });
  }

  return (
    <div className="addCategDiv">
      {/* <button onClick={preFillForm}>Prefill the Form</button> */}
      <form className="addCategForm" onSubmit={handleSubmit}>
        <label className="addCateglabel">Category Name</label>
        <input
          className="addCateginput"
          name="name"
          onChange={handleChange}
          value={form.name}
          required
        />

        <p className="contentError">{nameError}</p>

        <button className="addCategSubmit">Add Category</button>
      </form>
    </div>
  );
}
