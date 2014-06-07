// ==UserScript==
// @name           KOINS Gutscheinpaster
// @namespace      koins_gs
// @description    Einfach den Gutscheincode in das neue Feld pasten und das Formular wird automatisch abgeschickt!
// @include        http://www.koins.de/
// ==/UserScript==
//
var neuB = document.createElement("<tr>");
var neuC = document.createElement("<td>");
neuB.appendChild(neuC);
neuC.setAttribute("colspan","6");
neuC.innerHTML = '<input type="text" id="pastecode" />';
var bla = document.forms[0].parentNode.getElementsByTagName('tbody')[0];
bla.appendChild(neuB);
var pasty = document.getElementById('pastecode');
pasty.addEventListener("keyup", petrus, false);
function petrus() {
	var x = pasty.value.split("-");
	document.forms[0].elements[0].value = x[0];
	document.forms[0].elements[1].value = x[1];
	document.forms[0].elements[2].value = x[2];
	document.forms[0].submit();
}
