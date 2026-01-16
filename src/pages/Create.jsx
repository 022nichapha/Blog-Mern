import { useState, useRef } from "react";
import { useNavigate } from "react-router";
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
  const [content, setContent] = useState("");
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "file") {
      setPostDetail({ ...postDetail, [name]: e.target.files[0] });
    } else {
      setPostDetail({ ...postDetail, [name]: value });
    }
  };
  const handleContentChange = (value) => {
    setContent(value);
    setPostDetail({ ...postDetail, content: content });
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.set("title", postDetail.title);
      data.set("summary", postDetail.summary);
      data.set("content", postDetail.content);
      data.set("file", postDetail.file);
      const response = await PostService.createPost(data);
      if (response.status === 200) {
        Swal.fire({
          title: "Create Post",
          text: "Create post successfully",
          icon: "success",
        }).then(() => {
          setPostDetail({
            title: "",
            summary: "",
            content: "",
            file: null,
          });
          navigate("/");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Create Post",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };
  return (
    <div className="w-dvw min-w-full flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg max-w-4xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create New Post
        </h2>
        <div className="mb-4">
          <label
            htmlFor=""
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            value={postDetail.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:out-line-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor=""
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Summary
          </label>
          <input
            type="text"
            name="summary"
            value={postDetail.summary}
            onChange={handleChange}
            className="shadow appearance-none border rounded input-lg  w-full py-2 px-3 text-gray-700 leading-tight focus:out-line-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor=""
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Content
          </label>

          <div className="h-64">
            <Editor
              value={content}
              onChange={handleContentChange}
              ref={editorRef}
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor=""
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Upload Image
          </label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:out-line-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex item-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
          >
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
