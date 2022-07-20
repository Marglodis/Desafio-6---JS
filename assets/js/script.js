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
  await fetch(dolar)
        .then(respuesta => respuesta.json())
        .then(respuestaDecodificada => {
         
            const fechas = (respuestaDecodificada.serie).map(function (elemento) {return elemento.fecha;})
            const etiquetas = (respuestaDecodificada.serie).map(function (etiq) {return etiq.valor;})
           
        const config = {
          type: tipoDeGrafica,
          data: {
                  labels: fechas.reverse().slice(-10),
                  datasets: [                                           //Aqui cada objeto representa un inidcador que sera visualizado en la grafica
                                {
                                  label: titulo,
                                  borderColor: "rgb(255,0, 132)",
                                  backgroundColor: colorDeLinea,
                                  data: etiquetas.reverse().slice(-10)
                                  },
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
