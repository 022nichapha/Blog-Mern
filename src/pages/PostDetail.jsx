import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import PostService from "../services/post.service";
import { UserContext } from "../context/UserContext";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);

  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await PostService.getById(id);
        if (response.status === 200) {
          setPost(response.data);
        }
      } catch (error) {
        Swal.fire(
          "Post Detail",
          error?.response?.data?.message || error.message,
          "error"
        );
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete Post?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await PostService.deletePost(post._id);
      Swal.fire("Deleted!", "Post has been deleted", "success").then(() => {
        navigate("/");
      });
    } catch (error) {
      Swal.fire(
        "Delete Post",
        error?.response?.data?.message || error.message,
        "error"
      );
    }
  };

  if (!post) return null;

  return (
    <div className="post-page min-h-full w-full flex justify-center p-4 pt-20">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          {post.title}
        </h1>

        <div className="text-gray-600 mb-6 text-center">
          <time className="block mb-2">
            {new Date(post.createdAt).toLocaleDateString("th-TH")}
          </time>

          <div className="author mb-3">
            By{" "}
            <Link
              to={`/author/${post.author?._id}`}
              className="text-blue-500 hover:underline"
            >
              @{post.author?.username}
            </Link>
          </div>

          {userInfo?.id === post.author?._id && (
            <div className="flex justify-center gap-3">
              <Link
                to={`/edit/${post._id}`}
                className="btn btn-warning"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="btn btn-error"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <div
          className="content text-gray-700 prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
};

export default PostDetail;
