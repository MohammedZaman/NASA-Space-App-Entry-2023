var long
var lat

document.addEventListener("DOMContentLoaded", function () {
    initGeolocation()
    mapboxgl.accessToken = 'pk.eyJ1IjoibW9oYW1tZWR6YW1hbiIsImEiOiJjbG5nbjJjYXIwdWF1Mm1ybGZ4aTB3OW5oIn0.S0FeiTca-v5oQWuWvhRT4g';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mohammedzaman/clngnk2ry040001qx1sie0uvb/draft',
        center: getlocation(),
        zoom: 4
    });
});



function getlocation() {
    if (long != null && lat != null) {
        // Using user location 
        return new Array(long, lat);
    } else {
        // United Kingdom long and lat
        return new Array(-3.767490, 53.711949); // [lng, lat]
    }

}


function initGeolocation() {
    if (navigator.geolocation) {
        // Call getCurrentPosition with success and failure callbacks
        navigator.geolocation.getCurrentPosition(success, fail);

    } else {
        alert("Sorry, your browser does not support geolocation services.");
    }
}

function success(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);

    long = position.coords.longitude;
    lat = position.coords.latitude;

    document.getElementById('long').innerHTML = "Longitude: " + long;
    document.getElementById('lat').innerHTML = "Latitude:" + lat

}

function fail() {
    alert("Unable to get your location. The default location is the UK")
}