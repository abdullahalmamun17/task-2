import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useState } from 'react';
import {
  BrowserRouter as Router,

  Route, Switch
} from "react-router-dom";
import './App.css';
import Home from './components/Home/Home';
import PostDetail from './components/PostDetail/PostDetail';
import Profile from './components/Profile/Profile';
import SharePost from './components/SharePost/SharePost';
import UserList from './components/UserList/UserList';
import UserProfile from './components/UserProfile/UserProfile';

export const PostsContext = createContext()

function App() {
  const [allPosts, setAllPosts] = useState([])
  return (
    <PostsContext.Provider value={[allPosts, setAllPosts]}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/home'>
            <Home />
          </Route>
          <Route path='/profile/:userId'>
            <UserProfile />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
          <Route path='/share-post'>
            <SharePost />
          </Route>
          <Route path='/users'>
            <UserList />
          </Route>
          <Route path='/post/:postId'>
            <PostDetail />
          </Route>
        </Switch>
      </Router>
    </PostsContext.Provider>
  );
}

export default App;
