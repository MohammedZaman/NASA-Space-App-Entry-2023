var long
var lat

document.addEventListener("DOMContentLoaded", function () {
    initGeolocation()
    mapboxgl.accessToken = 'pk.eyJ1IjoibW9oYW1tZWR6YW1hbiIsImEiOiJjbG5nbjJjYXIwdWF1Mm1ybGZ4aTB3OW5oIn0.S0FeiTca-v5oQWuWvhRT4g';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mohammedzaman/clngnk2ry040001qx1sie0uvb/draft',
        center: getlocation(),
        zoom: 5
    });
    map.addControl(new mapboxgl.FullscreenControl());


    map.on('load', () => {
        const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });



        var data = new Array('temp', 'chlor')

        map.on('mouseenter', data, (e) => {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.temp;
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            popup.setLngLat(coordinates).setHTML(description).addTo(map);
        });

        map.on('mouseleave', data, () => {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });
    });



    function toggleLayer(buttonId, clickedLayer) {
        const button = document.getElementById(buttonId);
        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            button.textContent = "Turn On";
        } else {
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
            button.textContent = "Turn Off";
        }
    }

    document.getElementById('showMBtn').addEventListener('click', () => {
        toggleLayer('showMBtn', 'marine-conservation-zones');
    });

    document.getElementById('tempBtn').addEventListener('click', () => {
        toggleLayer('tempBtn', 'temp');
    });
    
    
     document.getElementById('chlorBtn').addEventListener('click', () => {
        toggleLayer('chlorBtn', 'chlor');
    });








    const locations = [
        {
            id: 'bristolBtn',
            center: [-4.185502, 51.365625],
            zoom: 7
  },
        {
            id: 'engChBtn',
            center: [-1.481723, 50.120729],
            zoom: 7
  },
        {
            id: 'irishBtn',
            center: [-4.949417, 53.436333],
            zoom: 7
  },
        {
            id: 'northBtn',
            center: [1.508330, 56.385996],
            zoom: 7,
            callback: () => {
                loadTextFromURL("species_data/northsea.html");
            }
  },
        {
            id: 'northABtn',
            center: [-13.914583, 54.436156],
            zoom: 7
  },
        {
            id: 'innerSBtn',
            center: [-6.798590, 57.082126],
            zoom: 7
  },
        {
            id: 'ukBtn',
            center: [-3.767490, 53.711949],
            zoom: 5
  },    {
            id: 'celticBtn',
            center: [50.085675,-8.664765],
            zoom: 5
  }
];

    locations.forEach(location => {
        const {
            id,
            center,
            zoom,
            callback
        } = location;
        document.getElementById(id).addEventListener('click', () => {
            map.flyTo({
                center,
                essential: true,
                zoom
            });
            if (callback) {
                callback();
            }
        });
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


function loadTextFromURL(url) {
    fetch(url)
        .then(response => response.text())
        .then(text => {
            var divElement = document.getElementById("info");
            divElement.innerHTML = `<pre>${text}</pre>`;
        })
        .catch(error => console.log(error));
}
