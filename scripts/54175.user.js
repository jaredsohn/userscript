// ==UserScript==
// @name Pennergame 10 minuten sammel button fuer frankreich
// @namespace By Basti1012
// @description Mit diesem Script kann man von jeder seite aus zum 10 minuten sammeln gehen ein klick es kommt der cfapacha klickenm fertig fuer frankreich
// @include *w.clodogame.fr*
// @include http://clodogame.fr*
// ==/UserScript==

var div = document.getElementById('infoscreen');
var navi = div.getElementsByTagName('li')[6];
function fclick(ev) {
GM_setValue("fsave","true")
top.location.href= '/activities/';
}     
fbutton = document.createElement("input");
fbutton.type = 'button';
fbutton.value = '10 Minutes sammeln';
fbutton.addEventListener('click',fclick,false);
navi.appendChild(fbutton);
var fnow = GM_getValue("fsave", "false");
if (fnow  == "true")
{
var fnow = "false";
GM_setValue("fsave", "false");	
var finputButton = document.getElementsByName("Submit2")[0];
finputButton.click();
}

// copiright by basti1012