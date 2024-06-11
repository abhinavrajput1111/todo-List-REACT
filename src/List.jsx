import React, { useState, useEffect } from "react";

function List() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);


  useEffect(() => {
    const storedData = localStorage.getItem("Grocery");
  
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("Grocery", JSON.stringify(data));
  }, [data]);

  function handleSubmit(e) {
    e.preventDefault();
    const newData = [...data, { text: inputValue, completed: false }];
    setData(newData);
    setInputValue("");
  }

  function handleDelete(index) {
    const newData = data.filter((_, idx) => idx !== index);
    setData(newData);
  }

  function handleComplete(index) {
    const newData = data.map((item, idx) => {
      if (idx === index) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setData(newData);
  }

  return (
    <div className="container w-full h-screen bg-slate-100">
      <div className="box_wrapper h-[50vh] w-full flex justify-center items-center">
        <div className="wrapper bg-white w-[60%] h-[30vh]">
          <h1 className="text-center text-3xl p-5">Grocery Bud</h1>
          <div className="flex w-full justify-center items-center">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Type input"
                className="w-[60%] border py-2 rounded-md px-5"
                value={inputValue}
                onChange={(e) => setInputValue(e.currentTarget.value)}
              />
              <button
                type="submit"
                className="bg-green-500 px-5 text-white rounded-md py-2 hover:bg-green-700 hover:font-semibold"
              >
                Add to List
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="output">
        {data.map((item, index) => (
          <div className="flex justify-evenly items-center my-2" key={index}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleComplete(index)}
            />
            <p
              className="text-lg"
              style={item.completed ? { textDecoration: "line-through" } : {}}
            >
              {item.text}
            </p>
            <button
              className="bg-red-500 hover:bg-red-700 px-2 py-1 rounded-lg text-white"
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>  
  );
}

export default List;
