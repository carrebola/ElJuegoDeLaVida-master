//Clase Juego
class Juego{
    constructor(Columnas, Filas, Porcentaje, piezas){
        this.universo = ''//(será el código html que contendrá el juego)
        this.columnas = Columnas
        this.filas = Filas
        this.matriz = []
        this.porcentajeInicial = Porcentaje
        this.teclaPulsada = ''
        this.piezas = piezas
        this.pieza = [[true]]
    }
      //Métodos:
    getDatos(){
        console.log(`   columnas: ${this.columnas} , filas: ${this.filas} , porcentaje: ${this.porcentajeInicial} ...
        `)
    } // Muestra por consola los datos del objeto
    dibujaUniverso(){
        this.universo =`<div id="universo">`
        for(let filas=0;filas<this.filas;filas++){
            this.universo+=`<div>`
            for(let columnas=0;columnas<this.columnas;columnas++){
                if(this.matriz[filas][columnas]){
                    var clase = 'viva'
                } else{
                    var clase = 'muerta'
                }
                this.universo+=`<div id="celda-${filas}-${columnas}" data-estado="${clase}" class="${clase} celda"></div>`
            }
            this.universo+=`</div>`
        }
        this.universo+=`</div>`
    }
    aleatorio(){
        if(Math.random()*100 < this.porcentajeInicial){
            return true
        }else{
            return false
        }
    }
    crearMatriz(){
        for(let filas = 0; filas<this.filas ; filas++){
            this.matriz[filas] = []
            for(let columnas = 0; columnas<this.columnas;columnas++){
                this.matriz[filas][columnas]=this.aleatorio()
            }
        }
    }
    getVecinosVivos(fila,columna){
        var vivos = 0
        const x = columna
        const y = fila
        //arriba izq
        if(y>0 && x>0){
            if(this.matriz[y-1][x-1]){
                vivos++
            }
        } 
        //arriba centro
        if(y>0){
            if(this.matriz[y-1][x]){
                vivos++
            }
        }
        //arriba derecha
        if(y>0 && x<this.matriz[0].length-1){
            if(this.matriz[y-1][x+1]){
                vivos++
            }
        }
        //izq
        if(x>0){
            if(this.matriz[y][x-1]){
                vivos++
            }
        }
        //derecha
        if(x<this.matriz[0].length-1){
            if(this.matriz[y][x+1]){
                vivos++
            }
        }
        //abajo izq
        if(y<this.matriz.length-1 && x>0){
            if(this.matriz[y+1][x-1]){
                vivos++
            }
        }

        //abajo centro
        if(y<this.matriz.length-1){
            if(this.matriz[y+1][x]){
                vivos++
            }
        }
        //abajo derecha
        if(y<this.matriz.length-1 && x<this.matriz[0].length-1){
            if(this.matriz[y+1][x+1]){
                vivos++
            }
        }
            return vivos
    }
    getNuevoEstadoCasilla(fila, columna){
        var celdaViva = this.matriz[fila][columna]
        if(celdaViva){
            if(this.getVecinosVivos(fila,columna)<2 || this.getVecinosVivos(fila,columna)>3){ 
                return false
            }else return true
            
        }else{
            if(this.getVecinosVivos(fila,columna)==3){ 
                return true
            }
        }return false
    }
    evolucionarMatriz(){
        console.log(this.matriz)
        var nuevaMatriz = []
        
      
        for(let filas = 0; filas<this.filas ; filas++){
            nuevaMatriz[filas] = []
            for(let columnas = 0; columnas<this.columnas;columnas++){
                nuevaMatriz[filas][columnas]=this.getNuevoEstadoCasilla(filas, columnas)
            }
        }
        console.log(nuevaMatriz)
        this.matriz = nuevaMatriz.slice(0)

    }
    evoluciona(){
        this.evolucionarMatriz()
        this.dibujaUniverso()
        document.querySelector('.app').innerHTML = juego.universo

    }
    insertarPieza(fila, columna){
        console.log(this.pieza[0][0])
        // actualizamos matriz
        for(let f=0;f<this.pieza.length;f++){
            for(let c=0;c<this.pieza[0].length;c++){
                this.matriz[fila+f][columna+c] = this.pieza[f][c]
                const id = `celda-${fila+f}-${columna+c}`
                const casilla = document.querySelector(`#${id}`)
                if(this.pieza[f][c]){
                    casilla.classList.remove('muerta')
                    casilla.classList.add('viva')
                }else{
                    casilla.classList.add('muerta')
                    casilla.classList.remove('viva')
                }
                
            }
        }
    }
    start(){
        juego.crearMatriz()
        juego.dibujaUniverso()
        document.querySelector('.app').innerHTML = this.universo
        document.addEventListener('keypress' , (tecla)=>{
            console.log('tecla: ' + tecla.key)
            this.teclaPulsada = tecla.key
        })
        document.addEventListener('keyup' , (tecla)=>{
            console.log('tecla: ' + tecla.key)
            this.teclaPulsada = ''
        })
        

        //Añadimos listener a cada celda para actualizar 
        document.querySelector('#universo').addEventListener('mouseover' , (celda)=>{
            //con a pulsada pintamos al pasar raton por encima
            if(this.teclaPulsada == 'a'){
                if(celda.target.classList.contains('celda')){
                    var id = celda.target.getAttribute('id')
                    document.querySelector(`#${id}`).classList.remove('muerta')
                    document.querySelector(`#${id}`).classList.add('viva')
                    let fila = id.split('-')[1]
                    let columna = id.split('-')[2]
                    this.matriz[parseInt(fila)][parseInt(columna)] = true
                }
            }
            
        })
        // Con click se modifica estado de casilla
        document.querySelector('#universo').addEventListener('click' , (celda)=>{
                if(celda.target.classList.contains('celda')){
                    var id = celda.target.getAttribute('id')
                    let fila = id.split('-')[1]
                    let columna = id.split('-')[2]
                    this.matriz[fila][columna] = true
                    //cuidado, el split devuelve texto
                    fila = parseInt(fila)
                    columna = parseInt(columna)
                    this.insertarPieza(fila,columna)
                    console.log(this.matriz)
                }
        })

        const boton = document.querySelector('#start')
        boton.addEventListener('click' ,()=>{
            this.frames = setInterval( ()=>this.evoluciona() ,100)
        })
    }
}
