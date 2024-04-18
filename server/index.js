// Package require
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

// Start app
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_todolist",
});

app.get("/todolist", (req, res) => {
  db.query("SELECT * FROM tb_task", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/create", (req, res) => {
  // Created variable receive value
  const title = req.body.title;
  const detail = req.body.detail;
  const date = req.body.date;
  const time = req.body.time;

  db.query(
    "INSERT INTO tb_task(title,detail,date,time)VALUES(?,?,?,?)",
    [title, detail, date, time],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/update", (req, res) => {
  const newTime = req.body.newTime;
  const id = req.body.id;
  db.query(
    "UPDATE tb_task SET time = '?' WHERE id = '?'",
    [newTime, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM tb_task WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(4000, () => {
  console.log("Server is running");
});
