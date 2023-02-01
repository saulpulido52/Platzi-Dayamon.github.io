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

const sectionVerMapa=document.getElementById('ver-mapa')
const mapa=document.getElementById('mapa')

let jugadorId = null
let dayamones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeDayamones
let inputSquirtle
let inputCharmander
let inputBulbasaur
let mascotaJugador
let mascotaJugadorObjeto
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
let lienzo = mapa.getContext("2d")
let intervalo 
let mapaBackground= new Image()
mapaBackground.src='./assets/mapa.png'
let alturaQueBuscamos
let anchoDelMapa= window.innerWidth -20
const anchoMaximoDelMapa= 350

if(anchoDelMapa>anchoMaximoDelMapa){
    anchoDelMapa=anchoMaximoDelMapa-20
}

alturaQueBuscamos=anchoDelMapa * 600 / 800

mapa.width=anchoDelMapa
mapa.height= alturaQueBuscamos

class Dayamon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarDayamon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.alto,
            this.ancho
        )
    }
}

let squirtle = new Dayamon('Squirtle', 'https://64.media.tumblr.com/ca7bd49d1d414f1ccdaa4950094b6754/tumblr_n28v8gQLkH1rcgdmto3_250.gifv', 5, './assets/Squirtle.png')

let charmander = new Dayamon('Charmander', 'https://64.media.tumblr.com/6035bf1768e0c05901193ac1129df39d/tumblr_n28v8gQLkH1rcgdmto2_250.gifv', 5, './assets/Charmander.png')

let bulbasaur = new Dayamon('Bulbasaur', 'https://64.media.tumblr.com/4a724672ff10c9886c94434a00954a99/tumblr_n28v8gQLkH1rcgdmto1_250.gifv', 5, './assets/Bulbasaur.png')

const SQUIRTLE_ATAQUES=[
    { nombre: '💧', id: 'boton-agua' }, 
    { nombre: '💧', id: 'boton-agua' }, 
    { nombre: '💧', id: 'boton-agua' }, 
    { nombre: '🔥', id: 'boton-fuego' }, 
    { nombre: '🌱', id: 'boton-tierra' },
]

squirtle.ataques.push(...SQUIRTLE_ATAQUES)

const BULBASUR_ATAQUES = [
    { nombre: '🌱', id: 'boton-tierra' }, 
    { nombre: '🌱', id: 'boton-tierra' }, 
    { nombre: '🌱', id: 'boton-tierra' }, 
    { nombre: '💧', id: 'boton-agua' }, 
    { nombre: '🔥', id: 'boton-fuego' },
]

bulbasaur.ataques.push(...BULBASUR_ATAQUES)

const CHARMANDER_ATAQUES =[
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' }, 
    { nombre: '🔥', id: 'boton-fuego' }, 
    { nombre: '💧', id: 'boton-agua' }, 
    { nombre: '🌱', id: 'boton-tierra' },
]

charmander.ataques.push(...CHARMANDER_ATAQUES)

dayamones.push(squirtle, charmander, bulbasaur)

function iniciarJuego() {

    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display='none'

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

    unirseAlJuego()
}

