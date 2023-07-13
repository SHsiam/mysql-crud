const express = require('express')
const app = express()
const mysql=require('mysql')
const cors=require('cors')

app.use(cors())
app.use(express.json());

const db=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"crud"
})


 

app.get('/', (req, res) => {
  const sql="SELECT * FROM users";
  db.query(sql,(error,data)=>{
    if (error){
        return res.json(error);
    }
    return res.json(data);
  })
})

app.post('/create', (req, res) => {
    const sql="INSERT INTO users (`name`,`email`,`phone`) VALUES (?)";
    const values=[
        req.body.name,
        req.body.email,
        req.body.phone,
    ]
    db.query(sql,[values],(error,data)=>{
      if (error){
          return res.json(error);
      }
      return res.json(data);
    })
  })

  app.put('/update/:id', (req, res) => {
    const sql="UPDATE users set `name`=?, `email`=?, `phone`=? WHERE id = ?";
    const id=req.params.id;
    const values=[
        req.body.name,
        req.body.email,
        req.body.phone,
    ]
    db.query(sql,[...values,id],(error,data)=>{
      if (error){
          return res.json(error);
      }
      return res.json("updated");
    })
  })

  app.delete('/delete/:id', (req, res) => {
    const sql="DELETE FROM users WHERE id = ?";
    const id=req.params.id;
    db.query(sql,[id],(error,data)=>{
      if (error){
          return res.json(error);
      }
      return res.json("deleted");
    })
  })

app.listen(8081, () => {
  console.log(`Example app listening...`)
})
