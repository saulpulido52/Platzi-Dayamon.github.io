const sectionAtaques=document.getElementById('ataque')
const sectionReiniciar=document.getElementById("boton-reinciar")
const botonMascota=document.getElementById('boton-mascota')
const botonFuego=document.getElementById("boton-fuego")
const botonAgua=document.getElementById("boton-agua")
const botonPlanta=document.getElementById("boton-planta")
const botonReinicio=document.getElementById('boton-reinciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const mascotaJugador = document.getElementById("mascota-jugador")
const imagenJugador = document.getElementById('imagen-jugador')

const imgenEnemigo = document.getElementById('imagen-enemigo');
const mascotaEnemiga = document.getElementById("mascota-enemigo")

const spanVidasJugador=document.getElementById("vidas-jugador")
const spanVidasEnemigo=document.getElementById("vidas-enemigo")

const mensajeNuevo= document.getElementById("resultado")
const ataqueDelJugador= document.getElementById("ataque-del-jugador")
const ataqueDelEnemigo= document.getElementById("ataque-del-enemigo")


let ataquejugador 
let ataquePc
let seleccionGanador
let vidasEnemigo = 3
let vidasJugador = 3



function iniciar(){ 
    sectionAtaques.style.display='none'
    sectionReiniciar.style.display='none'
    botonMascota.addEventListener('click', seleccionarMascota)
    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonPlanta.addEventListener('click',ataquePlanta)    
    botonReinicio.addEventListener('click',reiniciarjuego)
    }
function seleccionarMascota(){ 
    sectionAtaques.style.display='flex'  
    sectionSeleccionarMascota.style.display = 'none'

    let inputPal  =  document.getElementById("Squirtle")
    let inputMin  =  document.getElementById("Charmander")
    let inputSen  =  document.getElementById("Bulbasaur")
    
    if (inputPal.checked ){
        mascotaJugador.innerHTML=" Squirtle " 
        imagenJugador.innerHTML ="<img src='https://64.media.tumblr.com/ca7bd49d1d414f1ccdaa4950094b6754/tumblr_n28v8gQLkH1rcgdmto3_250.gifv'>"
        }
    else if (inputMin.checked ){
        mascotaJugador.innerHTML=" Charmander" 
        imagenJugador.innerHTML ="<img src='https://64.media.tumblr.com/6035bf1768e0c05901193ac1129df39d/tumblr_n28v8gQLkH1rcgdmto2_250.gifv'>"
        }
    else if (inputSen.checked ){
        mascotaJugador.innerHTML=" Bulbasaur "
        imagenJugador.innerHTML ="<img src='https://64.media.tumblr.com/4a724672ff10c9886c94434a00954a99/tumblr_n28v8gQLkH1rcgdmto1_250.gifv'>"
        }
    else{
        alert("Tienes que seleccionar una mascota") 
        location.reload()
        }
    seleccionarEnemigo()
    }
function seleccionarEnemigo(){
    let pc=aleatorio(1,3)

    
    if (pc==1 ){
        mascotaEnemiga.innerHTML = " Squirtle "
        imgenEnemigo.innerHTML ="<img src='https://64.media.tumblr.com/ca7bd49d1d414f1ccdaa4950094b6754/tumblr_n28v8gQLkH1rcgdmto3_250.gifv'>"
    }
    else if (pc==2){
        mascotaEnemiga.innerHTML = " Charmander "
        imgenEnemigo.innerHTML ="<img src='https://64.media.tumblr.com/6035bf1768e0c05901193ac1129df39d/tumblr_n28v8gQLkH1rcgdmto2_250.gifv'>"
    }
    else {
        mascotaEnemiga.innerHTML = " Bulbasaur "
        imgenEnemigo.innerHTML ="<img src='https://64.media.tumblr.com/4a724672ff10c9886c94434a00954a99/tumblr_n28v8gQLkH1rcgdmto1_250.gifv'>"
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
    else {
        ataquePc="HIERVA"
        //ataquePc=document.getElementById("ataque-enemigo")
        //ataquePc.innerHTML="HIERVA"
        }   
    ganador()
    }
function ganador(){
    if (ataquejugador==ataquePc){
        crearMensaje("empate")
        }
    else if (ataquejugador=="FUEGO" && ataquePc=="HIERVA"){
        crearMensaje("ganaste")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
        }
    else if (ataquejugador=="AGUA" && ataquePc=="FUEGO"){
        crearMensaje("Ganaste")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
        }
    else if (ataquejugador=="HIERVA" && ataquePc=="AGUA"){
        crearMensaje("Ganaste")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
        }        
    else {
        crearMensaje("Perdiste")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
        }
    revisarVidas()
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
        crearMensaje("Ganaste")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
        }
    else if (ataquejugador=="HIERVA" && ataquePc=="AGUA"){
        crearMensaje("Ganaste")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
        }        
    else {
        crearMensaje("Perdiste")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
        }
    revisarVidas()
    }
function ganador(){
    if (ataquejugador==ataquePc){
        crearMensaje("empate")
        }
    else if (ataquejugador=="FUEGO" && ataquePc=="HIERVA"){
        crearMensaje("ganaste")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
        }
    else if (ataquejugador=="AGUA" && ataquePc=="FUEGO"){
        crearMensaje("Ganaste")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
        }
    else if (ataquejugador=="HIERVA" && ataquePc=="AGUA"){
        crearMensaje("Ganaste")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
        }        
    else {
        crearMensaje("Perdiste")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
        }
    revisarVidas()
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
        crearMensaje("Ganaste")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
            }
    else if (ataquejugador=="HIERVA" && ataquePc=="AGUA"){
        crearMensaje("Ganaste")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
            }        
    else {
        crearMensaje("Perdiste")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
            }
    revisarVidas()
    }
function revisarVidas(){    
    if (vidasJugador==0) {
        crearMensajeFianl("Perdiste la Partida :(")
        } 
    else if(vidasEnemigo==0){
        crearMensajeFianl("Ganaste la Partida :)") 
        }
    }
function crearMensaje(resultado){
    let nuevoAtaqueDelJugador= document.createElement('p')
    let nuevoAtaqueDelEnemigo= document.createElement('p')
    
    mensajeNuevo.innerHTML=resultado
    nuevoAtaqueDelJugador.innerHTML=ataquejugador
    nuevoAtaqueDelEnemigo.innerHTML=ataquePc

    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)   
    }
function crearMensajeFianl(resultadoFinal){  
    sectionReiniciar.style.display='block'   
  
    mensajeNuevo.innerHTML= resultadoFinal
    //mensajeNuevo.appendChild(mensajeNuevo) //Para seguir jugando sin detenerse
    let botonFuego=document.getElementById("boton-fuego")
    botonFuego.disabled=true
    let botonAgua=document.getElementById("boton-agua")
    botonAgua.disabled=true
    let botonPlanta=document.getElementById("boton-planta")
    botonPlanta.disabled=true
    }

function reiniciarjuego(){
    location.reload() // Recarga la pagina
}
window.addEventListener('load',iniciar)
   