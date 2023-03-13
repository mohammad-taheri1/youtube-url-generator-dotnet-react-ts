import "./navbar.scss";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
   const redirect = useNavigate();
   return (
      <div className="navbar">
         <span onClick={() => redirect("/")}>Url Generator</span>
      </div>
   );
};

export default Navbar;
