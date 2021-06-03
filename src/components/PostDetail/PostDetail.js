import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { PostsContext } from '../../App';
import Comment from '../Comment/Comment';
import Navbar from '../Navbar/Navbar';

const PostDetail = () => {
    const { postId } = useParams()
    const [allPosts] = useContext(PostsContext)
    const currentPost = allPosts.find(post => post.id === parseInt(postId))
    const [currentUser, setCurrentUser] = useState({})
    const [comments, setComments] = useState([])
    const [commentLoading, setCommentLoading] = useState(false)

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/users')
            const data = await response.json()
            const newCurrentUser = data.find(user => user.id === currentPost?.userId)
            setCurrentUser(newCurrentUser)
        }
        fetchUsers()
    }, [])

    console.log(currentPost);

    useEffect(() => {
        const fetchComments = async () => {
            setCommentLoading(true)
            const response = await fetch('https://jsonplaceholder.typicode.com/comments')
            const data = await response.json()
            const allComments = data.filter(post => post.postId === currentPost?.id)
            setComments(allComments)
            setCommentLoading(false)
        }
        fetchComments()
    }, [])

    return (
        <section>
            <Navbar></Navbar>
            <div className="d-flex justify-content-center container">
                <div className="border mt-5 p-3 rounded w-50 mb-3">
                    <h4>{currentUser?.name}</h4>
                    <h6>{currentPost?.title}</h6>
                    <p>{currentPost?.body}</p>
                    {
                        commentLoading && <h6>Comments Loading.....</h6>
                    }
                    {
                        (!commentLoading && comments.length) ? <h6>Comments ({comments.length})</h6> : <h6>No comments available</h6>
                    }
                    {
                        comments.map(comment => <Comment comment={comment}></Comment>)
                    }
                </div>
            </div>
        </section>
    );
};

export default PostDetail;