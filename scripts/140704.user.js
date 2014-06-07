// ==UserScript==
// @name        StartPage Remove Ads
// @namespace   tag:paddyonline.net,2012-08-11:stpgdelad
// @description Removes Ads from startpage.com
// @match       *://startpage.com/*
// @match       *://*.startpage.com/*
// @version     1.0.1
// ==/UserScript==


function removeSPRA(toremove) {
	if(typeof toremove== 'string') toremove=document.getElementById(toremove);
	if(toremove && toremove.parentNode)toremove.parentNode.removeChild(toremove);
}

// remove the one on top
removeSPRA('sponsored');
// do it again to remove the one in the bottom - geez...
removeSPRA('sponsored');