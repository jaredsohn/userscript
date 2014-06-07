// ==UserScript==
// @name					OCLC Barcode Fixer
// @namespace			http://wendt.library.wisc.edu/
// @description		Changes format of OCLC FirstSearch barcodes to print in Firefox 1.5 and 2.0
// @include				http://firstsearch.oclc.org/WebZ/FSPage*
// @include				http://www.firstsearch.oclc.org/WebZ/FSPage*
// @include				http://firstsearch.org/WebZ/FSPage*
// @include				http://www.firstsearch.org/WebZ/FSPage*
// ==/UserScript==

var bcTable;
var newHtml;

// Of course there's no ID for this element... find it with xPath
bcTable = document.evaluate("//table[@name='requestIdBarcode']//table",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

// If you make this narrower than about .09em, you get rounding errors similar to the old problem.
var baseCode = '<div style="float: left; height: 2.5em; border-left: solid .09em ';
var whiteEnd = 'white;"></div>';
var blackEnd = 'black;"></div>';

if (bcTable) {
  // This arguably doesn't need to come over. I'll keep it, just 'cause.
  newHtml = '<caption align="bottom">' + bcTable.getElementsByTagName("caption")[0].innerHTML + '</caption>';
  newHtml = newHtml + "<tr><td>";
  var images = bcTable.getElementsByTagName('img');
  var i;
  for (i = 0; i < images.length; i++) {
    var imgNode = images[i];
    newHtml = newHtml + baseCode;
    if (imgNode.src.match("1.png")) {
      newHtml = newHtml + blackEnd;
    }
    else if (imgNode.src.match("0.png")) {
      newHtml = newHtml + whiteEnd;
    }
  }
  newHtml = newHtml + "</td></tr>";
  // Just in case the HTML changes...
  if (images.length > 0) {
    bcTable.innerHTML = newHtml;
  }
}