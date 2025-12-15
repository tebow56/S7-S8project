

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
