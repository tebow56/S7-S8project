// Un reloj digital con la fecha y hora actual del lugar en el que te encuentres. Tendrá las siguientes características: 
// - Por un lado tendremos un reloj digital con horas, minutos y segundos que se tendrá que actualizar automaticamente cada segundo que pase.
// - Tendrás que formatear las hora. Si las horas, minutos y segundos son menores de 10 habrá que añadir un 0 delante para que quede como 01, 02, ...
// - La fecha tendrá formato DD/MM/AAAA 
// - Aparecerán unas frases dependiendo un intervalo de horas. Doy una de ejemplo aunque puedes cambiarlas a tu gusto:
//   - Desde las 00:01 hasta las 07:00 Es hora de descansar. Apaga y sigue mañana
//   - Desde las 07:01 hasta las 12:00 Buenos días, desayuna fuerte y a darle al código
//   - Desde las 12:01 hasta las 14:00 Echa un rato más pero no olvides comer
//   - Desde las 14:01 hasta las 16:00 Espero que hayas comido
//   - Desde las 16:01 hasta las 18:00 Buenas tardes, el último empujón
//   - Desde las 18:01 hasta las 22:00 Esto ya son horas extras, ... piensa en parar pronto
//   - Desde las 22:01 hasta las 00:00 Buenas noches, es hora de pensar en parar y descansar   
// - Dale estilo con CSS
// ### ¿Qué usaremos?
// - `new Date()` Es el objeto que representa la fecha y hora. Tiene varios métodos que nos ayudará a abtener lo que necesitamos:
//   - Hora, minutos y segundos
//   - Día, mes año
// - La hora debe actualizarse sola, es decir que si cambia la hora, el minuto o el segundo deben cambiar automaticamente en pantalla. Piensa en la unidad mínima que se necesita para hacer ese cambio. La fecha también debe cambiar. Para esto podemos usar `setInterval()`
// - Necesitaremos condicionales para las frases. Dependiendo la hora saldrá una u otra

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