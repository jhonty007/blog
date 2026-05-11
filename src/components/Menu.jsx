import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Menu = ({ cat, currentPostId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts${cat ? `?cat=${cat}` : ""}`);
        const filtered = res.data.filter(
          (p) => p.id !== parseInt(currentPostId, 10)
        );
        setPosts(filtered.slice(0, 4));
      } catch (err) {
        console.log(err);
      }
    };
    if (cat) {
      fetchData();
    }
  }, [cat, currentPostId]);

  return (
    <div className="menu">
      <h1>Other Posts You May Like</h1>
      {posts.length === 0 && <p>No related posts found.</p>}
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img
            src={
              post.img
                ? post.img.startsWith("http")
                  ? post.img
                  : `/upload/${post.img}`
                : "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
            alt=""
          />
          <h2>{post.title}</h2>
          <Link to={`/post/${post.id}`}>
            <button>Read More</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Menu;
