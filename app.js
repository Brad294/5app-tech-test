let express = require("express");
let bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get("/response", (req, res) => {
  let payload = filterPayload(req.body["payload"]);
  payload = selectThumbnailUrl(payload);
//   console.log(payload)
  res.status(200).json({
    response: [1, 2, 3, 4]
  });
});

function filterPayload(paylaod) {
  result = paylaod.filter(item => {
    return item.count >= 1;
  });
  return result;
}

function selectThumbnailUrl(payload) {
    console.log(payload);
   const arrayOfSizes = [];
   let logoSize;
        payload.forEach(item=>{
            item.logos.forEach(logo=>{
              logoSize = convertToNumber(logo.size);
              if(logoSize> 1616 && logoSize <=6464){
                    newArray = [logo];
                    logo = newArray;
              }
            })
        })
        console.log(payload);
        return payload
    
}

function convertToNumber(size){
    const result = size.replace("x","")
    return result;
}

module.exports = app;
