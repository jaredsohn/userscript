// ==UserScript==
// @name          Digg3 Ad Remover
// @namespace     http://www.waxydesign.com
// @description   Removes the ads on Digg 3.0
// @include       http://*digg.com/*
// @exclude       
// ==/UserScript==
	
(function() {
	document.getElementById('top_ad').style["display"] = "none";
	document.getElementById('item_ad').style["display"] = "none";
	document.getElementById('comments_ad').style["display"] = "none";
})()

