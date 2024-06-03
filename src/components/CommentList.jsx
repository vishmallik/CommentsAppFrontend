import Comment from "./Comment";
export default function CommentList({ comments, getComments }) {
  return (
    <div className="m-4 space-y-4 mb-10">
      <h2 className="font-medium text-lg">All Comments</h2>
      <ul className="space-y-4 ">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment
              comment={comment}
              key={comment._id}
              getComments={getComments}
            />
          ))
        ) : (
          <li>No Comments Found!!! </li>
        )}
      </ul>
    </div>
  );
}
