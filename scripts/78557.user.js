// ==UserScript==
// @name           DeviantArt - Deviation Fullsize Toggle
// @namespace      http://userscripts.org/users/70005
// @description    Adds a button to deviations to extend the toggle the width of the viewer between the default and the full page width.
// @include        http://*.deviantart.com/art/*
// ==/UserScript==
/*Changelog
1.0.6.8. Initial release
1.0.6.9. Added changelog
	Fixed bug causing large space above fullview non-lit art
	Fixed gap above lit pieces
1.1.6.9 Auto-detect and correct varying gaps above lit piece
1.2.6.12 Remove bottom gaps on short lit pieces
*/
var css='table.f[align=center] {width: 100% !important;} #gmi-ResourcePageDisplayPane {width: 100% !important;} .shadow{text-align: right !important;} #gmi-ResourcePageMetaPane {visibility: hidden !important;} #gmi-ResViewContainer {left: -25px !important;} '; 

var clickJS="if(document.getElementById('extcss').innerHTML=='body.fullview .resview7-view {margin-right: 350px !important;}'){document.getElementById('extcss').innerHTML = '" + css +"'; document.getElementById('extcss').innerHTML += ' table.f[align=center] {margin-top: -' + ((document.getElementById('lit-view').getElementsByTagName('table')[0].offsetTop)-30) + 'px !important;} #lit-view{height:' + (document.getElementById('lit-view').getElementsByTagName('table')[0].offsetHeight) + 'px !important;}';} else{document.getElementById('extcss').innerHTML='body.fullview .resview7-view {margin-right: 350px !important;}';} return false;";

document.body.innerHTML+='<style id="extcss" type="text/css">body.fullview .resview7-view {margin-right: 350px !important;}</style>';

function togglewidth(){
	document.getElementById('lit-view').getElementsByTagName('div')[0].innerHTML+='<a onclick="' + clickJS + '" class="t-font" href="">F</a>';
	}
	
togglewidth();

	