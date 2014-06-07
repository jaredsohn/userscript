// ==UserScript==
// @author		Juuliancito
// @name        MPs SPAM
// @version		0.1
// @uso:version	0.1
// @include		http://*erepublik.com/en/messages-compose/*
// @include		http://*erepublik.com/es/messages-compose/*
// @description    MPs SPAM
// ==/UserScript==


window.setTimeout(function() {
document.getElementsByTagName("input")[18].value="TITULO"; }, 1);



//Modificar el asunto del mensaje
//document.getElementsByTagName("input")[18].value="ACA MENSAJE"

//Modificar el mensaje del mensaje
//document.getElementsByTagName("textarea")[0].value="ACA MENSAJE"