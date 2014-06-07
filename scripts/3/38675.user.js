// ==UserScript==
// @name          Ikariam3
// @namespace     http://userstyles.org
// @description	  Permet d'avoir les graphismes de la version 0.3 d'ikariam sur son compte 0.2.8
// @author        okonotrop
// @homepage      http://userstyles.org/styles/12921
// @include       https://s*.ikariam.*/*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); #city #container .phase1 { background-image:url(http://s99.ikariam.org/skin/img/city/city_level1.jpg) !important;} #city #container .phase2 { background-image:url(http://s99.ikariam.org/skin/img/city/city_level2.jpg) !important;} #city #container .phase3 { background-image:url(http://s99.ikariam.org/skin/img/city/city_level3.jpg) !important;} #city #container .phase4 { background-image:url(http://s99.ikariam.org/skin/img/city/city_level4.jpg) !important;} #city #container .phase5 { background-image:url(http://s99.ikariam.org/skin/img/city/city_level5.jpg) !important;} #city #container .phase6 { background-image:url(http://s99.ikariam.org/skin/img/city/city_level6.jpg) !important;} #city #container .phase7 { background-image:url(http://s99.ikariam.org/skin/img/city/city_level7.jpg) !important;} #city #container .phase8 { background-image:url(http://s99.ikariam.org/skin/img/city/city_level8.jpg) !important;} #city #container .phase9 { background-image:url(http://s99.ikariam.org/skin/img/city/city_level9.jpg) !important;} #city #container .phase10 { background-image:url(http://s99.ikariam.org/skin/img/city/city_level10.jpg) !important;} #city #container .phase11 { background-image:url(http://s99.ikariam.org/skin/img/city/city_level11.jpg) !important;} #city #container .phase12 { background-image:url(http://s99.ikariam.org/skin/img/city/city_level12.jpg) !important;} #city #container .phase13 { background-image:url(http://s99.ikariam.org/skin/img/city/city_level13.jpg) !important;} #city #container .phase14 { background-image:url(http://s99.ikariam.org/skin/img/city/city_level14.jpg) !important;} #city #container .phase15 { background-image:url(http://s99.ikariam.org/skin/img/city/city_level15.jpg) !important;} #city #container .phase16 { background-image:url(http://s99.ikariam.org/skin/img/city/city_level16.jpg) !important;} #city #container .phase17 { background-image:url(http://s99.ikariam.org/skin/img/city/city_level17.jpg) !important;} #city #container .phase18 { background-image:url(http://s99.ikariam.org/skin/img/city/city_level18.jpg) !important;} #city #container .phase19 { background-image:url(http://s99.ikariam.org/skin/img/city/city_level19.jpg) !important;} #city #container .phase20 { background-image:url(http://s99.ikariam.org/skin/img/city/city_level20.jpg) !important;} #city #container #mainview #locations li .constructionSite { left:-20px !important; top:-30px !important; width:114px !important; height:81px !important; background-image:url(http://s99.ikariam.org/skin/img/city/constructionSite.gif) !important; }";
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
