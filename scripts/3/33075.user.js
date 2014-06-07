// ==UserScript==
// @name           Digg comment unsmasher
// @namespace      http://paxoo.com/digg-unsmasher
// @description    Unsmash those digg comments so that the comment body does not fly smash into the comment header
// @include        http://digg.com/*
// @include        http://*.digg.com/*
// ==/UserScript==

// I'm not a JavaScripter, so much of this is hacked from 
// diveintogreasemonkey.org. Weeeee!

// The replacement text for the bad CSS that needs to die
var newCSS = '\r\n\r\n   #nojsstyle {} /* Do Not Remove. Must be 1st CSS rule in this stylesheet. Necessary for Comments.js. */\r\n\r\n'

var allStyles = document.evaluate(
	'//style[@id]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

var oldStyle;

for (var i=0; i < allStyles.snapshotLength; i++) {
	oldStyle = allStyles.snapshotItem(i);
	if (oldStyle.id == 'nojsstyle') {
		var newStyle = document.createElement('style');
		newStyle.type = 'text/css';
		newStyle.id = 'nojsstyle';
		newStyle.innerHTML = newCSS;
		oldStyle.parentNode.replaceChild(newStyle, oldStyle);
		return true;
	}
};