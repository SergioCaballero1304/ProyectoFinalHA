// Mi código JavaScript:
const selectAnio = document.querySelector("#anio");
const marca = document.querySelector("#marca");
const modelo = document.querySelector("#modelo");
const estado = document.querySelector("#estado");
const divAutos = document.querySelector("#divAutos");
const botonFiltrar = document.querySelector("#botonFiltrar");
const divError = document.querySelector("#divError");

for (let index = 2024; index >= 1900; index--) {
  const option = document.createElement("option");

  option.textContent = index;
  option.setAttribute("value", index);
  selectAnio.append(option);
}

import { url } from "../api.js";

fetch(url)
  .then(function (respuestaServidor) {
    return respuestaServidor.json();
  })
  .then(function (listaMarcas) {
    listaMarcas.forEach(function (marcaSeleccionada) {
      const option = document.createElement("option");

      option.textContent = marcaSeleccionada;
      option.setAttribute("value", marcaSeleccionada);
      marca.append(option);
    });
  });

marca.addEventListener("change", function () {
  const urlModelos =
    "https://ha-front-api-proyecto-final.vercel.app/models?brand=" +
    marca.value;

  fetch(urlModelos)
    .then(function (respuestaServidor) {
      return respuestaServidor.json();
    })
    .then(function (listaModelos) {
      modelo.innerHTML = "";
      if (listaModelos.length > 0) {
        listaModelos.forEach(function (modeloSeleccionado) {
          const option = document.createElement("option");
          modelo.removeAttribute("disabled");

          option.textContent = modeloSeleccionado;
          option.setAttribute("value", modeloSeleccionado);
          modelo.append(option);
        });
      } else {
        modelo.setAttribute("disabled", true);
        const option = document.createElement("option");

        option.textContent = "Seleccionar...";
        modelo.append(option);
      }
      console.log(listaModelos);
    });
});

const urlAutos = "https://ha-front-api-proyecto-final.vercel.app/cars";

fetch(urlAutos)
  .then(function (respuestaServidor) {
    return respuestaServidor.json();
  })
  .then(function (listaAutos) {
    for (const auto of listaAutos) {
      let stars = "";
      for (let index = 1; index <= 5; index++) {
        if (auto.rating > index) {
          stars += `<i class="fa-solid fa-star rating-stars"></i>`;
        } else {
          stars += `<i class="fa-regular fa-star rating-stars"></i>`;
        }
      }
      let spanNuevo = "";
      if (auto.status) {
        spanNuevo = `<span class="badge bg-warning position-absolute m-2">
                      Nuevo
                    </span>`;
      }
      divAutos.insertAdjacentHTML(
        "beforeend",
        `<div class="row">
                <div class="col-md-4">
                  <div class="position-relative div-auto">
                    ${spanNuevo}
                    <img class="img-fluid" src=${auto.image} alt=${
          auto.brand
        } ${auto.model} />
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="row">
                    <div class="col-xl-7">
                      <h3>${auto.brand} ${auto.model}</h3>
                    </div>
                    <div class="col-xl-5">
                      ${auto.year} | USD ${parseInt(
          auto.price_usd
        ).toLocaleString()} | ${stars}
                    </div>
                  </div>
                  <p>
                    ${auto.description}
                  </p>
                  <button class="btn btn-success">
                    <i class="fa-solid fa-cart-shopping"></i> Comprar
                  </button>
                  <button class="btn botones-autos">
                    <i class="fa-regular fa-square-plus"></i> Mas Informacion
                  </button>
                  <button class="btn botones-autos">
                    <i class="fa-regular fa-share-from-square"></i> Compartir
                  </button>
                </div>
              </div>
              <hr />`
      );
    }
  });

botonFiltrar.addEventListener("click", function () {
  divAutos.innerHTML = "";
  let valorAnio = selectAnio.value;
  let valorMarca = marca.value;
  let valorModelo = modelo.value;
  let valorEstado = estado.value;

  let urlFiltro =
    "https://ha-front-api-proyecto-final.vercel.app/cars?year=" +
    valorAnio +
    "&brand=" +
    valorMarca +
    "&model=" +
    valorModelo +
    "&status=" +
    valorEstado;

  fetch(urlFiltro)
    .then(function (respuestaServidor) {
      return respuestaServidor.json();
    })
    .then(function (listaFiltro) {
      for (const auto of listaFiltro) {
        let stars = "";
        for (let index = 1; index <= 5; index++) {
          if (auto.rating > index) {
            stars += `<i class="fa-solid fa-star rating-stars"></i>`;
          } else {
            stars += `<i class="fa-regular fa-star rating-stars"></i>`;
          }
        }
        let spanNuevo = "";
        if (auto.status) {
          spanNuevo = `<span class="badge bg-warning position-absolute m-2">
                      Nuevo
                    </span>`;
        }
        divAutos.insertAdjacentHTML(
          "beforeend",
          `<div class="row">
                <div class="col-4">
                  <div class="position-relative div-auto">
                    ${spanNuevo}
                    <img class="img-fluid" src=${auto.image} alt=${
            auto.brand
          } ${auto.model} />
                  </div>
                </div>
                <div class="col-8">
                  <div class="row">
                    <div class="col-xl-7">
                      <h3>${auto.brand} ${auto.model}</h3>
                    </div>
                    <div class="col-xl-5">
                      ${auto.year} | USD ${parseInt(
            auto.price_usd
          ).toLocaleString()} | ${stars}
                    </div>
                  </div>
                  <p>
                    ${auto.description}
                  </p>
                  <button class="btn btn-success">
                    <i class="fa-solid fa-cart-shopping"></i> Comprar
                  </button>
                  <button class="btn botones-autos">
                    <i class="fa-regular fa-square-plus"></i> Mas Informacion
                  </button>
                  <button class="btn botones-autos">
                    <i class="fa-regular fa-share-from-square"></i> Compartir
                  </button>
                </div>
              </div>
              <hr />`
        );
      }
      if (listaFiltro.length === 0) {
        divError.style.display = "block";
      } else {
        divError.style.display = "none";
      }
    });
});
