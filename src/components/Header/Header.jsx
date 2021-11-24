import React from "react";
import { AiOutlineLogin } from "react-icons/ai";
import Popup from "./components/Popup";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
const Header = ({ username, ...props }) => {
  const [show, setShow] = React.useState(false);
  const handleShow = () => setShow(!show);
  const navigate = useNavigate();
  const handleClick = () => {
    if (username) {
      auth.signOut();
      setShow(!show);
    } else {
      navigate("/login");
      setShow(!show);
    }
  };
  return (
    <div className="relative my-4 flex justify-end items-center mx-4">
      <i>{username}</i>
      <div className="m-3 cursor-pointer" onClick={handleShow}>
        <AiOutlineLogin />
      </div>
      {show && (
        <Popup
          handleClick={handleClick}
          text={!username ? "Login" : "Logout"}
        />
      )}
    </div>
  );
};

export default Header;
