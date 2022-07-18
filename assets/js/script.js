const clp = document.getElementById("pesos");
const url = "https://mindicador.cl/api";
const dolar = "https://mindicador.cl/api/dolar"
const euro = "https://mindicador.cl/api/euro"
const resultado = document.getElementById("resultado");
const tabla =document.getElementById("lista-usuario")
//PEtición

function convertir() {
  if (clp.value == "") alert("Ingrese un monto válido");
  else {

    console.log(clp.value);
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (indicador) {
      if(moneda.value=='USD')
      {
      resultado.innerHTML = `Resultado: ${new Intl.NumberFormat("de-DE", {style: "currency",currency: "USD",}).format((clp.value /indicador.dolar.valor ).toFixed(2))}`;
      renderGrafica();
    }
       else
       {
        resultado.innerHTML = `Resultado: ${new Intl.NumberFormat("de-DE", {style: "currency",currency: "EUR",}).format((clp.value /indicador.euro.valor ).toFixed(2))}`;
      }
      })
      .catch(function (error) {
        console.log("Requestfailed", error);
      });
  }
}

async function cargarDatos()
{
  const tipoDeGrafica = "line";
  const titulo = "Historico Dolar";
  const colorDeLinea = "red";
 const chartDOM = document.getElementById("myChart2");
  console.log("ENtre a la funcion cargar datos")
  fetch(dolar)
        .then(respuesta => respuesta.json())
        .then(respuestaDecodificada => {
         
            let fechas = (respuestaDecodificada.serie).map(function (elemento) {return elemento.fecha;})
            let etiquetas = (respuestaDecodificada.serie).map(function (etiq) {return etiq.valor;})
           
        const config = {
          type: tipoDeGrafica,
          data: {
                  labels: fechas.reverse().slice(-10),
                  datasets: [
                                {
                                  label: titulo,
                                  borderColor: "rgb(255,0, 132)",
                                  backgroundColor: colorDeLinea,
                                  data: etiquetas.reverse().slice(-10)
                                  }
                            ]
                }
                        };

              console.log(config)          
              new Chart(chartDOM, config);
         
          });
          
}





async function renderGrafica() {
  console.log("Entre a la funcio renderGrafica")
  await cargarDatos();
 
   }
  





var select = document.getElementById("moneda");
select.addEventListener("change", function () {
  /* var selectedOption =  */this.options[select.selectedIndex];
  // console.log(selectedOption.value + ": " + selectedOption.text);
});

function valideKey(evt) {
  // code is the decimal ASCII representation of the pressed key.
  var code = evt.which ? evt.which : evt.keyCode;

  if (code == 8) {
    // backspace.
    return true;
  } else if (code >= 48 && code <= 57) {
    // is a number.
    return true;
  } else {
    // other keys.
    return false;
  }
}

////////////////////////////////// PARA DIBUJAR LA GRAFICA



// async function getAndCreateDataToChart() {
//   const res = await
//   fetch("https://api.gael.cloud/general/public/sismos");
//   const sismos = await res.json();
//   const labels = sismos.map(function (sismo) {return sismo.Fecha;});


//   const data = sismos.map((sismo) => {
//   const magnitud = sismo.Magnitud.split(" ")[0];
//   return Number(magnitud);
//   });

//   console.log(sismos)
//   console.log(data);
  
//   const datasets = [
//   {
//   label: "Sismo",
//   borderColor: "rgb(255, 99, 132)",
//   data
//   }
//   ];
//   return { labels, datasets };
//   }

//   async function renderGrafica() {
//     const data = await getAndCreateDataToChart();
//     const config = {
//     type: "line",
//     data
//     };
//     const myChart = document.getElementById("myChart");
//     myChart.style.backgroundColor = "white";
//     new Chart(myChart, config);
//     }
//    // renderGrafica();