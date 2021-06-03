import React, { useContext, useEffect, useState } from 'react';
import { PostsContext } from '../../App';
import Post from '../Post/Post';

const Posts = () => {
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [loadingMore, setLoadingMore] = useState(false)
    const postsPerPage = 10;
    const [allPosts] = useContext(PostsContext)

    useEffect(() => {
        if (allPosts.length) {
            setLoadingMore(false)
            const newAllPosts = allPosts.slice(currentPage * postsPerPage, currentPage * postsPerPage + 10)
            setPosts([...posts, ...newAllPosts])
            setLoadingMore(true)
        } else {
            console.log('loading........');
        }
    }, [currentPage, allPosts])

    const handlePageNumber = () => {
        if (loadingMore && currentPage < Math.ceil(allPosts.length / postsPerPage)) {
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <div className="container">
            {
                posts.map(post => <Post key={post.id} post={post}></Post>)
            }
            <div className="d-flex justify-content-center">
                {
                    loadingMore && <button onClick={handlePageNumber} className="btn btn-primary">load more</button>
                }
            </div>
        </div>
    );
};

export default Posts;