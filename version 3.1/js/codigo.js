const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')
sectionReiniciar.style.display = 'none'
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')
const imagenJugadorSeleccion=document.getElementById('imagen-jugador')
const imagenEnemigoSeleccion=document.getElementById('imagen-enemigo')
let dayamones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeDayamones
let inputSquirtle
let inputCharmander
let inputBulbasaur
let mascotaJugador
let ataquesDayamon
let ataquesDayamonEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
class Dayamon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}
let squirtle = new Dayamon('Squirtle', 'https://64.media.tumblr.com/ca7bd49d1d414f1ccdaa4950094b6754/tumblr_n28v8gQLkH1rcgdmto3_250.gifv', 5)
let charmander = new Dayamon('Charmander', 'https://64.media.tumblr.com/6035bf1768e0c05901193ac1129df39d/tumblr_n28v8gQLkH1rcgdmto2_250.gifv', 5)
let bulbasaur = new Dayamon('Bulbasaur', 'https://64.media.tumblr.com/4a724672ff10c9886c94434a00954a99/tumblr_n28v8gQLkH1rcgdmto1_250.gifv', 5)
squirtle.ataques.push(
    { nombre: '💧', id: 'boton-agua' }, 
    { nombre: '💧', id: 'boton-agua' }, 
    { nombre: '💧', id: 'boton-agua' }, 
    { nombre: '🔥', id: 'boton-fuego' }, 
    { nombre: '🌱', id: 'boton-tierra' })
charmander.ataques.push(
    { nombre: '🌱', id: 'boton-tierra' }, 
    { nombre: '🌱', id: 'boton-tierra' }, 
    { nombre: '🌱', id: 'boton-tierra' }, 
    { nombre: '💧', id: 'boton-agua' }, 
    { nombre: '🔥', id: 'boton-fuego' })
bulbasaur.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' }, 
    { nombre: '🔥', id: 'boton-fuego' }, 
    { nombre: '💧', id: 'boton-agua' }, 
    { nombre: '🌱', id: 'boton-tierra' })
dayamones.push(squirtle, charmander, bulbasaur)
function imagen(){
    fecha = new Date();
    hora = fecha.getHours();
    if(hora>=1 && hora<=11){//imagen desde la 1am hasta las 10am
        document.body.style.backgroundImage="url(assets/Fondo-soleado.jpg)"
        document.body.style.backgroundSize="100% 100%"
        //document.body.style.backgroundSize="cover"
        }
    if(hora>=12 && hora<=18){//imagen desde las 11am hasta las 6pm  
        document.body.style.backgroundImage="url(assets/Fondo-atardecer.jpg)";
        document.body.style.backgroundSize="100% 100%"
        // DOM_a=document.getElementById("fondo-imagen")
        // let DOM_img = document.createElement("img");
        // DOM_img.src = "assets/Fondo-atardecer.jpg";

        // DOM_a.appendChild(DOM_img);

    }
    if(hora>=19 && hora<=24){//imagen desde las 7pm hasta las 12pm
        document.body.style.backgroundImage="url(assets/Fondo-anochecer.jpg)"
        document.body.style.backgroundSize="100% 100%"
        }
    }
function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none'
    dayamones.forEach((dayamon) => {
        opcionDeDayamones = `
        <input type="radio" name="mascota" id=${dayamon.nombre} />
        <label class="tarjeta-de-dayamon" for=${dayamon.nombre}>
            <p>${dayamon.nombre}</p>
            <img src=${dayamon.foto} alt=${dayamon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeDayamones
        inputSquirtle = document.getElementById('Squirtle')
        inputCharmander = document.getElementById('Charmander')
        inputBulbasaur = document.getElementById('Bulbasaur')
    })
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}
function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'flex'
    if (inputSquirtle.checked) {
        spanMascotaJugador.innerHTML = inputSquirtle.id
        // imagenJugadorSeleccion.innerHTML=`<img src=${squirtle.foto} alt=${squirtle.nombre} >`
        mascotaJugador = inputSquirtle.id
    } else if (inputCharmander.checked) {
        spanMascotaJugador.innerHTML = inputCharmander.id
        mascotaJugador = inputCharmander.id
    } else if (inputBulbasaur.checked) {
        spanMascotaJugador.innerHTML = inputBulbasaur.id
        mascotaJugador = inputBulbasaur.id
    } else { alert('Selecciona una mascota') }
    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}
function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < dayamones.length; i++) { 
        if (mascotaJugador === dayamones[i].nombre) { 
            ataques = dayamones[i].ataques } }
    mostrarAtaques(ataques)
}
function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesDayamon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesDayamon
    })
    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque')
}
function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled=true
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled=true
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled=true
            }
            ataqueAleatorioEnemigo()
        })
    })
}
function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, dayamones.length - 1)
    spanMascotaEnemigo.innerHTML = dayamones[mascotaAleatoria].nombre
    ataquesDayamonEnemigo = dayamones[mascotaAleatoria].ataques
    secuenciaAtaque()
}
function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesDayamonEnemigo.length - 1)
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
         ataqueEnemigo.push('FUEGO') } 
    else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) { 
        ataqueEnemigo.push('AGUA') } 
    else { ataqueEnemigo.push('TIERRA') }
    console.log(ataqueEnemigo)
    iniciarPelea()
}
function iniciarPelea() { if (ataqueJugador.length === 5) { combate() } }
function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}
function combate() {
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponente(index, index)
            crearMensaje("EMPATE")
        } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponente(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    revisarVidas()
}
function revisarVidas() { if (victoriasJugador === victoriasEnemigo) { crearMensajeFinal("Esto fue un empate!!!") } else if (victoriasJugador > victoriasEnemigo) { crearMensajeFinal("FELICITACIONES! Ganaste :)") } else { crearMensajeFinal('Lo siento, perdiste :(') } }
function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')
    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}
function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal

    sectionReiniciar.style.display = 'block'
}
function reiniciarJuego() { location.reload() }
function aleatorio(min, max) { return Math.floor(Math.random() * (max - min + 1) + min) }
window.addEventListener('load', iniciarJuego)