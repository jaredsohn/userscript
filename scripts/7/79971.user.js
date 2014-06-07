// ==UserScript==
// @name           gprevolution
// @namespace      interceptor
// @description    Elimina lo spam pubblicitario
// @version        0.3
// @include        http://community.girlpower.it/*
// @require        http://sizzlemctwizzle.com/updater.php?id=79971
// ==/UserScript==


// rimuove la sidebar, estende la main bar

var adSidebar = document.getElementById('colonna_right');
if (adSidebar) {
	adSidebar.parentNode.removeChild(adSidebar);
}

var columnDivision = document.getElementById('forum_colonna_sinistra');
if (columnDivision) {
	columnDivision.id = 'prrr'
}

// rimuove la pubblicita' in flash in alto accanto al logo
// (sforma un po l'header, da sistemare)

var adTop = document.getElementById('adv_728');
if (adTop) {
	adTop.parentNode.removeChild(adTop);
}

// cerca e rimuove google ads
// (non rimuove quello piccolo in home, da sistemare)

var temp;
//var adGoogle = document.getElementById('inlinemodform');
//if (adGoogle) {
	var adDivSearch = document.getElementsByTagName('div');
	for (var i = 0; i < adDivSearch.length; i++) {
		temp = adDivSearch[i];
		if (temp.attributes.getNamedItem('style')) {
			if (temp.attributes.getNamedItem('style').value.match(/overflow/i)) {
				temp.attributes.getNamedItem('style').value = 'display:none';
			}
		}
	}
//}