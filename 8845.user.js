// Autor: ..:: BARANOWA ::.. Tradução: Tubarão
// Traduzido em 26/04/2007

// ==UserScript==
// @name OGame Clock PT
// @namespace OGame Clock
// @author ..:: BARANOWA ::..
// @tradutor Tubarão
// @description Modifica ol relógio na vista principal. Adiciona outro relógio com base na hora local do jogador e com refresh automático.
// @include http://ogame*.de/*
// @include  http://*.gfsrv.*/
// @exclude  
// ==/UserScript==

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
   var dias = new Array('Domingo,','Segunda-feira,','Terça-feira,','Quarta-feira,','Quinta-feira,','Sexta-feira,','Sábado,');
   var meses = new Array('Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro');
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
   if(document.baseURI.indexOf("overview.php") != -1)
      setTimeout(Clock, 1000);
}

//Verificamos si esta abierta en el frame principal la pagina de vision general.
if(document.baseURI.indexOf("overview.php") != -1) {

   var nodo = document.evaluate("/html/body/center/table[last()]/tbody/tr[th[2]]/th[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
   var dias = new Array('Domingo,','Segunda-feira,','Terça-feira,','Quarta-feira,','Quinta-feira,','Sexta-feira,','Sábado,');
   var meses = new Array('Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro');
   var days = new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
   var months = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');

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

   var nodoLocal = nodo.parentNode.cloneNode(true);
   nodo.parentNode.parentNode.insertBefore(nodoLocal, nodo.parentNode.nextSibling);
   nodoLocal.innerHTML = "<th>Hora local</th><th colspan='3' id='ClockLocal'>" + fechaLocal + "</th>";

   nodo.previousSibling.previousSibling.innerHTML='Hora server';
   nodo.innerHTML = fechaServer;
   nodo.setAttribute('id', 'ClockServer');
   setTimeout(Clock, 1000);
}