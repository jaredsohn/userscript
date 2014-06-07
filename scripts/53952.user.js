// ==UserScript==
// @name Pennergame 10 minuten sammel button fuer hamburg
// @namespace By Jonny_Be
// @description 10 Minuten sammeln
// @include *pennergame.de*
// @exclude *berlin.pennergame.de*
// @exclude *board.pennergame.de*
// ==/UserScript==

////// copiright by basti1012 /////
var div = document.getElementById('infoscreen');
var navi = div.getElementsByTagName('li')[6];
var i = document.getElementById("counter2");

function fclick(ev)
{
	GM_setValue("fsave","true")
	top.location.href= '/activities/';
}    
 
fbutton = document.createElement("input");
fbutton.type = 'button';


if(i != null)  fbutton.value = 'Sammeln abbrechen';
else           fbutton.value = '10 Minuten sammeln';


fbutton.addEventListener('click',fclick,false);
navi.appendChild(fbutton);
var fnow = GM_getValue("fsave", "false");

if (fnow  == "true")
{
	setTimeout("clic()",1000);  //fixed by Jonny_Be
	var fnow = "false";
	GM_setValue("fsave", "false");
}


///// copyright by Jonny_Be /////
unsafeWindow.clic = function()
{
	var finputButton = document.getElementsByName("Submit2")[0];
	finputButton.click();
};