// ==UserScript==
// @name        Rllmuk Control Panel Link Fixer
// @namespace   http://www.evilwallpaper.co.uk
// @description Fixes the watch thread links to go to the newest post and not the first.
// @include     http://www.rllmukforum.com/index.php?act=UserCP&CODE=26*
// @include     http://rllmukforum.com/index.php?act=UserCP&CODE=26*
// @include     http://www.rpsoft.co.uk/index.php?act=UserCP&CODE=26*
// @include     http://rpsoft.co.uk/index.php?act=UserCP&CODE=26*
// @include     http://www.extranoise.co.uk/index.php?act=UserCP&CODE=26*
// @include     http://extranoise.co.uk/index.php?act=UserCP&CODE=26*

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
     $regexpr='showtopic';
     if (thisLink.href.match($regexpr)) {
        thisLink.href += '&view=getnewpost';
     }
}