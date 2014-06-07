// ==UserScript==
// @name           AAP-Googler
// @namespace      http://miguelcg-aap.blogspot.com/greasemonkey
// @description    Link a búsquedas relacionadas con cada sección en google
// @include        http://geneura.ugr.es/~jmerelo/asignaturas/AAP/AAP-Tema*
// @include        http://geneura.ugr.es/~jmerelo/asignaturas/AAP/AAP-Taller*
// ==/UserScript==

var h2 = document.getElementsByTagName('h2'); 
var a_nodes = new Array;
var a_nodes2 = new Array; 
var titulos = new Array;
for ( var secs = 0; secs < h2.length; secs ++ ) { 
	//obtenemos los elementos 'a' dentro del h2
	var thisA = h2[secs].getElementsByTagName('a'); 
	a_nodes[secs] = thisA[0];

	//guardamos tambien el segundo elemento 'a' ya que es el que vamos a sustituir
	a_nodes2[secs] = thisA[1]; 

	//obtenemos el titulo, que es un nodo texto, hijo del primer nodo 'a'
	titulos[secs] = thisA[0].childNodes[0].nodeValue;
	
	//eliminamos el numero de seccion del titulo (solo usamos a partir del primer espacio)
	var busqueda = titulos[secs].substring(titulos[secs].indexOf(' '));

	//creamos los elementos que vamos a insertar: un 'a' dentro de un 'span' con estilo propio
	var span = document.createElement('span');
	span.style.fontSize="0.5em";
	var ahref = document.createElement('a');

	//asignamos el valor de la busqueda a la url de google en el elemento 'a'
	ahref.setAttribute('href','http://www.google.com/search?hl=es&q='+busqueda);

	var txt=document.createTextNode('Ampliar info en google');
	ahref.appendChild(txt);
	span.appendChild(ahref);
	a_nodes[secs].parentNode.replaceChild(span,a_nodes2[secs]);
} 
