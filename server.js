import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import authRoute from "./routes/authRoute.js";
import get_user from "./routes/get_user.js"

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/auth_user")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(
  session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/auth_user"
    }),
    cookie: {
      maxAge: 1000 * 60 * 60
    }
  })
);

app.use("/auth", authRoute);
app.use("/list", get_user);

app.listen(3000, () => {
  console.log("Started the server");
});