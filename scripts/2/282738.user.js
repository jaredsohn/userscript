// ==UserScript==
// @author		Juuliancito
// @name        MPs Prueba 2
// @version		0.1
// @uso:version	0.1
// @include		http://*erepublik.com/*
// @description    MPs
// ==/UserScript==

window.setTimeout(function() {
document.getElementById("citizen_subject").value="TITULO"; 
document.getElementById("citizen_message").value="MENSAJE"; }, 1);

document.getElementsByClassName("right fluid_blue_light_medium message_get")[0].addEventListener('click', function(event) { 

document.getElementById("citizen_subject").value="TITULO"; 
document.getElementById("citizen_message").value="MENSAJE";
event.stopPropagation();
event.preventDefault();

}, true);