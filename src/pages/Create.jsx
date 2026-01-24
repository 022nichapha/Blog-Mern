import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PostService from "../services/post.service";
import Editor from "../components/Editor";

const Create = () => {
  // 🚩 จุดสำคัญ: ต้องมีบรรทัดนี้เพื่อประกาศตัวแปร postDetail
  const [postDetail, setPostDetail] = useState({
    title: "",
    summary: "",
    content: "",
    file: null,
  });

  const editorRef = useRef(null);
  const navigate = useNavigate();

  // ฟังก์ชันจัดการการเปลี่ยนแปลงค่าใน Input
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

  // ฟังก์ชันจัดการเนื้อหาใน Editor
  const handleContentChange = (value) => {
    setPostDetail((prev) => ({
      ...prev,
      content: value,
    }));
  };

  // ฟังก์ชันส่งข้อมูล
  const handleSubmit = async () => {
    // ตรวจสอบรูปภาพ
    if (!postDetail.file) {
      Swal.fire("แจ้งเตือน", "กรุณาเลือกรูปภาพประกอบด้วยครับ", "error");
      return;
    }

    try {
      const data = new FormData();
      data.append("title", postDetail.title);
      data.append("summary", postDetail.summary);
      data.append("content", postDetail.content);
      data.append("file", postDetail.file);

      const response = await PostService.createPost(data);

      if (response.status === 200 || response.status === 201) {
        Swal.fire("สำเร็จ", "สร้างโพสต์เรียบร้อยแล้ว", "success").then(
          () => navigate("/")
        );
      }
    } catch (error) {
      // ดึงข้อความ Error จาก Backend ถ้ามี หรือใช้ข้อความกลาง
      const errorMsg = error?.response?.data?.message || "เกิดข้อผิดพลาดในการเชื่อมต่อ";
      Swal.fire("เกิดข้อผิดพลาด", errorMsg, "error");
    }
  };

  return (
    <div className="w-full flex justify-center p-4">
      <div className="bg-white p-8 rounded-lg max-w-4xl w-full shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">สร้างโพสต์ใหม่</h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="หัวข้อโพสต์"
            value={postDetail.title}
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          <input
            type="text"
            name="summary"
            placeholder="สรุปเนื้อหาสั้นๆ"
            value={postDetail.summary}
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          {/* ส่วนของ Rich Text Editor */}
          <div className="min-h-[300px] border rounded-lg overflow-hidden">
             <Editor
                value={postDetail.content}
                onChange={handleContentChange}
                ref={editorRef}
              />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">เลือกรูปภาพหน้าปก (บังคับ):</span>
            </label>
            <input
              type="file"
              name="file"
              onChange={handleChange}
              className="file-input file-input-bordered file-input-primary w-full"
              accept="image/*"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="btn btn-primary w-full mt-4 text-white"
          >
            บันทึกโพสต์
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;