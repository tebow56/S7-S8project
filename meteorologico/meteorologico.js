// ### ¿Como funciona?
// Crea una página que tendrá lo siguiente:
// - El tiempo en el momento en el que accedemos a la página con varios elementos:
//   - Ciudad y Pais. Pondremos la ciudad y País en el que nos encontramos.
//   - El estado del clima.
//   - Imagen y grados celsius de nuestra ciudad.
//   - Precipitaciones, humedad y viento km/h.
// - La previsión por horas en el día en el que estamos. Con su hora, imagen y grados celsius. 
// - Dale estilo con CSS.

// ### ¿Qué usaremos?
// - API del tiempo de `https://www.weatherapi.com/`
// - Necesitarás una API KEY. Podrás conseguirla entrando en la url de weatherapi y pulsando en signup. Rellena los datos que pide y nada más entrar os aparecerá esa API KEY.
// - Puedes probar que funciona en esta página: `https://www.weatherapi.com/api-explorer.aspx` metiendo la APIKEY y dándole al botón de `show response`
// - Aquí está la documentación completa `https://www.weatherapi.com/docs/`
// - Este es el `base URL` al que tendréis que acceder `http://api.weatherapi.com/v1` añadiremos detrás lo que necesitemos. 
//  - Este es un ejemplo de endpoint con la APIKEY y la ciudad. Solo habría que cambiar los datos de `${apiKey}` por la nuestra y `${ciudad}` por la elegida por nosotros `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&aqi=no`
// - `fetch` para hacer peticiones a la API.

// ### PISTAS Y CONSEJOS
// - La URL base es `http` cámbiala desde el inicio por `https` para no tener problemas en el futuro de bloqueos de seguridad.
// - Usa `promesas` o `ASYNC/AWAIT` para crear la asincronía en las peticiopnes `fetch`
// - Piensa si necesitas solo un endpoint o varios. Revisa que trae cada petición.
// - Estructura bien tu código 





const urlimages = [
    '../assets/anita-austvika-XRMwJ0boslw-unsplash.jpg',
    '../assets/ian-dHtsAZUI9fc-unsplash.jpg',
    '../assets/marco-grosso-0OxGTvdxL-U-unsplash.jpg',
    '../assets/marek-piwnicki-3wTFUr0wtbk-unsplash.jpg',
    '../assets/marek-piwnicki-ktllNfb9cBs-unsplash.jpg',
    '../assets/matthew-stephenson-lfVVXj0a2P4-unsplash.jpg',
    '../assets/matthew-stephenson-qBEUMUWhZcQ-unsplash.jpg',
    '../assets/radomir-moysia-3NuzVqnGXHw-unsplash.jpg',
    '../assets/steve-busch-PjiRvYo-uFw-unsplash.jpg',
    '../assets/wallace-henry-7Jkp4or_J68-unsplash.jpg',
];




function backgroundImage() {
    const body = document.body;
    let indice = Math.floor(Math.random() * urlimages.length);
        body.style.backgroundImage = `url('${urlimages[indice]}')`;
    setInterval(()=>{
        let indice = Math.floor(Math.random() * urlimages.length);
        body.style.backgroundImage = `url('${urlimages[indice]}')`;
    }, 15000);
}
backgroundImage();

const weatherApp = document.getElementById ('weatherApp');
async function fetchWeather() {
    try {
        const fetching = await fetch('https://api.weatherapi.com/v1/current.json?key=f77d07abdacd4593913124243251212&q=Madrid&aqi=no');
        const data = await fetching.json();
        return data ;
    }
    catch (error) {
        console.error('Error fetching weather data:', error);
    }
}


async function fetchForecast14days() {
    try {
        const fetching = await fetch('https://api.weatherapi.com/v1/forecast.json?key=f77d07abdacd4593913124243251212&q=Madrid&days=14&aqi=no&alerts=no'); 
        const data = await fetching.json(); 
        return data ;
    }
    catch (error) {
        console.error('Error fetching forecast data:', error);
    }
}

fetchWeather().then (displayWeather);
fetchForecast14days().then (displayForecast14days);

function displayWeather(data) {
        const ciudad = data.location.name;
        const pais = data.location.country;
        const estado = data.current.condition.text;
        const icono = data.current.condition.icon;  
        const grados = data.current.temp_c;
        const precipitacion = data.current.precip_mm;
        const humedad = data.current.humidity;
        const viento = data.current.wind_kph;
        weatherApp.innerHTML = `
        <h1>${ciudad}, ${pais}</h1>
        <h2>${estado}</h2>
        <section id=parte2> <img src="${icono}" alt="icono clima"><h3>${grados} °C</h3>
        <div id=parte3><p>Precipitaciones: ${precipitacion} mm</p>
        <p>Humedad: ${humedad} %</p>
        <p>Viento: ${viento} km/h</p>
        </div>
        </section>
        <div id="parte4">
            <ul id="forecast">            
            </ul>
        </div>
        `;
}

function displayForecast14days(data) {
    const forecastList = document.getElementById('forecast');
    const hours = data.forecast.forecastday[0].hour;
    hours.map((hour)=> {
        const time = hour.time.substring(11,16);
        forecastList.innerHTML += `
        <li>
            <span>${time}</span>
            <img src="${hour.condition.icon}" alt="icono clima">
            <h3>${hour.temp_c} °C</h3>
        </li>
        `;
    })
}