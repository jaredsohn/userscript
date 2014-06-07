// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Chess.com Cleaner", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Chess.com Cleaner
// @description    Removes a decent amount of distracting content from Chess.com
// @include        http://www.chess.com/*
// @include        http://blog.chess.com/*
// @include        http://live.chess.com/*
// ==/UserScript==

// Array of XPaths to remove
var xpaths = new Array(
    // GLOBAL CHANGES
    "//ul[@id='user-upgrade-message']",
    "//a[@id='upgrade-button']",
    "//li[@class='upgrade']",
    "//div[@class='webzone']",
    // HOMEPAGE CHANGES
    "//div[@id='addthis']",
    "//ul[@class='columns three clearfix bottom-16 no-padding-right index-blocks']",
    "//div[contains(text(),'Sponsored by Wholesale')]",
    "//div[@id='index-stats']",
    "//h4[contains(text(),'Titled Players Online')]",
    "//div[@class='index-section clearfix players-section']",
    "//div[@class='framed bottom-10 top-titled-players']",
    "//div[@class='bottom-16']", //FB like
    // LIVE CHESS PAGES
    "//span[@id='addthis']",
    // TOURNAMENT PAGES
    "//div[@class='framed blue bottom-16']",
    // CHESSGAME PAGES
    "//div[@class='bottom-12 top-12 clearfix']",
    // RULES & BASICS PAGE
    "//h3[contains(text(),'Online Chess Lessons!?')]",
    "//div[@class='addthis_toolbox addthis_default_style ']",
    // CHESS VIDEO LESSONS PAGE
    "//section[@class='framed upgrade-box blue']",
    // CHESS MENTOR PAGE
    "//div[@class='framed blue']"
);

// Perform the removal
xpaths.forEach(
    function(a) {
        $x(a).forEach(function(b) { b.parentNode.removeChild(b) });
    }
);

// Add link to userscript in 'More' dropdown menu
var listItemNode = document.createElement('li');
var linkItemNode = document.createElement('a');
var spanItemNode = document.createElement('span');
var textItemNode = document.createTextNode('Chess.com Cleaner');
linkItemNode.setAttribute('href', 'http://userscripts.org/scripts/show/76479');
linkItemNode.setAttribute('target', '_blank');
spanItemNode.setAttribute('class', 'navigation icon script');
linkItemNode.appendChild(spanItemNode);
linkItemNode.appendChild(textItemNode);
listItemNode.appendChild(linkItemNode);
$x("//div[@class='more clearfix']/ul").forEach(
    function(c) { 
        c.appendChild(listItemNode);
    }
);

/* Function copied from greasemonkey wiki that searches for an XPath and 
 * returns a list of matching elements */
function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}