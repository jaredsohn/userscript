// Autor: ..:: NU ::..
// Fecha de modificacion: 24/01/07

// ==UserScript==
// @name OGame Salto Cuantico
// @namespace OGame Salto Cuantico
// @description Agrega a la vista de salto cuantico los botones para max de cada nave, toda la flota y ninguna flota.
// @include http://ogame*.de/*
// @include  http://*.gfsrv.*/
// @exclude  
// ==/UserScript==

//Funcion para poner todos los campos en 0.
function noShips() {
	if (document.getElementsByName(id)[0]) {
		document.getElementsByName(id)[0].value = 0;
	}
}

//Verificamos si esta abierta en el frame principal la pagina de vision general.
if(document.baseURI.match(/infos.php\?session=\w{12}&gid=43/) != null) {
   var cantidad = 0;
   var ninguna = "";
   var nombre = "";
   var texto = "";
   var todas = "";
   var table = document.evaluate("/html/body/center[2]/form[1]/table[last()]/tbody", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;

   //Le ponemos un nombre al formulario para usarlo mas facilmente.
   table.parentNode.parentNode.setAttribute("name", "salto");
   table.rows[0].cells[0].setAttribute("colspan","4");
   table.rows[table.rows.length - 1].cells[0].setAttribute("colspan","4");

   var nodo = table.rows[0].cloneNode(true);
   table.insertBefore(nodo, table.rows[1]);
   nodo.innerHTML = "<th>Naves</th><th>Disponibles</th><th>-</th><th>-</th>";

   for(var i = 2; i < table.rows.length - 1; i++) {
      cantidad = table.rows[i].cells[0].innerHTML.match(/\((\d+)/)[1];
      texto = table.rows[i].cells[0].innerHTML.match(/>(\S+(\s*\S*)*)</)[1];
      nombre = table.rows[i].cells[1].firstChild.name;

      //Modificamos el nombre de las naves, quedando unicamente el nombre sin la cantidad disponible.
      table.rows[i].cells[0].innerHTML = texto;
      //Agregamos una celda indicando la cantidad disponible.
      nodo = table.rows[i].cells[0].cloneNode(true);
      table.rows[i].insertBefore(nodo, table.rows[i].cells[table.rows[i].cells.length - 1]);
      nodo.innerHTML = cantidad;
      //Agregamos una celda con un boton para seleccionar el maximo.
      nodo = table.rows[i].cells[0].cloneNode(true);
      table.rows[i].insertBefore(nodo, table.rows[i].cells[table.rows[i].cells.length - 1]);
      nodo.innerHTML = "<a href=\"javascript:void();\" onclick=\"salto." + nombre + ".value='" + cantidad + "';\" >m&aacute;x</a>";
      todas = todas + "salto." + nombre + ".value='" + cantidad + "';";
      ninguna = ninguna + "salto." + nombre + ".value='0';";
   }
   nodo = table.rows[0].cloneNode(true);
   table.insertBefore(nodo, table.rows[table.rows.length - 1]);
   nodo.innerHTML = "<th colspan='2'><a href=\"javascript:void();\" onclick=\"" + ninguna + "\">Ninguna nave</a></th><th colspan='2'><a href=\"javascript:void();\" onclick=\"" + todas + "\">Todas las naves</a></th>";
}
