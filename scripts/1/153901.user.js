// ==UserScript==
// @name           UTN Encuesta
// @namespace      http://userscripts.org/users/00000
// @include        http://siga.frba.utn.edu.ar/alu/encdocpop.do
// @copyright      Virus
// @grant       none
// ==/UserScript==


function main() 
{
	var form = document.getElementsByTagName('select');

	for(var i=0; i < form.length; i++)
	{
	      	form[i].value = '10';
	}
}

window.addEventListener("load", main, false);