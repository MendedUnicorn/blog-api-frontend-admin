import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authHeader from '../services/auth-header';
import style from './PostForm.module.css';
import { Editor } from '@tinymce/tinymce-react';

export const PostForm = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [published, setPublished] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
      },
      body: JSON.stringify({
        title,
        text,
        user: JSON.parse(localStorage.getItem('user')).user._id,
        published,
      }),
    })
      .then((results) => results.json())
      .then((data) => {
        console.log('posted data', data);
        navigate('/posts');
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  };
  const handleChange = (e, set) => {
    set(e.target.value);
  };
  const handlePublishChange = (e) => {
    setPublished((prev) => !prev);
  };
  function handleSubmitTiny(e) {
    e.preventDefault();

    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
      },
      body: JSON.stringify({
        title: 'TEST WITH TINY',
        text,
        user: JSON.parse(localStorage.getItem('user')).user._id,
        published,
      }),
    })
      .then((results) => results.json())
      .then((data) => {
        console.log('posted data', data);
        navigate('/posts');
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  }

  return (
    <div className='container' onClick={console.log(text)}>
      <Editor
        apiKey={process.env.REACT_APP_TINY_API_KEY}
        value={text}
        onEditorChange={(e) => setText(e)}
      />
      {/* <h2>New Post</h2>
      <form className={style.postForm} onSubmit={handleSubmit}>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          name='title'
          id='title'
          onChange={(e) => handleChange(e, setTitle)}
          value={title}
        />
        <label htmlFor='text'>Post</label>
        <textarea
          name='text'
          id='text'
          cols='30'
          rows='10'
          onChange={(e) => handleChange(e, setText)}
          value={text}
        ></textarea>
        <label htmlFor='published'>Publish</label>
        <input
          type='checkbox'
          name='published'
          id='published'
          onChange={handlePublishChange}
          checked={published}
        />
        <button type='submit'>Post</button>
      </form> */}
      <button onClick={handleSubmitTiny}>Log editor content</button>
    </div>
  );
};
