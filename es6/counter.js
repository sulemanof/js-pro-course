const searchInput = document.querySelector('#searchInput');
const myWeather = document.querySelector('#myWeather');
const weatherData = JSON.parse(localStorage.getItem('weather'));

for (key in weatherData) {
  const cell = document.createElement('div');
  cell.innerHTML = `${key}: ${weatherData[key].temperature}`;

  document.body.appendChild(cell);
}


async function getWather(data) {
  let query;

  if (data) {
    const { latitude, longitude } = data.coords;
    query = `${latitude},${longitude}`;
  } else {
    query = searchInput.value;
    searchInput.value = ''
  };

  const stream = await fetch(`http://api.weatherstack.com/current?access_key=ba84bfbee5907b5ad2b7fa81a316705c&query=${query}`);
  const { location , current } = await stream.json();

  debugger;

  const previousWeather = JSON.parse(localStorage.getItem('weather')) || {};
  previousWeather[`${location.country}, ${location.name}`] = current;

  localStorage.setItem(`weather`, JSON.stringify(previousWeather))


  const container = document.createElement('div');
  container.innerHTML = `${location.country}, ${location.name}: ${weatherData[key].temperature}`;

  document.body.appendChild(container);
}

const form = document.querySelector('#search');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  getWather();
});

myWeather.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(getWather, () => {
    const container = document.createElement('div');
    container.innerHTML = 'Get current position declined';

    document.body.appendChild(container);
  })
})