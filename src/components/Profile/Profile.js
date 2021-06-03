import React, { useContext, useEffect, useState } from 'react';
import { PostsContext } from '../../App';
import EditModal from '../Modal/EditModal';
import Navbar from '../Navbar/Navbar';
import Pagination from '../Pagination/Pagination';
import UserPost from '../UserPost/UserPost';

const Profile = () => {
    const [userPosts, setUserPosts] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState({})
    const [allPosts] = useContext(PostsContext)
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(2);
    const currentUser = 2


    useEffect(() => {
        const newData = allPosts.filter(post => post.userId === currentUser)
        setUserPosts(newData)
    }, [])

    const handleDelete = (postId) => {
        const newPosts = userPosts.filter(post => post.id !== postId)
        setUserPosts(newPosts)
    }
    const handleEditedData = (data) => {
        const newPost = userPosts.map(post => {
            if (post.id === selectedPost.id) {
                post.title = data.title
                post.body = data.body
            }
            return post;
        })
        setUserPosts(newPost)
        setIsOpen(false);
    }
    const handleEdit = (post) => {
        setSelectedPost(post)
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = userPosts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <Navbar></Navbar>
            {
                currentPosts.map(post => <UserPost key={post.id} post={post} postDelete={handleDelete} postEdit={handleEdit}></UserPost>)
            }
            <Pagination totalPosts={userPosts.length} postsPerPage={postsPerPage} paginate={paginate}></Pagination>
            <EditModal post={selectedPost} handleEditedData={handleEditedData} modalIsOpen={modalIsOpen} closeModal={closeModal}></EditModal>
        </div>
    );
};

export default Profile;