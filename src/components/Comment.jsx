import { DateTime } from 'luxon';

export const Comment = ({ comment }) => {
  const timeCreated = DateTime.fromISO(comment.createdAt).toLocaleString(
    DateTime.DATETIME_MED
  );
  return (
    comment && (
      <div className='comment' key={comment._id}>
        <h3>{comment.name}</h3>
        <p className='created-at'>{timeCreated}</p>
        <p className='comment-text'>
          {!comment.removed ? comment.text : 'Comment deleted'}
        </p>
      </div>
    )
  );
};
