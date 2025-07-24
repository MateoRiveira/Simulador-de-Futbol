fetch('https://v3.football.api-sports.io/teams?league=39&season=2023', {
  method: 'GET',
  headers: {
    'x-apisports-key': 'a4dc48c5fac8413080da0e438eae483d'
  }
})
.then(response => response.json())
.then(data => {
  console.log('Datos recibidos de la API:', data);
})
.catch(error => {
  console.error('Error al acceder a la API:', error);
});

//LISTAS DE EQUIPOS 
const Europeos = ["Manchester City", "Liverpool", "Arsenal", "Tottenham", "Chelsea", "Manchester United", "FC Barcelona", "Atlético de Madrid", "Real Madrid", "Inter de Milán", "Milan", "Juventus", "Napoli", "Lazio", "Roma", "Paris Saint-Germain", "Olympique Marsella", "Lyon", "Bayern Mùnich", "Borrusia Dortmund", "Bayer Leverkusen"];

const Sudamericanos = ["River Plate", "Boca Juniors", "Independiente", "Palmeiras", "Flamengo", "Sao Paulo", "Gremio", "Botafogo", "Nacional", "Peñarol", "Colo Colo", "U de Chile", "Atlético Nacional", "Millonarios", "DIM", "LDU Quito", "Independiente del Valle", "Barcelona SC", "Olimpia", "Cerro Porteño", "Libertad"];

const Selecciones = ["Argentina", "Uruguay", "Brasil", "Colombia", "Ecuador", "Francia", "Alemania", "Italia", "España", "Inglaterra", "Holanda", "Portugal", "San Marino", "Senegal", "Marruecos", "Egipto", "Sudafrica", "Guinea", "Japon", "China", "Corea del Sur", "Qatar", "Arabia Saudita", "Uzbekistan", "Jordania", "Australia", "Nueva Zelanda", "Iran", "Irak", "Estados Unidos", "Mexico", "Canada"];

const Norteamericanos = ["LA Galaxy", "Inter Miami", "Toronto FC", "Seattle Sounders", "CF Montréal", "New York City FC", "Club América", "Chivas Guadalajara", "Tigres UANL", "Cruz Azul"];

const Africanos = ["Al Ahly", "Espérance de Tunis", "Wydad Casablanca", "Mamelodi Sundowns", "Orlando Pirates"];

const Asiaticos = ["Al Hilal", "Al Nassr", "Urawa Red Diamonds", "Vissel Kobe", "Sanfrecce Hiroshima", "Shanghai Port", "FC Seoul", "Yokohama F. Marinos", "Al Sadd", "Al Ittihidad", "Al Wehda"];

const TodosLosEquipos = [...Europeos, ...Sudamericanos, ...Norteamericanos, ...Africanos, ...Asiaticos, ...Selecciones];


//funcion seleccion de equipos
function seleccionarDosEquiposAleatorios(lista) {
  const indiceA = Math.floor(Math.random() * lista.length);
  let indiceB;
  do {
    indiceB = Math.floor(Math.random() * lista.length);
  } while (indiceB === indiceA);
  return [lista[indiceA], lista[indiceB]];
}

//Funcion intento de gol
function intentoGol() {
  return Math.random() < 0.05;
}

//index.html
if (document.title === "Simulador de Futbol") {
  const [equipoA, equipoB] = seleccionarDosEquiposAleatorios(TodosLosEquipos);
  document.getElementById("partido").innerHTML = `⚽ Partido entre: ${equipoA} vs ${equipoB}`;

  let golesA = 0;
  let golesB = 0;
  const duracion = 90;
  const golesDiv = document.getElementById("goles");

  //Simular Partido 
  let eventos = [];
  for (let minuto = 1; minuto <= duracion; minuto++) {
    if (intentoGol()) {
      golesA++;
      eventos.push(`⚽ ¡Gol para ${equipoA} en el minuto ${minuto}!`);
    }
    if (intentoGol()) {
      golesB++;
      eventos.push(`⚽ ¡Gol para ${equipoB} en el minuto ${minuto}!`);
    }
  }

  //Mostrar los goles uno a uno 
  let i = 0;
  golesDiv.innerHTML = ""; //Limpia antes de empezar
  const intervalo = setInterval(() => {
    if (i < eventos.length) {
      golesDiv.innerHTML += eventos[i] + "<br>";
      i++;
    } else {
      clearInterval(intervalo);
      //Resultado final
      Swal.fire({
        title: 'Resultado Final',
        html: `<strong>${equipoA} ${golesA} - ${golesB} ${equipoB}</strong><br><br>` +
              (golesA > golesB
                ? `🏆 Ganador: ${equipoA}`
                : golesB > golesA
                ? `🏆 Ganador: ${equipoB}`
                : '🤝 ¡Empate!'),
        icon: 'info'
      });
      // Guardar en historial
      const resultadoPartido = {
        equipoA,
        golesA,
        equipoB,
        golesB,
        fecha: new Date().toLocaleString()
      };
      let historial = JSON.parse(localStorage.getItem("historialPartidos")) || [];
      historial.push(resultadoPartido);
      localStorage.setItem("historialPartidos", JSON.stringify(historial));
    }
  }, 1800);}



//historial.html 
if (document.title === "Historial") {
  document.addEventListener("DOMContentLoaded", () => {
    const historialDiv = document.getElementById("historial");
    const borrarBtn = document.getElementById("borrarhistorial");
    const historial = JSON.parse(localStorage.getItem("historialPartidos")) || [];

    if (historial.length === 0) {
      historialDiv.innerHTML = "<p>No hay partidos jugados aún.</p>";
    } else {
      historial.forEach(partido => {
        historialDiv.innerHTML += `<p>${partido.fecha} - ${partido.equipoA} ${partido.golesA} - ${partido.golesB} ${partido.equipoB}</p>`;
      });
    }

    borrarBtn.addEventListener("click", () => {
      localStorage.removeItem("historialPartidos");
      historialDiv.innerHTML = "<p>Historial borrado.</p>";});
  });
}