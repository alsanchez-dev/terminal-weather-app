const request = require('request');

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);

request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=XygnqItW2mTFeqiDxtqGlRVvLTMAUJ1S&location=${encodedAddress}`,
    json: true
    }, (error, response, body)=>{
debugger;
    if(error){
    callback('Unable to connect to the server.');
    };
    callback(undefined, {

       address: body.results[0].locations[0].latLng,
       latitude: body.results[0].locations[0].latLng.lat,
       longitude: body.results[0].locations[0].latLng.lng
});


    });
};

module.exports.geocodeAddress = geocodeAddress;
