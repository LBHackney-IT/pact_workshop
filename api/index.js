const express = require("express");
const connectDb = require("./database/connection");
const routes = require("./routes/routes");
const PORT = 3001;
const HOST = process.env.HOST || "localhost";

const app = express();

app.get('/', (req, res) => {
  res.send('App is running')
})

connectDb().then(() => {
  console.log("MongoDb connected");
});

app.use(express.json());
app.use("/api", routes);


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);