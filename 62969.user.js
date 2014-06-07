// ==UserScript==
// @name Pennergame 10 minuten sammel button fuer pennergame hamburg berlin  4.0
// @namespace By Basti1012
// @description Mit diesem Script kann man von jeder seite aus zum 10 minuten sammeln gehen ein klick es kommt der cfapacha klickenm fertig 
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

// copiright by basti1012