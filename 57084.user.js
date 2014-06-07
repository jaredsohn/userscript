// ==UserScript==
// @name	  Gmail Icons 15x15
// @version	  1.0
// @description	  Iconos de abrir en ventana externa, imprimir, etc. en los mails sin el texto identificatorio (solo iconos)
// @author	  RodolfoGS (http://userscripts.org/users/RodolfoGS)
//			* 1.0 - Script original
// @include	  http://mail.google.com/*
// @include	  https://mail.google.com/*
// @include	  http://*.mail.google.com/*
// @include	  https://*.mail.google.com/*
// ==/UserScript==

(function(){
var css = "div.nH div.hj div.hk { height:17px !important; width:17px !important; overflow:hidden !important; } h1.ha { margin-top:4px !important;  }";

if (typeof GM_addStyle != "undefined"){
	GM_addStyle(css);
} else if (typeof addStyle != "undefined"){
	addStyle(css);
} else{
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0){
		var node = document.createElement("style");
		
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();