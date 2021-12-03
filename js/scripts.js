import { crearTabla } from "./dinamicas.js";
import { Anuncio_Auto } from "./classes.js";
import { BASE_URL as URL } from "./config.js";
import { deleteAuto, getAutoById, createAuto, updateAuto } from "./backend.js";
// import { getListadoAnuncios } from "./backend.js";

const $divTabla = document.getElementById("appTable");
const $spinnerContainer = document.getElementsByClassName("spinner-container");
const $deleteButtonContainer = document.getElementsByClassName(
  "button-delete-container"
);
const $cancelButtonContainer = document.getElementsByClassName(
  "button-cancel-container"
);
const $deleteButton = document.getElementById("delete-button");
$deleteButton.setAttribute("class", "btn btn-danger");
const $cancelButton = document.getElementById("cancel-button");
$cancelButton.setAttribute("class", "btn btn-warning");
const $saveAndModifyButton = document.getElementById("save-and-modify-button");
$saveAndModifyButton.setAttribute("class", "btn btn-primary");

const $customAlertContainer = document.getElementById("custom-alert");
const $buttonAlert = document.getElementById("button-alert");
const $alertMessage = document.getElementById("custom-alert-message");

const $formulario = document.forms[0];

const $filtro = document.getElementById("selectFiltro");
const $promedioPrecio = document.getElementById("text-promedio");
const $maximoPrecio = document.getElementById("text-maximo-precio");
const $minimoPrecio = document.getElementById("text-minimo-precio");
const $promedioPotencia = document.getElementById("text-promedio-potencia");

// const $checklist = document.getElementsByClassName("form-check-input");
const checkboxes = document.querySelectorAll(".form-check-input");
let listadoAnunciosTemp = [];

const listadoCheckboxes = JSON.parse(localStorage.getItem("checkboxes")) || {};

let listadoAnuncios = [];
let parsedList = [];

actualizarTabla();
hideAlert();

$deleteButton.addEventListener("click", (e) => {
  e.preventDefault();
  let $id = document.getElementById("txtId").value;
  handlerDelete(parseInt($id));
});

$cancelButton.addEventListener("click", (e) => {
  e.preventDefault();
  $saveAndModifyButton.value = "Guardar";
  resetTable();
});

const handlerCheckbox = (e) => {
  let objectFilter = {};
  checkboxes.forEach((node) => {
    objectFilter[node.name] = node.checked;
  });
  localStorage.setItem("checkboxes", JSON.stringify(objectFilter));
  const parsedAdList = listadoAnunciosTemp.map((item) => {
    const parsedItem = {};
    for (const key in item) {
      if (objectFilter[key] || key === "id") {
        parsedItem[key] = item[key];
      }
    }
    return parsedItem;
  });
  limpiarTabla();
  mostrarTabla(parsedAdList);
};

window.addEventListener("load", () => {
  let objectFilter = {};

  checkboxes.forEach((node) => {
    node.addEventListener("click", handlerCheckbox);
  });

  if (Object.keys(listadoCheckboxes).length === 0) {
    checkboxes.forEach((node) => {
      objectFilter[node.name] = node.checked;
    });
  } else {
    objectFilter = listadoCheckboxes;
    checkboxes.forEach((node) => {
      node.checked = objectFilter[node.name];
    });
  }

  localStorage.setItem("checkboxes", JSON.stringify(objectFilter));
});

/* 
for (let i = 0; i < $checklist.length; i++) {
  const check = $checklist[i];
  console.log("check", check);
  const name = check.name;
  console.log("elementos", document.getElementsByClassName(name));
  check.addEventListener("change", () => {
    handleColumnDisplay(name, check);
  });
} */

/* function handleColumnDisplay(name, check) {
  console.log("check", check);
  const show = document.getElementsByName(name)[0].checked;
  console.log("show", show);
  const $column = document.getElementsByClassName(`${name}-class`);

  for (let i = 0; i < $column.length; i++) {
    const item = $column[i];
    item.style.display = show ? "table-cell" : "none";
  }
} */

window.addEventListener("click", async (e) => {
  if (e.target.matches("td")) {
    let tr = e.target.parentElement;
    let id = tr.getAttribute("data-id");
    let item = await getAutoById(URL, id);
    cargarFormulario(item);
  }
});

const displayButtonsForExistingItem = () => {
  $deleteButtonContainer[0].style.display = "inline-block";
  $cancelButtonContainer[0].style.display = "inline-block";
  $saveAndModifyButton.value = "Modificar";
};

$formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const {
    txtId,
    txtTitulo,
    rdoTransaccion,
    txtDescripcion,
    numPrecio,
    numPuertas,
    numKms,
    numPotencia,
    aceite,
    frenos,
  } = $formulario.elements;

  const formPublicacion = new Anuncio_Auto(
    txtTitulo.value,
    rdoTransaccion.value,
    txtDescripcion.value,
    numPrecio.value,
    numPuertas.value,
    numKms.value,
    numPotencia.value,
    aceite.checked,
    frenos.checked
  );

  if (!txtId.value) {
    //alta
    alert(JSON.stringify(formPublicacion));
    handlerCreate(formPublicacion);
  } else {
    //update
    formPublicacion.id = parseInt(txtId.value);
    handlerUpdate(formPublicacion);
  }
});

