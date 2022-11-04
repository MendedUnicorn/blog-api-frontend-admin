import style from './Post.module.css';
import { useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';

const Post = ({ data }) => {
  const { title, user, text } = data;

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/posts/${data._id}`);
  };

  const createdAt = data
    ? DateTime.fromISO(data.createdAt).toLocaleString(DateTime.DATETIME_MED)
    : '';

  return (
    data && (
      <div className={style.card} onClick={handleClick} key={data._id}>
        {console.log('firstdata', data)}
        <header>
          <h4>{title}</h4>
          <p>
            by: {user.first_name} {user.last_name}
          </p>
        </header>
        <div className={style.text}>
          <p>{text}</p>
        </div>
        <div className={style.footer}>
          <p>Posted: {createdAt}</p>
          <p>Comments: {data.comment_count}</p>
        </div>
      </div>
    )
  );
};

export default Post;
