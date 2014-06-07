// ==UserScript==
// @name          Geekhack.org Open All New Posts
// @description   Opens all new unread posts when clicking the "New Posts" link. Should work for most vBulletin's
// @include       http://geekhack.org/search.php?searchid=*
// @exclude
// ==/UserScript==

var allLinks, thisLink;
allLinks = document.evaluate(
"//a[starts-with(@id,'thread_gotonew')]",
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
thisLink = allLinks.snapshotItem(i);
// do something with thisLink
if (i == 0) {
window.location=thisLink;
}
else {
window.open(thisLink);
}
}