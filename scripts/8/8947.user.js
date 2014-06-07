// Autor: ..:: NU ::..
// Date of Modification: 24/01/07

// ==UserScript==
// @name OGame Overview Local Time (English)
// @namespace OGame Overview Local Time (English)
// @description Displays the local time underneath the server time.
// @include http://ogame*.de/*
// @include  http://*.gfsrv.*/
// @exclude  
// ==/UserScript==


//I verified if this opens in Overview main page of the game.
if(document.baseURI.indexOf("overview.php") != -1) {

   var nodo = document.evaluate("/html/body/center/table[last()]/tbody/tr[th[2]]/th[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
   //var dias = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
   //var meses = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
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
   nodoLocal.innerHTML = "<th>Local Time</th><th colspan='3' id='ClockLocal'>" + fechaLocal + "</th>";
}

