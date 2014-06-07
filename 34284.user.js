// ==UserScript==
// @name ltest
// @description learning testing (junk code)
// @include *
// ==/UserScript==

var allLinks, thisLink;
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);

//alert(thisLink.href.indexOf('bux.com/viewp.php?ad=')+thisLink.href);

if(thisLink.href.indexOf('bux.com/viewp.php?ad=')>0) 
{
alert(thisLink.href.indexOf('bux.com/viewp.php?ad=')+thisLink.href+"is New Add");
i=1000;
}
}