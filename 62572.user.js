// ==UserScript==
// @name Ajouter l'option 10 minute sur le profil
// @namespace By Dzeros
// @description Ajouter l'option 10 minute sur le profil 
// @include *pennergame.de*
// ==/UserScript==

var li = document.getElementsByTagName("form")[0].getElementsByTagName('div')[0];

function fclick(ev) {
GM_setValue("fsave","true")
top.location.href= '/activities/';
}     
fbutton = document.createElement("input");
fbutton.type = 'button';
fbutton.value = '10 minuten';
fbutton.style.backgroundImage= 'url(http://www.fotos-hochladen.net/10minutenhintergrun2q5csh8r.jpg)';

fbutton.addEventListener('click',fclick,false);
li.appendChild(fbutton);
var fnow = GM_getValue("fsave", "false");
if (fnow  == "true")
{
var fnow = "false";
GM_setValue("fsave", "false");	
var finputButton = document.getElementsByName('Submit2')[0];
finputButton.click();
}

// copiright by Dzeros