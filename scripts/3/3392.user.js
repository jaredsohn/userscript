// ==UserScript==
// @name          Penny Arcade - Comic Is Next
// @namespace     http://norman.rasmussen.co.za/pennyarcade
// @description   Links the main comic image to the next page, so you don't have to hit the tiny next button
// @include       http://*.penny-arcade.com/comic*
// @include       http://penny-arcade.com/comic*
// ==/UserScript==

(function() {

var adhoriz = document.getElementById('adhoriz');
var footer = document.getElementById('footer');

adhoriz.parentNode.removeChild(adhoriz);
footer.parentNode.insertBefore(adhoriz, footer);

var comicDiv = document.getElementById('comicstrip');

var nextLinks = document.evaluate(
    '//a[img/@alt="Next"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

var nextLink = nextLinks.snapshotItem(0);

var newLink = document.createElement('a');
newLink.href = nextLink.href;

newLink.appendChild(comicDiv.firstChild);

comicDiv.appendChild(newLink);

})();

