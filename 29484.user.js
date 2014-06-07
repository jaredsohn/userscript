// ==UserScript==
// @name           BetterH$$
// @namespace      H$$ 
// @description    un peu de tweaking pour H$$...
// @include        http://www.hotspotshield.com/launch/
// @include        http://127.0.0.1:895/config/?action=connect
// ==/UserScript==
var lien=location.href;
if(!(lien.indexOf('www.hotspotshield.com')==-1)){
	window.location.replace("http://127.0.0.1:895/config/?action=connect");
}
else{
window.location.replace("http://127.0.0.1:895/config/");
}