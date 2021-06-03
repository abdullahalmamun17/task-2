import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { PostsContext } from '../../App';
import Navbar from '../Navbar/Navbar';
import Pagination from '../Pagination/Pagination';
import Post from '../Post/Post';

const UserProfile = () => {
    const { userId } = useParams()
    const [allPosts, setAllPosts] = useContext(PostsContext)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(3)

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const userPosts = allPosts.filter(post => post.userId === parseInt(userId))
    const currentPosts = userPosts.slice(indexOfFirstPost, indexOfLastPost)

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <Navbar></Navbar>
            {
                currentPosts.map(userPost => <Post key={userPost.id} post={userPost}></Post>)
            }
            <Pagination totalPosts={userPosts.length} postsPerPage={postsPerPage} paginate={paginate}></Pagination>
        </div>
    );
};

export default UserProfile;