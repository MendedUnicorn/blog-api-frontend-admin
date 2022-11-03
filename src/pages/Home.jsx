import Post from '../components/Post';
import { useFetch } from '../hooks/useFetch';

export const Home = () => {
  const {
    data: posts,
    error,
    loading,
  } = useFetch(`http://localhost:3000/posts/`);

  const newestPosts = posts && [...posts].reverse().slice(0, 4);

  return (
    <div className='content'>
      <h1>My blog</h1>
      {posts && (
        <div className='intro'>
          <p className='info'>There are {posts.length} posts on this blog</p>
          <p className='text'>
            Hello my name is Mended and I've made this blog as part of an API
            project on TOP (The Odin Project). This particular project has been
            about creating an REST API able to handle CRUD operations to
            function as the backend for a blog.
          </p>
          <div className='newest-posts'>
            {newestPosts &&
              newestPosts.map((post) => {
                return <Post data={post} key={post._id}></Post>;
              })}
          </div>
        </div>
      )}
    </div>
  );
};
