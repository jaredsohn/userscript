// ==UserScript==
// @name           art.gnome.org
// @namespace      0x5.blogspot.com
// @include        art.gnome.org/backgrounds
// ==/UserScript==
var allLinks, thisLink, newLink, allOptions, thisOption, LinkToImage, t;
allLinks = document.evaluate(
    '//img[@width="96"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
allOptions = document.evaluate(
    '//select[@name="d"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null); 
allDivs = document.evaluate(
    '//div[@class="list-item"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null); 

for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    thisOption = allOptions.snapshotItem(i);
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.style.overflow = "hidden";
    newLink = document.createElement('a');
    t = thisOption.innerHTML.substring(thisOption.innerHTML.indexOf('"') + 1,200);
    t2 = t.substring(0,t.indexOf('"'));
    GM_log(t2);
    LinkToImage = t2.substring(t2.lastIndexOf('/'),200);
    newLink.href = "http://ftp.gnome.org/pub/GNOME/teams/art.gnome.org/backgrounds" + LinkToImage;
    //http://ftp.gnome.org/pub/GNOME/teams/art.gnome.org/backgrounds/NATURE-20F_1024x768.jpg
    newLink.innerHTML = "<img width = 96 src = " + thisLink.src + " alt = 'preview' >"
    thisLink.parentNode.insertBefore(newLink, thisLink);
    thisLink.src = "";
    thisLink.width = 0;
    thisLink.alt = "";
}
