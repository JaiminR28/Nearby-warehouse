'use strict';

const clearbtn = document.querySelector('.clear-btn');
const containerEl = document.querySelector('.container');
const addressEL = document.querySelector('.address');
const warehouselocationsEl = document.querySelector('.Warehouse--locations');
const areaLocationText = document.querySelector('.area--location-text');

async function getCurrentAdress() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude, longitude } = position.coords;

      const response = await fetch(
        `https://www.mapquestapi.com/geocoding/v1/reverse?key=7NUljeotQj6pdb8DXIKuyN62EXTbmAHi&location=${latitude},${longitude}&includeRoadMetadata=true&includeNearestIntersection=true`
      );
      const jsonData = await response.json();
      const location = jsonData.results[0].locations[0];
      const addressText = `${location.adminArea6}, ${location.adminArea5}, ${location.adminArea3} ${location.adminArea1}`;

      addressEL.innerHTML = addressText;
      areaLocationText.innerHTML = `${location.adminArea6}, ${location.adminArea5}`;
    });
  }
}

// getCurrentAdress();

let HomeIcon = L.icon({
  iconUrl: 'Images/homeIcon.png',
  iconSize: [50, 50], // size of the icon
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
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
    title: '5-Star Thing Storage',
    src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    url: 'https://www.google.co.in/ ',

    rating: 3,
  },
  {
    id: 2,
    lat: 23.196996,
    long: 72.631386,
    title: 'hamofy',
    src: 'https://images.unsplash.com/photo-1627309366653-2dedc084cdf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1966&q=80',
    url: 'https://www.google.co.in/ ',

    rating: 5,
  },
  {
    id: 3,
    lat: 23.185158,
    long: 72.62724,
    title: 'Anetly',
    src: 'https://images.unsplash.com/photo-1557761469-f29c6e201784?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=849&q=80',
    url: 'https://www.google.co.in/ ',

    rating: 4,
  },
  {
    id: 4,
    lat: 23.184634,
    long: 72.628892,
    title: 'Upright Storage Locker Co',
    src: 'https://images.unsplash.com/photo-1599452390941-251da594d7e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    url: 'https://www.google.co.in/ ',
    rating: 3,
  },
];

let popupOption = {
  closeButton: false,
};

