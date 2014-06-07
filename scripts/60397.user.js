// ==UserScript==
// @name           Mousehunt Donator
// @namespace      none
// @description    Gives you the Lucky Golden Shield on Mousehunt
// @include        http://apps.facebook.com/mousehunt/*
// @include        http://*.facebook.com/mousehunt/*
// ==/UserScript==
var allDivs, TD;
allDivs = document.getElementsByTagName('div');
for (var i = 0; i < allDivs.length; i++)
{
	TD = allDivs[i];
	if(TD.style.width=="136px")
	if(TD.style.height=="127px")
	{
		var newElement;
		newElement = document.createElement('img');
		TD.parentNode.insertBefore(newElement, TD.nextSibling);
		newElement.src="http://98.129.188.217/mousehunt/images/interface/header_logo_donator.gif";
		TD.parentNode.removeChild(TD);
	}
}