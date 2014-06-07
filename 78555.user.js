// ==UserScript==
// @name	Remove CutLine
// @author      Ryan Mott
// @namespace	http://userscripts.org/scripts/show/78555
// @description	Eliminates the obnoxious "Cut on dotted line" graphic to make it easy to print electronic shipping labels onto self adhesive labels without waste. Tested with PayPal Multi-order Shipping. No page margin hack needed!
// @include	https://*.pb.com/*
// ==/UserScript==

location.href = "javascript:(" + function() {
    function removeCutLine()
    {
        // Get all img src attributes
        var oNodeSnapshot = document.evaluate("//img[contains(@src, 'LabelCutLine.gif')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null), numNodeValues = oNodeSnapshot.snapshotLength - 1;
        //Loop through all the attributes found in the snapshot
        for (var i = numNodeValues; i >= 0; i--) {
            //Get the attribute snapshot object and
            //Eliminate cutlines
            var elmDeleted = oNodeSnapshot.snapshotItem(i);
            elmDeleted.parentNode.removeChild(elmDeleted);
        }
    }
    //Run enable on form submit and page load
    window.addEventListener('load', removeCutLine, false);
} + ")()";