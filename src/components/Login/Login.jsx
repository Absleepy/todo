import React from "react";
import Form from "../Form/Form";
import { auth } from "../../config/firebase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = React.useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then((userCredential) => {
        let user = userCredential.user;
        setErrorMessage("");
        navigate("/todo");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        let errorCode = error.code;
        setErrorMessage(error.message);
      });
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <div
      className="container bg-green-100 p-3 mx-auto mt-16"
      style={{ maxWidth: "600px" }}
    >
      <h2 className="text-xl text-center my-3">Login</h2>

      <div className="text-center text-red-500">{errorMessage ?? ""}</div>
      <Form
        btnText="Login"
        onSubmit={onSubmit}
        loading={loading}
        values={values}
        handleChange={handleChange}
      />
      <div className="mt-4 text-center">
        Don't Have an account ?{" "}
        <Link to="/register" className="text-blue-700">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
