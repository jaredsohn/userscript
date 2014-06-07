/*
    Link Off!
    Version 0.9a
    Copyright (C) 2005 Darrell Dudics
    http://www.gamedudex.com/

    I got the idea of this script from the already existing script,
    'Indicate off-site Links'. I saw room for improvement, and so this
    script was born.

    If you notice any bugs in the script, please feel free to email
    me at ddudics{at}gamedudex.com

//  ==============================
//  Version History
//  ==============================

    0.9a    Initial Script
             - Functional as 'Indicate off-site Links'

//  ==============================

    This work is licensed under the Creative Commons
    Attribution-NonCommercial-NoDerivs 2.5 License.

    To view a copy of this license, visit
    http://creativecommons.org/licenses/by-nc-nd/2.5/

    or send a letter to:

    Creative Commons
    543 Howard Street
    5th Floor
    San Francisco, California, 94105, USA.
*/

// ==UserScript==
// @name            Link Off!
// @namespace       http://www.gamedudex.com/
// @description     Indicates links outside of the current domain.
// @include *
// @exclude
// ==/UserScript==

var pageDomain, dlhn;
dlhn = document.location.hostname;
pageDomain = dlhn.substring(dlhn.indexOf('.') + 1);

var pageLinks, currentLink;
pageLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < pageLinks.snapshotLength; i++) {
    currentLink = pageLinks.snapshotItem(i);

    var imgLink = false;
    if (currentLink.hasChildNodes && currentLink.firstChild.nodeType == 1) {
        for (var j = 0; j < currentLink.childNodes.length; j++) {
            if (currentLink.childNodes[j].nodeType == 1) {
                imgLink = true;
            }
        }
    }

    var str = currentLink.hostname;
    linkDomain = str.substring((str.indexOf('.') + 1));

    if (currentLink.protocol == "http:" || currentLink.protocol == "https:") {
        if (linkDomain != pageDomain && imgLink == false) {
            currentLink.style.background = "url(data:image/png,%89PNG%0D" +
            "%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0C%00%00%00%0C%02%03%00%" +
            "00%00%2B%1B%B4t%00%00%00%0CPLTE%FF%FF%FF%FFff%FF%00%00%FF%C" +
            "C%CC%E0%E0W%1D%00%00%00*IDAT%08%99c%60%80%02%D6%D0%08%06%16" +
            "%06%0E%06%16%A9%0E%06%16V%20%B6%04%E2%1C%0F%06%16%01%0E%B08" +
            "%D7%AA%15%20e%00c%9B%04%F7%1DH%CC%2C%00%00%00%00IEND%AEB%60" +
            "%82) right center no-repeat";
            currentLink.style.paddingRight = "13px";
        }
    }
}
