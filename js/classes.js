export class Anuncio {
  id;
  titulo;
  transaccion;
  descripcion;
  precio;
  frenoAlDia;
  aceiteAlDia;

  constructor(titulo, transaccion, descripcion, numPrecio) {
    this.titulo = titulo;
    this.transaccion = transaccion;
    this.descripcion = descripcion;
    this.precio = numPrecio;
  }
}
export class Anuncio_Auto extends Anuncio {
  numPuertas;
  numKms;
  numPotencia;

  constructor(
    titulo,
    transaccion,
    descripcion,
    precio,
    numPuertas,
    numKms,
    numPotencia,
    aceiteAlDia,
    frenoAlDia
  ) {
    super(titulo, transaccion, descripcion, precio);
    this.numPuertas = numPuertas;
    this.numKms = numKms;
    this.numPotencia = numPotencia;
    this.frenoAlDia = frenoAlDia;
    this.aceiteAlDia = aceiteAlDia;
  }
}
