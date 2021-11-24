import React, { useState, useEffect } from "react";
import { CgPlayListAdd } from "react-icons/cg";
import TodoList from "./TodoList";
import DB from "../config/firebase";
import firebase from "firebase";

function Todo({ userId }) {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  // fetch data from firebase
  useEffect(() => {
    console.log("here", userId);
    DB.collection("todos")
      .where("userId", "==", userId)
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs.map((doc) => doc.data().todo));
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
            date: doc.data().date,
          }))
        );
      });
  }, [userId]);

  //input todo
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // date
  const toDate = () => {
    let date = new Date();
    const today = date.toDateString();
    return today;
  };

  const addTodos = (e) => {
    if (!input) {
      e.preventDefault();
      alert("please type something to add");
    } else {
      e.preventDefault();
      DB.collection("todos")
        .add({
          todo: input,
          time: firebase.firestore.FieldValue.serverTimestamp(),
          date: toDate(),
          userId,
        })
        .then(function (docRef) {
          setTodos([
            ...todos,
            {
              todo: input,
              time: firebase.firestore.FieldValue.serverTimestamp(),
              date: toDate(),
              userId,
              id: docRef.id,
            },
          ]);
          setInput("");
        });
    }
  };
  const handleChangeTodo = (e, index) => {
    todos[index] = { ...todos[index], todo: e.target.value };
  };

  return (
    <div>
      <div
        className="shadow p-3 bg-green-100 p-3 mt-4 mx-auto"
        style={{ maxWidth: "600px" }}
      >
        <h1 className="my-4">Todo App</h1>

        <form>
          <div className="flex">
            <input
              className="p-1 border-2 w-full"
              value={input}
              onChange={handleChange}
              type="text"
            />
            <button
              className="bg-blue-900 p-3 px-5  rounded-sm text-white"
              onClick={addTodos}
              type="submit"
              disabled={!input}
            >
              {" "}
              Add
            </button>
          </div>
        </form>

        <ul className="todo-list">
          {todos.map((todo, idx) => (
            <TodoList
              handleChange={(e) => handleChangeTodo(e, idx)}
              key={todo.id}
              todo={todo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
