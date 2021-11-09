var express = require("express");
var app = express();
const mongoose = require("mongoose");
var userRoutes = require("./Route/users.route");
var cors = require("cors");
var dotenv = require("dotenv");
dotenv.config();

app.use(
  express.json({
    inflate: true,
    limit: "100kb",
    reviver: null,
    type: "application/json",
    verify: undefined,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use("/users", userRoutes);
console.log(process.env.mongodb_password)
//connect to mongodb
mongoose.Promise = global.Promise;
try {
  const uri =
  `mongodb+srv://Honorableisrael:${process.env.mongodb_password}@clusterhilary-vscri.mongodb.net/Toptutors?retryWrites=true&w=majority`;
  mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  }) - mongoose.set("useFindAndModify", false);
  let db = mongoose.connection;
  db.once("open", () => console.log("db is initailized"));
  db.on("err", () => console.log(err));
} catch (error) {
  console.log(error);
}

const port = process.env.PORT || 8080;
app.use(cors());
app.listen(port, () => {
  console.log("server is running on port" + port);
});
