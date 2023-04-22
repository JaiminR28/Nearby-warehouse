'use strict';

let latitude, longitude;

let map = L.map('map').setView([23.1870706, 72.6268105], 15);

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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
  console.log(location.src);
  new L.marker([location.lat, location.long]).addTo(map).on('click', event => {
    for (let i = 0; i < locations.length; i++) {
      console.log(locations[i]);
    }

    event.target
      .bindPopup(
        L.popup({
          maxWidth: 300,
          minWidth: 300,
          autoClose: false,
          closeOnClick: false,
          className: `popup`,
        })
      )
      .setPopupContent(
        `<div class="card"><img class="popup-img" src="${location.src}" /> <h3>${location.title}</h3></div>`
      )
      .openPopup();
  });
});
