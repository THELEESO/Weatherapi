const express = require("express");
const app = express();
const ejs = require("ejs");
const https = require("https");
const { json } = require("express");

// api key
const myKey = "c3ad7ea06f15275931cdc23a18a83767";

// K to cel
function ktoC(k) {
  return (k - 273.15).toFixed(2);
}

// middleware
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/:city", (req, res) => {
  let { city } = req.params;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}`;

  // get request made by node.js
  https
    .get(url, (response) => {
      console.log("statusCode:", response.statusCode);
      console.log("headers:", response.headers);
      response.on("data", (d) => {
        let dJson = JSON.parse(d); //sync function 不用 async
        let { temp } = dJson.main;
        let newTemp = ktoC(temp);
        res.render("weather.ejs", { dJson, newTemp });
      });
    })
    .on("error", (e) => {
      console.log(e);
    });
});

app.listen(3000, () => {
  console.log("Server is running on Port 3000 now!!");
});
