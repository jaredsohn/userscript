// ==UserScript==
// @name Edit Highlighter FF2/3
// @namespace ThaGamer2
// @description Highlights edits on the messages screen.
// @include http://luelinks.net/showmessages.php*
// @include https://luelinks.net/showmessages.php*
// @include http://www.luelinks.net/showmessages.php*
// @include https://www.luelinks.net/showmessages.php*
// ==/UserScript==
var allLinks, thisLink;
allLinks = document.evaluate('//a[@href]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
thisLink = allLinks.snapshotItem(i);
if(thisLink.innerHTML.match(/edit/)){
if(thisLink.href.match(/\&r\=/)){
thisLink.href+="&diff";
thisLink.style.color="#AA0000";
}
}
}