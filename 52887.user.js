// ==UserScript==
// @name           Kad Feeder (Beta Testing)
// @description	   Refreshes the kad game.
// @namespace      http://userscripts.org/users/86406
// @include        http://www.neopets.com/games/kadoatery/index.phtml

// ==/UserScript==
var x = 3500 //set the refresh rate here.

if(document.body.innerHTML.indexOf('>
You should give it
*') != -1){
var kad= document.evaluate('//b[. = "
You should give it
"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){kad = kad.snapshotItem(0);selectedlink=kad.previousSibling.previousSibling;window.location = selectedlink}return;}

else { window.setTimeout(function(){window.location.reload() ;},x) ;}return;