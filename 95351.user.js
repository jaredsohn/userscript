// ==UserScript==
// @name           Gmail float top menu bar
// @namespace      V@no
// @description    Displays top menu bar even when scrolled down
// @version        1.3
// @include        http*://mail.google.com/*
// ==/UserScript==

var gbadded = false;
window.addEventListener ("DOMNodeInserted", function(e)
{
	if (gbadded || (e.target.id != "gbar" && e.target.id != "gb"))
		return;

	gbadded = true;
	var gbar = e.target;
	var bar = e.target.id == "gb" ? gbar : gbar.parentNode;
	var spacer = bar.cloneNode(true);
	spacer.style.visibility = "hidden";
	bar.parentNode.insertBefore(spacer, bar);
	bar.className = bar.className + " cP";
	bar.id = "gbarFloat";
	var cl = document.createElement("style");
	cl.innerHTML = "#gbarFloat{position:fixed; z-index:999; width:100%; top:0; left:0;}";
	cl.innerHTML += "#gbarFloat, #gbarFloat * {";
//	cl.innerHTML += "background-color: #FFFFFF !important;background-image:none;" //uncomment this line to override background color
//	cl.innerHTML += "color: #000000 !important;" //uncomment this line to override text color
	cl.innerHTML +="}";
	document.body.appendChild(cl);
}, false);
