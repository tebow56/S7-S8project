const urlimages = [
    './assets/anita-austvika-XRMwJ0boslw-unsplash.jpg',
    './assets/ian-dHtsAZUI9fc-unsplash.jpg',
    './assets/marco-grosso-0OxGTvdxL-U-unsplash.jpg',
    './assets/marek-piwnicki-3wTFUr0wtbk-unsplash.jpg',
    './assets/marek-piwnicki-ktllNfb9cBs-unsplash.jpg',
    './assets/matthew-stephenson-lfVVXj0a2P4-unsplash.jpg',
    './assets/matthew-stephenson-qBEUMUWhZcQ-unsplash.jpg',
    './assets/radomir-moysia-3NuzVqnGXHw-unsplash.jpg',
    './assets/steve-busch-PjiRvYo-uFw-unsplash.jpg',
    './assets/wallace-henry-7Jkp4or_J68-unsplash.jpg',
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

// parte links

const linkname = document.getElementById('linkname');
const linkurl = document.getElementById('linkurl');
const addLinkButton = document.getElementById('addLinkButton');
const linkscontainer = document.getElementById('linkscontainer');


window.addEventListener('load', () => {
    linkscontainer.innerHTML = '';
    displaylinks();
})

linkname.addEventListener('keyup', () => {
    addLinkButton.disabled = false;
})

addLinkButton.addEventListener('click', () => {
    createnewlink();
})


function createnewlink(){
    let link = localStorage.getItem('links');
    const linkname = document.getElementById('linkname').value;
    const linkUrl = document.getElementById('linkUrl').value;
    let arrlink = JSON.parse(link) || [];
    const linkCompleto = {name: linkname, url: linkUrl}
    arrlink.push(linkCompleto);
    localStorage.setItem('links', JSON.stringify(arrlink));
    linkscontainer.innerHTML +=`<li class=linktitle>
        <a href=${linkCompleto.url} target=_blank >${linkCompleto.name}</a>
        <span class=botonSpan>X</span>
        </li>`
    }



function displaylinks() {
    const links = JSON.parse(localStorage.getItem('links')) || [];
    links.forEach((element) => {
        linkscontainer.innerHTML +=`<li class=linktitle>
        <a href=${element.url} target=_blank >${element.name}</a>
        <span class=botonSpan>X</span>
        </li>`
    });

}
linkscontainer.addEventListener('mouseover', () => {
    const botonSpan = document.querySelectorAll('.botonSpan')
    botonSpan.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            let link = localStorage.getItem('links')
            let arrlink = JSON.parse(link) || [];
            const linkText = e.target.previousElementSibling.textContent;
            arrlink = arrlink.filter((element) => element.name !== linkText);
            localStorage.setItem('links', JSON.stringify(arrlink));
            linkscontainer.innerHTML = '';
            location.reload();
         });

        })
    })


// parte reloj

const reloj =document.getElementById ("reloj");
const fechacompleta =document.getElementById ("fecha");
const mensajereloj =document.getElementById ("mensajereloj");

function crearReloj() {
    let fecha = new Date();
    let horas = fecha.getHours();
    if (horas < 10) {
         horas = "0" + horas;
        }
    let minutos = fecha.getMinutes();
        if (minutos < 10) {
         minutos = "0" + minutos;
        }
    let segundos = fecha.getSeconds();
        if (segundos < 10) {
         segundos = "0" + segundos;
        }
    let dia = fecha.getDate();
    if (dia < 10) {
         dia = "0" + dia;
        }   
    let mes = fecha.getMonth() + 1;
    if (mes < 10) {
         mes = "0" + mes;
        }
    let año = fecha.getFullYear();
    
    reloj.innerHTML = `${horas}:${minutos}:${segundos}`;
    fechacompleta.innerHTML = `${dia}/${mes}/${año}`;
    let horaActual = parseInt(horas);
    if (horaActual >= 0 && horaActual <= 7) {
        mensajereloj.innerHTML = "Es hora de descansar. Apaga y sigue mañana";
    } else if (horaActual > 7 && horaActual <= 12) {
        mensajereloj.innerHTML = "Buenos días, desayuna fuerte y a darle al código";
    } else if (horaActual > 12 && horaActual <= 14) {
        mensajereloj.innerHTML = "Echa un rato más pero no olvides comer";
    } else if (horaActual > 14 && horaActual <= 16) {
        mensajereloj.innerHTML = "Espero que hayas comido";
    } else if (horaActual > 16 && horaActual <= 18) {
        mensajereloj.innerHTML = "Buenas tardes, el último empujón";
    } else if (horaActual > 18 && horaActual <= 22) {
        mensajereloj.innerHTML = "Esto ya son horas extras, ... piensa en parar pronto";
    } else if (horaActual > 22 && horaActual <= 24) {
        mensajereloj.innerHTML = "Buenas noches, es hora de pensar en parar y descansar";
    }
}
crearReloj();

setInterval(crearReloj, 1000);


// parte meteorológico

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

// parte contraseñas

const password =document.getElementById("password");
const generatePassword=document.getElementById("generatePassword");


const caracteres="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
const arraycaracteres = caracteres.split("");


function createPassword(){
    const arrcontraseña=[]
    const userselection = parseInt(document.getElementById("userselection").value);
    for (let i=userselection; i>0; i--){
        let random= Math.floor(Math.random()*arraycaracteres.length);
        arrcontraseña.push(arraycaracteres[random]);

    }
    const finalpassword= arrcontraseña.join("");
    password.innerHTML= `<h5>Contraseña generada:</h5>
    <p id="finalpassword">${finalpassword}</p>`;
    }

generatePassword.addEventListener('click',()=>createPassword())
    
