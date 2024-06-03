import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/url";

export default function CommentBox({ getComments }) {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !comment) {
      alert("Name and Comment Field is required");
      return;
    }
    try {
      const res = await axios.post(
        `${BASE_URL}/comment`,
        {
          author: name,
          content: comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setComment("");
      setName("");
      getComments();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="m-4 space-y-4 mb-10">
      <h2 className="font-medium text-lg"> Add Comment</h2>
      <form
        className="flex justify-between flex-col w-1/2 space-y-4"
        onSubmit={handleSubmit}
      >
        <textarea
          name="commentInput"
          placeholder="Enter Comment"
          rows={3}
          cols={20}
          className="border border-gray-400 border-solid p-2"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <input
          name="authorName"
          placeholder="Enter Your Name"
          type="text"
          value={name}
          onChange={({ target }) => setName(target.value)}
          className="border border-gray-400 border-solid p-2"
        />
        <button type="submit" className="bg-teal-400 px-4 py-2">
          Add Comment
        </button>
      </form>
    </div>
  );
}
