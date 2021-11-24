import React from "react";

const Form = ({ btnText, onSubmit, loading, values, handleChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          className="p-3 border-2"
          type="text"
          id="email"
          name="email"
          onChange={handleChange}
          value={values.email}
        />
      </div>

      <div className="flex flex-col mt-3">
        <label htmlFor="password">Password</label>
        <input
          className="p-3 border-2"
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={values.password}
        />
      </div>
      <button
        disabled={loading}
        className={`w-40 mt-3 mx-auto block bg-blue-${
          loading ? "500" : "900"
        } p-3 rounded-sm text-white cursor-${loading ? "wait" : "pointer"}`}
        type="submit"
      >
        {btnText}
      </button>
    </form>
  );
};

export default Form;
