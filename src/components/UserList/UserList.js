import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Pagination from '../Pagination/Pagination';

const UserList = () => {
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(3);
    const [currentUsers, setCurrentUsers] = useState([])
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const inputValue = useRef("")

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/users')
            const data = await response.json()
            setUsers(data)
        }
        fetchUsers()
    }, [])

    // Get current posts
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;


    useEffect(() => {
        const newCurrentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
        setCurrentUsers(newCurrentUsers)
    }, [users, usersPerPage, currentPage])

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const asendingSort = (action) => {
        if (action === 'name') {
            const newUsers = [].concat(currentUsers)
                .sort((a, b) => a.name > b.name ? 1 : -1)
                .map((item, i) => item);
            setCurrentUsers(newUsers)
        }
        if (action === 'email') {
            const newUsers = [].concat(currentUsers)
                .sort((a, b) => a.email > b.email ? 1 : -1)
                .map((item, i) => item);
            setCurrentUsers(newUsers)
        }
    }
    const desendingSort = (action) => {
        if (action === 'name') {
            const newUsers = [].concat(currentUsers)
                .sort((a, b) => b.name > a.name ? 1 : -1)
                .map((item, i) => item);
            setCurrentUsers(newUsers)
        }
        if (action === 'email') {
            const newUsers = [].concat(currentUsers)
                .sort((a, b) => b.email > a.email ? 1 : -1)
                .map((item, i) => item);
            setCurrentUsers(newUsers)
        }
    }

    const handleSearch = () => {
        if (searchKeyword !== "") {
            const searchItem = currentUsers.filter(user => {
                return Object.values(user).join(' ').toLowerCase().includes(searchKeyword.toLowerCase())
            })
            setSearchResults(searchItem)
        } else {
            setSearchResults(currentUsers)
        }
    }

    return (
        <section className="container">
            <Navbar></Navbar>
            <h3 className="text-center border-bottom mt-3 mb-5">User List</h3>
            <div className="mb-5 d-flex justify-content-center">
                <input onChange={() => setSearchKeyword(inputValue.current.value)} ref={inputValue} className="form-control me-1 w-25" type="text" />
                <input onClick={handleSearch} type="submit" className="btn btn-primary" value="Search" />
            </div>
            <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center mb-2">
                    <h5 className="m-0 me-3">Show: </h5>
                    <nav>
                        <ul className="pagination m-0">
                            <li className="page-item"><Link onClick={() => setUsersPerPage(3)} className="page-link">3</Link></li>
                            <li className="page-item"><Link onClick={() => setUsersPerPage(5)} className="page-link">5</Link></li>
                            <li className="page-item"><Link onClick={() => setUsersPerPage(users.length)} className="page-link">All</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="d-flex align-items-center mb-2">
                    <h5 className="m-0 me-3">Sort: </h5>
                    <nav>
                        <ul className="pagination m-0">
                            <li className="page-item"><Link onClick={() => asendingSort('name')} className="page-link">ASC - Name</Link></li>
                            <li className="page-item"><Link onClick={() => desendingSort('email')} className="page-link">DSC - Name</Link></li>
                            <li className="page-item"><Link onClick={() => asendingSort('email')} className="page-link">ASC - Email</Link></li>
                            <li className="page-item"><Link onClick={() => desendingSort('email')} className="page-link">DSC - Email</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <table className="table table-bordered">
                    <thead>
                        <tr className="bg-light">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Website</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            searchKeyword.length
                                ? searchResults.map(user => <tr key={user.id}>
                                    <td><Link to={`/profile/${user.id}`}>{user.name}</Link></td>
                                    <td>{user.email}</td>
                                    <td>{user.website}</td>
                                </tr>)
                                : currentUsers.map(user => <tr key={user.id}>
                                    <td><Link to={`/profile/${user.id}`}>{user.name}</Link></td>
                                    <td>{user.email}</td>
                                    <td>{user.website}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <Pagination postsPerPage={usersPerPage} totalPosts={users.length} paginate={paginate}></Pagination>
        </section>
    );
};

export default UserList;