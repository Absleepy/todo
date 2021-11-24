import React, { useState } from "react";

import DB from "../config/firebase";
import firebase from "firebase";

function TodoList(props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isEditableMood, setIsEditableMood] = useState(false);
  // delete from firebase
  const deleteTodo = () => {
    DB.collection("todos").doc(props.todo.id).delete();
  };

  // update todo from firebase
  const updateTodo = () => {
    DB.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
        time: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    setIsEditableMood(false);
  };
  const handleEdit = () => {
    setIsEditableMood(true);
    setInput(props.todo.todo);
  };
  return (
    <div>
      <div className="border-t flex justify-between items-center my-2 shadow p-2">
        <div className="w-9/12">
          {isEditableMood ? (
            <input
              className="p-3 border-2 w-full"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              autoFocus
            />
          ) : (
            props.todo.todo
          )}
        </div>

        <div>
          <button onClick={isEditableMood ? updateTodo : handleEdit}>
            <span>{isEditableMood ? "Update" : "Edit"}</span>
          </button>
          <span className="space"></span>
          <button onClick={deleteTodo}>
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
