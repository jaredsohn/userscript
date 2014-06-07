// ==UserScript==
// @name           Moe
// @namespace      Moe Fix 1
// @description    Arrow Keys On DM
// @include        http://www.doujin-moe.us/phpgraphy/index.php*
// @include        http://www.doujin-moe.us/phpgraphy_classic/index.php?mode=slideshow&*
// ==/UserScript==
var SCRIPT = {
	url: 'http://userscripts.org/scripts/source/46023.user.js',
	version: '2.2.4',
	name: 'moe',
};
if(document.location.href.search('_classic')==-1){
	var s="http://www.doujin-moe.us/phpgraphy_classic/index.php";
	var r="http://www.doujin-moe.us/phpgraphy/index.php"
	s+=document.location.href.substring(r.length);
	document.location=s;
}else{
	document.addEventListener('keydown',kpressed_others,false);
	window.setTimeout("pause()",0);
	window.setTimeout("hideControl()",0);
}
function kpressed_others(e) {
	document.getElementById('slideshow').style.top='0px';
	keycode = e.keyCode;
	if (keycode == 39)window.setTimeout("slides.next()", 0);
	else if (keycode == 37)window.setTimeout("slides.previous()", 0);
	else return
	window.setTimeout(function(){document.getElementById('slideshow').style.top='0px';window.scrollBy(0,-500);},1)
}