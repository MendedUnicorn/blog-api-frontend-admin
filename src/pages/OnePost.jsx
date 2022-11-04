import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { DateTime } from 'luxon';
import { Comment } from '../components/Comment';
import { CommentForm } from '../components/CommentForm';
import { useState } from 'react';

const OnePost = () => {
  const [value, setValue] = useState(0);
  const [com, setCom] = useState([]);
  const { id } = useParams();
  const { data, error, loading } = useFetch(
    `http://localhost:3000/posts/${id}`
  );
  const { data: comments } = useFetch(
    `http://localhost:3000/posts/${id}/comments`,
    value
  );

  const useUpdateParent = () => {
    console.log('update!');
    setValue((value) => value + 1);
  };

  if (loading) {
    return (
      <div className='loading'>
        <p>Data is loading...</p>
      </div>
    );
  }
  if (data) {
    const created = DateTime.fromISO(data.createdAt).toLocaleString(
      DateTime.DATE_MED_WITH_WEEKDAY
    );
    return (
      <div className='content'>
        <div className='post'>
          <header>
            <h1>{data.title}</h1>
            <div className='info'>
              <p>by: {data.user.first_name} </p>
              <p>Published: {created} </p>
            </div>
          </header>
          <hr />

          <div className='content'>
            <p>{data.text}</p>
          </div>
        </div>
        <div className='comments'>
          <CommentForm updateParent={useUpdateParent}></CommentForm>
          <h2>There are {comments && comments.length} comments</h2>
          {comments &&
            comments.map((comment) => {
              return <Comment comment={comment} key={comment._id} />;
            })}
        </div>
      </div>
    );
  }
};

export default OnePost;
