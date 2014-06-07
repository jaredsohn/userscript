// ==UserScript==
// @name          ElOtroLado.net - Interfaz Limpia
// @namespace     http://userstyles.org
// @description	  Este estilo limpia la interfaz de ElOtroLado.net haciendo desaparecer todos los elementos molestos e innecesarios como la publicidad y dando preferencia al contenido de las noticias y al foro. Su uso está recomendado para resoluciones bajas.
// @author        [DoodoM]
// @homepage      http://userstyles.org/styles/5033
// @include       http://elotrolado.net/*
// @include       https://elotrolado.net/*
// @include       http://*.elotrolado.net/*
// @include       https://*.elotrolado.net/*
// ==/UserScript==
(function() {
var css = "*\n\n\n\n   .banner, .banner_sol, #banner_top, #banner-left, #banner-top,\n   .section_left, #publiright, #txtpubli {\n      display: none !important;\n      }\n   #rightcontent {\n      margin-left: 10px !important;\n      }\n   #contenedor {\n      background-image: none !important;\n      }\n   #contenido {\n      margin: 0 10px !important;\n      padding: 0 !important;\n      }\n   #page-footer {\n      margin: 0 10px !important;\n      }\n   #content {\n      margin-left: 22px !important;\n      }\n   #columna_derecha {\n      margin-left: 0px !important;\n      margin-right: 0px !important;\n      }\n\n\n\n   #upleftlinklist {\n      left: 240px !important;\n      top: -60px !important;\n      position: absolute !important;\n      width: 100px !important;\n      }\n   #upleftlinklist a {\n      color: #ffffff !important;\n      }\n   #leftstats {\n      background-color: transparent !important;\n      border: 0 !important;\n      color: #ffffff !important;\n      display: inline !important;\n      height: 25px !important;\n      left: 253px !important;\n      overflow: hidden !important;\n      position: absolute !important;\n      top: -127px !important;\n      width: 528px !important;\n      }\n   #leftstats a {\n      color: #ffffff !important;\n      }\n   #leftstats .section_header, #leftstats .section_footer {\n      display: none !important;\n      }\n   #leftstats dt {\n      display: block !important;\n      float: left !important;\n      margin-right: 5px !important; \n      }\n   #leftstats dd {\n      display: block !important;\n      float: left !important;\n      margin-right: 10px !important;\n      }\n   img[src=\"http://t1.extreme-dm.com/i.gif\"] {\n      display: none !important;\n      }";
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
