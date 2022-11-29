const express = require("express")
const app = express()
const db = require("./db")
const firestore = db.database.firestore()

const collection = "users"

app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("login")
})

app.post("/", async (req, res) => {
  const data = {
    username: req.body.username,
    password: req.body.password
  }

  let checkUser = await firestore.collection(collection).where(
    "username",
    "==",
    data.username
  ).get()

  if(checkUser.empty){
    return res.render("error", {
      message: "user not found",
      link: "<a href'/'>go back to login</a>"
    })
  }

  let user = {}
  checkUser.forEach(doc => {
    const x = {
      username: doc.data().username,
      password: doc.data().password
    }
    user = x
  })

  if(data.password != user.password){
    return res.render("error", {
      message: "password is not correct",
      link: "<a href='/'>go back to login</a>"
    })
  }

  return res.render("welcome", {
    username: data.username
  })
})

app.get("/register", (req, res) =>{
    res.render("register")
})

app.post("/register", async (req, res) =>{
  let checkUser = await firestore.collection(collection).where(
    "username",
    "==",
    req.body.username
  ).get()

  if(!checkUser.empty){
    return res.render("error", {
        message: "user alredy exist",
        link: "<a href='/register'>go back to register</a>"
    })
  }

    const data = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
   } 

   await firestore.collection(collection).doc().set(data)
   return res.render("success", {
    message: "register success",
    link: "<a href='/'>go to login</a>"

   })
})
app.listen(3000, () => console.log("app is running at http://localhost:3000"))

