
const form = document.querySelector('form');
const input = document.querySelector('#city');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const city = input.value;
    const apiKey = '70810827bae1f9fd4696db351e489f49';
    const detailedUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    fetch(detailedUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            const weatherIcon = data.weather[0].icon;
            console.log(weatherIcon);
            const today = new Date();

            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const dayOfWeek = daysOfWeek[today.getDay()];

            const formattedDate = `${today.getDate()} ${today.toLocaleString('en-Us', { month: 'long' })}`;

            document.querySelector('.dayy').innerHTML = dayOfWeek;
            document.querySelector('.data').innerHTML = formattedDate;
            document.querySelector('.package-name').innerHTML = data.name+','+data.sys.country;
            document.querySelector('.price1').innerHTML = Math.round(data.main.temp) + '&deg;' + 'C';
            document.querySelector('.pr2').textContent = 'Pressure,mm'+' '+' '+data.main.pressure ;
            document.querySelector('.hum2').textContent = 'Humidity,%'+' '+' '+data.main.humidity;
            document.querySelector('.win2').textContent ='Wind,m/s'+' '+' '+ data.wind.speed;

            const myImageWrapper = document.getElementById('my-image-wrapper');
           let myImage = document.getElementById('my-image');
if (!myImage) {
  myImage = document.createElement('img');
  myImage.setAttribute('id', 'my-image');
  myImage.setAttribute('src', 'photo/thermometer.png');
  myImage.setAttribute('alt', 'My Image');
  myImageWrapper.appendChild(myImage);
}
            myImage.style.height='80px';
            myImage.style.width='80px';

         const myImageWrapper2 = document.getElementById('my-image-wrapper2');
let myImage2 = document.getElementById('my-image2');
if (!myImage2) {
  myImage2 = document.createElement('img');
  myImage2.setAttribute('id', 'my-image2');
  myImage2.setAttribute('src', 'photo/location.png');
  myImage2.setAttribute('alt', 'My Image2');
  myImageWrapper2.appendChild(myImage2);
}
myImage2.style.height = '40px';
myImage2.style.width = '40px';
            const weatherImage = document.querySelector('.weather-image');
            weatherImage.style.display = 'block';
            weatherImage.style.marginLeft ='90px';
            weatherImage.style.marginTop='-40px';
            weatherImage.style.width = '35%';
            weatherImage.style.height = '35%';
            
            switch (weatherIcon) {
                case '01d':
                    weatherImage.src = 'photo/sun.png';
                    break;
                case '02d': 
                weatherImage.src = 'photo/cloudy-day1.png';
                    break;
                case '03d':
                    weatherImage.src = 'photo/cloudy-day2.png';
                break;
                case '04d':
                    weatherImage.src = 'photo/cloud.png';
                    break;
                case '09d':
                    weatherImage.src = 'photo/rain.png';
                    break;
                    case '10d':
                    weatherImage.src = 'photo/rain.png';
                    break;
                case '11d':
                    weatherImage.src = 'photo/thunder.png';
                    break;
                case '13d':
                    weatherImage.src = 'photo/snow.png';
                    break;
                case '50d':
                    weatherImage.src = 'photo/smoke.png';
                    break;

                case '01n':
                    weatherImage.src = 'photo/moon.png';
                    break;
                case '02n': 
                weatherImage.src = 'photo/cloudy-night.png';
                    break;
                case '03n':
                    weatherImage.src = 'photo/cloudy-night.png';
                    break;
                case '04n':
                    weatherImage.src = 'photo/cloud.png';
                    break;
                case '09n':
                    weatherImage.src = 'photo/rain.png';
                    break;
                case '11n':
                    weatherImage.src = 'photo/thunder.png';
                    break;
                
                default:
                    weatherImage.src = 'photo/sun.png';
            }
        })


        .catch(function() {
            console.log('Ошибка получения данных');
        });


        const weatherIcons = {
            '01d': 'sun.png',
            '02d': 'cloudy-day1.png',
            '03d': 'cloudy-day2.png',
            '04d': 'cloud.png',
            '09d': 'rain.png',
            '10d': 'rain.png',
            '11d': 'thunder.png',
            '13d': 'snow.png',
            '50d': 'smoke.png',
          };




    fetch(forecastUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            
            const forecastList = data.list;
            const forecastContainer = document.querySelector('.forecast-container');
            forecastContainer.innerHTML = '';

            let dayCounter = 1;
            let today = new Date().toISOString().slice(0, 10);

            forecastList.forEach(function(forecast) {
                const forecastDate = forecast.dt_txt.slice(0, 10);
                const forecastTime = forecast.dt_txt.slice(11, 16);
                const forecastTemperature = Math.round(forecast.main.temp) + '&deg;' + 'C';
                const forecastDescription = forecast.weather[0].description;
                const forecastIcon = forecast.weather[0].icon;
            const forecastImageName = weatherIcons[forecastIcon];
                const forecastDay = new Date(forecastDate).toLocaleDateString('en-Us', { weekday: 'long' });

                if (forecastDate !== today && forecastTime === '12:00') {
                    const forecastItem = `
                        <div class="forecast-item">
                            <img src="photo/${forecastImageName}" alt="Weather Icon" class="weather-to">
                            <p class="temperature">${forecastTemperature}</p>
                            <p class="day">${forecastDay}</p>
                            <p class="description">${forecastDescription}</p>
                        </div>
                    `;

                    forecastContainer.insertAdjacentHTML('beforeend', forecastItem);

                    if (dayCounter === 7) {
                        return;
                    }

                    dayCounter++;
                }
            });
        })
        .catch(function() {
            console.log('Ошибка получения данных');
        });
});