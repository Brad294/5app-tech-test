let express = require("express");
let bodyParser = require("body-parser");
let filterController = require("./controllers/FilterResponse");

const app = express();
app.use(bodyParser.json());

app.get("/",(req,res)=>{
  res.status(200).json({
    message:"send get request to /response"
  })
})

app.get("/response", (req, res) => {
  let payload = filterController.filterPayload(req.body["payload"]);
  payload = filterController.selectThumbnailUrl(payload);
  res.status(200).json({
    response: payload
  });
});

module.exports = app;
