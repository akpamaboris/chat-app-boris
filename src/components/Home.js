import { Link } from "react-router-dom";

//IMPORT THE COMPONENTS
import Header from "./Header";

const Home = () => {
  return (
    <div>
      <Header />
      <div
        style={{
          backgroundColor: "white",
          width: "70%",
          height: "500px",
          margin: "0 auto",
        }}
      ></div>
    </div>
  );
};

export default Home;
