import About from "./About";
import Posts from "./Posts";
import Home from "./Home";
import { Routes, Route, Link } from "react-router-dom";
import Categories from "./Categories";
import CategoriePosts from "./CategoriePosts";
import AddPosts from "./AddPost";
import AddCategory from "./AddCategory";

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/addPosts">Add Posts</Link>
        <Link to="/categories">Categories</Link>
        <Link className="about" to="/about">
          About
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/addPosts" element={<AddPosts />} />
        <Route path="/categories" element={<Categories />}></Route>
        <Route path="/categories/addCategory" element={<AddCategory />} />
        <Route path="/categories/:categoryId" element={<CategoriePosts />} />
      </Routes>
    </div>
  );
}
