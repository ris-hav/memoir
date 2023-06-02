import React, { useState,useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useGlobalContext } from './context';

const getLocalStorage1 = () => {
  let check = localStorage.getItem("check");
  if (check) {
    return JSON.parse(localStorage.getItem("check"));
  } else {
    return [];
  }
};


const List = ({ items, removeItem, handleEdit }) => {
  const { checkedItems, setCheckedItems } = useGlobalContext();

  // add itemId if not there in checkedItems array,
  // if there ,remove the itemId from the array
  const handleCheckboxChange = (itemId) => {
    if (checkedItems.includes(itemId)) {
      setCheckedItems(checkedItems.filter((id) => id !== itemId));
    } else {
      setCheckedItems([...checkedItems, itemId]);
    }
  };

  useEffect(() => {
    localStorage.setItem("check", JSON.stringify(checkedItems));
  }, [checkedItems]);

  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, title } = item;
        const isChecked = checkedItems.includes(id);
        const titleClassName = isChecked ? "title strikethrough" : "title";

        return (
          <article key={id} className="grocery-item">
            <div className="first">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleCheckboxChange(id)}
              />
              <p className={titleClassName}>{title}</p>
            </div>
            <div className="btn-container">
              <button
                onClick={() => handleEdit(id, title)}
                type="button"
                className="edit-btn"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => removeItem(id, title)}
                type="button"
                className="delete-btn"
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
