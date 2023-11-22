require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const notFoundMiddleware = require("./middlewears/not-found");
const errorMiddleware = require("./middlewears/error");
const rateLimitMiddleware = require("./middlewears/rate.limit");
const authRoute = require("./routes/auth-route");
const blogRoute = require("./routes/blog-route");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(rateLimitMiddleware);
app.use(express.json()); // แปลง json ให้เป็น obj

app.use("/auth", authRoute); //ถ้าเจอ / auth ให้ไปที่ authRoute
app.use("/blogs", blogRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || "5000";
app.listen(PORT, () => console.log(`sever running on port : ${PORT}`));
