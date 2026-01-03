function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
  // .toFixed() returns string, so ' * 1' is a trick to convert to number
  }

let coordinates = [];

for (let i = 0; i < 3; i++){
  let lat = getRandomInRange(30, 35, 3);
  let long = getRandomInRange(-90, -100, 3);
  coordinates.push({lat, long});
}

async function initMap(){

  var map = L.map('map').setView([33, -95], 5);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  const latLngs = [];
  const infoDiv = document.getElementById('marker');
  infoDiv.innerHTML = ""; // clear div


  for (let i = 0; i < coordinates.length; i++) {
    const coord = coordinates[i];

    L.marker([coord.lat, coord.long]).addTo(map);
    latLngs.push([coord.lat, coord.long]);

    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coord.lat}&longitude=${coord.long}&localityLanguage=en`)
    .then(res => res.json())
    .then(data => {
      const locality = data.locality;
      infoDiv.innerHTML += `<p><strong>Marker ${i + 1}: Latitude: ${coord.lat}, Longitude: ${coord.long}</strong><br>Locality: ${locality}</p>`;
    });
  
  }


map.fitBounds(latLngs);
}


initMap();
