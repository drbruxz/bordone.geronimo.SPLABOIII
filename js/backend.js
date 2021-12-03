export const getAutosAsync = async (url) => {
  try {
    const { data } = await axios.get(url);
    console.log("data", data);
    return data;
  } catch (err) {
    console.error(err);
  }
};
export const getAutoById = async (url, id) => {
  try {
    const { data } = await axios.get(url + "/" + id);
    console.log("data", data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteAuto = async (url, id) => {
  try {
    await axios.delete(url + "/" + id);
  } catch (err) {
    console.error(err);
  }
};
export const createAuto = async (url, auto) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      titulo: auto.titulo,
      transaccion: auto.transaccion,
      descripcion: auto.descripcion,
      precio: auto.precio,
      numPuertas: auto.numPuertas,
      numKms: auto.numKms,
      numPotencia: auto.numPotencia,
      frenoAlDia: auto.frenoAlDia,
      aceiteAlDia: auto.aceiteAlDia,
    },
  };

  try {
    const { data } = await axios(url, options);
  } catch (err) {
    console.error(err);
  }
};

export const updateAuto = async (url, auto) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      titulo: auto.titulo,
      transaccion: auto.transaccion,
      descripcion: auto.descripcion,
      precio: auto.precio,
      numPuertas: auto.numPuertas,
      numKms: auto.numKms,
      numPotencia: auto.numPotencia,
      frenoAlDia: auto.frenoAlDia,
      aceiteAlDia: auto.aceiteAlDia,
    },
  };
  try {
    const { data } = await axios(url + "/" + auto.id, options);
  } catch (err) {
    console.error(err);
  }
};
