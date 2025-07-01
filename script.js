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

  for (let minuto = 1; minuto <= duracion; minuto++) {
    if (intentoGol()) {
      golesA++;
      golesDiv.innerHTML += `⚽ ¡Gol para ${equipoA} en el minuto ${minuto}!<br>`;
    }
    if (intentoGol()) {
      golesB++;
      golesDiv.innerHTML += `⚽ ¡Gol para ${equipoB} en el minuto ${minuto}!<br>`;
    }
  }

  document.getElementById("resultado").innerHTML = `Resultado final: ${equipoA} ${golesA} - ${golesB} ${equipoB}`;
 if (golesA > golesB) {
  document.getElementById("ganador").innerHTML = `🏆 Ganador: ${equipoA}`;
} else if (golesB > golesA) {
  document.getElementById("ganador").innerHTML = `🏆 Ganador: ${equipoB}`;
} else {
  document.getElementById("ganador").innerHTML = "🤝 ¡Empate!";
}

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
      historialDiv.innerHTML = "<p>Historial borrado.</p>";
    });
  });
}

