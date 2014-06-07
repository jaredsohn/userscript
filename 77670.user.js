// ==UserScript==
// @name          lostfilm.tv
// @namespace     http://userstyles.org
// @description	  Одноименный популярный сайт будет выглядеть гораздо лучше с этим скриптом. Обрезается все лишнее.
// @author        banderlog
// @homepage      http://userstyles.org/styles/25837
// @include       http://lostfilm.tv/*
// @include       https://lostfilm.tv/*
// @include       http://*.lostfilm.tv/*
// @include       https://*.lostfilm.tv/*
// ==/UserScript==
(function() {
var css = "body {margin-top: 0px; background-image: url(data:image/gif;base64,R0lGODlhGwAbAKUVAGRjZGBfYFdWV1NTVE1NTn5/f3h5eWxtbXh5eHV2dX9/fmBgX/+uAPWKAOEAAP8kJFRTU318fHZ1dWloaGBfX////9nZ2aGhoYGBgX9/f3x8fHl5eXV1dXFxcW1tbWpqamhoaGRkZFtbW1dXV1NTU1BQUE1NTTg4OCsrKxgYGAAAAP///////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEAAD8ALAAAAAAbABsAAAZ1QJVQhRoaj8ciUolsGplCKFFZpEqZ16iWuB1Wl95wV5zkcqlmZ5mcdqLeYOk0O8Y+2Wh2O6+Xt/9dfoFgZ2pafFuCa3Rfho1ydm56Y4B/jHeYiZlQkYNPcGWQoGqcmYaHqIWEm2SQlppmdJZoVmuTp5S5p1BBADs=) !important; background-repeat: repeat !important; margin-bottom: 10px !important;}\n.main_logo_link {background: url(http://www.lostfilm.tv/Tmpl/LostFilm/img/logo_black.gif) !important; background: no-repeat left top ; width:238px; height:56px; display:block;}\n.bb_nopadding{display:none} #ta_link{display:none;}\ndiv[class=\"left\"]>div:nth-last-child(-n+13) {display: none;}\np.disclaimer {display: none;}\n#myAa {display: none !important;}\n#myA {display: none !important;}\n.main_logo_link {margin-top: 15px !important;}\n.logo {height: 100px !important;}\ndiv.left > div.bb > a:nth-last-child(-n+10) {display:none !important;}\ndiv.left > div.bb {height: 903px;}";
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
