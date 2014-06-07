// ==UserScript==
// @name           newffs
// @namespace      spacenewffs
// @include        https://apps.facebook.com/realffs/*
// @include        https://app.realffs.com/*
// ==/UserScript==

var cuenta=0;

function performClick(xnode,elemento,sometext) {
	if (!xnode)
		return;

	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

        var xlink = xnode;
	xlink.dispatchEvent(evt);
        cuenta=cuenta+1;
        document.getElementById("trades").innerHTML=cuenta;
}

function addButtonListener(){
  var button = document.getElementById("greasemonkeyButton");
  button.addEventListener('click',start,true);
}

var butcompra=document.getElementsByClassName("btn btn-large btn-primary");
if (butcompra){
var temp1 = document.getElementById("trades");
if (temp1){
 temp1.innerHTML='<input id="greasemonkeyButton" type="button" value="POWER">'+temp1.innerHTML;
addButtonListener();
} // if temp1
} // if butcompra


function start(){
  var buttcompra=butcompra[0];
  intervaloid22=window.setInterval(function() {performClick(buttcompra,0,"Auto")},5);
} // start()