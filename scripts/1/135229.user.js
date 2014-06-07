// ==UserScript==
// @name       Ultimate Guitar remove pro results
// @version    0.4
// @description  Removes pro results from Ultimate Guitar search page
// @include      http://ultimate-guitar.com/search*
// @include      http://www.ultimate-guitar.com/search*
// @copyright  Aviem Zur
// ==/UserScript==

var pros = document.evaluate("//td/strong[contains(text(),'p')]",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < pros.snapshotLength; i++) {
    var proRow = pros.snapshotItem(i).parentNode.parentNode;
    
    if (proRow.firstChild) {
        var artist = proRow.firstChild.nextSibling;
        if (artist.firstChild.href) {
            var nextRow = proRow.nextSibling.nextSibling;
            if (nextRow) {
                if (nextRow.firstChild) {
                    if (!nextRow.firstChild.nextSibling.firstChild.href) {
                    	nextRow.firstChild.nextSibling.innerHTML = artist.innerHTML;
                    }
                }
            }
        }
    }
    
    proRow.parentNode.removeChild(proRow);
}

var rows = document.evaluate("//table[@class='tresults']//tr",document, null, 
                             XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var even = false;

for (var i = 1; i < rows.snapshotLength; i++) {
    var row = rows.snapshotItem(i);
    
    if (even) {
        row.className = "stripe";
        even = false;
    }
    else {
        row.className = "";
        even = true;
    }
}