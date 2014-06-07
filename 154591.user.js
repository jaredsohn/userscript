// ==UserScript==
// @name        netvibes - autoclick New Items alert
// @namespace   mikecupcake
// @include     http*://*netvibes.com/privatepage/*
// @grant	none
// @version     0.3
// ==/UserScript==

doIt();

function doIt() {
	var newItem = document.querySelector(".new-item-notify");
	if (!newItem || newItem.style.visibility == "hidden") { 
    		setTimeout(function(){ doIt(); }, 3000); 
	    	return;
	}
	setTimeout(function(){ newItem.click(); }, 1000);
	setTimeout(function(){ doIt(); }, 20000);
}
