// ==UserScript==
// @name           CRMOD Hide CTE Banner
// @namespace      http://userscripts.org/users/289955
// @description    Hide CRM On Demand banner 'CTE - Leading Environment'
// @include        https://secure-ausomxapa.crmondemand.com/*
// ==/UserScript==
var allDivs, thisDiv;
allDivs = document.getElementsByTagName('div');
for (var i = 0; i < allDivs.length; i++) {
    thisDiv = allDivs[i];
    if(thisDiv.innerHTML == "CTE - Leading Environment"){
		thisDiv.parentNode.removeChild(thisDiv);
		break;
	}
}