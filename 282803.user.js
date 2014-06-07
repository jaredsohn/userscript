// ==UserScript==
// @author		Juuliancito
// @name        SPAM PA
// @version		0.1
// @uso:version	0.1
// @include		http://*erepublik.com/*
// @description    MPs
// ==/UserScript==

window.setTimeout(function() {
document.getElementById("citizen_subject").value="Bienvenido !"; 
document.getElementById("citizen_message").value="Hola! Cómo va? Complicado o con dudas al principio del juego?\
Te mando este mensaje para contarte lo que tenemos para vos en Progreso Argentino.\
Te cuento brevemente: Siempre buscamos gente nueva, que tenga ganas de jugar, pasarla bien y aportar ideas!\
Seguí esta ""GUIA 1er día"" para crecer sin errores: http://bit.ly/QbPq6fGetting info...\
Preguntáme para anotarte a nuestro plan de panes y armas\
Reparto gratis una vez por dia. Se puede pedir por feed o por IRC. Por feed te dan 20 panes Q5 y 4 tanques Q5 y por IRC 50 panes Q5 y 10 tanques Q5.\
Pasa por aca y enterate Aca esta el link http://tinyurl.com/m6tqxktGetting info...\
Venite al Progreso Argentino!\
A partir del nivel 13 sumate en:\
http://www.erepublik.com/en/party/progreso-argentino1-1192/1\
(usá http://www.erepublik.com/es/party/progreso-argentino1-1192/1 si tenés config en español)\
O podes ingresar y chatear directamente en: http://tinyurl.com/3mabe3nGetting info...\
Asi te saludan todos y te explican mejor.\
Pasate por el foro a presentarte: http://foro.progresoargentino.net/forumdisplay.php/2-Saludos-y-Presentaciones\
Saludos!\
Cualquier duda mandame un mensaje!"; }, 1);

document.getElementsByClassName("right fluid_blue_light_medium message_get")[0].addEventListener('click', function(event) { 

document.getElementById("citizen_subject").value="Bienvenido !"; 
document.getElementById("citizen_message").value="Hola! Cómo va? Complicado o con dudas al principio del juego?\
Te mando este mensaje para contarte lo que tenemos para vos en Progreso Argentino.\
Te cuento brevemente: Siempre buscamos gente nueva, que tenga ganas de jugar, pasarla bien y aportar ideas!\
Seguí esta ""GUIA 1er día"" para crecer sin errores: http://bit.ly/QbPq6fGetting info...\
Preguntáme para anotarte a nuestro plan de panes y armas\
Reparto gratis una vez por dia. Se puede pedir por feed o por IRC. Por feed te dan 20 panes Q5 y 4 tanques Q5 y por IRC 50 panes Q5 y 10 tanques Q5.\
Pasa por aca y enterate Aca esta el link http://tinyurl.com/m6tqxktGetting info...\
Venite al Progreso Argentino!\
A partir del nivel 13 sumate en:\
http://www.erepublik.com/en/party/progreso-argentino1-1192/1\
(usá http://www.erepublik.com/es/party/progreso-argentino1-1192/1 si tenés config en español)\
O podes ingresar y chatear directamente en: http://tinyurl.com/3mabe3nGetting info...\
Asi te saludan todos y te explican mejor.\
Pasate por el foro a presentarte: http://foro.progresoargentino.net/forumdisplay.php/2-Saludos-y-Presentaciones\
Saludos!\
Cualquier duda mandame un mensaje!";
event.stopPropagation();
event.preventDefault();

}, true);