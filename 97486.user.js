// ==UserScript==
// @name           Supertexto
// @namespace      Valmen
// Versión libre en español de Super Secret Script:
// http://userscripts.org/scripts/show/24266
// @description    Sirve para reemplazar texto en casi toda la red pero no funciona con objetos ni imágenes ni videos ni '['  ni ']'.
// @include        *
// ==/UserScript==

var a,b,c,d,e,s;a={

//PARTE VARIABLE
//Ejemplos:
//Reemplazar 'hola' por 'Hola' > "hola": "Hola",
//Reemplazar 'boteya' por botella' > "boteya": "botella",
//Reemplazar 'yacht' por 'yate' > "yacht": "yate",
//Ocultar '"' > "["]": "",
//Ocultar '?' > "[?]": "",
//Ocultar '(' > "[(]": "",
//Ocultar ')' > "[)]": "",
//Ocultar 'texto' > "texto": "",
//Es posible reemplazar las comillas (") por ' , a menos que el texto a reemplazar contenga '.
" ": " ",
" ": " ",
' ': ' '

//etc.
//IMPORTANTE: Todas las líneas (excepto la última) DEBEN terminar con coma. El espacio después de ':' es opcional.  
//FIN DE PARTE VARIABLE

};y={};for(c in a){y[c]=new RegExp(c,'g')}d=document.evaluate("//text()",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);for(var i=0;i<d.snapshotLength;i++){z=d.snapshotItem(i);s=z.data;for(c in a){s=s.replace(y[c],a[c])}z.data=s}