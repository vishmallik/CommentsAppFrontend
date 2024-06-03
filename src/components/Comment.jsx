import { useState } from "react";
import axios from "axios";

import { BASE_URL } from "../utils/url";

export default function Comment({ comment, getComments }) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [reply, setReply] = useState("");
  const [name, setName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !reply) {
      alert("Name and Reply Field is required");
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/comment`,
        {
          id: comment._id,
          author: name,
          content: reply,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setReply("");
      setName("");
      setShowReplyBox(false);

      getComments();
    } catch (error) {
      console.log(error);
    }
  }

  async function updateVote(type) {
    try {
      const res = await axios.post(`${BASE_URL}/${type}/${comment._id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      getComments();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <li className="bg-gray-200 pt-4  px-10">
      <div className="border-b border-b-solid border-b-gray-300 py-4">
        <p className="text-sm font-medium">
          {comment.author} on{" "}
          {new Date(Date.parse(comment.date)).toLocaleString()}
        </p>
        <p className="pl-4 py-4">{comment.content}</p>
        <div className="text-sm  flex items-center space-x-4">
          <p className="text-xs">Votes: {comment.votes}</p>
          <button
            type="button"
            className="bg-green-300 py-1 px-2 rounded-md"
            onClick={() => updateVote("upvote")}
          >
            Upvote
          </button>
          <button
            type="button"
            className="bg-red-300 py-1 px-2 rounded-md"
            onClick={() => updateVote("downvote")}
          >
            Downvote
          </button>
          <button
            type="button"
            className="bg-blue-300 py-1 px-2 rounded-md"
            onClick={() => {
              setShowReplyBox(!showReplyBox);
            }}
          >
            Reply
          </button>
        </div>

        {showReplyBox && (
          <form
            className="m-4 flex justify-between flex-col w-1/2 space-y-4"
            onSubmit={handleSubmit}
          >
            <textarea
              name="replyInput"
              placeholder="Enter Reply"
              rows={3}
              cols={20}
              className="border border-gray-400 border-solid p-2"
              value={reply}
              onChange={({ target }) => setReply(target.value)}
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
              Add Reply
            </button>
          </form>
        )}
      </div>

      <ul className="pl-10 border-l border-l-slate-400 border-l-solid my-10 ">
        {comment.replies.length > 0 &&
          comment.replies.map((reply) => (
            <Comment
              comment={reply}
              key={reply._id}
              getComments={getComments}
            />
          ))}
      </ul>
    </li>
  );
}
