import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div>
        <div>
          <Link to="/logout">Logout</Link>
        </div>
        <div>
          <Link to="/register">Register</Link>
        </div>
      </div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
