//
// Camptown News
// version 1.0
// by Tom Scott
// http://www.tomscott.com
//
// includes code from Dive into Greasemonkey by Mark Pilgrim
// http://diveintogreasemonkey.org
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Camptown News", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Camptown News
// @namespace     http://www.tomscott.com/
// @description   Adds "doo-dah, doo-dah" after every seven-syllable headline
// @include       http://news.bbc.co.uk/*
// @include       http://*.cnn.com/*
// @include       http://cnn.com/*
// ==/UserScript==

function syllableCount(text) {

  //takes string, returns syllable count as integer
  
  if (text.match(/\d/)) {
    return 0;
  }
  
  var words = text.split(" ");
  var syllables = 0;
  for( var i=0; i < words.length; i++) {
    words[i].replace(/\W+/g,"");
    if (words[i].length > 0) {
      var thisWord = 0;
      if (words[i].match(/^[A-Z]+$/)) {
        thisWord += words[i].length;
      } else {
        if (words[i].length <= 3) {
          thisWord = 1;
        } else {
          thisWord += words[i].split(/yi/i).length-1;
          thisWord += words[i].split(/[aeiouy]+/i).length-1;
          if(words[i].match(/[^l]e[sd]?$/i)) {
            thisWord--;
          }
        }
      }
      if(thisWord < 1) { thisWord = 1; }
      syllables += thisWord;
    }
  }
  
  return syllables;
  
}

var allLinks, thisLink;

allLinks = document.evaluate(    "//div[@class='mvb']//a[@href]//text()|//div[@class='arr']//a[@href]//text()|//div[@class='picheadline']//a[@href]//text()|//ul[@class='popstoryList']//a[@href]//text()|//h1//text()|//div[@id='cnnMainContent']//text()|//div[@id='contentBody']//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    console.log(allLinks);
    
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    var text = thisLink.data;
    text.replace(/^\s+|\s+$/g,"");
    
    if (syllableCount(text) == 7) {
      thisLink.data += ' - doo-dah, doo-dah';
    }
}