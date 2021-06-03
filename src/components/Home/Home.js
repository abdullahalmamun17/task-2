import React, { useContext, useEffect } from 'react';
import { PostsContext } from '../../App';
import Navbar from '../Navbar/Navbar';
import Posts from '../Posts/Posts';

const Home = () => {
    const [allPosts, setAllPosts] = useContext(PostsContext)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(data => setAllPosts(data))
            .catch(error => console.log(error))
    }, [])

    return (
        <div>
            <Navbar></Navbar>
            <Posts></Posts>
        </div>
    );
};

export default Home;