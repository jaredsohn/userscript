// Copyright (C) 2009 Michael Chelen http://mikechelen.com

//

// Released under the GPL license

// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name           DOI Link
// @namespace      http://userscripts.org/users/80737
// @description    Links any Document Object Identifiers for resolution with http://dx.doi.org
// @include        *
// ==/UserScript==


// from http://diveintogreasemonkey.org/patterns/match-attribute.html

function doi_link (xPaths) {
    for (var j=0; j<xPaths.length;j++) {
        var allElements, thisElement;
        allElements = document.evaluate(
            xPaths[j],
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);
        for (var i = 0; i < allElements.snapshotLength; i++) {
            // do something with thisElement
            thisElement = allElements.snapshotItem(i); 
            // from Quotes from Chemical Blogspace and PostGenomic http://userscripts.org/scripts/show/8939
            var reg = /(10\.[0-9]+\/[a-z0-9\.\-\+\/\(\)]+)/i;

            var ar = reg.exec(thisElement.innerHTML);

            var doi_found=RegExp.$1;

            if (ar && doi_found) {

                //when a DOI is found
                thisElement.innerHTML = thisElement.innerHTML.replace(doi_found,'<a href="http://dx.doi.org/'+doi_found+'">'+doi_found+"</a>");
            }
        }
    }
}
var xPaths = new Array();
xPaths[0] = '//*[contains(text(),"doi:")]';
xPaths[1] = '//span[@class="doi"]';
doi_link(xPaths);