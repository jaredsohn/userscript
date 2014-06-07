// ==UserScript==
// @name       Declutter Ultimate Guitar Search Page
// @version    0.1
// @description  Declutters Ultimate Guitar search page
// @include      http://ultimate-guitar.com/search*
// @include      http://www.ultimate-guitar.com/search*
// @copyright  Aviem Zur
// ==/UserScript==

var elements = new Array("//div[@class='h-menu']", "//td[@align='left']/table", "//td[@align='left']/div", 
                         "//td[@align='left']/table[2]", "//td[@align='left']/div[3]",
                        "//div[@class='content floatfix']/../table", 
                         "//ul[@class='soptcont']/../div");
for (var i = 0; i < elements.length; i++) {
    var snap = document.evaluate(elements[i],document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var elem = snap.snapshotItem(0);
    elem.style.display = "none";
}