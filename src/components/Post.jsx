import style from './Post.module.css';
import { useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import authHeader from '../services/auth-header';
import btnStyle from './Buttons.module.css';

const Post = ({ post, setPosts }) => {
  const [published, setPublished] = useState(post.published);
  const { title, user, text } = post;
  const [div, setDiv] = useState();

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/posts/${post._id}`);
  };

  function togglePublished(e) {
    e.preventDefault(e);
    fetch(`http://localhost:3000/posts/${post._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
      },
      body: JSON.stringify({
        published: !published,
      }),
    })
      .then((results) => results.json())
      .then((data) => {
        console.log('updated', data, 'pub', data.published);
        setPublished(data.published);
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  }

  const createdAt = post
    ? DateTime.fromISO(post.createdAt).toLocaleString(DateTime.DATETIME_MED)
    : '';

  function handleDelete(e) {
    e.preventDefault();
  }

  return (
    post && (
      <div className={style.card} key={post._id}>
        <header onClick={handleClick}>
          <h4>{title}</h4>
          <p>
            by: {user.first_name} {user.last_name}
          </p>
        </header>
        <div
          className={style.text}
          onClick={handleClick}
          dangerouslySetInnerHTML={{ __html: text }}
        ></div>
        <div className={style.footer} onClick={handleClick}>
          <p>Posted: {createdAt}</p>
          <p>Comments: {post.comment_count}</p>
        </div>
        <div className={style.edit}>
          <div className={style.published}>
            <p style={published ? { color: 'green' } : { color: 'red' }}>
              {published ? 'Published' : 'Not Published'}
            </p>
            <input
              type='checkbox'
              name='published'
              id='published'
              checked={published}
              onChange={togglePublished}
            />
          </div>
          <button className={btnStyle.danger}>Delete</button>
        </div>
      </div>
    )
  );
};

export default Post;
