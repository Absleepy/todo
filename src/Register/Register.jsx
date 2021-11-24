import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import Form from "../components/Form/Form";
const Register = () => {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log(user);
        setLoading(false);
      })
      .catch((error) => {
        var errorCode = error.code;
        setErrorMessage(error.message);
        setLoading(false);
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
      <h2 className="text-xl text-center my-3">Register</h2>
      <div className="text-center text-red-500">{errorMessage ?? ""}</div>

      <Form
        btnText="Register"
        loading={loading}
        onSubmit={onSubmit}
        values={values}
        handleChange={handleChange}
      />
      <div className="mt-4 text-center">
        Have an account ?{" "}
        <Link to="/login" className="text-blue-700">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Register;
