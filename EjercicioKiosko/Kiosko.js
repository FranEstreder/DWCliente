function generaSurtido(){
  var surtido = ["Chupa Chups", "Piruleta", "Nubes", "Caramelos", "Chicles", "Palotes", "Chocolate"];
  return surtido;
}

function consultaPrecios(indice){
  var precios = [0.40, 0.20, 0.10, 0.05, 0.15, 0.30, 0.50];
  return precios[indice];
}

function mostrarSurtido(){
  document.write("<table><tr><th>Productos</th><th>Precios</th></tr>");
  var surtido = generaSurtido();
  for (var i = 0; i < surtido.length; i++) {
      document.write("<tr><td>" + surtido[i] + "</td><td>" + consultaPrecios(i) + "</td></tr>")
  }
  document.write("</table>");
}
