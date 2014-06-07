// ==UserScript==
// @name           Manager Font Resizer (ExtraLarge)
// @namespace      ManagerFont
// @include        http://www.manager.co.th/*
// @include        http://mgr.manager.co.th/*
// ==/UserScript==

var intCount;

for(intCount = 0;intCount < document.styleSheets.length; intCount++) {
	if(document.styleSheets[intCount].title == "ExtraLarge")
		document.styleSheets[intCount].disabled = false;
	else
		document.styleSheets[intCount].disabled = true;
}
