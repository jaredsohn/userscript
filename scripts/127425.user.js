// ==UserScript==
// @name       soup textposts gtfo
// @namespace  soup-io
// @version    0.1
// @description  truncates text to 64 and title to 128 characters; changes color to grey
// @include      http://*soup.io/everyone*
// @match        http://*soup.io/everyone*
// ==/UserScript==

window.addEventListener ("DOMNodeInserted", function() { 

var allDivs, thisDiv, allH3s, thisH3;

allDivs = document.evaluate(
    "//div[@class='body']",
    document, null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < allDivs.snapshotLength; i++) {

        thisDiv = allDivs.snapshotItem(i);
        thisDiv.innerHTML = thisDiv.innerHTML.substring(0, 64) + "...";     
        thisDiv.style.color = "#bbb";
          
    }
    
allH3s = document.evaluate(
    "//h3", document, null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < allH3s.snapshotLength; i++) {

        thisH3 = allH3s.snapshotItem(i);
        thisH3.innerHTML = thisH3.innerHTML.substring(0, 128) ;     
        thisH3.style.color = "#bbb";
          
    }
    
}, false); 