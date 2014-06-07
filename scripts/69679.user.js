// ==UserScript==
// @name	finn.no bil-bilder piltaster
// @namespace	http://userscripts.org/users/chiller
// @description	Makes it so that you can use the arrow keys when browsing car-images on finn.no
// @include	http://www.finn.no/finn/car/viewimage?*
// @include	http://www.finn.no/finn/bap/viewimage?*
// @include	http://pal.finn.no/*/car/viewimage?* 
// @author	chiller
// ==/UserScript==

document.addEventListener('keydown',kpressed_others,false);
function kpressed_others(e){
	if (e.keyCode == 39){
		location.href = "javascript:nextImage();";
	}
	if (e.keyCode == 37){
		location.href = "javascript:previousImage();";
	}
	else return
}
