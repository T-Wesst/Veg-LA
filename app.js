const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
// set template
app.set("view engine", "ejs");
// root path
app.get("/", function(req, res) {
  res.send("this will be the landing page soon");
});

app.listen(port, process.env.IP, () =>
  console.log(`The App server has started on port ${port}`)
);
