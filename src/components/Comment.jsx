import { DateTime } from 'luxon';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import authHeader from '../services/auth-header';
import style from './Buttons.module.css';

export const Comment = ({ comment, setComments, comments }) => {
  const { id } = useParams();
  const [removed, setRemoved] = useState(comment.removed);
  const timeCreated = DateTime.fromISO(comment.createdAt).toLocaleString(
    DateTime.DATETIME_MED
  );
  function handleRemoveToggle(e, comment) {
    e.preventDefault();
    fetch(`http://localhost:3000/posts/${id}/comments/${comment._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
      },
      body: JSON.stringify({ removed: !removed }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRemoved(data.removed);
      });
  }
  // function handleRemoveToggle(e) {
  //   useFetch(`http://localhost:3000/posts/${id}/comments/${comment._id}`)
  // }

  function handleDelete(e) {
    e.preventDefault();
    fetch(`http://localhost:3000/posts/${id}/comments/${comment._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Deleted: ', data);
        setComments(comments.filter((com) => com._id !== comment._id));
      });
  }

  return (
    comment && (
      <div className='comment' key={comment._id}>
        <h3>{removed ? 'removed' : comment.name}</h3>
        <p className='created-at'>{timeCreated}</p>
        <p className='comment-text'>
          {!removed ? comment.text : 'Comment removed'}
        </p>
        <button
          className={style.warning}
          onClick={(e) => handleRemoveToggle(e, comment)}
        >
          {removed ? 'Recover' : 'Remove'}
        </button>
        <button className={style.danger} onClick={handleDelete}>
          Delete
        </button>
      </div>
    )
  );
};
