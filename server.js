const app = require("./app.js");
require('dotenv').config()
const port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})