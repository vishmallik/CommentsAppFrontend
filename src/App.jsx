import { useCallback, useEffect, useState } from "react";
import CommentBox from "./components/CommentBox";
import axios from "axios";
import CommentList from "./components/CommentList";

function App() {
  const [comments, setComments] = useState([]);
  const getComments = useCallback(async () => {
    // try {
    //   const res = await axios.get("http://localhost:3000/comment")
    //   if(res.data.success){
    //     setComments(res.data.data);
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
    setComments(JSON.parse(localStorage.getItem("comments")));
  }, []);
  useEffect(() => {
    // localStorage.setItem("comments",JSON.stringify([]))
    getComments();
  }, []);
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    const unsortedComments = JSON.parse(localStorage.getItem("comments"));
    if (sortBy === "date") {
      const sorted = unsortedComments?.sort((a, b) => {
        if (a.date > b.date) {
          return 1;
        } else if (a.date < b.date) {
          return -1;
        } else {
          return 0;
        }
      });

      setComments(sorted);
    }
    if (sortBy === "rank") {
      const sorted = unsortedComments?.sort((a, b) => {
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
  }, [sortBy]);

  return (
    <>
      <main>
        <header className="flex justify-between items-center">
          <div>
            <label className="mx-4">Sort By</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date">Latest</option>
              <option value="rank">Top Voted</option>
            </select>
          </div>
        </header>
        <section>
          <CommentBox getComments={getComments} />
          <CommentList comments={comments} getComments={getComments} />
        </section>
      </main>
    </>
  );
}

export default App;
