// ==UserScript==
// @name           Reduced planet image in overview and fleet section
// @description	   Script reduced view in overview and fleet. And it`s load none background
// @version	   1.2
// @author         Joks u65
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

		
(function() {
var css = "body#alliance, body#overview, body#resources, body#station, body#station-moon, body#trader, body#defense, body#shipyard, body#research, body#statistics, body#messages, body#fleet1, body#fleet2, body#fleet3, body#movement, body#premium, body#galaxy {\nbackground-image:none !important;\n}\n\nbody#fleet1 #planet, body#fleet2 #planet, body#fleet3 #planet, body#movement #planet{height:40px !important;}\n\n#overview #planet {height: 154px !important;background-position: 0px -146px !important;}#overview #planetdata {margin-top: 21px !important;}#overview .c-left, #overview .c-right {top: 118px !important;}\n\n#eventboxLoading img, #star, #star1, #star2 { display:none !important; }";
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







