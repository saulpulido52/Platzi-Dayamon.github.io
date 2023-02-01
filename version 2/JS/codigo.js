function generate(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}
function eleccion(juagda){
    let resultado=""
    if (juagda ==1){
        resultado = "Piedra ✊ "}
    else if (juagda==2) {
        resultado = "papel ✋ "}
    else if (juagda==3){
        resultado = "tijera ✌✌✌ "}
    else {
        resultado="MAL ELEGIDO"
    }
    return resultado
}
//1 es píedra, 2 papel, 3 es tijera   
let jugador=0
var ganar=0
var perdida=0

while (ganar <3 && perdida < 3){
    let pc= generate(1,3)
    jugador= prompt("Elige: 1 para piedra, 2 para papel, 3 para tijera ")
    alert("Pc elige: " + eleccion(pc))
    alert("Elegiste: " + eleccion(jugador))
    if (jugador > pc ){
        alert("Ganaste 🙌🙌🙌")
        ganar+=1;}
        
    else if(jugador==pc){
        alert("Empate 😮😮")}
    else {
        alert("Perdiste 🙇‍♂️🙇‍♂️🙇‍♀️")
        perdida+=1;} 
//alert("elegiste "+ jugador)

} 
alert("Ganaste: " +ganar + " Perdiste: " + perdida)