function actualizarTabla() {
  $deleteButtonContainer[0].style.display = "none";
  $cancelButtonContainer[0].style.display = "none";
  $saveAndModifyButton.value = "Guardar";
  getListadoAnuncios();
}

const limpiarTabla = () => {
  while ($divTabla.hasChildNodes()) {
    $divTabla.removeChild($divTabla.firstElementChild);
  }
};

const resetTable = () => {
  $formulario.reset();
  $formulario.elements.txtId.value = "";
  $deleteButtonContainer[0].style.display = "none";
  $cancelButtonContainer[0].style.display = "none";
};

const cargarFormulario = (Anuncio_Auto) => {
  displayButtonsForExistingItem();
  const {
    txtId,
    txtTitulo,
    txtDescripcion,
    rdoTransaccion,
    numKms,
    numPuertas,
    numPrecio,
    numPotencia,
    frenos,
    aceite,
  } = $formulario.elements;
  txtId.value = Anuncio_Auto.id;
  txtTitulo.value = Anuncio_Auto.titulo;
  rdoTransaccion.value = Anuncio_Auto.transaccion;
  txtDescripcion.value = Anuncio_Auto.descripcion;
  numPrecio.value = parseInt(Anuncio_Auto.precio);
  numKms.value = parseInt(Anuncio_Auto.numKms);
  numPuertas.value = Anuncio_Auto.numPuertas;
  numPotencia.value = Anuncio_Auto.numPotencia;
  frenos.checked = Anuncio_Auto.frenoAlDia;
  aceite.checked = Anuncio_Auto.aceiteAlDia;
};

function showAlert(alertMessage) {
  $customAlertContainer.style.display = "inline-grid";
  $alertMessage.innerText = alertMessage;
}
function hideAlert() {
  $customAlertContainer.style.display = "none";
}

$buttonAlert.addEventListener("click", () => {
  hideAlert();
});

$filtro.addEventListener("change", () => {
  const filtro = $filtro.value;
  if (filtro == "todos") {
    limpiarTabla();
    mostrarTabla(listadoAnuncios);
    $promedioPrecio.value = null;
  } else {
    let filteredAnuncios = [];
    let precioAcum = 0;
    let powerValuesAcum = 0;
    filteredAnuncios = listadoAnuncios.filter(
      (anuncio) => anuncio.transaccion == filtro
    );
    filteredAnuncios.forEach((item) => {
      precioAcum += parseInt(item.precio);
    });

    let getPriceValues = filteredAnuncios.map((anuncio) => anuncio.precio);
    const maxPrice = getPriceValues.reduce((prev, current) => {
      return Math.max(prev, current);
    });
    const minPrice = getPriceValues.reduce((prev, current) => {
      return Math.min(prev, current);
    });
    let getPowerValues = filteredAnuncios.map((anuncio) => {
      return parseInt(anuncio.numPotencia);
    });

    getPowerValues.forEach((item) => {
      powerValuesAcum += item;
    });

    $maximoPrecio.value = maxPrice;
    $minimoPrecio.value = minPrice;
    $promedioPotencia.value = powerValuesAcum / filteredAnuncios.length;
    $promedioPrecio.value = precioAcum / filteredAnuncios.length;
    limpiarTabla();
    mostrarTabla(filteredAnuncios);
  }
});

const handlerCreate = async (nuevoAtomovil) => {
  limpiarTabla();
  $spinnerContainer[0].style.display = "flex";
  await createAuto(URL, nuevoAtomovil);

  // actualizarStorage(listadoAutomoviles);
  actualizarTabla();
  showAlert("Vehículo añadido al catálogo!");
};

const handlerUpdate = async (itemEditado) => {
  limpiarTabla();
  $spinnerContainer[0].style.display = "flex";
  await updateAuto(URL, itemEditado);

  actualizarTabla();
  showAlert("Vehículo modificado!");
};

async function handlerDelete(id) {
  /*  for (let i = 0; i < listadoAutomoviles.length; i++) {
    if (listadoAutomoviles[i].id === id) {
      listadoAutomoviles.splice(i, 1);
      break;
    }
  } */
  $spinnerContainer[0].style.display = "flex";
  limpiarTabla();
  await deleteAuto(URL, id);

  // actualizarStorage(listadoAutomoviles);
  actualizarTabla();
  resetTable();
  showAlert("Vehículo eliminado!");
}

function mostrarTabla(data) {
  $divTabla.appendChild(crearTabla(data));
}

/* BACKEND */
async function getListadoAnuncios() {
  const xhr = new XMLHttpRequest();
  let responseData;
  $spinnerContainer[0].style.display = "flex";

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === 4) {
      $spinnerContainer[0].style.display = "none";
      if (xhr.status >= 200 && xhr.status < 300) {
        listadoAnuncios = JSON.parse(xhr.responseText);
        listadoAnunciosTemp = listadoAnuncios;

        const parsedAdList = listadoAnunciosTemp.map((item) => {
          const parsedItem = {};
          for (const key in item) {
            if (listadoCheckboxes[key] || key === "id") {
              parsedItem[key] = item[key];
            }
          }
          return parsedItem;
        });

        limpiarTabla();
        mostrarTabla(parsedAdList);
        /*  console.log("response data", listadoAnuncios);
        mostrarTabla(listadoAnuncios); */
        // return responseData;
      } else {
      }
    } else {
      $spinnerContainer[0].style.display = "flex";
    }
  });

  xhr.open("GET", URL);
  xhr.send();
}
