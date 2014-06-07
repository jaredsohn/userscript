// Autor: ..:: NU ::..
// Fecha de modificacion: 24/01/07

// ==UserScript==
// @name OGame Overview Local Time
// @namespace OGame Overview Local Time
// @description Añade la hora local debajo de la hora del server. 
// @include http://ogame*.de/*
// @include  http://*.gfsrv.*/
// @include http://uni*.ogame.com.es/*
// @exclude  
// ==/UserScript==


//Verificamos si esta abierta en el frame principal la pagina de vision general.
if(document.baseURI.indexOf("overview.php") != -1) {

   var nodo = document.evaluate("/html/body/center/table[last()]/tbody/tr[th[2]]/th[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
   //var dias = new Array('Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado');
   //var meses = new Array('Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre');
   var dias = new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
   var meses = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');

   var date = new Date();
   var mes = date.getMonth();
   var dia = date.getDay();
   var diaNum = date.getDate();
   var hora = date.getHours();
   var mins = date.getMinutes();
   var segs = date.getSeconds();

   var fecha = nodo.innerHTML.match(/(\S\S\S) (\S\S\S) (\d+) (\d+)(:\d\d:\d\d)/);
   var fechaLocal = dias[dia] + " " + meses[mes] + " " + diaNum + " " + hora + ((mins < 10) ? ":0" : ":") + mins + ((segs < 10) ? ":0" : ":") + segs;

   var nodoLocal = nodo.parentNode.cloneNode(true);
   nodo.parentNode.parentNode.insertBefore(nodoLocal, nodo.parentNode.nextSibling);
   nodoLocal.innerHTML = "<th>Hora local</th><th colspan='3' id='ClockLocal'>" + fechaLocal + "</th>";
}

