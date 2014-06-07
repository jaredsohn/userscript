// ==UserScript==
// @name          Work-Safe PolyWeekly Forum
// @namespace     http://userscripts.org/
// @description   Changes the PolyWeekly Forum from orange/black to blue/white, and removes the banner image.
// @include       http://forum.polyweekly.com/*
// ==/UserScript==

/*
I dislike smileys, and I dislike using proportional fonts in textareas.  To
use smileys, comment out the last section.  To use proportional fonts in the
textarea, look to lines 43 and 44 - switch the comment-outs.  (You'll see.)

The CSS part comes from the myCSS script.
*/

var css = new Array();

function writeStyle(css) {
  var style = document.createElement('style');
  style.type = 'text/css';
  if (document.getElementsByTagName) {
    document.getElementsByTagName('head')[0].appendChild(style);
    if (style.sheet && style.sheet.insertRule) {
      for (var i = 0; i < css.length; i++) {
        style.sheet.insertRule(css[i], 0);
      }
    }
  }
}

function addStyle(style) {
  css[css.length] = style;
}

// 
addStyle("body { background-color: #FFF; margin: 0px; padding: 12px 30px 4px 30px; font-size: 7pt; }");
addStyle("a:link, a:visited { color: #00C; background-color: transparent; text-decoration: none; font-weight: normal; }");
addStyle("a:hover, a.nav:hover, .titlebg a:hover, .titlebg2 a:hover { color: #C00; background-color: transparent; text-decoration: none; }");
addStyle(".nav, .nav:link, .nav:visited { color: #000; background-color: transparent; text-decoration: none; }");
addStyle("table { empty-cells: show; }");
addStyle("td, th { background-color: #FFF; color: #000; font-size: 7pt; font-family: verdana, sans-serif; }");
addStyle("select, input, textarea { color: #000000; font-size: 7pt; background-color: #FFF; }");
addStyle("textarea { font-family: Courier, monospace; }");
//addStyle("textarea { font-family: Verdana, sans-serif; }");
addStyle("input.check { background-color: transparent; }");
addStyle("hr, .hrcolor { color: #0C0; background-color: transparent; }");
addStyle(".quote { color: #000; background-color: #EFE; border: 1px solid black; margin: 1px; padding: 1px; font-size: x-small; }");
addStyle(".code { color: #000; background-color: #CCC; border: 1px solid black; margin: 1px; padding: 1px; font-size: x-small; line-height: 1.3em; }");
addStyle(".quoteheader, .codeheader { color: #000000; text-decoration: none; font-style: normal; font-weight: bold; font-size: x-small; line-height: 1.2em; }");
addStyle(".help { cursor: help; background-color: transparent; }");
addStyle(".meaction { color: red; background-color: transparent; }");
addStyle(".editor { width: 100%; }");
addStyle(".highlight { background-color: #EEC; font-weight: bold; color: black; }");
addStyle(".windowbg { color: #000; background-color: #9CF; }");
addStyle(".windowbg2 { color: #000; background-color: #DEF; }");
addStyle(".titlebg, tr.titlebg th, tr.titlebg td, .titlebg a:link, .titlebg a:visited, .titlebg2, tr.titlebg2 th, tr.titlebg2 td, .titlebg2 a:link, .titlebg2 a:visited, .catbg, .catbg3 { font-weight: bold; font-style: normal; color: #000!important; background-color: #CDF; }");
addStyle(".bordercolor { background-color: #000; }");
addStyle(".tborder { border: 1px solid #000; }");
addStyle("#ajax_in_progress { background: #CEF; color: #000; text-align: center; font-weight: bold; font-size: 18pt; padding: 3px; width: 100%; position: fixed; top: 0; left: 0; }");

// Writes CSS to the document
writeStyle(css);


// Get all images; settle for the title.
var allImgs = document.evaluate(
  "//img[contains(@src,'/banner.jpg')]",
  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var titleImg = allImgs.snapshotItem(0);

// Create the new title.

var titleLine = document.createElement('span');
titleLine.setAttribute('class', 'largetext');
titleLine.appendChild(document.createTextNode('Polyamory Weekly Forums'));
titleImg.parentNode.insertBefore(titleLine, titleImg.nextSibling);
titleImg.parentNode.removeChild(titleImg);


// In conclusion, remove avatars.

var allAvs = document.evaluate("//img[@class='avatar']",
  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allAvs.snapshotLength; i++) {
  var thisAv = allAvs.snapshotItem(i);
  thisAv.parentNode.removeChild(thisAv);
}


// This section automatically checks the "Don't use smileys" box.

var noLoops = document.getElementById('check_smileys');
noLoops.checked = true;

var allLoops, thisLoop;
allLoops = document.evaluate(
  "//img[starts-with(@src, 'http://forum.polyweekly.com/Smileys/')]",
  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allLoops.snapshotLength; i++) {
  thisLoop = allLoops.snapshotItem(i);
  thisLoop.parentNode.removeChild(thisLoop);
}
