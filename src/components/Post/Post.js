import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Comment from '../Comment/Comment';

const Post = ({ post }) => {
    const [comments, setComments] = useState([])
    const [postComments, setPostComments] = useState([])
    const [showComment, setShowComment] = useState(false)
    const [user, setUser] = useState({})

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(res => res.json())
            .then(data => setComments(data))
    }, [])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => {
                const findUser = data.find(user => user.id === post.userId)
                setUser(findUser)
            })
    }, [])

    const handleComments = () => {
        setShowComment(!showComment)
        const newComments = comments.filter(comment => comment.postId === post.id)
        setPostComments(newComments)
    }

    return (
        <div className="border w-50 my-3 p-3 mx-auto">
            <Link to={`/profile/${post.userId}`}><h5>{user?.name}</h5></Link>
            <h6>{post.title}</h6>
            <p>{post.body}</p>
            {
                showComment ? <button onClick={handleComments} className="btn btn-sm btn-secondary mb-3">Close Comments</button>
                    : <button onClick={handleComments} className="btn btn-sm btn-secondary">Show Comments</button>
            }
            {
                showComment && postComments.map(comment => <Comment comment={comment}></Comment>)
            }
            <Link to={`/post/${post.id}`} className="btn btn-primary btn-sm ms-3">Read More</Link>
        </div>
    );
};

export default Post;