// ==UserScript==
// @author		Juuliancito
// @name        MPs
// @version		0.1
// @uso:version	0.1
// @include		http://*erepublik.com/*
// @description    MPs
// ==/UserScript==


window.setTimeout(function() {
document.getElementsByTagName("input")[18].value="TITULO"; 
document.getElementsByTagName("textarea")[0].value="MENSAJE"; }, 1);



//Modificar el asunto del mensaje
//document.getElementsByTagName("input")[18].value="ACA MENSAJE"

//Modificar el mensaje del mensaje
//document.getElementsByTagName("textarea")[0].value="ACA MENSAJE"