import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <>
      <h1>Header</h1>
      <ul>
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/posts">Posts</NavLink>
        </li>
      </ul>
    </>
  );
}

export default Header;