locations.forEach(location => {
  new L.marker([location.lat, location.long], {
    icon: new L.DivIcon({
      className: 'my-div-icon',
      html: `<button class="pin--location"><p>${location.title}</p></button>`,
    }),
  })
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
        `      <div class="card">
        <div class="card_image">
          <img src=${location.src} alt="mixed vegetable salad in a mason jar." />
        </div>
        <div class="card_content">
          <h2 class="card_title">${location.title}</h2>
          <div class="card_text">
          </div>
        </div>
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

const addWarehouseLocations = locations => {
  locations.forEach(location => {
    const html = `
    <div class="warehouse-location">
              <img
                class="warehouse--image"
                src= ${location.src}
                alt="warehouse image"
              />
              <div class="details-div">
                <h4 class="warehouse--name">${location.title}</h4>
                <div class="rating--div display-flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    fill="red"
                    class="details--svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>

                  <p class="details--div--heading">rating:</p>
                  <img
                    class="rating-img"
                    src="./Images/${location.rating}-star.svg"
                    alt="5 star rating"
                  />
                </div>
                <div class="distance-div display-flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    fill="red"
                    class="details--svg"
                  >
                    <path
                      d="M229.33,98.21,53.41,33l-.16-.05A16,16,0,0,0,32.9,53.25a1,1,0,0,0,.05.16L98.21,229.33A15.77,15.77,0,0,0,113.28,240h.3a15.77,15.77,0,0,0,15-11.29l23.56-76.56,76.56-23.56a16,16,0,0,0,.62-30.38ZM224,113.3l-76.56,23.56a16,16,0,0,0-10.58,10.58L113.3,224h0l-.06-.17L48,48l175.82,65.22.16.06Z"
                    ></path>
                  </svg>
                  <p class="details--div--heading">distance:</p>
                  <p class="deatils--info">1.2 km</p>
                </div>
                <div class="capacity-div display-flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    class="red-stroke details--svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M7.875 14.25l1.214 1.942a2.25 2.25 0 001.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 011.872 1.002l.164.246a2.25 2.25 0 001.872 1.002h2.092a2.25 2.25 0 001.872-1.002l.164-.246A2.25 2.25 0 0116.954 9h4.636M2.41 9a2.25 2.25 0 00-.16.832V12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 01.382-.632l3.285-3.832a2.25 2.25 0 011.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0021.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>

                  <p class="details--div--heading">capacity:</p>
                  <ion-icon name="file-tray-stacked-outline"></ion-icon>
                  <p class="deatils--info">64 sq. ft</p>
                </div>
              </div>
            </div>
            <hr class="line-break" />
  `;

    warehouselocationsEl.innerHTML += html;
  });
};

addWarehouseLocations(locations);

// const options = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': '8048530456mshd702a7e93d8d947p133668jsn0dcdbe319bbd',
//     'X-RapidAPI-Host': 'trueway-matrix.p.rapidapi.com',
//   },
// };

// fetch(
//   'https://trueway-matrix.p.rapidapi.com/CalculateDrivingMatrix?origins=23.1870706%2C%2072.6268105&destinations=23.185675%2C72.629526',
//   options
// )
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

const url =
  'https://newsapi.org/v2/everything?q=agriculture&from=2023-03-24&sources=the-times-of-india&sortBy=publishedAt&apiKey=1713d3c967ed4defab26f9996b21716a';
// const options = {
//   method: 'GET',
//   headers: {
//     'content-type': 'application/octet-stream',
//     'X-RapidAPI-Key': '8048530456mshd702a7e93d8d947p133668jsn0dcdbe319bbd',
//     'X-RapidAPI-Host': 'newsdata2.p.rapidapi.com',
//   },
// };

const displayNews = async () => {
  let results;
  try {
    const response = await fetch(url);
    // console.log(response);
    results = await response.json();
  } catch (error) {
    console.error(error);
  }

  console.log(results.articles);
};

// displayNews();

const agriNews = [
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'PTI',
    title:
      'IoTechWorld Avigation aims to sell 3,000 agri drones this fiscal, explore export market',
    description:
      'Startup IoTechWorld, which was founded in 2017 by Deepak Bhardwaj and Anoop Upadhyay, has a manufacturing facility in Gurugram. It sells agri drones at about Rs 7.5 lakh plus GST.',
    url: 'https://economictimes.indiatimes.com/tech/startups/iotechworld-avigation-aims-to-sell-3000-agri-drones-this-fiscal-explore-export-market/articleshow/99706137.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99706206,width-1070,height-580,imgsize-609036,overlay-ettech/photo.jpg',
    publishedAt: '2023-04-23T08:05:56Z',
    content:
      'Agri drone manufacturer IoTechWorld Avigation is targeting to sell 3,000 drones this fiscal, a six-fold jump from the previous year, on rising demand mainly from agrochemical firms and agriculture un… [+2733 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'ANI',
    title:
      'Jaishankar calls on Guyana PM, discusses energy, defence cooperation',
    description:
      'India\'s External Affairs Minister, S Jaishankar, discussed energy, disaster resilience, and defence cooperation during his visit to Guyana, tweeting his satisfaction at India\'s partnership with the South American country in "its developmental journey." During…',
    url: 'https://economictimes.indiatimes.com/news/india/jaishankar-calls-on-guyana-pm-discusses-energy-defence-cooperation/articleshow/99702883.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99702954,width-1070,height-580,imgsize-53586,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-23T04:25:40Z',
    content:
      "External Affairs Minister S Jaishankar called on Guyana's Prime Minister Mark Phillips and discussed energy, disaster resilience, and defence cooperation.Taking to Twitter on Sunday, Jaishankar said,… [+2631 chars]",
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'ANI',
    title:
      'EAM Jaishankar co-chairs fifth India-Guyana Joint Commission Meeting',
    description:
      "India's External Affairs Minister, S Jaishankar, held comprehensive discussions with his Guyana counterpart during the 5th India-Guyana Joint Commission Meeting. Topics covered included agriculture, energy, health, pharmaceuticals, defence cooperation, human …",
    url: 'https://economictimes.indiatimes.com/news/india/eam-jaishankar-co-chairs-fifth-india-guyana-joint-commission-meeting/articleshow/99700380.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99700447,width-1070,height-580,imgsize-22382,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-23T01:24:20Z',
    content:
      'External Affairs Minister S Jaishankar on Saturday co-chaired the 5th India-Guyana Joint Commission Meeting with his Guyana counterpart Hugh Todd and held "comprehensive discussions" related to agric… [+2758 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Kiran Kabtta Somvanshi',
    title:
      "All that glitters is not good gold: Inside India's yellow metal smuggling scene",
    description:
      'Gold gets smuggled into the country in a hundred ways. A carrier can hide it in their body, stitch it inside their clothing, conceal it in their shoes, jackets or special belts, or simply carry it in their pockets.',
    url: 'https://economictimes.indiatimes.com/industry/cons-products/fashion-/-cosmetics-/-jewellery/all-that-glitters-is-not-good-gold-inside-indias-yellow-metal-smuggling-scene/articleshow/99701733.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99695821,width-1070,height-580,imgsize-62324,overlay-etmarkets/photo.jpg',
    publishedAt: '2023-04-22T17:30:00Z',
    content:
      'On April 13, days ahead of Akshaya Tritiya, gold prices hit a record high of Rs 60,800 for 10 grams in Mumbai. The soaring prices have ensured that consumer demand remains muted. Even the Akshaya Tri… [+6531 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Kiran Kabtta Somvanshi',
    title:
      "All that glitters is not good gold: Inside India's yellow metal smuggling scene",
    description:
      'Gold gets smuggled into the country in a hundred ways. A carrier can hide it in their body, stitch it inside their clothing, conceal it in their shoes, jackets or special belts, or simply carry it in their pockets.',
    url: 'https://economictimes.indiatimes.com/industry/cons-products/fashion-/-cosmetics-/-jewellery/all-that-glitters-is-not-good-gold-inside-indias-yellow-metal-smuggling-scene/articleshow/99695825.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99695821,width-1070,height-580,imgsize-62324,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-22T17:30:00Z',
    content:
      'On April 13, days ahead of Akshaya Tritiya, gold prices hit a record high of Rs 60,800 for 10 grams in Mumbai. The soaring prices have ensured that consumer demand remains muted. Even the Akshaya Tri… [+6531 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'PTI',
    title:
      "Bihar's 'khurma', 'tilkut','balu shahi' likely to get GI tags, applications accepted: Official",
    description:
      'National Bank for Agriculture and Rural Development assisted producers\' associations in filing applications for GI tags for these famous delicacies and products of Bihar, he said. "We also engaged experts for the purpose. The bank is playing an important role…',
    url: 'https://economictimes.indiatimes.com/news/india/bihars-khurma-tilkutbalu-shahi-likely-to-get-gi-tags-applications-accepted-official/articleshow/99694594.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99694709,width-1070,height-580,imgsize-56406,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-22T14:13:10Z',
    content:
      "Applications seeking geographical indication tag for 'khurma', 'tilkut' and 'balu shahi' - the famous delicacies of Bihar- have been accepted by competent authority after preliminary examinations, an… [+1960 chars]",
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'ET Online',
    title:
      "IMF's growth forecast for India may have errors, real numbers to come as a surprise: RBI",
    description:
      'The IMF recently lowered its 2023 growth forecast for India to 5.9 per cent from 6.1 per cent citing slowness of domestic consumption and challenging external condition. In its annual World Economic Outlook, IMF also lowered the forecast for 2024-25 fiscal (A…',
    url: 'https://economictimes.indiatimes.com/news/economy/indicators/imf-growth-forecast-for-india-may-have-errors-rbi/articleshow/99683158.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99683144,width-1070,height-580,imgsize-40796,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-22T04:34:40Z',
    content:
      'The Reserve Bank of India (RBI) has said that the International Monetary Fund\'s growth forecast for India might be off the mark."Although too early to tell, most recent data arrivals suggest that the… [+3626 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'PTI',
    title:
      'EAM Jaishankar meets counterparts from Trinidad and Tobago, Jamaica on sidelines of India-CARICOM meeting',
    description:
      "India's External Affairs Minister, S Jaishankar, has held bilateral meetings with counterparts from Trinidad and Tobago, St. Kitts and Nevis, St. Vincent and Grenadines, Grenada, Barbados, and Jamaica during the 4th India-CARICOM ministerial meeting held in G…",
    url: 'https://economictimes.indiatimes.com/news/india/eam-jaishankar-meets-counterparts-from-trinidad-and-tobago-jamaica-on-sidelines-of-india-caricom-meeting/articleshow/99680025.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99680047,width-1070,height-580,imgsize-19690,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-22T01:10:03Z',
    content:
      "External Affairs Minister S Jaishankar on Friday, after co-chairing the 4th India-CARICOM ministerial meeting with his Jamaican counterpart Kaminaj Smith here in Guyana's capital, had bilateral meeti… [+3690 chars]",
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'AFP',
    title: "UN reports 'off the charts' melting of glaciers",
    description:
      "The world's glaciers melted at dramatic speed last year and saving them is effectively a lost cause, the United Nations reported Friday, as climate change indicators once again hit record highs.",
    url: 'https://economictimes.indiatimes.com/news/environment/global-warming/un-reports-off-the-charts-melting-of-glaciers/articleshow/99668916.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99669121,width-1070,height-580,imgsize-763143,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-21T11:28:37Z',
    content:
      "GENEVA: The world's glaciers melted at dramatic speed last year and saving them is effectively a lost cause, the United Nations reported Friday, as climate change indicators once again hit record hig… [+3849 chars]",
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Shambhavi Anand',
    title: 'Akshay Kumar, Virendra Sehwag invest in Two Brothers Organic Farms',
    description:
      'Akshay Kumar, Virendra Sehwag and some other high net worth individuals have invested a total of Rs 14.5 crore as part of a pre-Series A funding round, according to Satyajit Hange, one of TBOF’s founders.',
    url: 'https://economictimes.indiatimes.com/tech/funding/akshay-kumar-virendra-sehwag-invest-in-two-brothers-organic-farms/articleshow/99665373.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99665373,width-1070,height-580,imgsize-2565335,overlay-ettech/photo.jpg',
    publishedAt: '2023-04-21T09:46:49Z',
    content:
      'Actor Akshay Kumar and former cricketer Virendra Sehwag have invested an undisclosed amount in Pune-based farming startup Two Brothers Organic Farms (TBOF).Kumar, Sehwag and some other high net worth… [+1778 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Reuters',
    title:
      'Activists mark Earth Day as scientists warn of more extreme weather',
    description:
      'Volunteers worldwide celebrate Earth Day by conducting conservation and clean-up activities to encourage governments to take action against climate change. London, Rome and Boston host environmentally highlighted events including the "Big One" four-day event …',
    url: 'https://economictimes.indiatimes.com/news/science/activists-mark-earth-day-as-scientists-warn-of-more-extreme-weather/articleshow/99659120.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99659180,width-1070,height-580,imgsize-344518,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-21T05:53:29Z',
    content:
      'Volunteers in dozens of countries were set to plant trees, clean up trash and urge governments to do more to combat climate change to mark Earth Day, as scientists warn of more extreme weather and re… [+1951 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Bloomberg',
    title: 'ITC: The one Indian conglomerate that’s in no hurry to win',
    description:
      'Recently, ITC has closed underperforming apparel businesses and sold menswear brand John Players to Reliance Retail. With a high cigarette market share, ITC makes almost 93% of its profits from the product. As smoking declines in India, ITC needs to focus mor…',
    url: 'https://economictimes.indiatimes.com/industry/cons-products/tobacco/itc-the-one-indian-conglomerate-thats-in-no-hurry-to-win/articleshow/99653106.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99653167,width-1070,height-580,imgsize-23808,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-21T01:38:10Z',
    content:
      'The erstwhile Imperial Tobacco Co. of India is a powerful creature even in the post-colonial world except that it has been kept in a cage for too long by diffused, competing interests.British America… [+7394 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Srijana Mitra Das',
    title:
      'Higher temperatures are very costly to a developing economy — a one degree rise can reduce growth by 2%: Benjamin F. Jones',
    description:
      '"Nations often have relatively warmer or colder years or even decades and so, we looked at the historical record to see economic outcomes which occur when a country has a decade that is a degree warmer than normal."',
    url: 'https://economictimes.indiatimes.com/news/et-evoke/higher-temperatures-are-very-costly-to-a-developing-economy-a-one-degree-rise-can-reduce-growth-by-2-benjamin-f-jones/articleshow/99647868.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99647860,width-1070,height-580,imgsize-70418,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-20T16:54:06Z',
    content:
      'Economist Benjamin F. Jones is professor of entrepreneurship and strategy at the Kellogg School of Management. Speaking to Srijana Mitra Das, he explains how rising temperatures pose an economic dang… [+5514 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Kirtika Suneja',
    title: 'Govt appoints new DPIIT, MoRTH secretary',
    description:
      'The Appointments Committee of the Cabinet (ACC) also appointed MoRTH secretary Alka Upadhyaya as secretary, Department of Animal Husbandry & Dairying.',
    url: 'https://economictimes.indiatimes.com/news/india/govt-appoints-new-dpiit-morth-secretary/articleshow/99646920.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99646913,width-1070,height-580,imgsize-28444,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-20T15:41:56Z',
    content:
      'The government on Thursday appointed Rajesh Kumar Singh, secretary in the Department of Animal Husbandry &amp; Dairying, as secretary, Department for Promotion of Industry and Internal Trade. Singh h… [+1490 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Yogima Seth Sharma',
    title:
      'NITI Aayog suggests states to formulate specific AgriTech policy to promote start-ups',
    description:
      'In its white paper on ‘Gearing Up To Solve Food Security Challenges’, the Aayog said that the agritech solutions available in the market are making the lives of smallholders better by improving access to quality input, access to market, reducing risks, access…',
    url: 'https://economictimes.indiatimes.com/news/economy/agriculture/niti-aayog-suggests-states-to-formulate-specific-agritech-policy-to-promote-start-ups/articleshow/99642164.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99642310,width-1070,height-580,imgsize-38118,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-20T11:57:24Z',
    content:
      'NITI Aayog has suggested states formulate their specific AgriTech policy to promote agriculture-based start-ups while enabling digitalisation of licensing regime, ensuring access of quality data and … [+3012 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'New York Times',
    title:
      "Will This Be the 'Indian Century'? The answer lies in these four questions",
    description:
      'No country is likely to challenge India in size for centuries. What had long been "the world\'s largest democracy" is now, simply, "the world\'s largest" everything. China has taken advantage of its immensity to change the world more than any other nation over …',
    url: 'https://economictimes.indiatimes.com/news/how-to/will-this-be-the-indian-century-the-answer-lies-in-these-four-questions/articleshow/99641914.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99642050,width-1070,height-580,imgsize-204854,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-20T11:39:32Z',
    content:
      "It is a colossal figure that will be etched in history: India's population will soon reach 1.428 billion people, pushing it past mainland China, according to the latest U.N. estimates.With China's po… [+6313 chars]",
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Vidya Sreedhar',
    title:
      'Should D-Street bulls continue their smoky affair with ITC or hold on to good, old HUL?',
    description:
      '“ITC outperforms HUL due to its consistent success in quarterly figures, which take cues from demand recovery in the cigarette and hotel businesses, cost optimisation, and trending sales momentum in the FMCG industry,” said Ravi Singh, vice president and head…',
    url: 'https://economictimes.indiatimes.com/markets/stocks/news/should-d-street-bulls-continue-their-smoky-affair-with-itc-or-hold-on-to-good-old-hul/articleshow/99637624.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99637819,width-1070,height-580,imgsize-27316,overlay-etmarkets/photo.jpg',
    publishedAt: '2023-04-20T09:45:54Z',
    content:
      'In a listless market today, if someones smiling big, its ITCs investors as th e companys market capitalisation hit the Rs 5 trillion-mark following steady gains over the last 1 year.Shares of ITC hav… [+2331 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'PTI',
    title:
      "A farmers' political collective aspires to take on the BJP and JD(S) in Mandya in Karnataka",
    description:
      "The face that stands out prominently, among the posters that are being loaded onto vans, was that of SKP's lead candidate Darshan Puttanaiah. Son of the late prominent farmers leader K S Puttanaiah, Darshan is contesting from Melkote constituency in Mandya di…",
    url: 'https://economictimes.indiatimes.com/news/elections/assembly-elections/karnataka/a-farmers-political-collective-aspires-to-take-on-the-bjp-and-jds-in-mandya-in-karnataka/articleshow/99636332.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99636420,width-1070,height-580,imgsize-1364176,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-20T08:40:19Z',
    content:
      'The office of the Sarvodaya Karnataka Party (SKP) may be the least prominent among other political party outposts here, but it definitely looked the busiest. A couple of days before nominations were … [+5201 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'IANS',
    title: 'Heatwaves may burden health, agriculture in India: Cambridge study',
    description:
      "Heatwaves in India are becoming more frequent, intense and lethal, with detrimental impacts on public health, agriculture, and socio-economic and cultural systems, according to a study published in PLOS Climate. These heatwaves could hinder India's progress t…",
    url: 'https://economictimes.indiatimes.com/news/india/heatwaves-may-burden-health-agriculture-in-india-cambridge-study/articleshow/99632725.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99633029,width-1070,height-580,imgsize-22196,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-20T06:16:20Z',
    content:
      'Heatwaves in India are increasing in frequency, intensity and lethality, burdening public health, agriculture, and other socio-economic and cultural systems, says a study.The study, "Lethal heat wave… [+3059 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Reuters',
    title:
      "What is happening in Sudan, Who are the main players, and what's at stake? Fighting in Khartoum explained",
    description:
      "Tension had been building for months between Sudan's army and the paramilitary Rapid Support Forces (RSF), which together toppled a civilian government in an October 2021 coup. The friction was brought to a head by an internationally-backed plan to launch a n…",
    url: 'https://economictimes.indiatimes.com/news/how-to/what-is-happening-in-sudan-who-are-the-main-players-and-whats-at-stake-fighting-in-khartoum-explained/articleshow/99629794.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99630234,width-1070,height-580,imgsize-237078,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-20T04:22:46Z',
    content:
      'Fighting has erupted across Khartoum and at other sites in Sudan in a battle between two powerful rival military factions, engulfing the capital in warfare for the first time and raising the risk of … [+5178 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'NYT News Service',
    title: "Will this be the 'Indian century'? Four key questions",
    description:
      'No country is likely to challenge India in size for centuries. What had long been "the world\'s largest democracy" is now, simply, "the world\'s largest" everything. China has taken advantage of its immensity to change the world more than any other nation over …',
    url: 'https://economictimes.indiatimes.com/news/india/will-this-be-the-indian-century-four-key-questions/articleshow/99628145.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99628518,width-1070,height-580,imgsize-108038,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-20T03:08:27Z',
    content:
      "It is a colossal figure that will be etched in history: India's population will soon reach 1.428 billion people, pushing it past mainland China, according to the latest U.N. estimates.With China's po… [+6457 chars]",
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Reuters',
    title:
      "India's heatwaves putting economy, development goals at risk - study",
    description:
      "As much as 90% of India's area lies in extreme heat danger zones, posing significant economic threats from reduced productivity and a decline in outdoor working capacity. Extreme heat could also lower the quality of life to 480 million and reduce GDP by 2.8% …",
    url: 'https://economictimes.indiatimes.com/news/india/indias-heatwaves-putting-economy-development-goals-at-risk-study/articleshow/99626930.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99626998,width-1070,height-580,imgsize-261736,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-20T02:18:19Z',
    content:
      'Killer heat waves are putting "unprecedented burdens" on India\'s agriculture, economy and public health, with climate change undermining the country\'s long-term efforts to reduce poverty, inequality … [+1888 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'ET Bureau',
    title:
      'BIS rolls out standards and tests for electric vehicle charging infrastructure',
    description:
      'The standards aim to provide uniformity and compatibility for EV charging infrastructure across the globe. "They ensure that EV charging systems are safe, reliable, and interoperable with various vehicles and charging network providers," BIS added.',
    url: 'https://economictimes.indiatimes.com/industry/renewables/bis-rolls-out-standards-and-tests-for-electric-vehicle-charging-infrastructure/articleshow/99622335.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99622397,width-1070,height-580,imgsize-44754,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-19T19:20:04Z',
    content:
      'The Bureau of India Standards (BIS) has come out with standards and tests for electric vehicle (EV) charging infrastructure and requirements for battery swapping systems. It also provides for the saf… [+2290 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'ANI',
    title:
      'Modern tech, AI, and sustainable techniques propelling Indian agriculture growth, watch!',
    description:
      'One of India’s core strengths is her strong agriculture sector, which has made the country self-sufficient for its food security needs. India currently possesses the capability of producing sufficient food for 18% of the world’s population by using just 12% o…',
    url: 'https://economictimes.indiatimes.com/news/economy/agriculture/modern-tech-ai-and-sustainable-techniques-propelling-indian-agriculture-growth-watch/videoshow/99618375.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99618375,width-1070,height-580,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-19T14:05:37Z',
    content:
      'One of Indias core strengths is her strong agriculture sector, which has made the country self-sufficient for its food security needs. India currently possesses the capability of producing sufficient… [+523 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'PTI',
    title:
      "As India becomes world's most populous nation, cries grow louder about depleting resources",
    description:
      'With a growing population, natural resources are depleted faster than they can be replenished, leading to poor air and water quality, water scarcity, extreme weather events, and a host of other public health issues. As India overtakes China as the most populo…',
    url: 'https://economictimes.indiatimes.com/news/india/as-india-becomes-worlds-most-populous-nation-cries-grow-louder-about-depleting-resources/articleshow/99615016.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99615096,width-1070,height-580,imgsize-71592,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-19T11:44:00Z',
    content:
      "Standing on the terrace of a three-storied building in Sangam Vihar, Asia's largest unauthorised colony, Dula Khan, 63, appears to be at a loss of words. But he gathers himself soon and looks at othe… [+4987 chars]",
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'PTI',
    title:
      'Maharashtra cabinet okays 4 per cent quota in promotions for divyang employees',
    description:
      "A statement from the Chief Minister's Office said the decision for the divyang reservation in promotion was taken at the Cabinet meeting. This decision is on the lines of the similar one taken by the Central government. The Cabinet also decided that women bel…",
    url: 'https://economictimes.indiatimes.com/news/india/maharashtra-cabinet-okays-4-per-cent-quota-in-promotions-for-divyang-employees/articleshow/99614734.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99614955,width-1070,height-580,imgsize-23144,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-19T11:34:12Z',
    content:
      'The Maharashtra government on Wednesday approved a four per cent quota in promotion for divyang (differently-abled) employees in service. In December 2022, Maharashtra became the first state in the c… [+831 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Sutanuka Ghosal',
    title: 'NCDEX launches isabgol seed futures',
    description:
      'Although the Indian Isabgol industry is yet to get organized, market sources assume India is the largest exporter of the Isabgol husk with a contribution of more than 85% of global consumption. However, despite having near monopoly in this medicinal agricultu…',
    url: 'https://economictimes.indiatimes.com/markets/commodities/news/ncdex-launches-isabgol-seed-futures/articleshow/99612534.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99612784,width-1070,height-580,imgsize-83699,overlay-etmarkets/photo.jpg',
    publishedAt: '2023-04-19T10:32:44Z',
    content:
      'National Commodity and Derivatives Exchange Ltd. (NCDEX) on Wednesday launched futures contracts in Isabgol seed for trading. The contracts are available for trading in four months from May to August… [+1615 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'ET Online',
    title:
      "How heat waves could scorch different sectors and melt India's GDP growth",
    description:
      "India's economic growth is at risk as heat waves become more frequent and extreme. Climate change-induced weather patterns are already causing inflation and supply shortages in India's agriculture industry, which makes up a small portion of its GDP but affect…",
    url: 'https://economictimes.indiatimes.com/news/economy/indicators/how-heat-waves-could-scorch-different-sectors-and-melt-indias-gdp-growth/articleshow/99609273.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99609390,width-1070,height-580,imgsize-460838,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-19T08:37:41Z',
    content:
      'Heat waves, which are set to become more frequent, usually bring to mind parched throats, sweaty skin, frequent power cuts and even heat strokes. But since heat waves impact humans and plants two key… [+8575 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Nikhil Agarwal',
    title:
      'SGX Nifty to get delisted, reborn as NSE IFSC Nifty: What it means for traders',
    description:
      'The Singapore Exchange has informed investors that SGX Nifty will be suspended from trading after the end of the session on 30 June, which is a Friday, and that it also intends to delist the security at a later date.',
    url: 'https://economictimes.indiatimes.com/markets/stocks/news/sgx-nifty-to-get-delisted-reborn-as-nse-ifsc-nifty-what-it-means-for-traders/articleshow/99607723.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99607886,width-1070,height-580,imgsize-88221,overlay-etmarkets/photo.jpg',
    publishedAt: '2023-04-19T07:44:49Z',
    content:
      'SGX Nifty, which is used as an early indicator of how the Indian equity market might open at 9:15 am every day, is set to get delisted from the Singapore Exchange soon and get reborn in the form of N… [+1741 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Dipanjan Roy Chaudhury',
    title: 'We rely on trusted partners: Russian Deputy PM Denis Manturov',
    description:
      '"Trade turnover between Russia and India exceeded $35b," stated Russian Deputy PM during his meeting with Jaishankar here on Tuesday. According to Jaishankar, for the period April, 2022 to February, 2023, the trade waas about $45 billion and it is expected to…',
    url: 'https://economictimes.indiatimes.com/news/politics-and-nation/we-rely-on-trusted-partners-russian-deputy-pm-denis-manturov/articleshow/99594590.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99594681,width-1070,height-580,imgsize-72580,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-18T19:06:45Z',
    content:
      'Foreign Minister S Jaishankar and Russian Deputy PM Denis Manturov on Tuesday explored measures to push trade."Trade turnover between Russia and India exceeded $35b," stated Russian Deputy PM during … [+1230 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'PTI',
    title:
      'Jaishankar-Manturov discuss measures to push trade turnover beyond 45 billion USD',
    description:
      'The two sides reviewed the entire gamut of economic ties at a meeting of the India-Russia Inter-governmental Commission on Trade, Economic, Scientific, Technological and Cultural Cooperation (IRIGC-TEC).',
    url: 'https://economictimes.indiatimes.com/news/economy/foreign-trade/india-russia-to-work-for-unlocking-full-potential-of-economic-ties/articleshow/99592134.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99592171,width-1070,height-580,imgsize-68566,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-18T15:26:24Z',
    content:
      'Indian Foreign Minister S Jaishankar and Russian Deputy PM Denis Manturov on Tuesday explored measures to push increase trade turnover which recorded unprecedented growth and touched 45 billion USD.T… [+3556 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Sutanuka Ghosal',
    title:
      'Tea Mosquito Bug Crisis: Planters Association urges immediate government intervention',
    description:
      'The United Planters Association of South India (UPASI) has urged the government to immediately intervene and take appropriate steps to control the Tea Mosquito Bug (Helopeltis theivora) (TMB) problem in the tea plantations in India.',
    url: 'https://economictimes.indiatimes.com/news/economy/agriculture/tea-mosquito-bug-crisis-planters-association-urges-immediate-government-intervention/articleshow/99588111.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99588104,width-1070,height-580,imgsize-22292,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-18T12:00:48Z',
    content:
      'The United Planters Association of South India (UPASI) has urged the government to immediately intervene and take appropriate steps to control the Tea Mosquito Bug (Helopeltis theivora) (TMB) problem… [+3513 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'PTI',
    title:
      'Employee services from branch office to head office, and vice versa to attract 18 pc GST: AAR',
    description:
      'Profisolutions Pvt Ltd, which has its registered office in Karnataka and a branch office in Chennai in Tamil Nadu, had approach the Authority for Advance Ruling (AAR) seeking a ruling on whether the services provided to head office will attract GST.',
    url: 'https://economictimes.indiatimes.com/news/economy/policy/employee-services-from-branch-office-to-head-office-and-vice-versa-to-attract-18-pc-gst-aar/articleshow/99582411.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99582395,width-1070,height-580,imgsize-705179,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-18T09:04:42Z',
    content:
      "Services provided by employees of a company's branch office to its head office and vice versa located in different states would be liable to 18 per cent GST, the AAR has said.Profisolutions Pvt Ltd, … [+2336 chars]",
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Reuters',
    title:
      "India's migrant millions: Caught between jobless villages and city hazards",
    description:
      "Internal migration is bound to intensify as India becomes the world's most populous nation, throwing up enormous challenges for the government - managing the strains on urban infrastructure as well as creating 8 million to 10 million jobs every year to absorb…",
    url: 'https://economictimes.indiatimes.com/news/india/indias-migrant-millions-caught-between-jobless-villages-and-city-hazards/articleshow/99580893.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99582953,width-1070,height-580,imgsize-181976,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-18T08:18:51Z',
    content:
      "As he crosses the mud houses and wheat fields around his village to catch a train to distant Mumbai, Sujeet Kumar says he is thinking about the better life that awaits him in India's city of dreams.T… [+4776 chars]",
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'ANI',
    title:
      'We have advanced our target to achieve 20% ethanol blending in petrol from 2030 to 2025-26: Petroleum Minister Hardeep Singh Puri',
    description:
      'The Union Minister also said that the production of CBG would have multiple benefits viz., reduction of natural gas imports, reduction of GHG emission, reduction in the burning of agriculture residues, providing remunerative income to farmers, employment gene…',
    url: 'https://economictimes.indiatimes.com/industry/energy/oil-gas/we-have-advanced-our-target-to-achieve-20-ethanol-blending-in-petrol-from-2030-to-2025-26-petroleum-minister-hardeep-singh-puri/articleshow/99571321.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99571324,width-1070,height-580,imgsize-14110,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-18T01:55:56Z',
    content:
      'The government has advanced its target to achieve 20 per cent ethanol blending in petrol from 2030 to 2025-26, Union Minister for Petroleum Hardeep Singh Puri said on Monday.While addressing the Glob… [+1844 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'ET Bureau',
    title:
      'Delhi CM targets PM Modi over his degree; Arvind Kejriwal hope of 140 crore Indians, says House resolution',
    description:
      'Kejriwal said the king along with his friends looted the country. "Banks of the country were looted first. The country saw unprecedented inflation. Troubled by the inflation, the people raised their voice and the king said anyone who speaks against him will b…',
    url: 'https://economictimes.indiatimes.com/news/politics-and-nation/delhi-cm-targets-pm-modi-over-his-degree-arvind-kejriwal-hope-of-140-crore-indians-says-house-resolution/articleshow/99567138.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99567200,width-1070,height-580,imgsize-46924,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-17T19:08:31Z',
    content:
      'A day after he was questioned for over nine hours by CBI, Delhi CM Arvind Kejriwal launched a scathing attack on the prime minister and the BJP government at the Centre over demonetisation, revoking … [+1233 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'PTI',
    title:
      'India covered 600 districts with 5G in less than 200 days: Union Minister Devusinh Chauhan',
    description:
      "​​Speaking at the second meeting of G20 Digital Economy Working Group (DEWG) here, he said public policies of the central government have been fundamentally inspired by the vision of 'Antyodaya' and they have been instrumental for inclusive welfarism and deve…",
    url: 'https://economictimes.indiatimes.com/news/india/india-covered-600-districts-with-5g-in-less-than-200-days-union-minister-devusinh-chauhan/articleshow/99565577.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99565628,width-1070,height-580,imgsize-48854,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-17T16:37:49Z',
    content:
      'India has covered 600 districts with 5G services in less than 200 days, which is one of the fastest in the world, Union Minister of State for Communications Devusinh Chauhan said on Monday. Speaking … [+2856 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'PTI',
    title: 'Karnataka minister N Nagaraju declares assets worth Rs 1,609 crore',
    description:
      "He filed the papers on Monday as the ruling BJP's candidate from the Hoskote Assembly segment, on the outskirts of Bengaluru. In his election affidavit, Nagaraju, who has mentioned his occupation or profession as agriculturist and business, along with his wif…",
    url: 'https://economictimes.indiatimes.com/news/elections/assembly-elections/karnataka/karnataka-minister-n-nagaraju-declares-assets-worth-rs-1609-crore/articleshow/99565321.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99565373,width-1070,height-580,imgsize-78256,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-17T16:20:03Z',
    content:
      'Considered to be one of the richest politicians in the country, Karnataka Minister N Nagaraju (MTB) has declared total assets worth Rs 1,609 crore, while filing the nomination for May 10 Assembly pol… [+1441 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'PTI',
    title:
      'In a first, Kerala adopts Water Budget to tackle problem of summer water shortage',
    description:
      "Kerala CM Vijayan, in his speech after inaugurating the release of the Public Water Budget and the third phase of the project 'Ini Njan Ozhukatte' (Let me flow now) for rehabilitation of irrigation networks in the Western Ghats, said that despite having 44 ri…",
    url: 'https://economictimes.indiatimes.com/news/india/in-a-first-kerala-adopts-water-budget-to-tackle-problem-of-summer-water-shortage/articleshow/99565303.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99565347,width-1070,height-580,imgsize-393290,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-17T16:18:52Z',
    content:
      'Thiruvananthapuram: An abundance of rivers, streams, backwaters and a good amount of rainfall contribute to the lush greenery in Kerala, many parts of which yet face acute water scarcity when it come… [+4603 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'PTI',
    title: 'Diesel sales jump on agricultural demand',
    description:
      'Demand for diesel, the most consumed fuel in the country accounting for about two-fifths of the demand, soared over 15 per cent to 3.45 million tonnes in the first half of April when compared to a year ago.',
    url: 'https://economictimes.indiatimes.com/industry/energy/oil-gas/diesel-sales-jump-on-agricultural-demand/articleshow/99557327.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99557567,width-1070,height-580,imgsize-68752,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-17T10:30:54Z',
    content:
      'Diesel sales in India jumped up sharply in the first half of April as agricultural activity pick-up and trucking increased to meet industrial demand, preliminary industry data showed on Monday. Deman… [+2299 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Riya Tandon',
    title: 'Six lesser-known but highly rewarding careers to pursue in 2023',
    description:
      'The Indian employment landscape has changed from age-old career choices like doctors or engineers. Young minds today have the option of pursuing passion-led careers like an event planner, ethical hacker, wildlife photographer, video game designer, personal fi…',
    url: 'https://economictimes.indiatimes.com/jobs/fresher/six-lesser-known-but-highly-rewarding-careers-to-pursue-in-2023/articleshow/99549318.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99550216,width-1070,height-580,imgsize-247018,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-17T06:13:59Z',
    content:
      'Remember what Farhan Qureshi, played by R Madhavan, in the movie 3 Idiots said to his father?I dont want to be an engineer, dad. I dont enjoy engineering. Id make a terrible engineer. I want to becom… [+6255 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'PTI',
    title:
      'Three-day G20 meeting of chief agri scientists to kick-start on Monday in Varanasi',
    description:
      "The 'Millets And Other Ancient GRains International ReSearcH Initiative (MAHARISHI)' is also proposed for deliberations as a G20 initiative during India's presidency, an official statement said.",
    url: 'https://economictimes.indiatimes.com/news/india/three-day-g20-meeting-of-chief-agri-scientists-to-kick-start-on-monday-in-varanasi/articleshow/99537404.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99537442,width-1070,height-580,imgsize-279622,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-16T13:25:32Z',
    content:
      "A three-day Meeting of Agricultural Chief Scientists (MACS) under India's G20 presidency will kick-start on Monday in Varanasi and will discuss on sustainable agriculture and food systems for healthy… [+3315 chars]",
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'AFP',
    title:
      'Poland bans grain and food imports from Ukraine to protect local farms',
    description:
      'The Poland ban on Ukraine food items will be applicable till June 30 and applies to imports of grain, sugar, meat, fruits and vegetables, milk, eggs and other food items.',
    url: 'https://economictimes.indiatimes.com/news/international/world-news/poland-bans-grain-and-food-imports-from-ukraine-to-protect-local-farms/articleshow/99528396.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99528420,width-1070,height-580,imgsize-154022,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-16T03:10:38Z',
    content:
      "Poland has banned imports of grain and other food from Ukraine to protect local farmers, the governing party's leader Jaroslaw Kaczynski said. Ukraine's grain exports have been transiting through the… [+1799 chars]",
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'ANI',
    title: "Pakistan's inflation to rise to 29.5 per cent in FY23: World Bank",
    description:
      'However, the World Bank report on the macro poverty outlook for Pakistan said inflation was expected to moderate over the forecast horizon as global inflationary pressures dissipated.',
    url: 'https://economictimes.indiatimes.com/news/international/world-news/pakistans-inflation-to-rise-to-29-5-per-cent-in-fy23-world-bank/articleshow/99520775.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99520779,width-1070,height-580,imgsize-22158,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-15T15:06:09Z',
    content:
      "The World Bank has warned that Pakistan's inflation is projected to further rise to 29.5 per cent in the fiscal year 2023 due to higher energy and food prices and the weaker Rupee, Dawn reported.Howe… [+4461 chars]",
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'PTI',
    title:
      'Himachal govt to launch Rs 500-crore Him Ganga scheme to promote dairy business: Chandan Kumar',
    description:
      'Kumar said that a tourism development scheme is also being started in the state with the help of Asian Development Bank at a cost of Rs 1,311 crore. This will give new wings to tourism in the state, he said, adding that chief minister Sukhwinder Singh Sukhu h…',
    url: 'https://economictimes.indiatimes.com/news/india/himachal-govt-to-launch-rs-500-crore-him-ganga-scheme-to-promote-dairy-business-chandan-kumar/articleshow/99518734.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99518760,width-1070,height-580,imgsize-69408,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-15T12:46:42Z',
    content:
      'The Himachal Pradesh government will launch a Rs 500-crore Him Ganga scheme to promote dairy business in the the state, agriculture and animal husbandry minister Chandra Kumar said on Saturday. Kumar… [+1274 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'IANS',
    title:
      'Karnataka Election 2023: JD(S) releases 12-point manifesto, lays emphasis on women, farmers',
    description:
      'Ahead of the Karnataka Assembly elections, former Prime Minister and veteran JD(S) leader H.D. Deve Gowda released a 12-point manifesto in Bengaluru on Saturday, in which the party has laid emphasis on women empowerment and development of farmers.',
    url: 'https://economictimes.indiatimes.com/news/elections/assembly-elections/karnataka/karnataka-election-2023-jds-releases-12-point-manifesto-lays-emphasis-on-women-farmers/articleshow/99513260.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99513515,width-1070,height-580,imgsize-81702,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-15T08:30:02Z',
    content:
      'Ahead of the Karnataka Assembly elections, former Prime Minister and veteran JD(S) leader H.D. Deve Gowda released a 12-point manifesto in Bengaluru on Saturday, in which the party has laid emphasis … [+1595 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Reuters',
    title:
      'China and Brazil reset ties with technology, environment accords, agree on Ukraine',
    description:
      'Brazilian President Luiz Inacio Lula da Silva and several of his ministers signed the accords with President Xi Jinping and other Chinese officials in Beijing. Xi said China has made relations with Brazil a diplomatic priority and the two countries should dee…',
    url: 'https://economictimes.indiatimes.com/news/international/world-news/china-and-brazil-reset-ties-with-technology-environment-accords-agree-on-ukraine/articleshow/99501335.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99501349,width-1070,height-580,imgsize-54356,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-14T17:00:48Z',
    content:
      'Brazil reset its diplomatic ties with China, its largest trading partner, with a state visit on Friday where they agreed to boost investments and cooperation on technology and sustainable development… [+3777 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'ET Online',
    title: 'Ambedkar the economist: The lesser-known side of the Dalit icon',
    description:
      "Bhimrao Ramji Ambedkar, the father of the Indian constitution, was an expert in economics, holding doctorate degrees from Columbia University and the London School of Economics. Ambedkar's important economic ideas included advocating for a gold standard, dece…",
    url: 'https://economictimes.indiatimes.com/news/india/ambedkar-the-economist-the-lesser-known-side-of-the-dalit-icon/articleshow/99489447.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99489677,width-1070,height-580,imgsize-25350,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-14T09:27:43Z',
    content:
      'Bhimrao Ramji Ambedkar, or Babasaheb Ambedkar as he is popularly known, established his reputation as a jurist and a social reformer. He is known as the father of the Indian constitution as he headed… [+3778 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'PTI',
    title:
      "Culture of 'forcing silence', branding people 'anti-nationals' dangerous trend, will finish democracy: Mallikarjun Kharge",
    description:
      'On the birth anniversary of B R Ambedkar, Congress president Mallikarjun Kharge on Friday took a swipe at the government, saying the "culture of forcing silence" and branding people "anti-nationals" is a dangerous trend that will finish our democracy and dest…',
    url: 'https://economictimes.indiatimes.com/news/politics-and-nation/culture-of-forcing-silence-branding-people-anti-nationals-dangerous-trend-will-finish-democracy-mallikarjun-kharge/articleshow/99482630.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99482644,width-1070,height-580,imgsize-116780,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-14T04:58:28Z',
    content:
      'On the birth anniversary of B R Ambedkar, Congress president Mallikarjun Kharge on Friday took a swipe at the government, saying the "culture of forcing silence" and branding people "anti-nationals" … [+4655 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: null,
    title: 'Adapt, this is no heat of the moment',
    description:
      'Many more days of temperatures that are above normal as well as longer heatwave periods are forecasted. A heatwave is declared when actual maximum temperature is above 45° C in    two or more stations in a meteorological sub-division for at least two consecut…',
    url: 'https://economictimes.indiatimes.com/opinion/et-editorial/adapt-this-is-no-heat-of-the-moment/articleshow/99474188.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99474203,width-1070,height-580,imgsize-32442,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-13T17:59:14Z',
    content:
      'The heat is on. Both literally and figuratively. The Indian Meteorological Department (IMD) forecasts that most parts of the country are expected to experience above-normal maximum temperatures durin… [+1652 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Yogima Seth Sharma',
    title:
      'Atal Innovation Mission, NITI Aayog collaborate with ATMAs to promote agri innovation',
    description:
      'During the first phase of the implementation, one KVK under each of the 11 Agricultural Technology Application Research Institutes (ATARIs) will be involved, providing technology backstopping and facilitating knowledge-sharing and skill-building exercises, NI…',
    url: 'https://economictimes.indiatimes.com/news/economy/agriculture/atal-innovation-mission-niti-aayog-collaborate-with-atmas-to-promote-agri-innovation/articleshow/99470967.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99470946,width-1070,height-580,imgsize-335820,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-13T14:40:35Z',
    content:
      'The Atal Innovation Mission (AIM), NITI Aayog has collaborated with Krishi Vigyan Kendra (KVKs) and Agricultural Technology Management Agency (ATMAs) under the ministry of agriculture and farmers wel… [+2100 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Dipanjan Roy Chaudhury',
    title: 'Pakistan’s banking sector faces strong headwinds',
    description:
      'In addition to downgrading long term deposit ratings of the five banks, Moody’s also downgraded their foreign Currency Counterpart Risk Ratings to Caa3 from Caa1. It also lowered the Baseline Credit Assessments (BCAs) of these banks, ET has learnt.',
    url: 'https://economictimes.indiatimes.com/news/international/business/pakistans-banking-sector-faces-strong-headwinds/articleshow/99470410.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99470400,width-1070,height-580,imgsize-102676,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-13T14:17:37Z',
    content:
      'Banks in Pakistan are now facing immense pressure due to Non-Performing Loans (NPL). Measured on quarterly basis, it averaged USD 5.25 billion between September 2003 to December 2022. It stood at USD… [+7179 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'ET Online',
    title: 'Asad encounter: Atique Ahmed, the don in the dust',
    description:
      'With the Yogi Adityanath government in Uttar Pradesh having turned law and order into the most important issue, often shooting criminals in encounters and bulldozing their homes, from now on it seems a downhill journey for Ahmed.',
    url: 'https://economictimes.indiatimes.com/news/india/asad-encounter-atique-ahmed-the-don-in-the-dust/articleshow/99469622.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99469601,width-1070,height-580,imgsize-25890,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-13T13:44:16Z',
    content:
      'Such was the terror of gangster-turned-politician Atique Ahmed that in 2012 as many as 10 judges of Allahabad High Court had recused themselves from hearing his bail plea. Ahmed was planning to fight… [+5211 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'PTI',
    title: 'Wheat export ban to continue for now: Piyush Goyal',
    description:
      "The ban on exports of wheat will continue as India has to ensure adequate supplies of the foodgrain for its domestic market and keep the inflation at check, Union minister Piyush Goyal said. India, the world's second-largest wheat producer, banned wheat expor…",
    url: 'https://economictimes.indiatimes.com/news/economy/foreign-trade/wheat-export-ban-to-continue-for-now-piyush-goyal/articleshow/99462437.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99462511,width-1070,height-580,imgsize-98356,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-13T10:19:16Z',
    content:
      'The ban on exports of wheat will continue as India has to ensure adequate supplies of the foodgrain for its domestic market and keep the inflation at check, Union minister Piyush Goyal said on Thursd… [+3743 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Sutanuka Ghosal',
    title: 'INI Farms gets Rs 16 crore investment from ESG First Fund',
    description:
      'INI Farms, a leading exporter of fruits and vegetables in India, has received a $1.95m investment from the ESG First Fund managed by Aavishkaar Capital. ESG First Fund is a $250m fund focused on investing in Asia and Africa to generating ESG outcomes and fina…',
    url: 'https://economictimes.indiatimes.com/news/economy/agriculture/ini-farms-gets-rs-16-crore-investment-from-esg-first-fund/articleshow/99461717.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99461797,width-1070,height-580,imgsize-113126,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-13T10:00:16Z',
    content:
      'Leading exporter of fruits and vegetables INI Farms has received Rs 16 crore ($1.95 million) investment from ESG First Fund, managed by Aavishkaar Capital, an Aavishkaar Group company and set up in p… [+2186 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'ANI',
    title:
      'PM Modi virtually attends Rashtriya Rozgar Mela, distributes appointment letters to 71,000 recruits',
    description:
      'Indian Prime Minister Narendra Modi virtually distributed appointment letters to 71,000 new recruits in the Rashtriya Rozgar Mela. On the occasion, PM Modi said that startups have created more than 40 lakh direct and indirect jobs in the country. He also stat…',
    url: 'https://economictimes.indiatimes.com/jobs/government-jobs/startups-garnered-over-40-lakh-jobs-pm-modi-virtually-attends-rashtriya-rozgar-mela-distributes-appointment-letters-to-71000-recruits/articleshow/99455410.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99455578,width-1070,height-580,imgsize-97812,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-13T06:18:45Z',
    content:
      'Prime Minister Narendra Modi on Thursday virtually distributed appointment letters to 71,000 new recruits in the Rashtriya Rozgar Mela and said that Startups have created more than 40 lakh direct and… [+4309 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Sutanuka Ghosal',
    title: 'Fasal ties up with SBI to help farmers get easy access to loans',
    description:
      'Agri-tech company Fasal has partnered with the State Bank of India (SBI) to provide farmers with easy access to capital in the form of quick, easy, and collateral-free loans at competitive rates. The loans will be deployed under the Kisan Credit Card scheme a…',
    url: 'https://economictimes.indiatimes.com/industry/banking/finance/banking/fasal-ties-up-with-sbi-to-help-farmers-get-easy-access-to-loans/articleshow/99455303.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99455299,width-1070,height-580,imgsize-101602,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-13T06:14:43Z',
    content:
      'Agri-tech company Fasal on Thursday announced its partnership with State Bank of India (SBI), aimed to provide farmers with easy access to capital. The partnership will help solve cash-flow constrain… [+3356 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Sutanuka Ghosal',
    title: 'Fasal ties up with SBI to help farmers get easy access to loans',
    description:
      'Fasal has partnered with the State Bank of India (SBI) to provide farmers with easy access to capital in the form of quick, easy, and collateral-free loans at competitive rates. The loans will be deployed under the Kisan Credit Card scheme and be initially of…',
    url: 'https://economictimes.indiatimes.com/industry/banking/finance/banking/fasal-ties-up-with-sbi-to-help-farmers-get-easy-access-to-loans/articleshow/99455270.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99455299,width-1070,height-580,imgsize-101602,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-13T06:14:43Z',
    content:
      'Agri-tech company Fasal on Thursday announced its partnership with State Bank of India (SBI), aimed to provide farmers with easy access to capital. The partnership will help solve cash-flow constrain… [+3356 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'PTI',
    title: 'India, Italy for balanced, fair Indo-EU free trade agreement',
    description:
      'The issue came up for discussion in the meeting of Commerce and Industry Minister Piyush Goyal and Italian Deputy Prime Minister and Minister of Foreign Affairs and International Cooperation in Foreign Office Antonio Tajani here on April 12.',
    url: 'https://economictimes.indiatimes.com/news/economy/foreign-trade/india-italy-for-balanced-fair-indo-eu-free-trade-agreement/articleshow/99453876.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99453888,width-1070,height-580,imgsize-14312,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-13T05:27:35Z',
    content:
      'India and Italy have discussed progress of talks on the proposed free trade agreement between New Delhi and the European Union (EU) and hope for its early conclusion, the commerce ministry said on Th… [+3133 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'ANI',
    title:
      'Union Minister Piyush Goyal describes India as "voice of developing countries"',
    description:
      'Speaking at the Gala Dinner in Rome among the presence of Indian and Italian Business leaders, Goyal said that India as the voice of the less developed countries, has been at the forefront of not only providing a better life for our people but also contributi…',
    url: 'https://economictimes.indiatimes.com/news/india/union-minister-piyush-goyal-describes-india-as-voice-of-developing-countries/articleshow/99449052.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99449659,width-1070,height-580,imgsize-31106,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-13T01:55:26Z',
    content:
      'Union Minister of Commerce and Industry Piyush Goyal on Wednesday called India a "voice of developing countries" and said that today the country represents the global south.Speaking at the Gala Dinne… [+3317 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Yogima Seth Sharma',
    title: 'Niti panel likely to propose incentives for efficient use of water',
    description:
      'The committee is also expected to reassess the water resource scenario of India and make future projections of water requirements to arrive at benchmarks for water neutrality. Incentives could include rebates to individuals and industry to use appliances with…',
    url: 'https://economictimes.indiatimes.com/news/economy/policy/niti-panel-likely-to-propose-incentives-for-efficient-use-of-water/articleshow/99444101.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99444143,width-1070,height-580,imgsize-10016,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-12T17:58:33Z',
    content:
      'India is eyeing incentives for industry and agriculture for efficient use of water as part of a long-term roadmap to ensure water security for the nation.A steering committee, led by Niti Aayog membe… [+1297 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'PTI',
    title:
      'DFS Secretary meets officials from 10 departments to boost enrolments under PMJJBY, PMSBY',
    description:
      'As a step towards amassing scale, Secretary, Department of Financial Services (DFS), will also be taking a meeting with the heads of all public sector banks on April 13, 2023 to ensure that the campaign reaches maximum eligible beneficiaries, it said. PMJJBY …',
    url: 'https://economictimes.indiatimes.com/news/economy/policy/dfs-secretary-meets-officials-from-10-departments-to-boost-enrolments-under-pmjjby-pmsby/articleshow/99436966.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99437017,width-1070,height-580,imgsize-60354,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-12T11:40:40Z',
    content:
      'In a bid to give a push to micro insurance schemes, Financial Services Secretary Vivek Joshi held a meeting with officials from 10 central ministries and departments, including those from labour and … [+2060 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'PTI',
    title:
      'El Nino after La Nina year tends to result in significant rainfall deficit: Experts',
    description:
      'The IMD on Tuesday predicted normal rainfall (96 per cent of the long-period average of 87 cm) in the country during the southwest monsoon season which be of great relief for the agriculture sector.',
    url: 'https://economictimes.indiatimes.com/news/india/el-nino-after-la-nina-year-tends-to-result-in-significant-rainfall-deficit-experts/articleshow/99436263.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99436404,width-1070,height-580,imgsize-190702,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-12T11:25:02Z',
    content:
      'With the India Meteorological Department (IMD) predicting a normal monsoon this year despite El Nino concerns, experts say an El Nino that follows a La Nina year tends to result in a significant rain… [+4057 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'ET Online',
    title:
      'This is how you should have chia seeds to get the most of the superfood',
    description:
      'How you consume the chia seeds makes all the difference, according to a new study.',
    url: 'https://economictimes.indiatimes.com/magazines/panache/this-is-how-you-should-have-chia-seeds-to-get-the-most-of-the-superfood/articleshow/99434133.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99435251,width-1070,height-580,imgsize-49126,overlay-etpanache/photo.jpg',
    publishedAt: '2023-04-12T11:00:15Z',
    content:
      'Chia seeds, also known as a popular superfood, are the miracle food item you have been waiting for. Packed with the goodness of polyunsaturated fat, calcium, zinc, fibre and protein, one cannot affor… [+3425 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Gourab Das',
    title:
      "Indian weather office's monsoon forecast needs to go right for the sake of the economy",
    description:
      "The Southwest monsoon irrigates more than half of India's farmlands, which eventually is key for the economy's well being and our daily lives. It is crucial for the weather office's normal monsoon prediction to come true, as the Mint Street and New Delhi are …",
    url: 'https://economictimes.indiatimes.com/news/economy/policy/indian-weather-offices-monsoon-forecast-needs-to-go-right-for-the-sake-of-the-economy/articleshow/99429890.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99429994,width-1070,height-580,imgsize-28178,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-12T08:10:38Z',
    content:
      "India's federal weather office has forecast 'normal' Southwest monsoon this year, calming jitters for the key agriculture sector and growth in Asia's third-largest economy. However, for the green sho… [+5255 chars]",
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'ET Online',
    title:
      "After Amul, Gujarat's Pushpa chilli could spice up Karnataka politics",
    description:
      'The introduction of Amul’s milk in Karnataka is being seen as a threat to the state’s own dairy brand, Nandini, and has sparked the ire of the opposition Congress who have accused the ruling BJP of plotting a conspiracy. Meanwhile, a chilli variety known as ‘…',
    url: 'https://economictimes.indiatimes.com/news/india/after-amul-gujarats-pushpa-chilli-could-spice-up-karnataka-politics/articleshow/99428364.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99428766,width-1070,height-580,imgsize-594082,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-12T07:25:14Z',
    content:
      'Hot electoral politics in Karnataka can get even hotter. Amuls announcement of entering the Bengaluru market with its milk has sent the political temperature in Karnataka soaring with the Opposition … [+3337 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'PTI',
    title: 'India, France discuss progress on India-EU trade pact',
    description:
      'Piyush Goyal also said India is looking to buy 2,000 commercial aircraft in the next 10 years and there is a huge opportunity to make commercial aircraft in India to meet domestic and international demand. With the purchase of Rafale and the recent Airbus ord…',
    url: 'https://economictimes.indiatimes.com/news/economy/foreign-trade/india-france-discuss-progress-on-india-eu-trade-pact/articleshow/99426382.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99426382,width-1070,height-580,imgsize-119270,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-12T06:06:39Z',
    content:
      'Trade ministers of India and France have held discussions related to the ongoing talks for a free trade agreement between India and the European Union, the commerce ministry said on Wednesday. Commer… [+2059 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Shally Mohile and Ashutosh R Shyam',
    title: 'El Niño unlikely to dampen tractor sales',
    description:
      'The tractor industry in India is not expecting a dip in sales despite concerns of another El Niño weather phenomenon, which might cause droughts and affect agriculture output. Executives said there had been historically little correlation between tractor indu…',
    url: 'https://economictimes.indiatimes.com/industry/auto/lcv-hcv/el-nio-unlikely-to-dampen-tractor-sales/articleshow/99425342.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99425387,width-1070,height-580,imgsize-318632,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-12T05:35:05Z',
    content:
      'Forecasts on emergence of the drought-causing El Niño weather phenomenon have cast a shadow over the agriculture sector performance, but the tractor industry doesnt expect that to weigh on sales.Hist… [+3813 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'ET Now',
    title:
      'Hunt for gems in industrial and infrastructure sectors: Pashupati Advani',
    description:
      "India is considered a good investment due to its growth opportunities, particularly in the capital goods and infrastructure sectors. While IT companies and PSU stocks may suffer from cooling relationships between India and the US, the current government's foc…",
    url: 'https://economictimes.indiatimes.com/markets/expert-view/hunt-for-gems-in-industrial-and-infrastructure-sectors-pashupati-advani/articleshow/99423289.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99423296,width-1070,height-580,imgsize-15302,overlay-etmarkets/photo.jpg',
    publishedAt: '2023-04-12T04:12:24Z',
    content:
      'Pashupati Advani, Founder &amp; Chairman, Global Foray, says India is the flavour of the month or the year. There are a lot of people looking positively at India for growth. And where will the growth… [+7271 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'ANI',
    title: 'Piyush Goyal invites French businessmen to invest in India',
    description:
      '"I am inviting you to visit India along with your board members. French people can come to India as tourists and investors to get good returns. I invite you (France) to do business with India, increase trade between us and initiate a technology partnership be…',
    url: 'https://economictimes.indiatimes.com/news/india/piyush-goyal-invites-french-businessmen-to-invest-in-india/articleshow/99422239.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99422270,width-1070,height-580,imgsize-15238,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-12T03:11:55Z',
    content:
      'Union Minister of Commerce &amp; Industry Piyush Goyal on Tuesday (local time) invited French businessmen to invest in India highlighting ways to further deepen the India-France partnership and reali… [+4660 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Dipanjan Roy Chaudhury',
    title: 'Jaishankar on Africa tour to expand economic & defence ties',
    description:
      'In Uganda, Jaishankar met President Yoweri Kaguta Museveni, one of the longest serving presidents of the continent and a figure of political stability in the region. Uganda has recently taken over as the chair of the Non-Aligned Movement.',
    url: 'https://economictimes.indiatimes.com/news/india/jaishankar-on-africa-tour-to-expand-economic-defence-ties/articleshow/99420874.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99420874,width-1070,height-580,imgsize-54006,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-12T02:21:47Z',
    content:
      'Foreign minister S Jaishankar is visiting Uganda and Mozambique, two of Indias key partners in eastern and southern Africa, with an aim to push India-backed development projects and defence ties amid… [+2928 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Tarush Bhalla',
    title: 'B2B back in focus as Indian VC funds rework playbook',
    description:
      'Within B2B marketplaces, investors are getting excited about micro-segments including specialty chemicals, engineered goods, equipment, batteries, electronics and cross-border trade which are also coming across big opportunities.',
    url: 'https://economictimes.indiatimes.com/tech/startups/b2b-back-in-focus-as-indian-vc-funds-rework-playbook/articleshow/99414876.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99414943,width-1070,height-580,imgsize-1512771,overlay-ettech/photo.jpg',
    publishedAt: '2023-04-12T00:31:00Z',
    content:
      'Domestic venture capital (VC) funds are preparing strategies for investments in business-to-business (B2B) startups in marketplace, manufacturing, enablement, and maintenance, repair and operations (… [+7162 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Kirtika Suneja',
    title:
      'India’s startup ecosystem continues to be strong, resilient: DPIIT official',
    description:
      '​​Allaying fears of the Indian startup ecosystem, Manmeet Nanda, joint secretary in the Department for Promotion of Industry and Internal Trade (DPIIT) said that she doesn’t foresee any issue in Indian startups’ financial requirements.',
    url: 'https://economictimes.indiatimes.com/tech/startups/indias-startup-ecosystem-continues-to-be-strong-resilient-dpiit-official/articleshow/99414826.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99414856,width-1070,height-580,imgsize-129280,overlay-ettech/photo.jpg',
    publishedAt: '2023-04-11T17:00:50Z',
    content:
      'Following the collapse of the California-based Silicon Valley Bank, the government on Tuesday said that Indian startups have not faced a plunge in funding and that Indias startup ecosystem is strong … [+2873 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Bloomberg',
    title: 'Normal monsoon forecast eases crop and growth concerns for India',
    description:
      'Hundreds of millions of farmers across Asia’s third-largest economy depend on the annual monsoon to nourish their fields. Ample rains may boost production of crops like rice, soybeans, corn and sugar cane, helping to lower food prices and aiding the governmen…',
    url: 'https://economictimes.indiatimes.com/news/economy/agriculture/normal-monsoon-forecast-eases-crop-and-growth-concerns-for-india/articleshow/99411034.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99411012,width-1070,height-580,imgsize-56256,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-11T12:59:25Z',
    content:
      'India, which relies on rain for the vast share of its water, forecast that the monsoon will be normal this year, potentially bolstering the outlook for agriculture production and economic growth.Show… [+3741 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'PTI',
    title:
      'JICA, Citi to provide USD 125 mn to Indusind Bank for onlending to agri sector',
    description:
      'The funding includes a JPY 13 billion (approx USD 97.45 million) loan from the Japan International Cooperation Agency (JICA) and another USD 30 million from Citi to Indusind, it said. The statement said Citi arranged the high impact social finance offering to…',
    url: 'https://economictimes.indiatimes.com/industry/banking/finance/banking/jica-citi-to-provide-usd-125-mn-to-indusind-bank-for-onlending-to-agri-sector/articleshow/99401584.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99401607,width-1070,height-580,imgsize-30928,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-11T07:54:08Z',
    content:
      'Japanese lender JICA has teamed up with Citibank to provide a USD 125 million funding line to domestic private sector lender Indusind Bank. Indusind will be utilising the co-finance funding for onlen… [+1756 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'ET Online',
    title: 'India to get normal monsoon this year, forecasts IMD',
    description:
      'Private forecaster Skymet on Monday forecast that India may see a below-normal monsoon rain this year, citing the threat of El Nino.',
    url: 'https://economictimes.indiatimes.com/news/india/india-to-get-normal-monsoon-this-year-forecasts-imd/articleshow/99396864.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99396935,width-1070,height-580,imgsize-79178,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-11T07:05:43Z',
    content:
      'India Meteorological Department, the nations official forecaster, today forecast that India will get normal monsoon this year. The rainfall is likely to be 96% of the long-term average, with an error… [+2217 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'ET Now',
    title:
      'Vinit Sambre on 4 sectors that can provide good wealth creation opportunities for long term',
    description:
      'I would say the time for health care in general has come back and if any of these opportunities come because of these one off events, I think those will be an added advantage.',
    url: 'https://economictimes.indiatimes.com/markets/expert-view/vinit-sambre-on-4-sectors-that-can-provide-good-wealth-creation-opportunities-for-long-term/articleshow/99398361.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99398341,width-1070,height-580,imgsize-15290,overlay-etmarkets/photo.jpg',
    publishedAt: '2023-04-11T06:12:00Z',
    content:
      '"But now the US is actually facing the highest amount of drug shortages and I would say that this will give way for and a lot of players have actually moved out because of unremunerative price points… [+6184 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Kshitij Anand',
    title:
      'ETMarkets Smart Talk: Earnings Rs 1 lakh per month? Here’s how you can achieve your crorepati dream',
    description:
      'Diversification is the key for any portfolio and the times we are living in today the main agenda should be to invest money in highly liquid assets which could be easily converted into hard cash during the time of crisis.',
    url: 'https://economictimes.indiatimes.com/markets/expert-view/etmarkets-smart-talk-earnings-rs-1-lakh-per-month-heres-how-you-can-achieve-your-crorepati-dream/articleshow/99394782.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99394797,width-1070,height-580,imgsize-38060,overlay-etmarkets/photo.jpg',
    publishedAt: '2023-04-11T03:34:28Z',
    content:
      'Diversification is the key for any portfolio and in the times we are living in today the main agenda should be to invest money in highly liquid assets which could be easily converted into hard cash d… [+14203 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'ET CONTRIBUTORS',
    title: 'Defining agriPV for the Indian context',
    description:
      'India’s plans to add more than 200GW of solar PV capacity will include significant contribution of agriPV. Given the criticality of agriculture to the Indian economy and the diversity in crop production, there is need to understand in practical terms the impa…',
    url: 'https://economictimes.indiatimes.com/industry/renewables/defining-agripv-for-the-indian-context/articleshow/99393295.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99393302,width-1070,height-580,imgsize-78620,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-11T02:41:31Z',
    content:
      'AgriPV or agrivoltaics that is combining agriculture with photovoltaics (PV) to optimise land usage has gained traction in countries such as Germany, Japan and Italy and is being actively explored in… [+5947 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Ishaan Gera',
    title: 'States set to trim FY24 spend on roads, bridges',
    description:
      "The combined capital expenditure of the 16 large states, which account for 80% of the country's gross domestic product (GDP), on roads and bridges will fall to 0.58% of the gross state domestic product, compared to 0.61% in the previous fiscal, according to t…",
    url: 'https://economictimes.indiatimes.com/news/economy/infrastructure/states-set-to-trim-fy24-spend-on-roads-bridges/articleshow/99387751.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99387767,width-1070,height-580,imgsize-158464,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-10T17:49:27Z',
    content:
      'States are set to spend less on road and bridge construction in this financial year, even as the Centre pushes ahead with spending on infrastructure creation.The combined capital expenditure of the 1… [+2924 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Riya Tandon',
    title: 'Top seven Artificial Intelligence careers to pursue in 2023',
    description:
      'The demand for AI and machine learning talent has increased by 75% over the last few years, creating abundant job opportunities. Various careers in AI require specialization in specific sets of skills and responsibilities. The top in-demand AI careers include…',
    url: 'https://economictimes.indiatimes.com/jobs/hr-policies-trends/top-seven-artificial-intelligence-careers-to-pursue-in-2023/articleshow/99383459.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99383513,width-1070,height-580,imgsize-71074,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-10T13:12:14Z',
    content:
      'A decade ago, not many would have believed that artificial intelligence (AI) could be such a game-changer. While concepts around machine learning have existed for years, recent advances in this techn… [+6024 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'PTI',
    title:
      'Govt allows 5 pvt firms for cluster farming in 50,000 hectares with Rs 750cr investment',
    description:
      'The Centre will give financial assistance up to Rs 100 crore depending on the size of the project under the recently launched central scheme Cluster Development Programme (CDP), which is implemented by the National Horticulture Board with an outlay of Rs 2,20…',
    url: 'https://economictimes.indiatimes.com/news/economy/agriculture/govt-allows-5-pvt-firms-for-cluster-farming-in-50000-ha-with-rs-750cr-investment/articleshow/99382190.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99382257,width-1070,height-580,imgsize-278292,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-10T12:13:11Z',
    content:
      'The Centre has allowed five private firms to undertake cluster farming of specific horticulture crops in about 50,000 hectares on a pilot basis entailing an investment of Rs 750 crore, including gove… [+3228 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'PTI',
    title:
      'Statistics and Programme Implementation Ministry, DOPT, PMO report sharp dip in RTI backlog: CHRI',
    description:
      'The report from Commonwealth Human Rights Initiative (CHRI) accessed by PTI shows that among other government departments, the Department of Space reported a 55.51 per cent decline in its RTI application backlog in 2021-22 vis-a-vis 2020-21.',
    url: 'https://economictimes.indiatimes.com/news/india/statistics-and-programme-implementation-ministry-dopt-pmo-report-sharp-dip-in-rti-backlog-chri/articleshow/99380688.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99380688,width-1070,height-580,imgsize-66420,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-10T11:23:07Z',
    content:
      "The ministries of statistics and programme implementation and personnel as well as the Prime Minister's Office are the top offices to have reduced their backlog of pending RTI applications by over 70… [+3482 chars]",
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'PTI',
    title:
      'Three lignite mines in TN exempted from 7th commercial auctions: Minister Pralhad Joshi',
    description:
      'A total of 106 coal mines, including lignite were put on the block in the round. Of the total mines offered, 61 are partially explored and 45 mines are fully explored. Post exemption of three mines, the total count reduces to 103. The minister said he had rec…',
    url: 'https://economictimes.indiatimes.com/industry/indl-goods/svs/metals-mining/three-lignite-mines-in-tn-exempted-from-7th-commercial-auctions-minister-pralhad-joshi/articleshow/99354591.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99354622,width-1070,height-580,imgsize-61748,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-09T07:23:05Z',
    content:
      'The government has exempted three lignite mines from the ongoing 7th round of commercial coal auctions launched last month, Union Minister Pralhad Joshi said. The three mines namely East of Sethiatho… [+1351 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'PTI',
    title:
      'Gautam Adani hard-working, down to earth with big ambitions in building infrastructure: Sharad Pawar in 2015 autobiography',
    description:
      '"He was earning well in the diamond industry, but Gautam was not interested in that. He had ambitions to enter the infrastructure sector. He had good relations with Gujarat Chief Minister Chimanbhai Patel and had submitted a proposal to develop a port at Mund…',
    url: 'https://economictimes.indiatimes.com/news/politics-and-nation/gautam-adani-hard-working-down-to-earth-with-big-ambitions-in-building-infrastructure-sharad-pawar-in-2015-autobiography/articleshow/99352559.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99352590,width-1070,height-580,imgsize-14090,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-09T04:59:28Z',
    content:
      'NCP chief Sharad Pawar may have broken ranks with other opposition parties on the Adani issue, but his friendship with Gautam Adani dates back to nearly two decades when the businessman was exploring… [+3296 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Shantanu Nandan Sharma',
    title:
      "Kashmir to host G20 meet in May: How the event will underscore New Delhi's bid to package the place as a tourist destination",
    description:
      'The proposed itinerary of foreign delegates, which includes a shikara ride on Dal Lake as well as a visit to the ski resort of Gulmarg and the Dachigam National Park known for hangul (the Kashmiri stag), indicates this international event could underscore New…',
    url: 'https://economictimes.indiatimes.com/news/india/g20-meet-in-kashmir-inside-indias-plan-to-pitch-jk-as-a-tourist-destination-again/articleshow/99344682.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99344825,width-1070,height-580,imgsize-160468,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-08T17:30:00Z',
    content:
      'The summer capital of Jammu and Kashmir is getting a makeover in patches. Some components of the ongoing smart city project in Srinagar have been tweaked, with contracts being reworked and deadlines … [+8739 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'ANI',
    title: 'PM Modi dedicates projects worth Rs 11,300 crore to Telangana',
    description:
      "Inaugurating these projects from Parade Ground in Hyderabad, the Prime Minister, highlighting the spirit of 'Sabka Saath, Sabka Vikas, Sabka Vishwas, Sabka Prayas', said \"It is the duty of the government at the Centre to realize the dreams of citizens of the …",
    url: 'https://economictimes.indiatimes.com/news/india/pm-modi-dedicates-projects-worth-rs-11300-crore-to-telangana/articleshow/99341559.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99341544,width-1070,height-580,imgsize-127536,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-08T11:58:06Z',
    content:
      'Prime Minister Narendra Modi on Saturday laid the foundation stone and dedicated to the nation various projects worth over Rs 11,300 crore related to railways, road connectivity and health infrastruc… [+6851 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Reuters',
    title: 'Saudi provides $240 million for Pakistan hydro-power dam',
    description:
      'The project will "contribute to Pakistan\'s energy security, increase sustainable water supply for agriculture and human consumption and improve resilience to floods," Pakistan\'s economic affairs ministry said in a statement.',
    url: 'https://economictimes.indiatimes.com/news/international/saudi-arabia/saudi-provides-240-million-for-pakistan-hydro-power-dam/articleshow/99319797.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99319854,width-1070,height-580,imgsize-470648,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-07T11:13:26Z',
    content:
      "Saudi Arabia will provide a $240 million loan to co-finance Pakistan's multi-purpose Mohmand dam project, a major hydro-power complex being built in northwest of the country, statements from both sid… [+1831 chars]",
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'AFP',
    title: 'World food prices down by a fifth on 2022: UN',
    description:
      'World food prices have fallen by 20.5% YoY due to ample supplies, low import demand and the lifting of grain export restrictions in Russia, according to FAO. However, the situation remains severe for developing countries that are dependent on imports, where p…',
    url: 'https://economictimes.indiatimes.com/news/international/business/world-food-prices-down-by-a-fifth-on-2022-un/articleshow/99318527.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99318683,width-1070,height-580,imgsize-368114,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-07T10:09:25Z',
    content:
      'World food prices are still high but have fallen by a fifth compared to a year ago when prices soared to a monthly record high after Russia invaded agricultural powerhouse Ukraine, UN data showed on … [+1733 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'PTI',
    title:
      'About 1.5 lakh farmers practising natural farming in Himachal to be certified under PK3Y in FY24',
    description:
      'According to a study, 28 per cent farmers have adopted natural farming techniques on their own through peer-to-peer learning without any training and therefore the focus of PK3Y in this financial year will be consolidation of farmers practising natural farmin…',
    url: 'https://economictimes.indiatimes.com/news/economy/agriculture/about-1-5-lakh-farmers-practising-natural-farming-in-himachal-to-be-certified-under-pk3y-in-fy24/articleshow/99314688.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99314742,width-1070,height-580,imgsize-33960,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-07T06:39:02Z',
    content:
      'About 1.5 lakh farmers practising natural farming in Himachal Pradesh would be certified under Prakritik Kheti Khushhal Kisan Yojana (PK3Y) in 2023-24. According to a study, 28 per cent farmers have … [+1458 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Banikinkar Pattanayak',
    title: 'NREGS spending drops 5% in FY23',
    description:
      "Expenditure under the Mahatma Gandhi National Rural Employment Guarantee Scheme (MGNREGS) in FY23 at ₹1.01 lakh crore still remained close to 12% higher than the Centre's actual fund release for the year, showed the data from the rural development ministry as…",
    url: 'https://economictimes.indiatimes.com/news/economy/finance/nregs-spending-drops-5-in-fy23/articleshow/99305275.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99305299,width-1070,height-580,imgsize-185550,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-06T17:48:39Z',
    content:
      "Spending under the government's flagship rural job guarantee scheme dropped 5% in 2022-23 from a year before, reflecting a moderation in demand with improved economic activities.Expenditure under the… [+2284 chars]",
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'PTI',
    title: 'Monitoring supply-demand gap in dairy products, says government',
    description:
      'This will ensure that the market is not distorted and the interests of the dairy farmers are protected, which is paramount and central to any decision taken by the government, the statement said. Meanwhile, NCP leader and former agriculture minister Sharad Pa…',
    url: 'https://economictimes.indiatimes.com/industry/cons-products/food/monitoring-supply-demand-gap-in-dairy-products-says-government/articleshow/99304321.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99304337,width-1070,height-580,imgsize-23406,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-06T16:38:57Z',
    content:
      'The government on Thursday said it is monitoring the supply-demand gap in dairy products along with NDDB and will take a decision on its imports depending on the situation. It is a fact that there ha… [+1660 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'ANI',
    title:
      'Food secretary says not expecting any shortfall in wheat production',
    description:
      'On reports of wheat crop loss in some states due to bad weather, Sanjeev Chopra said the country would "probably end up with the same figure of 112 million tonnes of production or in the worst case scenario, there will be a negligible drop in the production".',
    url: 'https://economictimes.indiatimes.com/news/economy/agriculture/food-secretary-says-not-expecting-any-shortfall-in-wheat-production/articleshow/99301090.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99301121,width-1070,height-580,imgsize-26150,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-06T13:27:20Z',
    content:
      'Union Food Secretary Sanjeev Chopra on Thursday said the government does not expect any shortfall in wheat production.On reports of wheat crop loss in some states due to bad weather, Sanjeev Chopra s… [+2536 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'ET Bureau',
    title: "Mahindra's new range of future-ready tractor to be called OJA",
    description:
      "\"Slated for launch later this year, the OJA is Mahindra's future ready approach to tractorization exemplified by numerous first best-in-class technologies for improved performance and productivity, through which we aim to transform farming and enrich farmers'…",
    url: 'https://economictimes.indiatimes.com/industry/auto/lcv-hcv/mahindras-new-range-of-future-ready-tractor-to-be-called-oja/articleshow/99296570.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99296586,width-1070,height-580,imgsize-43912,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-06T10:52:26Z',
    content:
      "Mahindra Tractor, part of the company's Farm Equipment Sector, has named its future-ready range of tractors OJA. It will be spawned from its global tractor program K2.The OJA is Mahindras all-new lig… [+1513 chars]",
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'PTI',
    title:
      'Govt hopeful of record 112 mn tonne wheat output despite damage to crop due to bad weather',
    description:
      'The Centre on Monday said about 8-10 per cent of the wheat crop is estimated to have been damaged due to recent untimely rains and hailstorms in key producing states, but better yield prospects in late-sown areas are expected to make up for the production los…',
    url: 'https://economictimes.indiatimes.com/news/economy/agriculture/govt-hopeful-of-record-112-mn-tonne-wheat-output-despite-damage-to-crop-due-to-bad-weather/articleshow/99294198.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99294226,width-1070,height-580,imgsize-620704,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-06T09:35:42Z',
    content:
      'Union Food Secretary Sanjeev Chopra on Thursday said the government is hopeful of a record wheat production of 112.18 million tonne in 2022-23 crop year ending June despite inclement weather conditio… [+1425 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Yogima Seth Sharma',
    title:
      'India’s labour market metrics deteriorates in March as employment in construction, retail trade drops',
    description:
      'CMIIE’s weekly labour market analysis shows that the labour markets have been weak especially during the last quarter of 2022-23. While the LPR fell from 40.5% in December to 39.8% in March 2023, the unemployment rate fell marginally from 8.3% to 7.8% while t…',
    url: 'https://economictimes.indiatimes.com/news/economy/indicators/indias-labour-market-metrics-deteriorates-in-march-as-employment-in-construction-retail-trade-drops/articleshow/99292734.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99292792,width-1070,height-580,imgsize-111186,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-06T08:52:51Z',
    content:
      'Indias labour market metrics deteriorated in March on the back of a significant drop in employment in construction and retail trade as millions of workers moved to agriculture for harvesting of rabi … [+2154 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Sutanuka Ghosal',
    title:
      'Agritech firm Zuari FarmHub partners with Novozymes South Asia to launch 100% water soluble fertilizer',
    description:
      'Agritech company Zuari FarmHub has partnered with Novozymes South Asia, a leading player in biological solution, to launch 100% water soluble fertilizer -Poorna Advanced with innovative LCO Promoter Technology. This technology acts as a signaling pathway betw…',
    url: 'https://economictimes.indiatimes.com/industry/indl-goods/svs/chem-/-fertilisers/agritech-firm-zuari-farmhub-partners-with-novozymes-south-asia-to-launch-100-water-soluble-fertilizer/articleshow/99289931.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99289932,width-1070,height-580,imgsize-17560,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-06T07:14:03Z',
    content:
      'Agritech company Zuari FarmHub has partnered with Novozymes South Asia, a leading player in biological solution, to launch 100% water soluble fertilizer -Poorna Advanced with innovative LCO Promoter … [+2713 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Atmadip Ray',
    title: 'RBI raises India FY24 GDP forecast by 10 bps to 6.5%',
    description:
      'The Rese​rve Bank of India differed with the World Bank and painted a better picture of India\'s growth prospects and expected price pressures to ease as crop output increases. "While the numbers may not really be significant, the messaging is subtle that the …',
    url: 'https://economictimes.indiatimes.com/news/economy/indicators/rbi-raises-india-gdp-forecast-by-10-bps-to-6-5/articleshow/99288645.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99289881,width-1070,height-580,imgsize-35960,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-06T07:11:58Z',
    content:
      "The Reserve Bank of India differed with the World Bank and painted a better picture of India's growth prospects and expected price pressures to ease as crop output increases. The central bank raised … [+2292 chars]",
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: null,
    title:
      'दूध की नदियों वाले भारत में क्यों आ गई विदेश से घी-मक्खन मंगाने की नौबत!',
    description:
      'भारत दूध के उत्पादन के मामले में दुनिया में पहले नंबर पर है। लेकिन इस साल भारत को कई डेयरी प्रॉडक्ट्स आयात करने पड़ सकते हैं। इसकी वजह यह है कि पिछले साल देश में दूध का उत्पादन स्थिर रहा जबकि मांग में 8 से 10 परसेंट की तेजी आई। पिछले एक साल में देश में दूध की…',
    url: 'https://navbharattimes.indiatimes.com/business/business-news/govt-may-consider-import-of-dairy-products-as-supply-remains-tight/articleshow/99287962.cms',
    urlToImage:
      'https://navbharattimes.indiatimes.com/photo/msid-99288278,imgsize-33924/pic.jpg',
    publishedAt: '2023-04-06T06:27:10Z',
    content:
      "Curated by\r\n| . | Updated:6 Apr 2023, 12:18 pm\r\n: (dairy products) 15 12 15 2022-23 8 10 2021-22 6.25 22.1 2020-21 20.8 2011 \r\n, , ' , 30 , \r\n, 20 1.89 , 50 5-6 \r\n , , - !\r\nFood and Agriculture Organ… [+409 chars]",
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'PTI',
    title: "Bihar's aromatic 'Marcha Rice' gets GI tag",
    description:
      "Marcha is a short indigenous cultivar of rice found in West Champaran district of Bihar. By its size and shape, its grain appears like black pepper so it is known as 'Mircha' (pepper in Hindi) or 'Marcha Rice'.",
    url: 'https://economictimes.indiatimes.com/news/india/bihars-aromatic-marcha-rice-gets-gi-tag/articleshow/99274910.cms',
    urlToImage:
      'https://img.etimg.com/thumb/msid-99275001,width-1070,height-580,imgsize-1727341,overlay-economictimes/photo.jpg',
    publishedAt: '2023-04-05T15:07:47Z',
    content:
      "Bihar's famous 'Marcha Rice' which is known for its aroma and palatability was awarded the Geographical Indication tag, according to the GI registry. Marcha is a short indigenous cultivar of rice fou… [+1052 chars]",
  },
];
