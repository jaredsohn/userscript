// ==UserScript==
// @name           Vitesse.org tekst selecteren
// @include        http://www.vitesse.org/*
// @version        1.0
// ==/UserScript==
window.onload = function() 
{
document.getElementById('content').onmousedown = function(){return true;}
document.onselectstart = function() {return true;}

}