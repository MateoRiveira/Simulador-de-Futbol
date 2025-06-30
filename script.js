
// Equipos europeos
const Europeos = [
  "Manchester City",
  "Liverpool",
  "Arsenal",
  "Tottenham",
  "Chelsea",
  "Manchester United",
  "FC Barcelona",
  "Atlético de Madrid",
  "Real Madrid",
  "Inter de Milán",
  "Milan",
  "Juventus",
  "Napoli",
  "Lazio",
  "Roma",
  "Paris Saint-Germain",
  "Olympique Marsella",
  "Lyon",
  "Bayern Múnich",
  "Borrusia Dortmund",
  "Bayer Leverkusen"
];


// Equipos sudamericanos
const Sudamericanos = [
  "River Plate",
  "Boca Juniors",
  "Independiente",
  "Palmeiras",
  "Flamengo",
  "Sao Paulo",
  "Gremio",
  "Botafogo",
  "Nacional",
  "Peñarol",
  "Colo Colo",
  "U de Chile",
  "Atlético Nacional",
  "Millonarios",
  "DIM",
  "LDU Quito",
  "Independiente del Valle",
  "Barcelona SC",
  "Olimpia",
  "Cerro Porteño",
  "Libertad"
];


// Equipos de selecciones nacionales
const Selecciones = [
  "Argentina",
  "Uruguay",
  "Brasil",
  "Colombia",
  "Ecuador",
  "Francia",
  "Alemania",
  "Italia",
  "España",
  "Inglaterra",
  "Holanda",
  "Portugal",
  "San Marino",
  "Senegal",
  "Marruecos",
  "Egipto",
  "Sudafrica",
  "Guinea",
  "Japon",
  "China",
  "Corea del Sur",
  "Qatar",
  "Arabia Saudita",
  "Uzbekistan",
  "Jordania",
  "Australia",
  "Nueva Zelanda",
  "Iran",
  "Irak",
  "Estados Unidos",
  "Mexico",
  "Canada"
];

//Equipos Norteamericanos
const Norteamericanos = [
  "LA Galaxy",
  "Inter Miami",
  "Toronto FC",
  "Seattle Sounders",
  "CF Montréal",
  "New York City FC",
  "Club América",
  "Chivas Guadalajara",
  "Tigres UANL",
  "Cruz Azul"
];

//Equipos Africanos
const Africanos = [
  "Al Ahly",
  "Espérance de Tunis",
  "Wydad Casablanca",
  "Mamelodi Sundowns",
  "Orlando Pirates"
];


//Equipos Asiaticos
const Asiaticos = [
  "Al Hilal",
  "Al Nassr",
  "Urawa Red Diamonds",
  "Vissel Kobe",
  "Sanfrecce Hiroshima",
  "Shanghai Port",
  "FC Seoul",
  "Yokohama F. Marinos",
  "Al Sadd",
  "Al Ittihidad",
  "Al Wehda"
];

//Todos los equipos
const TodosLosEquipos = [
  ...Europeos,
  ...Sudamericanos,
  ...Norteamericanos,
  ...Africanos,
  ...Asiaticos,
  ...Selecciones
];

//Seleccion de equipos
function seleccionarDosEquiposAleatorios(lista) {
  const indiceA = Math.floor(Math.random() * lista.length);
  let indiceB;
  do {
    indiceB = Math.floor(Math.random() * lista.length);
  } while (indiceB === indiceA);
  return [lista[indiceA], lista[indiceB]];
}

const [equipoA, equipoB] = seleccionarDosEquiposAleatorios(TodosLosEquipos);
let partido = document.getElementById("partido");
console.log(`⚽ Partido entre: ${equipoA} vs ${equipoB}`);
partido.innerHTML =`⚽ Partido entre: ${equipoA} vs ${equipoB}`

// Marcador inicial
let golesA = 0;
let golesB = 0;



// Duración del partido en "turnos"
const duracion = 90; //90 minutos




// Función para simular si un equipo marca un gol en un turno
const golesequipos = document.getElementById("goles");
function intentoGol() {
  // Probabilidad simple: 5% de marcar gol cada turno
  return Math.random() < 0.05;
}

// Simulación del partido
  for (let minuto = 1; minuto <= duracion; minuto++) {

  // Equipo A intenta
  if (intentoGol()) {
    golesA++;
    console.log(`¡Gol para ${equipoA} en el minuto ${minuto}!`);
    golesequipos.innerHTML += `⚽ ¡Gol para ${equipoA} en el minuto ${minuto}!`;
  }
  
  // Equipo B intenta
  if (intentoGol()) {
    golesB++;
    console.log(`¡Gol para ${equipoB} en el minuto ${minuto}!`);
    golesequipos.innerHTML += `⚽ ¡Gol para ${equipoB} en el minuto ${minuto}!`;
  }

}




// Resultado final
console.log(`Resultado final: ${equipoA} ${golesA} - ${golesB} ${equipoB}`);

let resultadofinal = document.getElementById("resultado");
resultadofinal.innerHTML = `Resultado final: ${equipoA} ${golesA} - ${golesB} ${equipoB}`


let ganador = document.getElementById("ganador");
if (golesA > golesB) {
    console.log(`🏆 Ganador: ${equipoA}`);
    ganador.innerHTML = `🏆 Ganador: ${equipoA}`;
  } else if (golesB > golesA) {
    console.log(`🏆 Ganador: ${equipoB}`);
    ganador.innerHTML =`🏆 Ganador: ${equipoB}`;
  } else {
    console.log("🤝 ¡Empate!");
    ganador.innerHTML = "🤝 ¡Empate!";
  }

