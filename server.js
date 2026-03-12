import express from "express";
import session from "express-session";
import connectSessionSequelize from "connect-session-sequelize";
import sequelize from "./config/database.js";
import authRoutes from "./routes/authRoute.js";
import getUser from "./routes/getUser.js";
import dotenv from "dotenv";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const SequelizeStore = connectSessionSequelize(session.Store);

const sessionStore = new SequelizeStore({
  db: sequelize,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24,
    },
  })
);

sessionStore.sync();

app.use("/auth", authRoutes);
app.use("/list", getUser)

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({alter:true});

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

start();