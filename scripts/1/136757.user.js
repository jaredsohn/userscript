// ==UserScript==
// @name           Tages-Anzeiger Ad Remover
// @description    Removes annoying www.tages-anzeiger.ch ads
// @author         Jonas Sourlier
// @include        http://*.tages-anzeiger.*
// @include        http://*.tagesanzeiger.*
// @include        http://*.tagi.*
// @include        http://newsnetz-blog.*
// @version        1.2
// ==/UserScript==
grandparent = document.getElementById('mainWrapper');
var removeAds = function(){
	var ids = [ 'sidebarSky', 'adtopBanner', 'colRightAd', 'footerAdSpecial', 'wideBoard', 'halfpageAd' ];
	for (var id in ids) {
		var element = document.getElementById(ids[id]);
		if (element) {
			element.style.visibility = 'hidden';
			element.style.display = 'none';
		}
	}
	var list = document.getElementsByClassName('ad');
	for (var i = 0; i < list.length; i++) {
		list[i].style.visibility = 'hidden';
		list[i].style.display = 'none';
	}
}
//gets invoked whenever the contents of grandparent changes
grandparent.addEventListener("DOMSubtreeModified", removeAds, true);
removeAds();
