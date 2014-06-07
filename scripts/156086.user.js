// ==UserScript==
// @name           Genis Eksi Sozluk Beta
// @description    Eksi Sozluk Beta'nın sag frame'ini kucultur, daha genis bir okuma alanı saglar
// @namespace      http://userscripts.org/users/ocanal
// @version        0.0.3
// @author         ocanal
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://eksisozluk.com/*
// @include        https://eksisozluk.com/*
// ==/UserScript==


function xpath(xpath, element) {
        if (!element)
            element = document;
        return document.evaluate(xpath, element, null,
                                 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

var aside = document.getElementById("aside");
var content_section = document.getElementById("content-section"); 
var ads = xpath("//div[contains(concat(' ', @class, ' '), ' ads ')]");

aside.style.width = "142px";
content_section .style.width = "852px";
for (var i=0; i < ads.snapshotLength; i++) {
    console.log(ads.snapshotItem(i));
    var ad = ads.snapshotItem(i);
    ad.parentNode.removeChild(ad);
}
