// ==UserScript==
// @name          Google Matrix
// @namespace     http://userstyles.org
// @description	  Lovely Google Matrix with real animation!
// @author        Ozyart
// @homepage      http://userstyles.org/styles/65141
// @include       http://www.google*
// @include       https://www.google*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "img#hplogo,div#hplogo,div#pmocntr2\n{\n    display:none;\n}\ndiv#lga\n{\nmargin-top: 5em !important;\nwidth: 0 !important;\nheight: 115px !important;\npadding-left: 280px !important;\nbackground-image: url(\"https://www.google.com/logos/classicplus.png\") !important;\nbackground-repeat:no-repeat !important;\n}\n\nbody\n{\n    background-repeat: repeat !important;\n    background-image: url(\"http://whiterabbit.net16.net/matrix-animated-image.gif\") !important;\n}\n\nem,cite{\n color: white !important;\n}\n\na,spam,p{\n color: #a8ffa8 !important;\n}\ndiv[id=\"leftnav\"],div#appbar,div#topabar,div#gb{\n    background: #000000 !important;\n    opacity:0.9 !important;\n}\nspan[id=\"gbi4t\"]\n{\n    color: black !important;\n}\n\nli,div\n{\n    color: #55aa55 !important;\n}\nDIV#flci a{\nbackground:black;\ncolor:green !important;\nfont-weight:bold;\ncolor:green;\n}\n\nDIV#flci a:after{\ncontent: \" Matrix by Ozyart\";\n}";
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
