// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// To uninstall, go to Tools/Manage User Scripts,
// select "reranch-hide-pff91", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           reranch-hide-pff91
// @namespace      http://ed-teach.org/reranch-hide-pff91.js
// @description    Hide rows in the forum thread listings containing the threads created by PFF91.
// @include        http://reranch.com/reranch/viewforum.php*
// @include        http://www.reranch.com/reranch/viewforum.php*
// ==/UserScript==

var pathExpr = "//tr/td/span[@class='name']/a[@href='profile.php?mode=viewprofile&u=118684']/../../..";

var rows2Hide = new Array();  // The rows that will be hidden
try {

    // Find the rows and add them to the array.  I use an array to
    // temporarily store the rows because apparently its an error to
    // modify the DOM as we go along.
    var xpathResult = document.evaluate( pathExpr, document, null, XPathResult.ANY_TYPE, null );
    var row = xpathResult.iterateNext();
    while (row)
    {
        rows2Hide[ rows2Hide.length] = row;
        row = xpathResult.iterateNext();
    }

    // Now set style.display='none' for the rows
    for (var i = 0; i < rows2Hide.length; i++) rows2Hide[i].style.display = 'none';
}
catch (e) {
    alert('exception: ' + e);
}



