// ==UserScript==
// @name        Good old fb - a.k.a get the lemons back.
// @namespace	http://userscripts.org
// @description	Regresa el diseno antiguo de facebook sin alterar el funcionamiento normal. No tengo mucho tiempo para editar scripts, así que me temo que no habrá actualizaciones tan seguido pero, en cualquier caso, buena suerte.
// @include     http://facebook.com/*
// @include     http://*.facebook.com/*
// @include     https://facebook.com/*
// @include     https://*.facebook.com/*
// @match		*://facebook.com/*
// @match		*://*.facebook.com/*
// @grant		none
// @version		1.12
// @author		WaiKO
// @run-at document-end
// ==/UserScript==

function firstSet() 
{
	document.getElementById("blueBar").className = "fixed_elem";
	document.getElementById("pageHead").className = "clearfix";
	document.getElementById("pageNav").className = "clearfix";
	document.getElementById("pageLogo").className = "";
	
	var a = document.getElementsByTagName("body")[0].className.toString();
	a = a.replace ( /(?:^|\s)hasSmurfbar(?!\S)/g , '' );
	//a = a.replace ( /(?:^|\s)_4rw(?!\S)/g , '' );
	//a = a.replace ( /(?:^|\s)_5262(?!\S)/g , '' );
	a = a.replace ( /(?:^|\s)_5vb_(?!\S)/g , '' );
	a = a.replace ( /(?:^|\s)_5p3y(?!\S)/g , '' );
	
	document.getElementsByTagName("body")[0].className = a;
}

function ReDo()
{
	var a = document.getElementsByTagName("body")[0].className.toString();
	a = a.replace ( /(?:^|\s)hasSmurfbar(?!\S)/g , '' );
	//a = a.replace ( /(?:^|\s)_4rw(?!\S)/g , '' );
	//a = a.replace ( /(?:^|\s)_5262(?!\S)/g , '' );
	a = a.replace ( /(?:^|\s)_5vb_(?!\S)/g , '' );
	a = a.replace ( /(?:^|\s)_5p3y(?!\S)/g , '' );
	
	document.getElementsByTagName("body")[0].className = a;
}

(function() {

	var css = "\
	ul#pageNav {\
		position: relative;\
		top: -2px;\
	}\
	li#navJewels {\
		position: absolute;\
		left: -535px;\
	}\
	div#MercuryJewelThreadList {\
		width: 100% !important;\
	}\
	div#u_o_0 {\
		width: 100% !important;\
	}\
	div.uiScrollableAreaBody {\
		width: 100% !important;\
	}\
	ul#fbRequestsList .uiScrollableArea {\
		width: 100% !important;\
	}";

	var htmlE = document.querySelector("html");
	htmlE.className = "";

	document.getElementById("blueBarHolder").addEventListener("DOMNodeInserted", ReDo, false);
	firstSet();

	/*
	if(window.addEventListener) window.addEventListener('load',heyMoonshaker,false); //W3C
		else window.attachEvent('onload',heyMoonshaker); //IE
	*/

	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	} else if (typeof PRO_addStyle != "undefined") {
		PRO_addStyle(css);
	} else if (typeof addStyle != "undefined") {
		addStyle(css);
	} else {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			heads[0].appendChild(node); 
		} else {
			// no head yet, stick it whereever
			document.documentElement.appendChild(node);
		}
	}

	// pendientes del paso 7 en adelante.

})();