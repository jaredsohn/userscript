// Autor: ..:: BARANOWA ::.. Adaptación por FryGuy - 20070913
// Traduzido al portogués em 26/04/2007 por TubarÃ£o

// ==UserScript==
// @name 					OGame Clock PT
// @namespace 		OGame Clock
// @author 				..:: BARANOWA ::.. Adaptación por FryGuy
// @tradutor 			TubarÃ£o
// @description 	Modifica la visión general para agregar la hora local.
// @include 			http://uni*.ogame.com.es/*
// ==/UserScript==

// adaptación de idiomas
//var dias = new Array('Domingo,','Segunda-feira,','TerÃ§a-feira,','Quarta-feira,','Quinta-feira,','Sexta-feira,','SÃ¡bado,');
var dias = new Array('Domingo,','Lunes,','Martes,','Miércoles,','Jueves,','Viernes,','Sábado,');
//var meses = new Array('Janeiro','Fevereiro','MarÃ§o','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro');
var meses = new Array('Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre');
var days = new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
var months = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');

function locate(xpath, xpres) {
	return document.evaluate(xpath, document, null, xpres, null);
}

function locateFirst(xpath) {
	// gracias SpitFire: http://userscripts.org/scripts/show/8555
	return locate(xpath, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
}

//Funcion para buscar dentro de un array un valor y devolver su posicion.
function BuscarPos(array, id) {
   for(var i = 0; i < array.length; i++) {
      if(array[i] == id) return i;
	}
   return -1;
}

//Funcion para verificar si un anio es bisiesto o no.
function AnoBisiesto(ano) {
   return (((ano % 4 == 0) && (ano % 100 != 0)) || (ano % 400 == 0)) ? 1 : 0;
}

//Funcion para calcular la cantidad de dias que tiene el mes.
function DiasMes(mes, ano) {
   if(mes == 0 || mes == 2 || mes == 4 || mes == 6 || mes == 7|| mes == 9 || mes == 11)
      return 31;
   if(mes == 3 || mes == 5 || mes == 8 || mes == 10)
      return 30;
   if(mes == 1 && AnoBisiesto(ano) == 0)
      return 28;
   else
      return 29;
}

//Funcion para actualizar los relojes de la vista principal.
function Clock() {
   nodeLocal = document.getElementById("ClockLocal");
   nodeServer = document.getElementById("ClockServer");
   var date = new Date();
   var ano = date.getFullYear();
   var mes = date.getMonth();
   var dia = date.getDay();
   var diaNum = date.getDate();
   var hora = date.getHours();
   var mins = date.getMinutes();
   var segs = date.getSeconds();
   var fecha = nodeServer.innerHTML.match(/(\S+) (\d+) de (\S+) - (\d{2}):(\d{2}):(\d{2})/);
   nodeLocal.innerHTML = dias[dia] + ' ' + diaNum + ' de ' + meses[mes] + ' - ' + ((hora < 10) ? '0' : '') + hora + ((mins < 10) ? ':0' : ':') + mins + ((segs < 10) ? ':0' : ':') + segs;
   dia = BuscarPos(dias, fecha[1]);
   diaNum = fecha[2] * 1;
   mes = BuscarPos(meses, fecha[3]);
   hora = fecha[4] * 1;
   mins = fecha[5] * 1;
   segs = fecha[6] * 1;
   if(++segs > 59) {
      segs = 0;
      if(++mins > 59) {
         mins = 0;
         if(++hora == 23) {
            hora = 0;
            if(++dia > 6) dia = 0;
            diaNum++;
            if(diaNum > DiasMes(mes, ano)) {
               diaNum = 1;
               if(++mes > 11) mes = 0;
            }
         }
      }
   }
   nodeServer.innerHTML = dias[dia] + ' ' + diaNum + ' de ' + meses[mes] + ' - ' + ((hora < 10) ? '0' : '') + hora + ((mins < 10) ? ':0' : ':') + mins + ((segs < 10) ? ':0' : ':') + segs;
   //Actualizaremos dentro de um 1 segundo si no cambio la pagina.
   if(location.href.search("overview") != -1)
      setTimeout(Clock, 1000);
}
(function(){
	//Verificamos si esta abierta en el frame principal la pagina de vision general.
	if (location.href.search("overview") != -1) {
		var nodo = locateFirst('//div[@id="content"]/center/table[1]').childNodes[1];
		//alert(nodo.childNodes[2].innerHTML);
		if (nodo.childNodes[2].innerHTML.search('Hora') != -1) nodo = nodo.childNodes[2]
		else nodo = nodo.childNodes[4];
		//alert(nodo.innerHTML);
		
		var date = new Date();
		var mes = date.getMonth();
		var dia = date.getDay();
		var diaNum = date.getDate();
		var hora = date.getHours();
		var mins = date.getMinutes();
		var segs = date.getSeconds();
		
		var fecha = nodo.innerHTML.match(/(\S\S\S) (\S\S\S) (\d+) (\d+)(:\d\d:\d\d)/);
		var fechaLocal = dias[dia] + " " + diaNum + " de " + meses[mes] + " - " + ((hora < 10) ? "0" : "") + hora + ((mins < 10) ? ":0" : ":") + mins + ((segs < 10) ? ":0" : ":") + segs;
		var fechaServer = dias[BuscarPos(days,fecha[1])] + " " + fecha[3] + " de " + meses[BuscarPos(months, fecha[2])] + " - " + ((fecha[4] < 10) ? "0" : "") + fecha[4] + fecha[5];
		
		var nodoLocal = document.createElement("tr");
		nodo.parentNode.insertBefore(nodoLocal, nodo.nextSibling);
		nodoLocal.innerHTML = "<th>Hora local</th><th colspan='3' id='ClockLocal'>" + fechaLocal + "</th>";
		nodo.childNodes[3].setAttribute('id', 'ClockServer');
		nodo.childNodes[3].innerHTML = fechaServer;

		setTimeout(Clock, 1000);
	}
})();	