// MagicCardsInfo MKMLinker
// version 0.2 BETA!
// 2011-08-14
// Copyleft 2011
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
// select "MagicCardsInfo MKMLinker ", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          MagicCardsInfo MKMLinker 
// @description   Links single cards from magicards.info to magickartenmarkt.de
// @include       http://magiccards.info/*.html

// ==/UserScript==

var pattern = /(\w.+)\s\((\w.+)\)/;
var cardName;
var title, div, pg, link;
var urlPrefix = "http://www.magickartenmarkt.de/?mainPage=showSearchResult&searchFor=" 
var urlSuffix = "&searchSingles=Y"


function find_div_class() {
  var divCollection = document.getElementsByTagName("span");
  for (var i=0; i<divCollection.length; i++) {
    if(divCollection[i].getAttribute("style") == "font-size: 1.5em;") {
      return divCollection[i];
    } 
  }
}

pattern.exec(document.title);
cardName = RegExp.$1;

link = document.createElement('a');
link.href = urlPrefix + cardName + urlSuffix;
link.innerHTML = "MKM";

pg = document.createElement('p');
pg.inerHTML = link;

div = find_div_class()
div.appendChild(link);