import Cookies from "js-cookie";
import { Link, useHistory } from "react-router-dom";

const Logout = () => {
  let history = useHistory();
  return (
    <div>
      <Link to="/">Home</Link>

      <h1>Logout</h1>
      <div>
        <button
          onClick={() => {
            Cookies.remove("tokenMern");
            history.push("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
