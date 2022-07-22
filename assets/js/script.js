const clp = document.getElementById("pesos");
const urlAPI = "https://mindicador.cl/api";
const resultado = document.getElementById("resultado");
const tabla = document.getElementById("lista-usuario");
const moneda = document.getElementById("moneda");
const chartDOM = document.getElementById("myChart2").getContext("2d");
const cantidad = document.getElementById("cantidad");

document.querySelector(".fecha").innerHTML = new Date().toLocaleString();

//PEtición++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

async function getMonedas(url) {
  try {
    const res = await fetch(url);
    const monedas = await res.json();
    return monedas;
  } catch (e) {
    alert("Algo anda mal con la API. Intente nuevamente", e.message);
  }
}
/*
 ****************************************************************************************
 */
async function convertir() {
   const currency =moneda.options[moneda.selectedIndex].text.substring(0, 3); //Extraer los 3 primeros caracteres de la cadena para asignarlo al currency
 
  if (clp.value == "" || isNaN(clp.value) || clp.value < 0) {
        alert("Ingrese un monto válido");
        limpiar();  
  } 
  else {
      try {
        const divisas = await getMonedas(urlAPI);

        resultado.innerHTML = `Resultado: ${new Intl.NumberFormat("de-DE", {
          style: "currency", currency: currency}).format((clp.value / divisas[moneda.value].valor).toFixed(2))}`;

          renderGrafica();
      } 
      catch (err) {
        alert("Algo anda mal. Intente la consulta nuevamente");
      }
  }
}

async function cargarDatos(moneda) {
  try {
    const divisas = await getMonedas(urlAPI + "/" + moneda.value);
    const fechas = divisas.serie.map((elemento) => {
      return elemento.fecha.split("T")[0];
    });
    const etiquetas = divisas.serie.map((etiq) => {return etiq.valor;});

    return { fechas, etiquetas };
  } catch (e) {
    alert("Fallo en la obtención de datos para la gráfica. Intente nuevamente");
  }
}


/////////////////////////////////////////////////////////

async function renderGrafica() {
  const tipoDeGrafica = "line";
  const colorBG = "#" + randomHex(6);
  const colorDeLinea = "#" + randomHex(6);     

  try {
  const datosRender= await cargarDatos(moneda);
  const titulo = moneda.value.toUpperCase();
 
  const config = {
    type: tipoDeGrafica,
    data: {
      labels: datosRender.fechas.reverse().slice(-10),
      datasets: [
        {
          //Aqui cada objeto representa un indicador que sera visualizado en la grafica
          label: titulo,
          borderColor: colorBG,
          backgroundColor: colorDeLinea,
          data: datosRender.etiquetas.reverse().slice(-10),
        },
      ],
    },
  };

  //Refrescar el grafico

  if (window.chartDOM) {
    window.chartDOM.clear();
    window.chartDOM.destroy();
    
  }
  
  window.chartDOM = new Chart(chartDOM, config);
}
catch(err){
  alert("Hubo un fallo en la carga de datos, por favor, reintente")
}
}

// moneda.addEventListener("change", () => this.options[moneda.selectedIndex]);

clp.addEventListener("change",  ()=> {
 
  const options2 = { style: "currency", currency: "CLP" };
  const numberFormat2 = new Intl.NumberFormat("es-cl",options2);
  cantidad.innerHTML = `Monto a convertir: ${numberFormat2.format(clp.value)}`
 
});
//GEnerar los colores de lineas aleatoriamente en cada busqueda
randomHex = (length) => ("0".repeat(length) + Math.floor(Math.random() * 16 ** length).toString(16)).slice(-length);

// Limpiar valores mostrados
function limpiar()
{
        clp.value = "";
        resultado.innerHTML="Resultado: ";
        cantidad.innerHTML="Monto a convertir: ";
        window.chartDOM.clear();       
}