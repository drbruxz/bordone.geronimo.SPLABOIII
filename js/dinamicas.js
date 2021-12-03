export const crearTabla = (data) => {
  const tabla = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const cabecera = document.createElement("tr");

  for (const key in data[0]) {
    if (key !== "id") {
      const th = document.createElement("th");
      const contenido = document.createTextNode(key);
      th.setAttribute("class", `${key}-class`);
      th.appendChild(contenido);
      cabecera.appendChild(th);
    }
  }

  thead.appendChild(cabecera);
  tabla.appendChild(thead);

  data.forEach((element) => {
    const tr = document.createElement("tr");
    for (const key in element) {
      if (key === "id") {
        tr.setAttribute("data-id", element[key]);
      } else {
        const td = document.createElement("td");
        td.setAttribute("class", `${key}-class`);
        td.textContent = element[key];
        td.textContent =
          td.textContent === "true"
            ? "Sí"
            : td.textContent === "false"
            ? "No"
            : td.textContent;
        //checkeo para traducir booleanos
        tr.appendChild(td);
      }
    }
    tbody.appendChild(tr);
  });

  tabla.appendChild(tbody);

  return tabla;
};

export const crearItemListado = (data) => {
  let divContainerItem = document.createElement("div");
  let divContainerRow = document.createElement("div");
  divContainerItem.setAttribute("class", "container-adds-item col-sm-4");

  /* TÍTULO */
  let divContainerItemTitle = document.createElement("div");
  divContainerItemTitle.setAttribute("class", "container-ad-item-title");
  let titleText = document.createElement("h3");
  titleText.setAttribute("class", "add-item-title");
  titleText.innerText = `${data.titulo}`;
  divContainerItemTitle.appendChild(titleText);
  divContainerItem.appendChild(divContainerItemTitle);

  /* SUBTÍTULO */
  let divContainerItemSubtitle = document.createElement("div");
  divContainerItemSubtitle.setAttribute("class", "container-ad-item-subtitle");
  let subtitleText = document.createElement("p");
  subtitleText.setAttribute("class", "add-item-subtitle");
  subtitleText.innerText = `${data.descripcion}`;
  divContainerItemSubtitle.appendChild(subtitleText);
  divContainerItem.appendChild(divContainerItemSubtitle);

  /* PRECIO */
  let divContainerItemPrice = document.createElement("div");
  divContainerItemPrice.setAttribute("class", "container-price");
  let priceText = document.createElement("p");
  priceText.setAttribute("class", "price");
  priceText.innerText = `$ ${data.precio} ${
    data.transaccion === "alquiler" ? "x semana" : ""
  }`;
  divContainerItemPrice.appendChild(priceText);
  divContainerItem.appendChild(divContainerItemPrice);

  /* DATA */
  let divContainerAdData = document.createElement("div");
  divContainerAdData.setAttribute("class", "container-add-data");

  /* cardoor */
  let divContainerDataCarDoor = document.createElement("div");
  divContainerDataCarDoor.setAttribute("class", "container-data");
  let imgCarDoor = document.createElement("img");
  imgCarDoor.setAttribute("src", "./src/imgs/carDoor.svg");
  let pCarDoor = document.createElement("p");
  pCarDoor.setAttribute("class", "data-text");
  pCarDoor.innerText = `${data.numPuertas}`;
  divContainerDataCarDoor.appendChild(imgCarDoor);
  divContainerDataCarDoor.appendChild(pCarDoor);
  divContainerAdData.appendChild(divContainerDataCarDoor);

  /* kms */
  let divContainerDataKms = document.createElement("div");
  divContainerDataKms.setAttribute("class", "container-data");
  let imgKms = document.createElement("img");
  imgKms.setAttribute("src", "./src/imgs/kms.svg");
  let pKms = document.createElement("p");
  pKms.setAttribute("class", "data-text");
  pKms.innerText = `${data.numKms}`;
  divContainerDataKms.appendChild(imgKms);
  divContainerDataKms.appendChild(pKms);
  divContainerAdData.appendChild(divContainerDataKms);

  /* power */
  let divContainerDataPower = document.createElement("div");
  divContainerDataPower.setAttribute("class", "container-data");
  let imgPower = document.createElement("img");
  imgPower.setAttribute("src", "./src/imgs/potencia.svg");
  let pPower = document.createElement("p");
  pPower.setAttribute("class", "data-text");
  pPower.innerText = `${data.numPotencia}`;
  divContainerDataPower.appendChild(imgPower);
  divContainerDataPower.appendChild(pPower);
  divContainerAdData.appendChild(divContainerDataPower);

  divContainerItem.appendChild(divContainerAdData);

  /* VIEW ITEM BUTTON */
  let divContainerViewItem = document.createElement("div");
  divContainerViewItem.setAttribute("class", "container-view-item-button");
  let viewItemButton = document.createElement("button");
  viewItemButton.setAttribute("class", "view-item-button");
  viewItemButton.innerText = "VER VEHÍCULO";
  divContainerViewItem.appendChild(viewItemButton);
  divContainerItem.appendChild(divContainerViewItem);
  return divContainerItem;
};
