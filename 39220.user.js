// ==UserScript==
// @name           proGOL
// @namespace      www.santics.es/scripts/
// @description	   Muestra el promedio goleador del jugador que se esté visualizando (Virtuamanager)
// @include        http://www.virtuamanager.com/main.php?idpage=jugador&IdJugador=*
// @include        http://www.virtuamanager.com/main.php?idpage=jugador&idparam=*
// ==/UserScript==

String.prototype.trim= function() {//Agrega la función trim al objeto String
return this.replace(/(^\s*)|(\s*$)/g,""); //elimina espacios a izquierda y derecha
}

function Mid(s, n, c){
	// Devuelve una cadena desde la posición n, con c caracteres
	// Si c = 0 devolver toda la cadena desde la posición n
	
	var numargs=Mid.arguments.length;
	
	// Si sólo se pasan los dos primeros argumentos
	if(numargs<3)
		c=s.length-n+1;
		
	if(c<1)
		c=s.length-n+1;
	if(n+c >s.length)
		c=s.length-n+1;
	if(n>s.length)
		return "";
		
	return s.substring(n-1,n+c-1);
}
function InStr(n, s1, s2){
	// Devuelve la posición de la primera ocurrencia de s2 en s1
	// Si se especifica n, se empezará a comprobar desde esa posición
	// Sino se especifica, los dos parámetros serán las cadenas
	var numargs=InStr.arguments.length;
	
	if(numargs<3)
		return n.indexOf(s1)+1;
	else
		return s1.indexOf(s2, n)+1;
}
function roundNumber(rnum, rlength) { // Arguments: number to round, number of decimal places
  var newnumber = Math.round(rnum*Math.pow(10,rlength))/Math.pow(10,rlength);
  return newnumber; 
}

var totales = document.evaluate('//tr[@align="center"]//td[@bgcolor="#ffffdd" or @bgcolor="#ffffff"][7]/text()', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var str, par1, par2;
try
{	
	for (var i=0; i < totales.snapshotLength; i++) {
   	  if (i==0) {
	      var thisTotal = totales.snapshotItem(i);
 	      //Partidos jugados - Temporada
	      str = thisTotal.textContent.trim();
	      par1 = InStr(1,str,'(')+1;
	      par2 = InStr(par1,str,')');
	      var p_jug_temp = Mid(str,par1, par2 - par1);
	  } else if (i==1) {
	      var thisTotal = totales.snapshotItem(i);
	      //Goles - Temporada
	      var goles_temp = thisTotal.textContent.trim();
	      //Calcular goles por partido (Goles/Partidos)
	      if (p_jug_temp != 0) {
		var calc_GPP_temp = roundNumber(goles_temp/p_jug_temp,3);
	      	thisTotal.textContent = thisTotal.textContent.trim() + '(' + calc_GPP_temp + ')';
	      } 
	  } else if (i==3) {
	      var thisTotal = totales.snapshotItem(i);
	      //Tiros - Temporada
	      var tiros_temp = thisTotal.textContent.trim();
	      //Calcular tiros por gol (Tiros/Goles)
	      var calc_TPG_temp = roundNumber(tiros_temp/goles_temp,2);
	      //thisTotal.textContent = thisTotal.textContent.trim() + '(' + calc_TPG_temp + ')';
	  } else if (i==8) {
	      var thisTotal = totales.snapshotItem(i);
	      //Partidos jugados - Globales
	      str = thisTotal.textContent.trim();
	      par1 = InStr(1,str,'(')+1;
	      par2 = InStr(par1,str,')');
	      var p_jug_glo = Mid(str,par1, par2 - par1);
	  } else if (i==9) {
	      var thisTotal = totales.snapshotItem(i);
	      //Goles - Globales
	      var goles_glo = thisTotal.textContent.trim();
	      //Calcular goles por partido (Goles/Partidos)
	      if (p_jug_glo != 0) {
	      	var calc_GPP_glo = roundNumber(goles_glo/p_jug_glo,3);
	      	thisTotal.textContent = thisTotal.textContent.trim() + '(' + calc_GPP_glo + ')'; 
	      }
	  }
	} 
} catch(err) {
	alert(err);
}

