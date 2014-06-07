// ==UserScript==
// @name           CNET Ad Remover
// @namespace      http://userscripts.org/users/86564
// @description    CNET Ad Remover
// @include        http://news.cnet.com/*
// ==/UserScript==

var adColumn = document.getElementById("contentAux");
adColumn.parentNode.removeChild(adColumn);

if (window.location.href != "http://news.cnet.com/")
{
	var mainBody = document.getElementById("contentBody");
	mainBody.style.width = "100%";
}