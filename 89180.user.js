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

pseudo.add("dim38", "#66FF66");
pseudo.add("peach_bis_daisy", "#800000");
pseudo.add("Ines_62", "#800000");
pseudo.add("Babychinise", "#339933");
pseudo.add("SLR_le_retour", "#3300FF");
pseudo.add("[JV]Meta-Knight", "#00CCFF");

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