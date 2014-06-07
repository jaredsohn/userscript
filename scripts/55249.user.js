// ==UserScript==
// @name           Foro
// @namespace      TTR
// @include        http://clan.creatuforo.com/viewforum.php*
// @include        http://clan.creatuforo.com/index.php
// ==/UserScript==

function restarDia(fecha) {
   var fecha2=fecha;
   if(fecha2.getDate()>1) {
      fecha2.setDate(fecha2.getDate()-1);
   }
   else {
      if(fecha2.getMonth()==0) {
         fecha2.setMonth(11);
         fecha2.setFullYear(fecha2.getFullYear()-1);
      }
      else {
         fecha2.setMonth(fecha2.getMonth()-2);
      }
      switch(fecha2.getMonth())
      {
         case 0:
         case 2:
         case 4:
         case 6:
	 case 7:
	 case 9:
	 case 11:
            fecha2.setDate(31);
            break;
         case 3:
         case 5:
         case 8:
         case 10:
            fecha2.setDate(30);
            break;
         case 1:
            fecha2.setDate(28);
            break;
      }
   }
   return fecha2;
}

for(i=0;i<document.getElementsByTagName('table').length;i++) {
	var tabla=document.getElementsByTagName('table')[i];
	if(tabla.getAttribute('class')=='forumline') {
		break;
	}
}

//Por defecto marca los del día anterior.
var fecha=new Date();
fecha=restarDia(fecha);
fecha.setHours(0);
fecha.setMinutes(0);
fecha.setSeconds(0);

//Si deseamos poner un día concreto descomentar la siguiente línea eliminando los dos caracteres "//" y metiendo el día elegido
//Es MUY IMPORTANTE tener en cuenta que los meses empiezan en 0 y no en 1, por lo que agosto, por ejemplo, es el mes 7 y no el 8.
//fecha=new Date(año, mes, dia, horas, minutos, segundos);

var estilo='background:#000;color:#fff;';

for(f=0;f<document.getElementsByTagName('tr').length;f++) {
   var fila=document.getElementsByTagName('tr')[f];
   var columnas=fila.getElementsByTagName('td').length;
   try {
         var texto='';
         var td=fila.getElementsByTagName('td')[columnas-1];
         if(td.getElementsByTagName('span').length>0) {
            texto=fila.getElementsByTagName('td')[columnas-1].getElementsByTagName('span')[0].innerHTML.substr(0,19);
         } else {
            texto=fila.getElementsByTagName('td')[columnas-1].innerHTML.substr(0,19);
         }
         var annio=parseFloat(texto.substr(6,4));
         var mes=parseFloat(texto.substr(3,2))-1;
         var dia=parseFloat(texto.substr(0,2));
         var hora=parseFloat(texto.substr(11,2));
         var minutos=parseFloat(texto.substr(14,2));
         var segundos=parseFloat(texto.substr(17,2));
         var fechafila=new Date();
         fechafila.setFullYear(annio);
         fechafila.setMonth(mes);
         fechafila.setDate(dia);
         fechafila.setHours(hora);
         fechafila.setMinutes(minutos);
         fechafila.setSeconds(segundos);
         if(fechafila>fecha) {
            for(c=0;c<columnas;c++) {
		document.getElementsByTagName('tr')[f].getElementsByTagName('td')[c].setAttribute('style',estilo);
            }
         }
      } catch (e) {
   } 
}
