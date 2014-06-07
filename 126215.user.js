// ==UserScript==
// @name           Coloration de pseudos !
// @namespace      Coloration de pseudos !
// @description	   Coloration de pseudos !
// @include        http://www.jeuxvideo.com/forums/0-*
// @include        http://www.jeuxvideo.com/forums/1-*
// @include        http://www.jeuxvideo.com/forums/3-*
// ==/UserScript==

var pseudo, i, tr, td, ul, change;
pseudo = {};
pseudo.add = function (name, color) {
	this[name.toLowerCase()] = color;
}

pseudo.add("Pk_La_Guerre", "#33FFFF");
pseudo.add("-SmOutch-", "#CC0000");
pseudo.add("Say[Ksy]", "#CC0000");
pseudo.add("Stade", "#3399FF");
pseudo.add("BalboaRocky", "#FF9900");
pseudo.add("Halcallys", "#CC0000");
pseudo.add("[Linux]", "#33FF33");
pseudo.add("Gamma97_y", "#0033FF");
pseudo.add("fcbarcelone2010", "#CC0000");
pseudo.add("r-mean", "#FF0000");
pseudo.add("admin1360", "#FF0000");
pseudo.add("iPhone6S", "#CC0000");
pseudo.add("Embouteillage", "#9900CC");
pseudo.add("Solex1921", "#0000FF");
pseudo.add("TheFountain", "#FF9900");
pseudo.add("Bridgess34", "#FFFF00");
pseudo.add("Hemdal", "#009900");
pseudo.add("GranolaCosmique", "#FF9900");




function change(elem, pseudo) {
	if (pseudo.hasOwnProperty(elem.innerHTML.toLowerCase())) {
		elem.style.color = pseudo[elem.innerHTML.toLowerCase()];
	}
}

if (new RegExp("\\.jeuxvideo\\.com/forums/([0-9]+)\\-([0-9]+)\\-([0-9]*)\\-([0-9]*)\\-([^-]*)\\-([0-9]*)\\-([0-9]*)\\-(.*)\\.htm#?(.*)").test(location.href)) {
	switch (RegExp.$1) {
	case "0" :
		try {
			tr = document.getElementById("liste_topics").getElementsByTagName("tr");
			for (i = 0; i < tr.length; ++i) {
				var td = tr[i].getElementsByTagName("td");
				if (td.length > 3) {
					change(td[td.length - 3], pseudo);
				}
			}
		} catch (e) {
		}
		break;
	case "1" :
	case "3" :
		try {
			ul = document.getElementById("col1").getElementsByTagName("ul");
			for (i = 0; i < ul.length; ++i) {
				change(ul[i].getElementsByTagName("strong")[0], pseudo);
			}
		} catch (e) {
		}
		break;
	}
}