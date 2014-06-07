// ==UserScript==
// @name           WCN Navigation Mover
// @namespace      com.maltera
// @description    Moves the navigation buttons on Web Comics Nation above the comments.
// @include        http://www.webcomicsnation.com/*/series.php*
// ==/UserScript==

// Find the table containing the naviigation functions
var navTable = document.evaluate(
        '//a[contains(@href,"button=first")]/ancestor::table[1]',
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null 
    ).singleNodeValue;

// Find the table that contains the comic image
var comicTable = document.evaluate(
        '//a[@href="toc.php"]/ancestor::table[1]',
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
    ).singleNodeValue;

// Move the navigation table to immediately after the comic table.
comicTable.parentNode.insertBefore( navTable, comicTable.nextSibling );
