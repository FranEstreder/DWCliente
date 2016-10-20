function generaSurtido(){
  var surtido = ["Chupa Chups", "Piruleta", "Nubes", "Caramelos", "Chicles", "Palotes", "Chocolate"];
  return surtido;
}

function consultaPrecios(indice){
  var precios = [0.40, 0.20, 0.10, 0.05, 0.15, 0.30, 0.50];
  return precios[indice];
}

function generaImagenes(){
  var imagenes = ["Imagenes/chupachups.jpg", "Imagenes/piruleta.jpg", "Imagenes/nubes.jpg", "Imagenes/caramelos.jpg", "Imagenes/chicles.jpg", "Imagenes/palote.jpg", "Imagenes/Chocolate.jpg"];
  return imagenes;
}

function mostrarSurtido(){
  document.write("<table><tr><th>Productos</th><th>Imágenes</th></tr>");
  var surtido = generaSurtido();
  var imagenes = generaImagenes();
  for (var i = 0; i < surtido.length; i++) {
      document.write("<tr><td>" + surtido[i] + "</td><td><img src='" + imagenes[i] + "' width='100px' onclick='mostrarSurtidoPrecio()'></td></tr>")
  }
  document.write("</table>");
}

function mostrarSurtidoPrecio(){
  document.body.innerHTML = '';
  document.write("<table><tr><th>Productos</th><th>Imágenes</th><th>Precio</th></tr>");
  var surtido = generaSurtido();
  var imagenes = generaImagenes();
  for (var i = 0; i < surtido.length; i++) {
      document.write("<tr><td>" + surtido[i] + "</td><td><img src='" + imagenes[i] + "' width='100px'></td><td>" + consultaPrecios(i).toFixed(2) + "€</td></tr>") //toFixed es para que salgan 2 decimales
  }
  document.write("</table>");
}
