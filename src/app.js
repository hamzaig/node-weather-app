const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forcast = require("./utils/forcast");
const port = process.env.PORT || 3000;


const publicDirectoryPath = path.join(__dirname, "../src/public");
const viewDirectory = path.join(__dirname, "../templates/views");
const partialsDirectory = path.join(__dirname, "../templates/partials")

app.set("view engine", "hbs");
app.set("views", viewDirectory);

hbs.registerPartials(partialsDirectory);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "hamzaig",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "hamzaig",
  })
})

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some help Text.",
    title: "Help",
    name: "hamzaig",
  })
})

app.get("/weather", (req, res) => {

  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forcast(latitude, longitude, (error, forcastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forcast: forcastData.main.temp - 273,
        location,
        address: req.query.address,
      })
    })
  })



})

app.get("/help/*", (req, res) => {
  res.render("404page", {
    message: "Help article not found",
    title: "404",
    name: "hamzaig"
  });
})

app.get("*", (req, res) => {
  res.render("404page", {
    message: "Page not found",
    title: "404",
    name: "hamzaig"
  });
})

app.listen(port, () => {
  console.log("server is up on port 3000");
});