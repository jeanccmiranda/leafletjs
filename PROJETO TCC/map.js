/*mapa */

var map = L.map('map').setView([-12, -50], 5);

const baseLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add the data to the corresponding layer
fetch("estacoes.geojson")
  .then(response => response.json())
  .then(data => {
    estacoesLayer.addData(data);
  });
  
//create estacoesLayer
const estacoesLayer = L.geoJSON(null, {
  pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng, {
      color: "red",
      weight: 1,
      fillOpacity: 1,
      radius: 10
    });
  },
  onEachFeature: onEachEstacao
}).addTo(map);

// Handle the events on each layer
let selectedFeature = null;
//create popup
var popup = L.popup();

function onEachEstacao(feature, layer) {
  layer.on({
    mouseover: function(e) {
      if (!selectedFeature) {
        const info = `<strong>${feature.properties.nome}</strong>`;
        document.getElementById("table").innerHTML = info;
      }
    },
    click: function(e) {
      if (selectedFeature) {
        resetSelection();
      }
      const info = `<strong>${feature.properties.nome}</strong>`;
      document.getElementById("table").innerHTML = info;
      selectedFeature = L.geoJSON(feature, {
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, {
            color: "yellow",
            weight: 2,
            fillOpacity: 1,
            radius: 10
          });
        }
      }).addTo(map);
      
    }
  });
  //bind popup to estacoes
  layer.bindPopup(`Nome: ${feature.properties.nome}<br> Codigo: ${feature.properties.cod.toString()}`);

}



function resetSelection() {
  map.removeLayer(selectedFeature);
  selectedFeature = null;
  document.getElementById("table").innerHTML = 'Texto e informações adicionais serão exibidas aqui.'
  document.getElementById("table").innerHTML = 'Selecione um elemento e pressione o botão info.'
}

//exibe table
function onMarkerClick(e) {
    let table = document.getElementById("table");
  table.classList.toggle("visible");
}

const btn_close = document.querySelector(".btn_close");
// fecha table
btn_close.addEventListener("click", () => {
    let table = document.getElementById("table");
  table.classList.toggle("visible");
    
  });

  // funcionalidade dos containers
  const opcao1 = document.getElementById("container1");
  const opcao2 = document.getElementById("container2");
  const opcao3 = document.getElementById("container3");
  const container1 = document.querySelector(".container1");
  const container2 = document.querySelector(".container2");
  const container3 = document.querySelector(".container3");

  opcao1.addEventListener("click", ()=>{

    container1.classList.toggle("visible");
    container2.classList.remove("visible");
    container3.classList.remove("visible");

  });

  opcao2.addEventListener("click", ()=>{
    container1.classList.remove("visible");
    container2.classList.toggle("visible");
    container3.classList.remove("visible");
  });

  opcao3.addEventListener("click", ()=>{
    container1.classList.remove("visible");
    container2.classList.remove("visible");
    container3.classList.toggle("visible");
  });