function unirseAlJuego () {
    fetch("http://localhost:8080/unirse")
        .then(function (res){
            if(res.ok){
                res.text()
                    .then(function(respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }

        })
}

function seleccionarMascotaJugador() {

    sectionSeleccionarMascota.style.display = 'none'
  
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
    } else {
         alert('Selecciona una mascota')    
    }extraerAtaques(mascotaJugador)

    seleccionarDayamon(mascotaJugador)
    sectionVerMapa.style.display='flex'
    iniciarMapa()
}

function seleccionarDayamon(mascotaJugador) {
    fetch(`http://localhost:8080/dayamon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            dayamon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < dayamones.length; i++) { 
        if (mascotaJugador === dayamones[i].nombre) { 
            ataques = dayamones[i].ataques 
        } 
    }
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

function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesDayamonEnemigo = enemigo.ataques
    secuenciaAtaque()
}


function ataqueAleatorioEnemigo() {
    console.log('Ataques enemigo', ataquesDayamonEnemigo)
    let ataqueAleatorio = aleatorio(0, ataquesDayamonEnemigo.length - 1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO') 
    }else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) { 
        ataqueEnemigo.push('AGUA') 
    }else { 
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() { 
    if (ataqueJugador.length === 5) {
        combate() 
    }
}

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

function revisarVidas() {
     if (victoriasJugador === victoriasEnemigo) { 
        crearMensajeFinal("Esto fue un empate!!!") 
    } else if (victoriasJugador > victoriasEnemigo) { 
        crearMensajeFinal("FELICITACIONES! Ganaste :)") 
    } else { 
        crearMensajeFinal('Lo siento, perdiste :(') 
    } 
}

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

function reiniciarJuego() { 
    location.reload() 
}

function aleatorio(min, max) {
     return Math.floor(Math.random() * (max - min + 1) + min) 
}

function pintarCanvas(){
    mascotaJugadorObjeto.x=mascotaJugadorObjeto.x+mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y=mascotaJugadorObjeto.y+mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0,0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
   mascotaJugadorObjeto.pintarDayamon()

   enviarPosicion(mascotaJugadorObjeto.x,mascotaJugadorObjeto.y)

  
}

function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/dayamon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
        })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({ enemigos }) {
                    console.log(enemigos)
                    enemigos.forEach(function (enemigo) {
                        let dayamonEnemigo = null
                        const dayamonNombre = enemigo.dayamon.nombre || ""
                        if (dayamonNombre === "Squirtle") {
                            dayamonEnemigo = new Dayamon('Squirtle', 'https://64.media.tumblr.com/ca7bd49d1d414f1ccdaa4950094b6754/tumblr_n28v8gQLkH1rcgdmto3_250.gifv', 5, './assets/Squirtle.png')
                        } else if (dayamonNombre === "Charmander") {
                            dayamonEnemigo = new Dayamon('Charmander', 'https://64.media.tumblr.com/6035bf1768e0c05901193ac1129df39d/tumblr_n28v8gQLkH1rcgdmto2_250.gifv', 5, './assets/Charmander.png')
                        } else if (dayamonNombre === "Bulbasaur") {
                            dayamonEnemigo = new Dayamon('Bulbasaur', 'https://64.media.tumblr.com/4a724672ff10c9886c94434a00954a99/tumblr_n28v8gQLkH1rcgdmto1_250.gifv', 5, './assets/Bulbasaur.png')
                        }

                        dayamonEnemigo.x = enemigo.x
                        dayamonEnemigo.y = enemigo.y

                        dayamonEnemigo.pintarDayamon()
                    })
                })
        }
    })
    }
function moverArriba(){
    mascotaJugadorObjeto.velocidadY=-5
}
function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX=-5
}
function moverAbajo(){
    mascotaJugadorObjeto.velocidadY=5
}
function moverDerecha(){
    mascotaJugadorObjeto.velocidadX=5
}
function detenerMovimiento(){
    
    mascotaJugadorObjeto.velocidadX=0
    mascotaJugadorObjeto.velocidadY=0
}
function sePresionoUnaTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break  
    }
}
function iniciarMapa(){
   
    mascotaJugadorObjeto =obtenerObjetoMascota(mascotaJugador)
    console.log(mascotaJugadorObjeto, mascotaJugador);
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
    
 
}
function obtenerObjetoMascota(){
    for (let i = 0; i < dayamones.length; i++) { 
        if (mascotaJugador === dayamones[i].nombre) { 
            return dayamones[i] 
        }
     }
}
function revisarColision(enemigo){
    const arribaEnemigo =enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo= enemigo.x + enemigo.ancho
    const izquierdaEnemigo= enemigo.x

    const arribaMascota =
    mascotaJugadorObjeto.y
    const abajoMascota = 
    mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota =
    mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota =
     mascotaJugadorObjeto.x

    if(      
        abajoMascota<arribaEnemigo ||
        arribaMascota>abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
        ) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    console.log('Se detecto una colision')
    sectionSeleccionarAtaque.style.display='flex'
    sectionVerMapa.style.display='none'
    seleccionarMascotaEnemigo(enemigo)

    // alert("HAY COLISIÓN CON " + enemigo.nombre)
    
}


window.addEventListener('load', iniciarJuego)
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