
const yargs = require('yargs');
const axios = require('axios');


const argv = yargs
.options({
a: {
    demand: true,
    alias: 'address',
    describe: 'Address to fetch weather for',
    string: true
}
})
.help()
.alias('help', 'h')
.argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=XygnqItW2mTFeqiDxtqGlRVvLTMAUJ1S&location=${encodedAddress}`

axios.get(geocodeUrl).then((response)=>{
debugger;
    var lat = response.data.results[0].locations[0].latLng.lat;
    var lng = response.data.results[0].locations[0].latLng.lng;
    var weatherUrl = `https://api.darksky.net/forecast/b40e72e17c61833f1b25ef6ec5ae3d25/${lat},${lng}`;
    console.log(JSON.stringify(response.data.results[0].locations[0], undefined, 2));
    return axios.get(weatherUrl);
}).then((response)=>{
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`)
}).catch((e)=>{
    if(e.code === 'ENOTFOUND'){
        console.log('Unable to connect to API servers.');
    }

});
