// ==UserScript==
// @name          	uc3m
// @namespace 		University
// @description   	Script de Greasemonkey para la asignatura Laboratorio de Software. Busquedas automatizadas
// @icon          	http://icons-search.com/img/fasticon/Comic_Tiger_LNX_2.zip/Comic_Tiger_LNX_2-Icons-128X128-folder_search.png-128x128.png
// @version       	1.0
// @author      	Rafael Fernandez Sanchez 
// ==/UserScript==



//Funcion que permite realizar peticiones asincronas 
function getDOC(url, callback) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function (responseDetails) {
          var dt = document.implementation.createDocumentType("html", 
              "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
            doc = document.implementation.createDocument('', '', dt),
            html = doc.createElement('html');

          html.innerHTML = responseDetails.responseText;
          doc.appendChild(html);
          callback(doc);
        }
		
    });
}



var xpath = "//h4[.='Nombres personas']/following::ul[1]/li";
var res = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
var thisHeading = res.iterateNext();
var alertText = "Evaluación de resultados :\n\n";
//var estadisticas;
var direccion;


	//Ahora mostramos los resultados de Google
	while (thisHeading) {
		alertText += thisHeading.textContent + "\n";
		direccion = "http://www.google.es/search?q=" + thisHeading.textContent;
		alertText += "Buscamos resultados para  " + direccion + "\n";
		
		
		getDOC(direccion, function(doc) {
			var estadisticas = doc.getElementById('resultStats').textContent;
			alertText += "Estadisticas " + estadisticas + "\n\n";
			//alert("Estadisticas= " + alertText);
			//alert(alertText);
		});
		
		
		alert(alertText);
		//alertText += "Resultado=" + estadisticas + "\n\n";
		thisHeading = res.iterateNext();
		//alert(alertText);
				
	}
//alert(alertText);
