import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { PostsContext } from '../../App';
import Navbar from '../Navbar/Navbar';

const SharePost = () => {
    const [post, setPost] = useState({})
    const [allPosts, setAllPosts] = useContext(PostsContext)
    const history = useHistory()

    const onSubmit = (e) => {
        e.preventDefault()
        if (post.title && post.body) {
            const newPost = {
                userId: 2,
                id: allPosts.length + 1,
                ...post
            }
            setAllPosts([newPost, ...allPosts])
            history.replace('/profile')
        }
        e.target.reset()
    }

    const onChange = e => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Navbar></Navbar>
            <div className="d-flex justify-content-center">
                <div className="mt-3 w-50">
                    <h3 className="mb-4" style={{ textDecoration: 'underline' }}>Share Your Story</h3>
                    <form onSubmit={onSubmit}>
                        <h6>Title</h6>
                        <input required onChange={onChange} name="title" className="form-control mb-4" />
                        <h6>Status</h6>
                        <textarea required onChange={onChange} name="body" className="form-control mb-3" />
                        <input type="submit" value="SHARE" className="btn btn-success" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default SharePost;