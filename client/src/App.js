import Axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [tasklist, settasklist] = useState([]);
  const [title, settitle] = useState("");
  const [detail, setdetail] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [newtime, setnewtime] = useState("");

  //* READ
  const getTask = () => {
    Axios.get("http://localhost:4000/todolist").then((response) => {
      settasklist(response.data);
    });
  };

  //* CREATE
  const addTask = () => {
    Axios.post("http://localhost:4000/create", {
      title: title,
      detail: detail,
      date: date,
      time: time,
    }).then(() => {
      settasklist([
        ...tasklist,
        {
          title: title,
          detail: detail,
          date: date,
          time: time,
        },
      ]);
    });
  };

  //* UPDATE
  const updateTaskTime = (id) => {
    Axios.put("http://localhost:4000/update", { time: newtime, id: id }).then(
      (response) => {
        settasklist(
          tasklist.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  title: val.title,
                  detail: val.detail,
                  date: val.date,
                  time: newtime,
                }
              : val;
          })
        );
      }
    );
  };

//* DELETE                                
  const deleteTask = (id) => {
    Axios.delete(`http://localhost:4000/delete/${id}`).then((response) => {
      settasklist(
        tasklist.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="App container">
     
      <h1>TODO list</h1>
      <image src="./images/logo.png" />
      <div className="taskDetail">
        <form action="">
          <div className="mb-3">
            <label htmlFor="taskTitle" className="form-label">
              Task Title:
            </label>
            <input
              type="text"
              className="form-control"
              id="taskTitle"
              placeholder="Enter task"
              onChange={(event) => {
                settitle(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="taskDetail" className="form-label">
              Task Detail:
            </label>
            <input
              type="text"
              className="form-control"
              id="taskTitle"
              placeholder="Enter detail"
              onChange={(event) => {
                setdetail(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="taskDate" className="form-label">
              Task Date:
            </label>
            <input
              type="date"
              className="form-control"
              id="taskTitle"
              placeholder="Enter date"
              onChange={(event) => {
                setdate(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="taskTime" className="form-label">
              Task Time:
            </label>
            <input
              type="time"
              className="form-control"
              id="taskTitle"
              placeholder="Enter time"
              onChange={(event) => {
                settime(event.target.value);
              }}
            />
          </div>
          <button className="btn btn-success" onClick={addTask}>
            Add Task
          </button>
        </form>
      </div>
      <hr />
      <div className="todoList">
        <button className="btn btn-primary mb-3" onClick={getTask}>
          Show Task
        </button>
        {tasklist.map((val, key) => {
          return (
            <div className="task card mb-3">
              <div className="card-body text-left">
                <p className="card-text">Titile: {val.title}</p>
                <p className="card-text">Detail: {val.detail}</p>
                <p className="card-text">Date: {val.date}</p>
                <p className="card-text">Time: {val.time}</p>
                <div className="d-flex">
                  <input
                    type="time"
                    className="form-control"
                    placeholder="..."
                    id="input-update"
                    onChange={(event) => {
                      setnewtime(event.target.value);
                    }}
                  />
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      updateTaskTime(val.id);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => {
                      deleteTask(val.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
