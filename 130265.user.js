// ==UserScript==
// @name           Spring_Off
// @namespace      nonamespace
// @include        http://mightandmagicheroeskingdoms.ubi.com/play
// ==/UserScript==

function addCss(cssString) {
	var head = document.getElementsByTagName('head')[0];
	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cssString;
	head.appendChild(newCss);
}

addCss (
	'#MainContainer .worldMap_zoom1 { background-image:url("http://static5.cdn.ubi.com/u/HOMMK/mightandmagicheroeskingdoms.ubi.com/1.5.0.129-11-MTR/img/worldMap/zoom1/background.jpg");}');
addCss (
	'#MainContainer .worldMap_zoom2 { background-image:url("http://static5.cdn.ubi.com/u/HOMMK/mightandmagicheroeskingdoms.ubi.com/1.5.0.129-11-MTR/img/worldMap/zoom2/background.jpg");}');