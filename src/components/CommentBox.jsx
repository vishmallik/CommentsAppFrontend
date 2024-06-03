import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

export default function CommentBox({getComments}){
    const [comment,setComment] = useState("");
    const [name,setName] = useState("");

    async function handleSubmit(e){
        e.preventDefault();
        if(!name || !comment){
            alert("Name and Comment Field is required")
            return;
        }
        try {
        //     const res = await axios.post("http://localhost:3000/comment",{
        //     author :name,
        //     content: comment
        // },{
        //     headers:{
        //         "Content-Type":"application/json"
        //     }
        // })
        const comments = JSON.parse(localStorage.getItem("comments"));
        comments.push({
            id:uuidv4(),
            author:name,
            content:comment,
            replies:[],
            date: Date.now(),
            votes:0,
        })
        localStorage.setItem("comments",JSON.stringify(comments))

        setComment("");
        setName("");
        getComments()
        } catch (error) {
            console.log(error)
        }
        

    }
    return (
        <form className="m-4 flex justify-between flex-col w-1/2 space-y-4" onSubmit={handleSubmit}>
        <textarea name="commentInput" placeholder="Enter Comment" rows={3} cols={20} className="border border-gray-400 border-solid" value={comment} onChange={({target})=>setComment(target.value)}/>
        <input name="authorName" placeholder="Enter Your Name" type="text" value={name} onChange={({target})=>setName(target.value)} className="border border-gray-400 border-solid p-2"/>
        <button type="submit" className="bg-teal-400 px-4 py-2">Add Comment</button>
        </form>
    )
}