import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { DateTime } from 'luxon';
import { Comment } from '../components/Comment';
import { CommentForm } from '../components/CommentForm';
import { useState } from 'react';
import authHeader from '../services/auth-header';
import btnStyle from '../components/Buttons.module.css';

const OnePost = () => {
  const [value, setValue] = useState(0);
  const [com, setCom] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: post,
    setData: setPost,
    error,
    loading,
  } = useFetch(`http://localhost:3000/posts/${id}`);
  const { data: comments, setData: setComments } = useFetch(
    `http://localhost:3000/posts/${id}/comments`
  );

  const useUpdateParent = () => {
    console.log('update!');
    setValue((value) => value + 1);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
      },
    }).then(() => navigate('/posts'));
  };

  if (loading) {
    return (
      <div className='loading'>
        <p>Data is loading...</p>
      </div>
    );
  }
  if (post) {
    const created = DateTime.fromISO(post.createdAt).toLocaleString(
      DateTime.DATE_MED_WITH_WEEKDAY
    );
    return (
      <div className='content'>
        <div className='post'>
          <header>
            <h1>{post.title}</h1>
            <div className='info'>
              <p>by: {post.user.first_name} </p>
              <p>Published: {created} </p>
            </div>
            {/* <hr /> */}
          </header>

          <div className='content'>
            <div
              className='tex'
              dangerouslySetInnerHTML={{ __html: post.text }}
            ></div>
          </div>
          <div className='edit'>
            <button className={btnStyle.warning}>Edit</button>
            <button className={btnStyle.danger} onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
        <div className='comments'>
          <CommentForm
            updateParent={useUpdateParent}
            setComments={setComments}
            comments={comments}
          ></CommentForm>
          <h2>There are {comments && comments.length} comments</h2>
          {comments &&
            comments.map((comment) => {
              return (
                <Comment
                  comment={comment}
                  key={comment._id}
                  setComments={setComments}
                  comments={comments}
                />
              );
            })}
        </div>
      </div>
    );
  }
  if (!post) {
    return <p>No data found</p>;
  }
};

export default OnePost;
