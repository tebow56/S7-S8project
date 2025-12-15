// ## Listado de links:

// ### ¿Como funciona?
// Crea una página que tendrá lo siguiente:
// - Tendremos 2 inputs. Uno de ellos será el título que aparecerá en cada uno de nuestros elementos. Al pulsar el botón de `añadir link` se añadirá en el DOM pero también en nuestro `localStorage` para poder recuperarlo siempre.
// - Cada uno de los elementos tendrá el nombre que hemos añadido y el enlace al pulsar sobre él (ya sea el texto o el bloque completo). También tendrá un botón de eliminar si ya no vamos a hacer uso de él.
// - Será un listado de links que funcionará de la misma manera tanto en la página independiente como en el dashboard.
// - Dale estilo con CSS

// ### ¿Qué usaremos?
// - `CreateElement`, `appedChild`, ... o directamente un template con `innerHTML`.
// - `LocalStorage` para generar persistencia y guardar esos datos.

// ### PISTAS Y CONSEJOS
// - Guarda el dato en el `localStorage` a la vez que se crea en el `DOM`
// - Cuando se carga la página el dato del `LocalStorage` deberá aparecer de inicio

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
