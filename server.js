//basic version
//prints received webhooks to console, webhooks must be send to http://44.201.151.195:3000/hook
const express = require("express"); // backend framework for our node server.
const bodyParser = require("body-parser")
const app = express()
const PORT = 3000
// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json())
// Start express on the defined port
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
app.use(bodyParser.json())
//let output = new File("", "output.txt"
app.post("/hook", (req, res) => {
  console.log(req.body) // Call your action on the request here
  res.status(200).end() 
})