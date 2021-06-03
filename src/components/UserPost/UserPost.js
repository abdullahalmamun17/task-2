import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { RiEditBoxFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Comment from '../Comment/Comment';

const UserPost = ({ post, postDelete, postEdit }) => {
    const [comments, setComments] = useState([])
    const [postComments, setPostComments] = useState([])
    const [showComment, setShowComment] = useState(false)
    const [user, setUser] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(res => res.json())
            .then(data => setComments(data))
    }, [])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => {
                const newUser = data.find(singleUser => singleUser.id === post.userId)
                setUser(newUser)
            })
    }, [])

    const handleComments = () => {
        setShowComment(!showComment)
        const newComments = comments.filter(comment => comment.postId === post.id)
        setPostComments(newComments)
    }
    return (
        <div className="border w-50 my-3 p-3 mx-auto">
            <div className="d-flex justify-content-between align-items-center">
                <Link to={`/profile/${post.userId}`}><h5>{user.name}</h5></Link>
                <div>
                    <RiEditBoxFill onClick={() => postEdit(post)} className="text-warning" style={{ fontSize: '25px', cursor: 'pointer' }} />
                    <MdDelete onClick={() => postDelete(post.id)} className="text-danger ms-1" style={{ fontSize: '25px', cursor: 'pointer' }} />
                </div>
            </div>
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

export default UserPost;