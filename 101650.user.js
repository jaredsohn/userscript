// ==UserScript==
// @name          Teensnow.com TS removal
// @namespace     http://teensnow.com/
// @description   Removes teensnow.com random video jumps 
// @include       http://teensnow.com/
// @author 		  Galaxian
// ==/UserScript==

var pageAddr, links, a, href;
pageAddr = window.location.href;
links = document.evaluate(
    "//a[@href]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
String.prototype.startsWith = function(str){
    return (this.indexOf(str) === 0);
}

for (var i = 0; i < links.snapshotLength; i++) {
    
	a = links.snapshotItem(i);
    href = a.href;
    if (href.startsWith("http://www.teensnow.com/out.php?urls=")) {
		a.href = href.substring(37, href.length);
		a.onclick = null;
	}

}