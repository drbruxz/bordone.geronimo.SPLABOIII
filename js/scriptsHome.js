import { Anuncio_Auto } from "./classes.js";
import { crearItemListado } from "./dinamicas.js";
import { BASE_URL as URL } from "./config.js";
import { getAutosAsync } from "./backend.js";

const $divListadoArticulos = document.getElementById("container-adds-listing");
const listadoAutomoviles = await getAutosAsync(URL);

crearListadoArticulos(listadoAutomoviles);
function crearListadoArticulos(arrayListado) {
  arrayListado.forEach((element) => {
    $divListadoArticulos.appendChild(crearItemListado(element));
    // crearItemListado(element);
  });
}
