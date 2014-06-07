// ==UserScript==
// @name           Qita publi
// @description    Quitar publicidad
// @include        *dexgame.net*
// ==/UserScript==

//Qitar publicidad
var publi = document.getElementById("anuncios");
publi.parentNode.removeChild(publi);

//Añadir boton ciircular en menu izquierdo
var elmTBODY = document.getElementsByClassName("flotante")[0].getElementsByTagName("tbody")[0];
var elmTR;
var elmTH;
var elmText;
var elmDiv;
var elmA;
elmTR = document.createElement('tr');

elmTH = document.createElement('th');
elmTH.setAttribute ("colspan","3");
elmTH.setAttribute ("class","left");

elmDiv = document.createElement('div');

elmA = document.createElement('a');
elmA.setAttribute ("href","alliance.php?UniNum=2&mode=circular");

elmText = document.createTextNode('Enviar circular');

elmA.appendChild(elmText);
elmDiv.appendChild(elmA);
elmTH.appendChild(elmDiv);
elmTR.appendChild(elmTH);

elmTBODY.insertBefore(elmTR,elmTBODY.childNodes[14]);

//Añadir boton foro en el menu izquierdo
var elmTBODY2 = document.getElementsByClassName("flotante")[0].getElementsByTagName("tbody")[0];
var elmTR2;
var elmTH2;
var elmText2;
var elmDiv2;
var elmA2;
elmTR2 = document.createElement('tr');

elmTH2 = document.createElement('th');
elmTH2.setAttribute ("colspan","3");
elmTH2.setAttribute ("class","left");

elmDiv2 = document.createElement('div');

elmA2 = document.createElement('a');
elmA2.setAttribute ("href","http://cosanostra.foro-activo.es/");
elmA2.setAttribute ("target","_blank");

elmText2 = document.createTextNode('Foro alianza');

elmA2.appendChild(elmText2);
elmDiv2.appendChild(elmA2);
elmTH2.appendChild(elmDiv2);
elmTR2.appendChild(elmTH2);

elmTBODY2.insertBefore(elmTR2,elmTBODY2.childNodes[15]);

//by: cunyat
