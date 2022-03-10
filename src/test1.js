juego.getDatos()
var contador = 0
texto = `Si ejecutamos 10000 veces el método aleatorio el porcentaje de veces que devuelve true es el siguiente: `
for(let i=0; i<10000; i++){
    if(juego.aleatorio()) contador++
} 
console.log(texto + contador/100)
