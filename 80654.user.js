// ==UserScript==
// @name           Minimalist Gmail 
// @namespace      http://bob23646.deviantart.com/
// @description    minimalistic version of gmail
// @include        http*://*mail.google.*/*
// ==/UserScript==

(function() {
var css = ".jy { display:none !important; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
(function() {
var css = ".nH.pY { display:none !important; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
(function() {
var css = ".mp {display:none !important;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
(function() {
var css = ".mn {display:none !important;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
(function() {
var css = ".ma {display:none !important;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();


(function() {
var css = ".zs {display: none;}"
css +=  ".nH .AY {display:none;}"
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {  
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();


(function() {
var css  = ".ar.as,\n\n\n";
css		+= ".hR,\n\n\n";
css		+= ".gfqccc>div>div>div:first-child+div,\n\n";
css		+= "a.gb1.qq, a.gb3.qq,\n\n";
css		+= ".z .AP, \n\n";
css 	+= ".nH.qj > div > div:first-child + div,";
css		+= "HTML > BODY > DIV > DIV + DIV > DIV:first-child > DIV:first-child > DIV:first-child > DIV + DIV + DIV > DIV:first-child > DIV + DIV > DIV + DIV > DIV:first-child > DIV + DIV > DIV:first-child > TABLE TR > TD + TD > DIV + DIV > DIV:first-child > DIV:first-child > DIV:first-child > DIV + DIV, \n\n";
css		+= "HTML > BODY > DIV > DIV + DIV > DIV:first-child > DIV:first-child > DIV:first-child > DIV + DIV + DIV > DIV:first-child > DIV + DIV > DIV + DIV > DIV:first-child > DIV:first-child, \n\n";
css		+= "HTML > BODY > DIV > DIV + DIV > DIV > TABLE > TR > TD + TD > DIV + DIV > DIV > DIV + DIV + DIV + DIV, \n\n"; 
css		+= "HTML > BODY > DIV:first-child > DIV:last-child > DIV > DIV:last-child > DIV:first-child > DIV:first-child + DIV + DIV > DIV:first-child > DIV > DIV > DIV:first-child + DIV > DIV > DIV > DIV > DIV > DIV:last-child > DIV:last-child > DIV > DIV:first-child > DIV > DIV:first-child > DIV > DIV:first-child + DIV + DIV,\n\n";
css		+= "HTML > BODY > DIV:first-child > DIV:last-child > DIV > DIV:last-child > DIV:first-child > DIV:first-child + DIV + DIV > DIV:first-child > DIV > DIV > DIV:first-child + DIV > DIV > DIV > DIV > DIV > DIV:last-child > DIV:last-child > DIV > DIV:last-child > DIV > DIV:first-child > DIV > DIV:first-child + DIV + DIV\n\n";
css		+= "{display:none !important;}\n\n\n";

css		+= ".mq \n\n";
css		+= "{visibility: hidden; position: absolute; left: -5000px;}\n\n";

css		+= ".N2mZ7b .v0AEPd,.fXNan,#tb tr td.v,.N2mZ7b .n1QcP,.N6cuDc,#tb tr td.t,.AVVDK,.cvoL6c,.qOu2eb,.PnCCYc,.p9zbT,.Kyw04d,.E88Nbb,.lIBrUb,.VzWY9c,.W4Hanb,.E2xfzc, .y4 img, .r2 img, .lHQn1d img, .lHQn1d img \n\n"
css		+= "{ background-image: none!important; }\n\n";

css		+= "HTML > BODY > DIV:first-child > DIV + DIV > DIV:first-child > DIV:first-child > DIV:first-child > DIV + DIV + DIV > DIV:first-child > DIV + DIV > DIV + DIV > DIV:first-child > DIV + DIV > DIV:first-child \n\n";
css		+= "{position: absolute; top: -8px; left: 75px;}\n\n";

css		+= "input.bQ \n\n";
css		+= "{width: 175px;}";

css		+= ".qp \n\n"
css		+= "{height: 30px}\n\n";

css		+= "HTML > BODY > DIV:first-child > DIV + DIV > DIV:first-child > DIV:first-child > DIV:first-child > DIV + DIV > DIV:first-child > DIV:first-child > NOBR > B \n\n";
css		+= "{background-image:url(http://mail.google.com/mail/images/favicon.ico); background-repeat:no-repeat; line-height:25px; padding-left:20px;}\n\n";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();



function onLoadHandler(){


if(window.parent!=null && window.parent.parent!=null && window.parent.parent.document.getElementById("canvas_frame")!=null) {

	canvas_frame= window.parent.parent.document.getElementById("canvas_frame").contentDocument;

	var logo=canvas_frame.getElementById(":rm");
	
	if(logo!=null && logo.tagName=="DIV") {
	
		logo.style.setProperty("background-image","url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJkAAAA7CAYAAABoiChfAAAFG0lEQVR42u2ZXWgcVRTHE9qmRlvFb8XGNqXaSqDiRx6kFUH8aE0UipWWKkhrfTBQiy8qolIFv0BQMRFrRYgoBauID0IbtWlLaWsRUUEqaARpfTAxm12TnWwmu1n/B++U4+Xe2Zl005bd/w8Ok8w5Mztz8t9zzz1paCCEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgipF8IwbC+VSi8GQdDCbJAZoVwuXwrbD6HhUG6DNTErZEZENjU1VYbQhqSqMSukqsgyOTk5+YOIzFipWCwOZjKZq5kdkppcLncRBNWJavWOEpXT0Kvlx8fHu1DlmlXVuxJ2f4zdbC+3+H1+hWsiazbx7ZVi1b1vjYm7F7bIUblvSPI8jndYYcV0wJZacecr/wrHZ+tcbKpJkUFgByGgQiWBKQtR1XZns9m7TJLkD+cF8cdx6LYSu7ScjBYT35sgttHEfhUTE8J+hG21nqcnycNYz78P9pcVInk8BtulYtuU/0uHyHQu9taUuAYHB+dBYEEKcZ00VL0cqtpmh8jG4R8Sw88jojHle9WT2DC6xjb4rnKILOuJdYkso2Jy6nxeqo5LZBLnex4T26LuU4w+Q46wwNxjtO5F1t/fPxtCeXnqP9IKrFdGHCpJWmRvq/OXwd7QAnQlFvfck2AjokV2W4VYLbJr1PllsK+V7xVPJeuocP8dKvY12MVqWVwN206RNTQ0TkxMLEcVy1nikWVwBwR0i/Q1OPed5S/imm3wnSNVQ4QaJzLjm322iMz4HqyCyD5Xsc84/E2w6+paZNg5LoCQuiPxQFgZ/N4VM8KQmAE0/K2Rv1AoLMG59RUqWTNsg/LtT9mTPecRmYuNCSrZhbB3VW/WlbInmy+xyMl71vkizvXj+ITZQCywctlWTk5tiAwCWQ2BRNVp5/Dw8KqYOVmI+DfR5Ldqv+xEYVsdIpOm+i0xXLsTxwlz/g/YwtMtMjzDh+p59mjBi+imIzLpE3Gvb2PiJAfP1rXIILDHjMC2y9LnENjjRmRPSb8Bm6X9o6Oj8gcpwDYn3F1+j8PimCXiG7ONt63JI7J7HLFzPJXMxUv2e1sie8D1PFb8PNi2qNF3IPm52xYZctHnuPdNNScy9FUv4GWP4oUusRLXKt98EaCnF2mUfgjiPA6h/o3qdrtDZAOwz3CPQ+rcERGtT2Qz2ZPJHxX2BX48oa5/0nFN4p7MM2OT2eEnsF/t1qEuezIIZAuWwPvUS86S6gbxnJzwOxIxV5ZIxJ0QvywJcbtLHJcg7idzbhL2+pkQmfRk8n6wR2ClaLyAw5rpigz+p2ErPb5NFBkYGxu7Qjfn2Gk+b48pZPmBnQe7AMJag3NZy78swQjjUdNgR9ypZln/S6x8jscaq7W7xHPv1vMz2LUeka3zPY+1u/wZtl752/EZv6kv1sN1PSeTQSzE9RCq0xHXLAx8hGX1F5dPpv1WkuJGGN3KJ4nvrMLE/1RGGAeU72C0jKeZ+FsjDF8/1lPXIwyIpyOfz/dBYME0BrH/IBE3phDZXNin1s5r4RkUmfwf9Xfl752GyBaZccVh88XRyHOutDYiaUT2ca2MMDrs5S+JoYIN2f8kJsT3TW+C0DqjYWsCQwErvY9ebhWzR9KK7dwwDD9wCQtLagGVqy8Igh4zKZ/DjJFTGWmshagGtMiYFVJ1RkZGrkfV2kWRkdOxhN4Bkf3JTJAZBQ3+5cwCIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCHk7Odfr2UM7HDwgykAAAAASUVORK5CYII=\")","important");

		logo.style.setProperty("margin-right", "0", "important");

		logo.style.setProperty("width", "153px", "important");

	}
		
}
	
}

window.addEventListener('load',onLoadHandler,true);
