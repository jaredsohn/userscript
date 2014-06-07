// ==UserScript==
// @name           EZTV Tweaker
// @namespace      http://crimson.1gb.in
// @description    eztvefnet.org Tweaker; expands, removes, and replaces content
// @include        http://www.eztvefnet.org/frontpage.php
// ==/UserScript==

//Remove Top Logo (and the really annoying IRC link)
var header_logo = document.getElementById('header_logo'); 						
if (header_logo) {											
    header_logo.parentNode.removeChild(header_logo);							
}

//Replace I image with "Info"
for (var i = 0, image = null; image = document.images[i]; i++) {
      if (image.getAttribute('src') == 'main/icon-info-col.png') {
         image.parentNode.replaceChild( document.createTextNode('Info'), image);
         i--;
      }
}

//Replace I image with "Info"
for (var i = 0, image = null; image = document.images[i]; i++) {
      if (image.getAttribute('src') == 'main/icon_add.gif') {
         image.parentNode.replaceChild( document.createTextNode('Info'), image);
         i--;
      }
}
//Remove Tables: Airs today, Site News, Latest TvNews, Announcement
var allTables, remTables;
allTables = document.evaluate(
    "//table[@class='forum_header_border']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 1; i < 4; i++) {
    remTables = allTables.snapshotItem(i);
    remTables.parentNode.removeChild(remTables);
}

//Remove Table Content: Announcement (1) (Headline)
var allTables, remTables;
allTables = document.evaluate(
    "//td[@class='forum_thread_header']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < 1; i++) {
    remTables = allTables.snapshotItem(i);
    remTables.parentNode.removeChild(remTables);
}

//Remove Table Content: Announcement (2) (We are looking for ...)
var allTables, remTables;
allTables = document.evaluate(
    "//td[@class='forum_thread_post']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < 1; i++) {
    remTables = allTables.snapshotItem(i);
    remTables.parentNode.removeChild(remTables);
}

//Unfortunately eztvefnet uses some really ugly br tags so we remove them
var allbr,rembr
allbr = document.evaluate(
    "//br",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allbr.snapshotLength; i++) {
    rembr = allbr.snapshotItem(i);
    rembr.parentNode.removeChild(rembr);
}

//Make remaining Tables Full Width
(function() {
var tables = document.getElementsByTagName("table");
tables[0].style.width = "100%";
tables[1].style.width = "100%";
tables[2].style.width = "100%"; 
tables[3].style.width = "100%"; 
})();

//Removes first 2 Font Tags; the time and the current date
var allfont,remfont
allfont = document.evaluate(
    "//font",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < 1; i++) {
    remfont = allfont.snapshotItem(i);
    remfont.parentNode.removeChild(remfont);
}

//Removes Lines
var allfont,remfont
allfont = document.evaluate(
    "//HR",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < 1; i++) {
    remfont = allfont.snapshotItem(i);
    remfont.parentNode.removeChild(remfont);
}

//Remove and Replace
(function() {
    var textNodes =  document.evaluate("//text()", document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var node = null;
    for (var i = 0; i < textNodes.snapshotLength; i++) {
        node = textNodes.snapshotItem(i);
	node.data = node.data.replace(/Completed/gi, 'Done'); //Replace "Completed" with "Done"
	node.data = node.data.replace(/Transferred/gi, 'Data'); //Replace "Transferred" with "Data"
	node.data = node.data.replace(/Time on site/gi, 'Since'); //Replace "Time on site" with "Since"
	node.data = node.data.replace(/8[-\s]*days/gi, '') //Remove the none existing 8 Days feature
	node.data = node.data.replace(/Sources for the torrents./gi, '') //Remove the Sources for the Torrents link (=footer)
    }

})()

