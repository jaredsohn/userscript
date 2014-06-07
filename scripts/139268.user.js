// ==UserScript==
// @name           ThePirateBay (TPB) Release Filter
// @description    Filter results on TV and HDTV pages on The Pirate Bay to only show shows you want
// @version        0.6
// @include        http://thepiratebay.*/browse/205*
// @include        http://thepiratebay.*/browse/208*
// @copyright      Aviem Zur
// ==/UserScript==

//================================ Set the shows you want to see here ================================
var numberOfPages = 10 // Set the number of result pages you want to see at once
var filter = new Array(
    "rick and morty", "brooklyn nine-nine", "conan", "house of lies", "big bang theory", "cougar town", "game of thrones", 
    "breaking bad", "doctor who", "louie", "dexter",  "king of the nerds", "comic book men"
);
//======================================================================================================

function filterResults() {
    var links = document.evaluate("//tr/td[2]/div/a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
    var even = false;
    
    for (var i = 0; i < links.snapshotLength; i++) {
        var link = links.snapshotItem(i);
        var foundMatch=0;
        for (var k = 0; k < filter.length; k++) {
            if (link.text.toLowerCase().replace(/\s/g,"").replace(/\./g,"")
                .indexOf(filter[k].toLowerCase().replace(/\s/g,"").replace(/\./g,"")) 
                != -1) {
                foundMatch=1
                break;
            }
        }
        var row = link.parentNode.parentNode.parentNode;
        if (!foundMatch) {
            row.parentNode.removeChild(row);
        }
    }
}

function getPages(pages, table) {
    for (i = 0; i < pages.length; i++) {
        var page = pages[i]
        var xmlhttp = new XMLHttpRequest()
        xmlhttp.open("GET", page.href, false);
        xmlhttp.send();
        var div = document.createElement('div')
        div.innerHTML = xmlhttp.responseText
        var results = document.evaluate('//tr', div, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
        for (j = 1; j < results.snapshotLength -1; j++) { 
            table.appendChild(results.snapshotItem(j))
        }
    }
}

window.onload = function() {    
    var pagesx = document.evaluate('//tbody//td[@style="text-align:center;"]//a[contains(@href, "/browse/")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    
    pages = []
    
    for (i = 0; i < numberOfPages && i < pagesx.snapshotLength; i++)  {
        console.log(pagesx.snapshotItem(i).href)
        pages.push(pagesx.snapshotItem(i))
    }
    
    var table = document.getElementById('searchResult').firstChild.nextSibling.nextSibling.nextSibling
    
    getPages(pages, table) 
    
    filterResults()
}