/*
SouthParkStudios Region Free

*/
// ==UserScript==
// @name          South Park Studios Region Free
// @description	  Bypasses South Park Studios region block so you can watch unlimited full episodes in HD outside of US
// @include       http://*southparkstudios.com/full-episodes*
// ==/UserScript==

(function() {

es = document.getElementsByTagName("div");

for (var i = 0; i < es.length; i++)
{
	var style = es[i].style;
	if (!style.cssText) continue;
	if (style.cssText.indexOf('/layout/common/img/geoblock/background.png') != -1)
	{
		es[i].parentNode.removeChild(es[i]);
	}
}

})();
