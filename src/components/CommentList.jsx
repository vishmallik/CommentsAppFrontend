import Comment from "./Comment";
export default function CommentList({ comments, getComments }) {
  return (
    <ul className="space-y-4">
      {comments.map((comment) => (
        <Comment comment={comment} key={comment.id} getComments={getComments} />
      ))}
    </ul>
  );
}
