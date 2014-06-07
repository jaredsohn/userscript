// ==UserScript==
// @name          mediaportal_newwindows
// @description   Открывает ссылки на фильмы в медиапортале в новом окне
// @include       http://media.westhome.spb.ru/*
// ==/UserScript==

//для совместимости с opera script
if( location.hostname.indexOf('media.westhome.spb.ru') != -1 ) {

var allLinks, thisLink;
allLinks = document.evaluate('//a[@href]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    

    if ( thisLink.href.match("module=vdb") && thisLink.href.match("mod=view")) thisLink.target="_blank";

}
}