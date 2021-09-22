import { useEffect, useState } from 'react';
import axios from 'axios';
import './comments.css';

function Comments({ match }) {
  let id = match.params.id;
  console.log(id);

  const [post, setPost] = useState([]);

  let fetchData = async () => {
    let { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );
    console.log(data);
    setPost(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="main_comments_container">
      <div>
        <br />
        <p>
          <b>Comments : </b>
        </p>

        {post.map((a) => {
          return (
            <div className="container" key={a.id}>
              <p>
                <b>Name : </b>
                {a.name}
              </p>
              <p>
                <b>ID : </b>
                {a.email}
              </p>
              <p>
                <b>Post ID : </b>
                {a.postId}
              </p>
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Comments;
