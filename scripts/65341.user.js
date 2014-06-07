// ==UserScript==
// @name           Manhunt previews
// @namespace      none
// @include        http://www.manhunt.net/profile/*
// @include        http://www.manhunt.net/profileSearch/*
// @version        1.0
// ==/UserScript==

var allDivs, thisDiv;
allDivs = document.evaluate(
    '//div[@class="notClickable"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    var str = String(thisDiv.style.backgroundImage);
    var str1 = String(str.match(/uid=[0-9]+/gi));
    var str2 = String(str.match(/i=[0-9]+/i));
    str1 = str1.substr(4);
    str2 = str2.substr(2);

    thisDiv.setAttribute("onclick", 'getSingleImage('+str1+', '+str2+', "med", "#largePic", true)');
    thisDiv.setAttribute("class", 'profilePic'); 
}