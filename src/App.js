import React from 'react';
import './App.css';
import Todo from './components/Todo';
import { auth } from "./config/firebase";
import Register from "./Register/Register";
import Login from "./components/Login/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header/Header";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = React.useState("");
  const [uid, setUid] = React.useState("");
  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        let uid = user.uid;
        setUid(uid);
        setUserEmail(user.email);
        console.log(user);
        navigate("/todo");
      } else {
        setUserEmail("");

        navigate("/login");
      }
    });
  }, [auth]);
  return (
    <div>
      <Header username={userEmail} />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todo" element={<Todo userId={uid} />} />
        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
    </div>
  );
}

export default App;
