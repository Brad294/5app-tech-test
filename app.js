let express = require("express");
let bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get("/response", (req, res) => {
  let payload = filterPayload(req.body["payload"]);
  payload = selectThumbnailUrl(payload);
  console.log(payload)
  res.status(200).json({
    response: payload
  });
});

function filterPayload(paylaod) {
  result = paylaod.filter(item => {
    return item.count >= 1;
  });
  return result;
}

function selectThumbnailUrl(payload) {
   let logoSize;
        payload.forEach((item,payloadIdex,array)=>{
            item.logos.forEach((logo,index,array)=>{
                // Need to convert to some number value to be able to compare sizes in any sane way.
              logoSize = convertToNumber(logo.size);
              //Check to see if file size is between number range 16x6 and 64x64
              if(logoSize> 1616 && logoSize <=6464){
                    newArray = [logo];
                    payload[payloadIdex].logos = newArray;
              }else{
                  //if not in range dont sendback anything we did'nt ask for out of range.
                payload[payloadIdex].logos =[];
              }
            })
        })
        return payload
    
}

function convertToNumber(size){
    const result = size.replace("x","")
    return result;
}

module.exports = app;
