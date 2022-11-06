import Post from '../components/Post';
import { useFetch } from '../hooks/useFetch';
import authHeader from '../services/auth-header';

const AllPosts = () => {
  const {
    data: posts,
    setData: setPosts,
    error,
    loading,
  } = useFetch('http://localhost:3000/posts/', {
    headers: authHeader(),
  });
  return (
    <div className='all-posts'>
      <h3>All posts</h3>
      {posts &&
        posts.map((post) => {
          return <Post post={post} key={post._id}></Post>;
        })}
    </div>
  );
};

export default AllPosts;
