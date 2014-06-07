// ==UserScript==
// @name           VIZIOshop paginacija
// @namespace      http://userscripts.org/users/96101
// @description    popravlja paginaciju na VIZIOshop-u
// @include        http://www.vizioshop.com/*
// ==/UserScript==

function main() {
	// uzimam sve kontejnere iz dokumenta
	var divovi = document.getElementsByTagName('div');
	// prolazim kroz sve kontejnere
	for(i=0;i<divovi.length;i++) {
		// proveravam da li je u pitanju kontejner za paginaciju
		if ( divovi[i].className == "pagination" ) {
			// uzimam sadržaj koda paginacije
			var tekst = divovi[i].innerHTML;
			// uklanjam prekide u nabrajanju
			tekst = tekst.replace(new RegExp("br /","g"), "br");
			tekst = tekst.replace(new RegExp("</ul><br><ul>","g"), "");
			// zamenim postojeci sadrzaj korigovanim
			divovi[i].innerHTML = tekst;
			// postavim razmak izmedju redova zadavanjem fiksne visine LI stavke
			createCSS(".pagination li", "line-height: 20px;");
		}
	}
};

/* NOTE: the following code was extracted from the UFO source and extensively reworked/simplified */

/* Unobtrusive Flash Objects (UFO) v3.20 <http://www.bobbyvandersluis.com/ufo/>
        Copyright 2005, 2006 Bobby van der Sluis
        This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
*/

function createCSS(selector, declaration) {
        // test for IE
        var ua = navigator.userAgent.toLowerCase();
        var isIE = (/msie/.test(ua)) && !(/opera/.test(ua)) && (/win/.test(ua));

        // create the style node for all browsers
        var style_node = document.createElement("style");
        style_node.setAttribute("type", "text/css");
        style_node.setAttribute("media", "screen");

        // append a rule for good browsers
        if (!isIE) style_node.appendChild(document.createTextNode(selector + " {" + declaration + "}"));

        // append the style node
        document.getElementsByTagName("head")[0].appendChild(style_node);

        // use alternative methods for IE
        if (isIE && document.styleSheets && document.styleSheets.length > 0) {
                var last_style_node = document.styleSheets[document.styleSheets.length - 1];
                if (typeof(last_style_node.addRule) == "object") last_style_node.addRule(selector, declaration);
        }
};

main();
