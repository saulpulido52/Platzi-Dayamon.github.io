let ataquejugador 
let ataquePc
let seleccionGanador
let vidasEnemigo = 3
let vidasJugador = 3
let sectionAtaques=document.getElementById('ataque')
function iniciar(){
    //
    let sectionAtaques=document.getElementById('ataque')
    sectionAtaques.style.display='none'

    let botonMascota=document.getElementById('boton-mascota')
    botonMascota.addEventListener('click', seleccionarMascota)

    let botonFuego=document.getElementById("boton-fuego")
    botonFuego.addEventListener('click', ataqueFuego)
    let botonAgua=document.getElementById("boton-agua")
    botonAgua.addEventListener('click', ataqueAgua)
    let botonPlanta=document.getElementById("boton-planta")
    botonPlanta.addEventListener('click',ataquePlanta)    

    let botonReinicio=document.getElementById('boton-reinciar')
    botonReinicio.addEventListener('click',reiniciarjuego)
    }
function seleccionarMascota(){
    let sectionAtaques=document.getElementById('ataque')
    

    let inputPal  =  document.getElementById("Squirtle")
    let inputMin  =  document.getElementById("Charmander")
    let inputSen  =  document.getElementById("Bulbasaur")
    let mascotaJugador = document.getElementById("mascota-jugador")
    
    if (inputPal.checked ){
        mascotaJugador.innerHTML=" Squirtle "
        sectionAtaques.style.display='block'
        }
    else if (inputMin.checked ){
        mascotaJugador.innerHTML=" Charmander"
        sectionAtaques.style.display='block' 
        }
    else if (inputSen.checked ){
        mascotaJugador.innerHTML=" Bulbasaur "
        sectionAtaques.style.display='block'  
        }
    else{
        alert("Tienes que seleccionar una mascota")
        }
    seleccionarEnemigo()
    }
function seleccionarEnemigo(){
    let pc=aleatorio(1,3)
    let mascotaEnemiga = document.getElementById("mascota-enemigo")
    
    if (pc==1 ){
        mascotaEnemiga.innerHTML = " Squirtle "
    }
    else if (pc==2){
        mascotaEnemiga.innerHTML = " Charmander "
    }
    else if (pc==3){
        mascotaEnemiga.innerHTML = " Bulbasaur "
    }

    }
function  aleatorio(min,max){
    return Math.floor(Math.random()*(max-min +1 )+min)
    }
function ataqueFuego(){
    ataquejugador= "FUEGO"
    //ataquejugador=document.getElementById("ataque-jugador")
    //ataquejugador.innerHTML= "FUEGO"
    
    ataqueEnemigo()
    }
function ataqueAgua(){
    ataquejugador="AGUA"
    //ataquejugador=document.getElementById("ataque-jugador")
    //ataquejugador.innerHTML= "AGUA"
    ataqueEnemigo()
    }
function ataquePlanta(){
    ataquejugador="HIERVA"
    //ataquejugador=document.getElementById("ataque-jugador")
    //ataquejugador.innerHTML= "HIERVA"
    ataqueEnemigo()
    }
function ataqueEnemigo(){
    ataquePc=aleatorio(1,3)
    
    if (ataquePc==1){
        ataquePc="FUEGO"
        //ataquePc=document.getElementById("ataque-enemigo")
        //ataquePc.innerHTML="FUEGO"
}
    else if (ataquePc==2){
        ataquePc="AGUA"
       //ataquePc=document.getElementById("ataque-enemigo")
        //ataquePc.innerHTML="AGUA"
}
    else if (ataquePc==3){
        ataquePc="HIERVA"
        //ataquePc=document.getElementById("ataque-enemigo")
        //ataquePc.innerHTML="HIERVA"
        }   
    ganador()
    }
function crearMensaje(resultado){
        
    let mensajeNuevo= document.getElementById("mensaje")
    let parrafo= document.createElement('p')
    parrafo.innerHTML= "Tu mascota atacó con "+ ataquejugador + ", la mascota del enemigo ataco con enemigo atacó con "+ ataquePc +'- '+ resultado
    mensajeNuevo.appendChild(parrafo)
    }
function crearMensajeFianl(resultadoFinal){
        
    let mensajeNuevo= document.getElementById("mensaje")
    let parrafo= document.createElement('p')
    parrafo.innerHTML= resultadoFinal
    mensajeNuevo.appendChild(parrafo)

    let botonFuego=document.getElementById("boton-fuego")
    botonFuego.disabled=true
    let botonAgua=document.getElementById("boton-agua")
    botonAgua.disabled=true
    let botonPlanta=document.getElementById("boton-planta")
    botonPlanta.disabled=true
    }
function ganador(){
    let spanVidasJugador=document.getElementById("vidas-jugador")
    let spanVidasEnemigo=document.getElementById("vidas-enemigo")
    if (ataquejugador==ataquePc){
        crearMensaje("empate")
        }
    else if (ataquejugador=="FUEGO" && ataquePc=="HIERVA"){
        crearMensaje("ganaste")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
        }
    else if (ataquejugador=="AGUA" && ataquePc=="FUEGO"){
        crearMensaje("ganaste")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
        }
    else if (ataquejugador=="HIERVA" && ataquePc=="AGUA"){
        crearMensaje("ganaste")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
        }        
    else {
        crearMensaje("perdiste")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
        }
    revisarVidas()
    }
function revisarVidas(){
    if (vidasJugador==0) {
        crearMensajeFianl("Perdiste")
        
    } 
    else if(vidasEnemigo==0){
        crearMensajeFianl("Ganaste")
    }
}
function reiniciarjuego(){
    location.reload() // Recarga la pagina

}
window.addEventListener('load',iniciar)
   