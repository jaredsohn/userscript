// ==UserScript==
// @name          iGoogle - Maximize Vertical Space
// @namespace     http://userscripts.org
// @description	  Makes the header collapsible, hides the footer, and removes widget titles.
// @author        tozlink, by way of Sewar and dawndemon
// @include        http*://www.google.tld/ig*
// @exclude        http*://www.google.tld/ig/*
// ==/UserScript==

/**
A mashup of iGoogle Slim (http://userstyles.org/styles/14976) by dawndemon and iGoogle Cleaner (http://userscripts.org/scripts/show/31313) by Sewar.
http://userscripts.org/scripts/show/24339
*/

(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); form#sfrm { height: 0px; float: left; } #btnG, #btnI { position: absolute; top: 30px; left: 800px; } #btnI { left: 920px; }  div.modbox * { padding: 0px; margin: 0px; } div.modbox div.modtitle { display: none; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();

/* I didn't figure out what is this class used for, so i just commented this code. Maybe enable or remove it later
var snapResults = document.evaluate("//*[@class='gbh']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
	var elm = snapResults.snapshotItem(i);
	elm.style.display = 'none';
}
*/

function toggle_bar() {
	bar = document.getElementById("nhdrwrapsizer");
	if (bar.style.display == 'none') {
		bar.style.display = '';
		bar.nextSibling.nextSibling.style.display = '';
	} else {
		bar.style.display = 'none';
		bar.nextSibling.nextSibling.style.display = 'none';
	}
}

var toggle_bar_link;

toggle_bar_link = document.createElement("a");
toggle_bar_link.className = 'gb1';
toggle_bar_link.href = 'javascript:void(null);';
toggle_bar_link.addEventListener("click", toggle_bar, false); // .onClick never-ever worked for me here :-(
toggle_bar_link.innerHTML = 'Toggle header';
document.getElementById("gbar").firstChild.appendChild(toggle_bar_link, document.getElementById("gbar"));


// Hide bar by default; TODO: Save toggle state and apply it on start
toggle_bar();

// Hide the big footer too, how need it?
document.getElementById("footerwrap").style.display = 'none';
