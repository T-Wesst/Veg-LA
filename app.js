const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
// set template
app.set("view engine", "ejs");

// GET landing page
app.get("/", (req, res) => res.render("landing"));
// GET all posts
app.get("/blogposts", (req, res) => {
  // Arr of Data
  let blogposts = [
    {
      name: "some place",
      image:
        "https://usateatsiptrip.files.wordpress.com/2018/05/30899974_1944977615573365_7140452609285947392_n.jpg?w=1000&h=600&crop=1"
    },
    {
      name: "some place1",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlxEiTdKvUYhcQ1sa-uairi-rNjSVoUh255kxcuFp-_rFAvbyq"
    },
    {
      name: "some place2",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW7Ai31u9cpZwL-dt2pou_3xkMNKnGnfhKu6KMDmkFbdiN-qyO"
    }
  ];
  // renders views/blogposts.ejs {name:dataPassedIn}
  res.render("blogposts", { blogposts: blogposts });
});

// PORT
app.listen(port, process.env.IP, () =>
  console.log(`The server is running on port ${port}`)
);
