// ==UserScript==
// @name           Boring RPG Bot Custom Edition
// @namespace      Boring RPG Bot
// @description    Boring RPG Bot Custom Edition
// @include        http://www.boringrpg.com/game
// @Author         Based on Jordy Kroeze's script
// ==/UserScript==

function getElementsByClassName(node,classname) {
	if (node.getElementsByClassName)
		return node.getElementsByClassName(classname);
}

var reloadtime = (Math.ceil(Math.random()*54321) + 109876);

if(document.getElementsByTagName('span')[0].innerHTML.indexOf("<u>now</u>") >= 0){
	document.getElementsByClassName('play')[0].click();
}

setTimeout( function() {
	window.location.href = 'http://www.boringrpg.com/game';
}, reloadtime );

// Because there are Server errors all the time because timeout.
if(document.body.innerHTML.indexOf("Server Error") >= 0){
setTimeout( function() {
	window.location.href = 'http://www.boringrpg.com/game';
}, reloadtime );
}