// ==UserScript==
// @name  Invisibles
// @description Hasta cierta hora (surf_time_after), torna invisibles/bloquea sitios para perder el tiempo.
// @include http://facebook.com/*
// @include http://*.facebook.com/*
// @include http://orkut.com/*
// @include http://*.orkut.com/*
// @include http://twitter.com/*
// @include http://*.twitter.com/*
// @include http://feedly.com/*
// @include http://*.feedly.com/*
// @include http://rate.ee/*
// @include http://*.rate.ee/*
// @include http://iha.ee/*
// @include http://*.iha.ee/*
// ==/UserScript==

// Versión en español de valmen de Invisibility Cloak:
// http://userscripts.org/scripts/show/88553

// ==RevisionHistory==
// Version 0.2:
// Released: 2010-10-21
// Added sites by Sander Soots
// ==/RevisionHistory==
// ==RevisionHistory==
// Version 0.1:
// Released: 2006-01-03
// Initial release by Gina Trapani
// ==/RevisionHistory==

(function(){
// EDITAR ESTE ELEMENTO PARA FIJAR LA HORA LUEGO DE LA CUAL DEBEN MOSTRARSE DICHOS SITIOS
// HORA MILITAR: 15 = 3PM
var surf_time_after=18;
// FIN DE EDITAR
var readable_time='';if(surf_time_after>12){
readable_time=surf_time_after-12;
readable_time=readable_time+'PM'
}else{
readable_time=surf_time_after+'AM'}
var tstamp=new Date();
if(tstamp.getHours()<surf_time_after){
var b=(document.getElementsByTagName("body")[0]);
b.setAttribute('style','display:none');
alert("Navega luego de la(s) "+readable_time+". Ahora TRABAJA")}})()