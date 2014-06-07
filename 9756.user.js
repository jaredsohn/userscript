// Netflix Tivo Mashup script
// version 0.5 BETA!
// 2007.02.26
// Copyright (c) 2007, Robert Simmons
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://www.greasespot.net/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Netflix Tivo Mashup", and click Uninstall.
//
// ==UserScript==
// @name Netflix Tivo Mashup
// @namespace http://runningasroot.com/
// @description Adds a TiVo button to Netflix queue items that appear in TiVo search.
// @include http://dvd.netflix.com/Queue*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

var allItems, thisItem, tivoSearch;

allItems = jQuery('a.mdpLink');

for (var i = 0; i < allItems.length; i++) {
    thisItem = allItems[i];
    tivoSearch = "https://www3.tivo.com/tivo-tco/search/simple.do?dispatch=simplesearch&searchFor=%22" + escape(thisItem.text) + "%22";
    tivoCheck(tivoSearch, thisItem, document);
}

function tivoCheck(tivoUrl, thisItem, document) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: tivoUrl,
        onload: function(responseDetails) {
          var page = responseDetails.responseText;
          var searchPattern = /We found the following shows with/g;
          var searchPattern2 = new RegExp(">\s*\"?\s*" + jQuery(thisItem).text(), "g");
          var searchResults = page.match(searchPattern);
		  var searchResults2 = page.match(searchPattern2);
                                              
          if ( searchResults && searchResults2) {	
                var newAnchor = document.createElement("a");
                newAnchor.setAttribute("href", tivoUrl);
                newAnchor.setAttribute("target", "_blank");
                newAnchor.setAttribute("style","color:red; background:#ffc; padding:5px;");
                var linkText = document.createTextNode("TiVo");
                
                newAnchor.appendChild(linkText);
                                
                var newText = document.createTextNode(" ");

                thisItem.parentNode.insertBefore(newText, thisItem.nextSibling);

                thisItem.parentNode.insertBefore(newAnchor, newText.nextSibling);
            }
        }
    });
}