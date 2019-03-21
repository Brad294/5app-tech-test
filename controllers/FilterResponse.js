function filterPayload(paylaod) {
  let result = paylaod.filter(item => {
    return item.count >= 1;
  });
  return result;
}

function selectThumbnailUrl(payload) {
  let logoSize;
  payload.forEach((item, payloadIdex) => {
    item.logos.forEach(logo => {
      // Need to convert to some number value to be able to compare sizes in any nice way.
      logoSize = convertToNumber(logo.size);
      //Check to see if file size is between number range 16x6 and 64x64
      if (logoSize > 1616 && logoSize <= 6464) {
        newArray = [logo.url];
        payload[payloadIdex].thumbnail = newArray;
        delete payload[payloadIdex].logos ;
      } else {
        //if not in range dont sendback anything we did'nt ask for out of range.
        payload[payloadIdex].thumbnail = [];
      }
    });
  });
  console.log(payload)
  return payload;
}

function convertToNumber(size) {
  const result = size.replace("x", "");
  return result;
}

module.exports = {
  filterPayload: filterPayload,
  selectThumbnailUrl: selectThumbnailUrl,
  convertToNumber: convertToNumber
};
