// ==UserScript==
// @name           BYOND Add This
// @namespace      http://userscripts.org/users/cboland
// @description    Changes the facebook link to a share addthis link
// @include        http://www.byond.com/*
// @include        http://byond.com/*
// ==/UserScript==

var spans = document.getElementsByTagName('span');
for(var i = 0; i < spans.length; i++){
	if(spans[i].getAttribute("class") == "fb_share") {
		addThis(spans[i]);
	}
}

function addThis(element) {
	element.innerHTML  = '<a href="http://www.addthis.com/bookmark.php?v=250&amp;username=cboland">Share</a>';
}
