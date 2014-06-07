// ==UserScript==
// @name          Ctrl Alt Delete - Comic Is Next
// @namespace     http://norman.rasmussen.co.za/ctrlaltdelete
// @description   Links the main comic image to the next page, so you don't have to hit the tiny next button
// @include       http://*.cad-comic.com/comic.php*
// @include       http://www.cad-comic.com/comic.php*
// @include       http://*.ctrlaltdel-online.com/comic.php*
// @include       http://www.ctrlaltdel-online.com/comic.php*
// ==/UserScript==

(function() {

var adImgs = document.evaluate(
    '//img[@src="/_common/images/adtext.gif"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

var adImg = adImgs.snapshotItem(0);

adImg.parentNode.height = "103";
document.body.parentNode.scrollTop = 200;

var nextLinks = document.evaluate(
    '//a[img/@src="/_common/images/comicnav/next1.jpg"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

var nextLink = nextLinks.snapshotItem(0);

var comicDiv = nextLink.parentNode.parentNode.parentNode.parentNode.nextSibling.nextSibling.lastChild.firstChild.firstChild;

var newLink = document.createElement('a');
newLink.href = nextLink.href;

newLink.appendChild(comicDiv.firstChild);
newLink.firstChild.style.border = 'none';

comicDiv.appendChild(newLink);

})();

