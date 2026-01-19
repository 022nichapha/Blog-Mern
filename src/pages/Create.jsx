import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PostService from "../services/post.service";
import Editor from "../components/Editor";

const Create = () => {
  const [postDetail, setPostDetail] = useState({
    title: "",
    summary: "",
    content: "",
    file: null,
  });

  const editorRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setPostDetail((prev) => ({
        ...prev,
        file: files[0],
      }));
    } else {
      setPostDetail((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleContentChange = (value) => {
    setPostDetail((prev) => ({
      ...prev,
      content: value, // ✅ ใช้ value ตรง ๆ
    }));
  };

  const handleSubmit = async () => {
    if (!postDetail.file) {
      Swal.fire("Create Post", "Image is required", "error");
      return;
    }

    try {
      const data = new FormData();
      data.append("title", postDetail.title);
      data.append("summary", postDetail.summary);
      data.append("content", postDetail.content);
      data.append("file", postDetail.file); // ✅ ชื่อ field ต้องตรง backend

      const response = await PostService.createPost(data);

      if (response.status === 200 || response.status === 201) {
        Swal.fire("Create Post", "Create post successfully", "success").then(
          () => navigate("/")
        );
      }
    } catch (error) {
      Swal.fire(
        "Create Post",
        error?.response?.data?.message || error.message,
        "error"
      );
    }
  };

  return (
    <div className="w-full flex justify-center p-4">
      <div className="bg-white p-8 rounded-lg max-w-4xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Post</h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={postDetail.title}
          onChange={handleChange}
          className="input input-bordered w-full mb-4"
        />

        <input
          type="text"
          name="summary"
          placeholder="Summary"
          value={postDetail.summary}
          onChange={handleChange}
          className="input input-bordered w-full mb-4"
        />

        <Editor
          value={postDetail.content}
          onChange={handleContentChange}
          ref={editorRef}
        />

        <input
          type="file"
          name="file"
          onChange={handleChange}
          className="file-input file-input-bordered w-full my-4"
        />

        <button
          onClick={handleSubmit}
          className="btn btn-primary w-full"
        >
          Create Post
        </button>
      </div>
    </div>
  );
};

export default Create;
