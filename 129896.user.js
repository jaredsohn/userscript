// ==UserScript==
// @name           TrumpetHelper
// @namespace      wnayes
// @description    Adds some helpful navigation elements to TrumpetHerald
// @include        http://www.trumpetherald.com/*
// ==/UserScript==

// Loop through each homepage link, adding [^] link to top
// of each thread.
$x("//a[contains(@href,'forum/viewtopic.php')]").forEach(
  function(b)
    { 
    var leftBracketTextNode = document.createTextNode('[');
    var rightBracketTextNode = document.createTextNode('] ');
    var arrowTextNode = document.createTextNode('\u2191');
    var newLinkNode = document.createElement('a');
        
    newLinkNode.setAttribute('href', b.attributes['href'].nodeValue.substr(0, b.attributes['href'].nodeValue.indexOf('#')));
    newLinkNode.appendChild(arrowTextNode);
    b.parentNode.insertBefore(leftBracketTextNode, b);
    b.parentNode.insertBefore(newLinkNode, b);
    b.parentNode.insertBefore(rightBracketTextNode, b);
    }
  );



/*(
var homeSidebarLinksXPath = "//td[@class='sidebar']";
var sidebarNode = document.evaluate(homeSidebarLinksXPath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
var elementCnt = sidebarNode.childNodes.length

for (x = 0; x < elementCnt; x++) {
    if (sidebarNode.childNodes[x].nodeName === 'A') {
        var newLinkNode = document.createElement('a');
        var textItemNode = document.createTextNode('[^] ');
        
        newLinkNode.setAttribute('href', sidebarNode.childNodes[x].attributes['href'].nodeValue.substr(0, sidebarNode.childNodes[x].attributes['href'].nodeValue.indexOf('#')));
        newLinkNode.appendChild(textItemNode);
        sidebarNode.insertBefore(newLinkNode , sidebarNode.childNodes[x]);
    
    }
}
*/
//alert(sidebarNode.childNodes[2]);


/*
// Array of XPaths to remove
var xpaths = new Array(
    // ZBAR
    "//div[@class='zbar_holder']",
    "//div[@id='zap-bac-container']",
    "//div[@id='suggestions']",
    "//div[@id='fb_like']"
);

// Perform the removal
xpaths.forEach(
    function(a) {
        $x(a).forEach(function(b) { b.parentNode.removeChild(b) });
    }
);

/* Function copied from greasemonkey wiki that searches for an XPath and 
 * returns a list of matching elements */
function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}