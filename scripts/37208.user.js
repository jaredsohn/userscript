// ==UserScript==
// @name           hirkereso
// @namespace      f.hirkereso.hu
// @description    hirkereso "00:00" hirek és az átirányítások törlése
// @include        http://*.hirkereso.hu/*
// @copyright      r00t
// @version        1.1
// ==/UserScript==


var allTD, thisTD;
allTD = document.evaluate("//div[@class='datedRowLeft fontSizeMinus']",document,null,6, null);
for (var i = 0; i < allTD.snapshotLength; i++) {
    thisTD = allTD.snapshotItem(i);
    if (thisTD.textContent=="00:00") {
       var parentTD=thisTD.parentNode;
       parentTD.parentNode.removeChild(parentTD);
    }
}

allTD = document.evaluate("//a[contains(@href,'rd.hirkereso.hu')]",document,null,6, null);
for (var i = 0; i < allTD.snapshotLength; i++) {
    thisTD = allTD.snapshotItem(i);
    thisTD.href=thisTD.href.substr(38);
}


