


//Instanciamos el objeto 

var crear = document.querySelector("#crear").addEventListener('click',()=>{
    var porcentaje = document.querySelector("#porcentaje").value
    juego = new Juego(60, 20, porcentaje, piezas) // Instanciamos el objeto de 5 x 4 y con un 20% de celdas vivas
    juego.start()

})


//PIEZAS
//Cargar piezas a partir de documento json
var options = '<option value="0">Selecciona pieza</option>'
piezas.forEach((element, index) => {
    options+= `<option value = ${index}>${element.nombre}</option>`
    
    console.log(element)
});

//Cambio en selección inserta pieza
document.querySelector('.piezas select').innerHTML = options
document.querySelector('.piezas select').addEventListener('change' , (element)=>{
    console.log(element.target.value)
    //sacamos dato de json
    var nombre = juego.piezas[element.target.value].nombre
    var array = juego.piezas[element.target.value].array
    console.log(array)
    juego.pieza = array
    //dibujar array en select
    var dibujo = ''
    for(let fila=0; fila<array.length;fila++){
        dibujo+=`<div class="fila">`
        for(let col=0;col<array[0].length;col++){
            let clase = 'muerta'
            if(array[fila][col]) clase = 'viva'
            dibujo+=`<div class="celda ${clase}"></div>`
        }
        dibujo+=`</div>`
    }
    document.querySelector('.dibujo_pieza').innerHTML = dibujo

})

