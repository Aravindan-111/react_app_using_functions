import { useState, useEffect } from 'react';
import axios from 'axios';
import './Posts.css';
import { Link } from 'react-router-dom';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [id, setId] = useState('');

  // Read Posts
  let getData = async () => {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    console.log(data);
    setPosts(data);
  };

  // Delete Post
  let delete_post = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    let temp_posts = [...posts];
    temp_posts = temp_posts.filter((temp) => {
      return temp.id !== id;
    });
    setPosts(temp_posts);
  };

  // Create Post
  const create_post = async () => {
    const { data: post } = await axios.post(
      'https://jsonplaceholder.typicode.com/posts',
      {
        userId: userId,
        title: title,
        body: body,
      }
    );
    let temp_posts = [...posts];
    temp_posts.push(post);
    setPosts(temp_posts);
    console.log(temp_posts);
    setUserId('');
    setTitle('');
    setBody('');
  };

  // copy_post_to_input when update is pressed
  const copy_post_to_input = (data) => {
    setTitle(data.title);
    setBody(data.body);
    setId(data.id);
    setUserId(data.userId);
  };

  // Handle Change
  const handle_change = ({ target: { name, value } }) => {
    if (name === 'userId') setUserId(value);
    if (name === 'title') setTitle(value);
    if (name === 'body') setBody(value);
    // console.log(name, value);
  };

  // Update Post
  const update_post = async () => {
    const { data } = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        userId: userId,
        title: title,
        body: body,
      }
    );
    let temp_post = [...posts];
    let index = temp_post.findIndex((temp) => temp.id === id);
    temp_post[index] = data;
    setPosts(temp_post);
    setUserId('');
    setTitle('');
    setBody('');
  };

  // Handle Submit
  const handle_submit = (event) => {
    event.preventDefault();
    if (id === '') create_post();
    else {
      update_post();
    }
    // console.log(event);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="posts">
        <>
          <form onSubmit={handle_submit}>
            <span>User ID : </span>
            <input
              type="text"
              name="userId"
              value={userId}
              onChange={handle_change}
            />
            <br />
            <br />
            <span>Title : </span>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handle_change}
            />
            <br />
            <br />
            <span>Body : </span>
            <input
              type="text"
              name="body"
              value={body}
              onChange={handle_change}
            />
            <br />
            <br />
            <button>Submit</button>
            <br />
            <br />
          </form>
        </>
      </div>
      {posts.map((data) => {
        return (
          <div className="details_body" key={data.id}>
            <div className="details_container">
              <p>
                <b>ID : </b>
                {data.id}
              </p>
              <p>
                <b>UserID : </b>
                {data.userId}
              </p>
              <p>
                <b>Body : </b>
                {data.body}
              </p>
              <div className="button_div">
                <button onClick={() => delete_post(data.id)}>Delete</button>
                <button onClick={() => copy_post_to_input(data)}>Update</button>
                <Link to={`/posts/${data.id}`}>
                  <button>Details</button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Posts;
