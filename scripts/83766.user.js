// ==UserScript==
// @name             Megaupload-Premium-Plus (solo Opera)
// @namespace        Juampi_Mix
// @description      Descarga como Premium de Megaupload. Sin captcha y sin tiempo de espera. SOLO PARA EL NAVEGADOR OPERA!!!.
// @version          12.52
// @date             12/09/2010
// @include          http://www.megaupload.com/?d=*
// ==/UserScript==

(function() {
var css = "";
if (false || (document.domain == "megaupload.com" || document.domain.substring(document.domain.indexOf(".megaupload.com") + 1) == "megaupload.com"))
	css += "#main > DIV:last-child > DIV:first-child > DIV:first-child + DIV + DIV + DIV, DIV[style=\"position: relative; width: 980px; height: 85px;\"], HTML > BODY > CENTER > DIV:first-child + DIV > DIV > TABLE > TBODY > TR, IFRAME[width=\"995\"][scrolling=\"no\"][height=\"275\"][frameborder=\"0\"][allowtransparency=\"true\"][hspace=\"0\"][vspace=\"0\"][marginheight=\"0\"][marginwidth=\"0\"][src=\"mc.php?l=en\"],#tabs,#main > DIV:last-child > DIV:first-child > DIV:first-child + DIV + DIV + DIV + DIV  {display:none !important;}  #main > DIV:last-child > DIV:first-child > DIV:first-child {   background-image: none !important; }  DIV[style=\"position: absolute; left: 703px; top: 10px; height: 115px;\"] {   position: relative !important;   left: 400px !important;   top: 200px !important; }  DIV[style=\"position: absolute; left: 671px; top: 131px; width: 321px; height: 127px; background-image: url(http://wwwstatic.megaupload.com/gui2/dnld_tabbie.gif); z-index: 1;\"] {   left: 400px !important;   top: 400px !important; }  DIV[style=\"position: absolute; left: 671px; top: 272px; width: 321px; height: 127px; background-image: url(http://wwwstatic.megaupload.com/gui2/dnld_tabbie.gif); z-index: 1;\"] {   left: 400px !important;   top: 200px !important; }";

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



window.location.href = window.location.href.replace(/\/\?d=/, "/mgr_dl.php?d=");