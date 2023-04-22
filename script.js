'use strict';

async function getCurrentAdress() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude, longitude } = position.coords;

      const response = await fetch(
        `https://www.mapquestapi.com/geocoding/v1/reverse?key=7NUljeotQj6pdb8DXIKuyN62EXTbmAHi&location=${latitude},${longitude}&includeRoadMetadata=true&includeNearestIntersection=true`
      );
      const jsonData = await response.json();
      console.log(jsonData.results[0].locations);
    });
  }
}

// getCurrentAdress();

var HomeIcon = L.icon({
  iconUrl: 'Images/homeIcon.png',

  iconSize: [50, 50], // size of the icon
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

var WarehouseIcon = L.icon({
  iconUrl: 'Images/Warehouse_marker.png',

  iconSize: [38, 40], // size of the icon// point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

let map = L.map('map').setView([23.1870706, 72.6268105], 15);

L.marker([23.1870706, 72.6268105], { icon: HomeIcon }).addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> <a target="_blank" href="https://icons8.com/icon/65839/home-address">Home Address</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> contributors',
}).addTo(map);

let locations = [
  {
    id: 1,
    lat: 23.185675,
    long: 72.629526,
    title: 'Warehouse 1',
    src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    url: 'https://www.google.co.in/ ',
  },
  {
    id: 2,
    lat: 23.196996,
    long: 72.631386,
    title: 'title2',
    src: 'https://images.unsplash.com/photo-1627309366653-2dedc084cdf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1966&q=80',
    url: 'https://www.google.co.in/ ',
  },
  {
    id: 3,
    lat: 23.185158,
    long: 72.62724,
    title: 'title3',
    src: 'https://images.unsplash.com/photo-1557761469-f29c6e201784?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=849&q=80',
    url: 'https://www.google.co.in/ ',
  },
  {
    id: 4,
    lat: 23.184634,
    long: 72.628892,
    title: 'title4',
    src: 'https://images.unsplash.com/photo-1599452390941-251da594d7e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    url: 'https://www.google.co.in/ ',
  },
];

let popupOption = {
  closeButton: false,
};

locations.forEach(location => {
  new L.marker([location.lat, location.long], { icon: WarehouseIcon })
    .addTo(map)
    .on('click', function () {
      let marker = this;
      // const popupEl = document.querySelectorAll('.popup');

      // popupEl.forEach(Element => {
      //   Element.classList.add('hidden');
      // });

      // if (event.target._popup) {
      //   console.log(event.target._popup);
      //   console.log(
      //     (event.target._popup._contentNode.parentNode.parentNode.style.opacity = 1)
      //   );
      // }

      marker.bindPopup(
        `
          <div class="card">
            <img class="popup-img" src="${location.src}" />{' '}
            <h3>${location.title}</h3>
          </div>
          `,
        {
          maxWidth: 300,
          minWidth: 250,
          maxHeight: 160,
          autoPan: true,
          closeButton: true,
          autoPanPadding: [5, 5],
        }
      );

      marker.openPopup();
    });
});

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '8048530456mshd702a7e93d8d947p133668jsn0dcdbe319bbd',
    'X-RapidAPI-Host': 'trueway-matrix.p.rapidapi.com',
  },
};

fetch(
  'https://trueway-matrix.p.rapidapi.com/CalculateDrivingMatrix?origins=23.1870706%2C%2072.6268105&destinations=23.185675%2C72.629526',
  options
)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
