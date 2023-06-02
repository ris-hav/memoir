import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
import { useGlobalContext } from "./context";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    msg: "",
    dur: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "Please enter Value", "");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { id: editID, title: name };
          } else {
            return item;
          }
        })
      );
      showAlert(true, "success", "item value changed", "long");
      setName("");
      setIsEditing(false);
      setEditID(null);
      // setCount((count) => (count += 1));
      // const newItem = { id: count, title: name };
      // setList([...list, newItem]);
    } else {
      showAlert(true, "success", "item added to the list", "");
      setCount((count) => (count += 1));
      const newItem = { id: count, title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show, type, msg, dur) => {
    setAlert({ show: show, type: type, msg: msg, dur: dur });
  };
  const { setCheckedItems } = useGlobalContext();
  const clearList = () => {
    showAlert(true, "danger", "empty list", "");
    setList([]);
    setCheckedItems([]);
    setCount(0);
  };

  const removeItem = (id, title) => {
    showAlert(true, "danger", `item removed - ${title}`, "long");
    setList(list.filter((item) => item.id !== id));
  };

  const handleEdit = (id, title) => {
    setIsEditing(true);
    setName(title);
    setEditID(id);
    // setList(list.filter((item) => item.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <h3>Mindful Memoir</h3>
        <div className=" form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.
g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} handleEdit={handleEdit} />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
