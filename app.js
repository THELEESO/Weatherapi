const express = require("express");
const app = express();
const ejs = require("ejs");
const https = require("https");
const { json } = require("express");
const fetch = require("node-fetch");

// api key
const myKey = "";

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
// .then
// app.get("/:city", (req, res) => {
//   let { city } = req.params;
//   let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}`;
//   fetch(url)
//     .then((d) => d.json())
//     .then((dJson) => {
//       let { temp } = dJson.main;
//       let newTemp = ktoC(temp);
//       res.render("weather.ejs", { dJson, newTemp });
//     });
// });
// async
app.get("/:city", async (req, res) => {
  let { city } = req.params;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}`;
  let data = await fetch(url);
  let dJson = await data.json();
  let { temp } = dJson.main;
  let newTemp = ktoC(temp);
  res.render("weather.ejs", { dJson, newTemp });
});

app.listen(3000, () => {
  console.log("Server is running on Port 3000 now!!");
});
