// ==UserScript==
// @name           CE-Exclusive Extension by Drak_Dylon
// @namespace      max_mello@yahoo.com
// @description    Clean up GameFAQs' cluttered pages *Current Events Exclusive*
// @include        http://www.gamefaqs.com/boards/gentopic.php?board=400*
// ==/UserScript==

var allDivs, thisDiv;
var adSidebar;
var dataflag=1;

adSidebar = document.getElementById('ad');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}

adSidebar = document.getElementById('platformlist');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}

adSidebar = document.getElementById('sponsored_links');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}

allDivs = document.evaluate(
    "//div[@class='head']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    if (dataflag=1) {
      thisDiv = allDivs.snapshotItem(i);

      var allTextareas, thisTextarea;
      allTextareas = thisDiv.getElementsByTagName('h1');
      for (var i = 0; i < allTextareas.length; i++) {
          thisTextarea = allTextareas[i];
          thisTextarea.parentNode.removeChild(thisTextarea);
      }
      dataflag=0;
    }
}