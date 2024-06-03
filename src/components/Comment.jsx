import CommentBox from "./CommentBox";
import CommentList from "./CommentList";
import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

export default function Comment({comment,getComments}){
   
    const [showReplyBox,setShowReplyBox] = useState(false);
    const [reply,setReply] = useState("");
    const [name,setName] = useState("");

    async function handleSubmit(e){
        e.preventDefault();
        if(!name || !reply){
            alert("Name and Reply Field is required")
            return;
        }
       
        try {
        //     const res = await axios.put("http://localhost:3000/comment",{
        //     id:comment._id,
        //     author :name,
        //     content: reply
        // },{
        //     headers:{
        //         "Content-Type":"application/json"
        //     }
        // })

        const comments = JSON.parse(localStorage.getItem("comments"));
        const c = comments.find(c=>c.id === comment.id)
        comment.replies.push({
            id:uuidv4(),
            author:name,
            content:reply,
            replies:[],
            date: Date.now(),
            votes:0,
        })

        // localStorage.setItem("comments",JSON.stringify(comments))
        // console.log(comments)
        setReply("");
        setName("");
        setShowReplyBox(false)
        
        getComments()
        } catch (error) {
            console.log(error)
        }
        

    }
    function updateVote(id,factor){
        const comments = JSON.parse(localStorage.getItem("comments"));
        const c = comments.find(c=>c.id === comment.id)
        c.votes += factor;
        localStorage.setItem("comments",JSON.stringify(comments))
        getComments()
    }
   
    return <li  className="bg-gray-200 py-4 border-b-solid border-b border-b-gray-400 px-10">
    <p className="text-sm">{comment.author} says:</p>
    <p className="pl-4 py-4">{comment.content}</p>
    <div className="text-sm flex justify-between items-center w-1/3">
        <p>Votes: {comment.votes}</p>
        <button type="button" className="bg-green-300 p-1" onClick={()=>updateVote(comment.id,1)}>Upvote</button>
        <button type="button" className="bg-red-300 p-1" onClick={()=>updateVote(comment.id,-1)}>Downvote</button>
        <button type="button" className="bg-blue-300 p-1" onClick={()=>{setShowReplyBox(!showReplyBox)}}>Reply</button>
    </div>
    <br />
    {showReplyBox && 
    <form className="m-4 flex justify-between flex-col w-1/2 space-y-4" onSubmit={handleSubmit}>
    <textarea name="replyInput" placeholder="Enter Reply" rows={3} cols={20} className="border border-gray-400 border-solid" value={reply} onChange={({target})=>setReply(target.value)}/>
    <input name="authorName" placeholder="Enter Your Name" type="text" value={name} onChange={({target})=>setName(target.value)} className="border border-gray-400 border-solid p-2"/>
    <button type="submit" className="bg-teal-400 px-4 py-2">Add Reply</button>
    </form>}
    <ul className="pl-10">
       
    {comment.replies.map((reply)=>
        <Comment comment={reply} key={reply.id} getComments={getComments}/>
    )}
    </ul>
    
    </li>
}