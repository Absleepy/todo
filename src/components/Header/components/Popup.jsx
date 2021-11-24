import React from "react";
const Popup = ({ text, handleClick }) => {
  return (
    <div
      style={{ top: "100%" }}
      className="absolute max-w-xs flex p-3 w-full shadow-xl border-2"
    >
      <button
        onClick={handleClick}
        className="w-full mx-1 block hover:bg-blue-800 bg-blue-900 p-1 rounded-sm text-white"
        type="submit"
      >
        {text}
      </button>
    </div>
  );
};

export default Popup;
