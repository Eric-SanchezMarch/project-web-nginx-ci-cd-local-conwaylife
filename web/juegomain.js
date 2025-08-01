var canvas;
var ctx;    //context
var fps =300; // Controlar tasa de fps
var canvasX = 800; // el tamany de la pantalla en px
var canvasY = 800;
var tileX, tileY;

// variablestablero del juego
var tablero;
var filas = 200;
var columnas = 200;


//color dels automates
var blanco = '#A0E311';
var negro = '#000000';


// Generem el mapa 2D
function creaArray2D(f,c){
    var obj = new Array(f);
    for (y = 0; y < f; y++){
        obj[y] = new Array(c);
        }
    return obj;
    }

// objecte 
class agente {
    constructor(x, y, estado) {
        this.x = x;
        this.y = y;
        this.estado = estado;                                               //si esta vivo o muerto
        this.estadoProx = this.estado;                                      // estado que tendra el siguiente ciclo 
        this.vecinos = [];

        
        this.addVecinos = function () {                                     // guardem el llistat dels seus veins
            var xVecino;
            var yVecino;
            var i,j;
            for (i = -1; i < 2; i++) {
                for (j = -1; j < 2; j++) {

                    xVecino = (this.x + j + columnas) % columnas;
                    yVecino = (this.y + i + filas) % filas;
                    if (i != 0 || j != 0) { // descartamos el agente
                        this.vecinos.push(tablero[yVecino][xVecino]);
                    }
                }
            }
        };

        this.dibuja = function(){
            var color;
            if (this.estado == 1) {
                color = blanco;
            }
            else {
                color = negro;
            }
            ctx.fillStyle = color;
            ctx.fillRect(this.x * tileX, this.y * tileY, tileX, tileY);
        };


        // lleis de Conway
        this.nuevoCiclo = function(){
            var suma = 0;
            var i;
            // calculamos la cantidad de vecinos vivos
            for (i = 0; i < this.vecinos.length; i++) {
                suma += this.vecinos[i].estado;
                }
            this.estadoProx = this.estado; // per defecte ho deixem igual
            // normas

            //muerte
            if (suma < 2 || suma > 3) {
                this.estadoProx = 0;
                }

            // vida reproduccion con 3 vecinos.
            if (suma == 3) {
                this.estadoProx = 1;
                }
            }

        this.mutacion = function(){
            this.estado = this.estadoProx;    
            }

    }
}


function inicializaTablero(obj){
    var estado;
    for(y=0; y< filas; y++){
        for(x=0; x< columnas; x++){
            estado = Math.floor(Math.random()*2);
            obj[y][x] = new agente (x,y,estado);
        }
    }
    for(y=0; y< filas; y++){
        for(x=0; x< columnas; x++){
            obj[y][x].addVecinos();
        }
    }


}



function inicializa(){  
    canvas = document.getElementById('canvas');     // Associem el vancas
    ctx = canvas.getContext('2d');


    canvas.width = canvasX;                         // Ajustem el tamany del canvas
    canvas.height = canvasY;

    tileX = Math.floor(canvasX/filas);              // redondeig de canvas,sense decimals
    tileY = Math.floor(canvasY/columnas);

    tablero = creaArray2D(filas,columnas);          // Creem el tablero
    inicializaTablero(tablero); // inicializamos tablero
    
    setInterval(function(){principal();},1000/fps); // ejecutamos el bucle principal // setInterval crea un bucle cada x intervales,

}

function dibujaTablero(obj){

    // dibuixa els agents
    for( y = 0; y < filas; y++){
        for( x = 0; x < columnas; x++){
            obj[y][x].dibuja();
        }
    }

    //Calcula el seguent cicle
    for( y = 0; y < filas; y++){
        for( x = 0; x < columnas; x++){
            obj[y][x].nuevoCiclo();

        }
    }

    // aplica la mutacio
    for( y = 0; y < filas; y++){
        for( x = 0; x < columnas; x++){
            obj[y][x].mutacion();
            
        }
    }

}

function borraCanvas(){                             // Tras cada fotograma s'actialitazara la pantalla.
    canvas.width = canvas.width;
    canvas.height =canvas.height;
}


function principal(){
    console.log('fotograma');
    borraCanvas();
    dibujaTablero(tablero);
}























