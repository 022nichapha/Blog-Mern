import React, { useState, useEffect } from "react";
import Post from "../components/Post";
import PostService from "../services/post.service";
import Swal from "sweetalert2";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const response = await PostService.getAllPosts();
        if (response.status === 200) {
          setPosts(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Home",
          text: error?.response?.data?.message || error?.message,
          icon: "error",
        });
      }
    };
    fetchAllPost();
  }, []);
  return (
    <div className="space-y-4">
      {posts.length > 0 &&
        posts.map((post, index) => (
          <Post key={index} index={index} {...post} />
        ))}
      {posts.length === 0 && <h1> No post </h1>}
    </div>
  );
};

export default Home;
