const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, process.env.IP, function() {
  console.log(`The App server has started on port ${port}`);
});
