// ==UserScript==
// @name          Ricky Gervais - Blog restyle
// @namespace     http://userstyles.org
// @description	  A user style for the Ricky Gervais blog. Bigger font, better layout, tweaked style
// @author        sinodrom
// @homepage      http://userstyles.org/styles/23855
// @include       http://rickygervais.com/thissideofthetruth*
// @include       http://www.rickygervais.com/thissideofthetruth*
// ==/UserScript==
(function() {
var css = "body {\nbackground-color: white !important;\n}\n\n\nimg[src=\"images/blank.gif\"] {\ndisplay: none !important;\nvisibility: hidden  !important;\nborder: none  !important;\n}\n\n\n* {\nmargin: 0 0 0 0 !important;\npadding:0 0 0 0 !important;\n}\n\n\na, a:link, a:hover, a:active, a:visited {\ncolor: blue !important;\ntext-decoration:underline !important;\n}\n\n\na:not([href]) {\ncolor: black !important;\ntext-decoration: none !important;\n\n}\n\n\nul, ol {\npadding: 20px 20px 20px 20px !important;\n}\n\n\ntable[width=\"770\"][cellspacing=\"0\"][cellpadding=\"0\"][border=\"0\"] {\nwidth: 100% !important;\npadding: 0px 20px 0px 20px !important;\n}\n\n\ntd[width=\"520\"][valign=\"top\"] {\nwidth: 80% !important;\n}\n\ntd[width=\"250\"][valign=\"top\"] {\nwidth: 20% !important;\nopacity: 0.3;\nfilter: alpha(opacity=30);\n}\n\ntd[width=\"250\"][valign=\"top\"]:hover {\nopacity: 1;\nfilter: alpha(opacity=100);\n}\n\n\ntd[width=\"250\"][valign=\"top\"] table td {\ncolor: gray !important;\n}\ntd[width=\"250\"][valign=\"top\"] table td a {\ncolor: dimgray !important;\n}\n\n\ntable[width=\"520\"] {\nwidth: 700px !important;\nmargin: 0 auto 0 auto !important;\n}\n\n\ntable[width=\"520\"] td {\nline-height: 24px !important;\nfont-size: 16px !important;\nfont-family: Tahoma, sans-serif !important;\ntext-align: justify !important;\n}\n\n\ntable[width=\"520\"] td b {\nfont-family: Trebuchet MS, sans-serif !important;\nfont-size: 24px !important;\ntext-transform: uppercase !important;\nline-height: 50px !important;\nclear: both !important;\ntext-shadow: silver 1px 1px !important;\n}\n\ntable[width=\"520\"] td > hr:first-of-type,\ntable[width=\"520\"] td > b:first-of-type {\ndisplay: none !important;\n}\n\ntable[width=\"520\"] td  b a, table[width=\"520\"] td  a b {\nfont-family: inherit !important;\nfont-size: inherit !important;\ntext-transform: none !important;\nline-height: inherit !important;\nclear: none !important;\ntext-shadow: none !important;\ncolor: black !important;\ntext-decoration: none !important;\n}\n\n\ntable[width=\"520\"] td br + br {\nclear: both !important;\nline-height: 0 !important;\ndisplay: block !important;\n}\n\n\ntable[width=\"520\"] td img {\nbackground-color: rgb(240,240,240) !important;\n\nmargin: 20px auto 20px auto !important;\npadding:10px !important;\ndisplay: block !important;\nclear: both !important;\n}\n\n\nhr {\nwidth: 60% !important;\nmargin: 40px auto 20px auto !important;\ntext-align: center !important;\ncolor: white !important;\nbackground-color: dimgray !important;\n}\n\n\ntable[width=\"520\"] td hr:first-child {\nwidth: 100% !important;\nheight: 1px !important;\nborder-width:0 0 0 0;\nmargin: 0 0 0 0 !important;\ncolor: black  !important;\nbackground-color: black !important;\n}\n\ntable[width=\"520\"] td hr:first-child + br {\nclear: both !important;\nline-height: 0 !important;\ndisplay: block !important;\n}\n\n\ntable[width=\"520\"] td table {\nwidth: 100% !important;\n}\n\ntable[width=\"520\"] td table td {\ntext-align: left !important;\nvertical-align: top !important;\n}\n\ntable[width=\"520\"] td table td > hr:first-of-type {\ndisplay: block !important;\n}\n\n\ntd[width=\"10\"]{\ndisplay: none !important;\nwidth: 0px !important;\n}\n\nfont[size=\"-1\"] {\ntext-align: justify !important;\n}\n\n#copyright {\ndisplay: none !important;\n}\n\n#footer {\nwidth: 100% !important;\nbackground: none !important;\n}\n\n#footer a {\nfont: inherit !important;\ncolor: dimgray !important;\n}";
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