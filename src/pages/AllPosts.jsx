import Post from '../components/Post';
import { useFetch } from '../hooks/useFetch';
const AllPosts = () => {
  const { data, error, loading } = useFetch('http://localhost:3000/posts/');

  return (
    <div className='all-posts'>
      <h3>All posts</h3>
      {data &&
        data.map((post) => {
          return <Post data={post}></Post>;
        })}
    </div>
  );
};

export default AllPosts;
