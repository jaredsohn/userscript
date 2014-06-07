// ==UserScript==
// @name          Hide Mercadolibre.com.ar ADs By DemianGod
// @namespace     http://userstyles.org
// @description	  Oculta publicidades de Mercadolibre.com.ar By DemianGod
// @author        DemianGod
// @homepage      http://userstyles.org/styles/23337
// @include       http://*mercadolibre.com.ar*/*
// @include       https://*mercadolibre.com.ar*/*
// @include       http://*.*mercadolibre.com.ar*/*
// @include       https://*.*mercadolibre.com.ar*/*
// ==/UserScript==
(function() {
var css = "#adscolumn {\n\ndisplay: none !important;\n\n}\n\ndiv.MClics-bottom {\n\ndisplay: none !important;\n\n}";
var css = "#MClicsQCatAdImg {\n\ndisplay: none !important;\n\n}\n\ndiv.MClics-bottom {\n\ndisplay: none !important;\n\n}";
var css = "#oasTOP {\n\ndisplay: none !important;\n\n}\n\ndiv.MClics-bottom {\n\ndisplay: none !important;\n\n}";


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

try{
sidebarDiv = document.getElementById('adscolumn');
sidebarDiv.style.display = 'none';
}
catch(e){};

try{
var ele = document.getElementById('oasTOP');
ele.style.display = 'none';
}
catch(e){};

try{
var eles = document.getElementById('MClicsQCatAdImg');
eles.style.display = 'none';
}
catch(e){};

try{
var eles = document.getElementById('bottom_ads');
eles.style.display = 'none';
}
catch(e){};