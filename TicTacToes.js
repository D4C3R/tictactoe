let partidaActiva = true;
let jugadorActivo = 'X';
const tablero = document.querySelector('.tablero');
const casillas = Array.from(document.querySelectorAll('.casilla'));
const mensajeElement = document.getElementById('mensaje');
const botonRestart = document.getElementById('botonRestart');
const victoriaJugadorElement = document.getElementById('victoriaJugador');
const victoriaIAElement = document.getElementById('victoriaIA');
const empateElement = document.getElementById('empate');
let victoriaJugador = parseInt(localStorage.getItem('victoriaJugador')) || 0;
let victoriaIA = parseInt(localStorage.getItem('victoriaIA')) || 0;
let empate = parseInt(localStorage.getItem('empate')) || 0;

function actu() {
    localStorage.setItem('victoriaJugador', victoriaJugador);
    localStorage.setItem('victoriaIA', victoriaIA);
    localStorage.setItem('empate', empate); 
    victoriaJugadorElement.textContent = victoriaJugador;
    victoriaIAElement.textContent = victoriaIA;
    empateElement.textContent = empate;
}



function checkWin(jugador) {
    const combosGanadores = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8], 
        [2, 4, 6]
    ];

    return combosGanadores.some(combo => 
        combo.every(index => casillas[index].textContent === jugador)
    );
}





botonRestart.addEventListener('click', restartGame);

tablero.addEventListener('click', (reaccion) => {
    if (!partidaActiva) return;
    const casilla = reaccion.target;
    if (casilla.classList.contains('casilla') && !casilla.classList.contains('X') && !casilla.classList.contains('O')) {
        maketurno(casilla, 'X');
        if (checkWin('X')) {
            mensajeElement.textContent = '¡Ganaste!';
            victoriaJugador++;
            actu();
            partidaActiva = false;
            return;
        }
        if (istableroFull()) {
            mensajeElement.textContent = '¡Empate!';
            empate++;
            actu();
            partidaActiva = false;
            return;
        }

        setTimeout(computerturno, 500);
    }
});

function maketurno(casilla, jugador) {
    casilla.textContent = jugador;
    casilla.classList.add(jugador);
    casilla.classList.add('usada');
    jugadorActivo = jugador === 'X' ? 'O' : 'X';
    mensajeElement.textContent = jugador === 'X' ? 'Turno del otro jugador (IA)' : '¡Tu turno!';
    actu();
}

function computerturno() {
    const emptycasillas = casillas.filter(casilla => !casilla.classList.contains('X') && !casilla.classList.contains('O'));
    if (emptycasillas.length === 0) return;

    const randomIndex = Math.floor(Math.random() * emptycasillas.length);
    const casillatomada = emptycasillas[randomIndex];
    maketurno(casillatomada, 'O');
    if (checkWin('O')) {
        mensajeElement.textContent = 'La ia ganó!';
        victoriaIA++;
        actu();
        partidaActiva = false;
        return;
    }
    if (istableroFull()) {
        mensajeElement.textContent = '¡Empate!';
        empate++;
        actu();
        partidaActiva = false;
    }
}

function istableroFull() {
    return casillas.every(casilla => casilla.classList.contains('X') || casilla.classList.contains('O'));
}





function restartGame() {
    actu();
    casillas.forEach(casilla => {
        casilla.textContent = ''; // Clear the text content
        casilla.classList.remove('X', 'O', 'usada');
        casilla.style.pointerEvents = 'auto';
        
    });
    actu();
    partidaActiva = true;
    mensajeElement.textContent = '¡Tu turno!';
    
}
window.onload = () => {
   actu();
  };
  
