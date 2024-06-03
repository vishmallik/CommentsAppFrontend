import { useCallback, useEffect, useState } from "react";
import CommentBox from "./components/CommentBox";
import axios from "axios";
import CommentList from "./components/CommentList";
import { BASE_URL } from "./utils/url";

function App() {
  const [comments, setComments] = useState([]);
  const [sortBy, setSortBy] = useState("oldest");
  const getComments = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/comment`);
      if (res.data.success) {
        const nestedComments = nestComments(res.data.data);
        setComments(nestedComments);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    if (sortBy === "latest") {
      const sorted = [...comments]?.sort((a, b) => {
        const date1 = Date.parse(a.date);
        const date2 = Date.parse(b.date);
        if (date1 > date2) {
          return -1;
        } else if (date1 < date2) {
          return 1;
        } else {
          return 0;
        }
      });

      setComments(sorted);
    }
    if (sortBy === "oldest") {
      const sorted = [...comments]?.sort((a, b) => {
        const date1 = Date.parse(a.date);
        const date2 = Date.parse(b.date);
        if (date1 > date2) {
          return 1;
        } else if (date1 < date2) {
          return -1;
        } else {
          return 0;
        }
      });

      setComments(sorted);
    }
    if (sortBy === "most_score") {
      const sorted = [...comments]?.sort((a, b) => {
        if (a.votes > b.votes) {
          return -1;
        } else if (a.votes < b.votes) {
          return 1;
        } else {
          return 0;
        }
      });

      setComments(sorted);
    }
    if (sortBy === "least_score") {
      const sorted = [...comments]?.sort((a, b) => {
        if (a.votes > b.votes) {
          return 1;
        } else if (a.votes < b.votes) {
          return -1;
        } else {
          return 0;
        }
      });

      setComments(sorted);
    }
  }, [sortBy]);

  const nestComments = (comments) => {
    const commentMap = {};

    comments.forEach((comment) => {
      commentMap[comment._id] = { ...comment, replies: [] };
    });

    const nestedComments = [];

    comments.forEach((comment) => {
      if (comment.parentId) {
        commentMap[comment.parentId].replies.push(commentMap[comment._id]);
      } else {
        nestedComments.push(commentMap[comment._id]);
      }
    });

    return nestedComments;
  };

  return (
    <main className="container mx-auto py-10">
      <header className="flex justify-between items-center">
        <div>
          <label className="mx-4" htmlFor="sort">
            Sort By
          </label>
          <select
            name="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-solid border-gray-400 rounded-md mb-10"
          >
            <option value="oldest">Oldest Comment</option>
            <option value="latest">Latest Comment</option>
            <option value="most_score">Most Voted</option>
            <option value="least_score">Least Voted</option>
          </select>
        </div>
      </header>
      <section>
        <CommentBox getComments={getComments} />
        <CommentList comments={comments} getComments={getComments} />
      </section>
    </main>
  );
}

export default App;
