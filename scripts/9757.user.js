// Blockbuster Tivo Mashup script

// version 0.3 BETA!

// 2008.12.07

// Copyright (c) 2008, Robert Simmons

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

// select "Blockbuster Tivo Mashup", and click Uninstall.

//

// ==UserScript==

// @name Blockbuster Tivo Mashup

// @namespace http://runningasroot.com/

// @description Adds a TiVo button to Blockbuster queue items that appear in TiVo search.

// @include http://www.blockbuster.com/queuemgmt/*

// @include http://www.blockbuster.com/browse/queuemgmt/*

// ==/UserScript==



var allItems, thisItem, tivoSearch;



allItems = document.evaluate("//div[@class='disc']//div[@class='title']//a", document, null, 

    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);



for (var i = 0; i < allItems.snapshotLength; i++) {

    thisItem = allItems.snapshotItem(i);



    var urlText = thisItem.text;



    // Removes info included in brackets such as [WS] and [Unrated]

    urlText = urlText.replace(/\[.*\]/g,"");



    // Removes info included in parentheses which is usually the year.

    urlText = urlText.replace(/\(.*\)/g,"");


    urlText = urlText.replace(/^\s*|\s*$/,"");


    tivoSearch = "http://www3.tivo.com/tivo-tco/search.do?tsn=&dispatch=advancedsearch&searchTitle=\"" + escape(urlText) + "\"&searchDesc=&searchCastCrew=&searchCategory=&searchGenre=&searchWhen=14&advanced_button.x=0&advanced_button.y=0";



    tivoCheck(tivoSearch, thisItem, document);

}



function tivoCheck(tivoUrl, thisItem, document) {

    GM_xmlhttpRequest({

        method: 'GET',

        url: tivoUrl,

        onload: function(responseDetails) {

          var page = responseDetails.responseText;



          var searchPattern = /Found shows with Title/g;

          var searchResults = page.match(searchPattern);



          if ( searchResults != null && typeof(searchResults)!='undefined' && searchResults.length >= 1) {	

                var newAnchor = document.createElement("a");

                newAnchor.setAttribute("href", tivoUrl);

                newAnchor.setAttribute("style","color:red; background:#ffc; padding:1em;");

                newAnchor.setAttribute("target","_blank");



                var linkText = document.createTextNode("TiVo");

                

                newAnchor.appendChild(linkText);

                                

                var newText = document.createTextNode(" ");



                thisItem.parentNode.insertBefore(newText, thisItem.nextSibling);



                thisItem.parentNode.insertBefore(newAnchor, newText.nextSibling);

            }

        }

    });

}
