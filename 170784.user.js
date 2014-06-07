// ==UserScript==
// +++++++++++++++++++++++++++++++++++++++++++++++++++++
// Original http://userscripts.org/scripts/show/41369
// +++++++++++++++++++++++++++++++++++++++++++++++++++++
// @name           Replace
// @description    อ่าน nice oppai กด next แล้วโชว์ทุกหน้า
// @include        http://www.niceoppai.net/*
// @exclude        http://userscripts.org/scripts/review/*
// @copyright      JoeSimmons
// @version        1.0.52
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// ==/UserScript==


// Note: You can use \\* to match actual asterisks instead of using it as a wildcard!
//		 The examples below show a wildcard in use and a regular asterisk replacement.

var ns = location.pathname;
var ns2 = ns.substring(ns.length - 3, ns.length -1 );
var ns100 = ns.substring(ns.length - 4, ns.length -1 );
var ns3 = parseInt(ns2)+1;
//alert(ns100);
//alert(ns3);
if ((ns3%1) != 0){
	ns2 = ns.substring(ns.length - 2, ns.length -1 );
	ns3 = parseInt(ns2)+1;
	//alert("a");
}
if (ns100 > 99){
	ns2 = ns.substring(ns.length - 4, ns.length -1 );
	ns3 = parseInt(ns100)+1;
	//alert(ns2);
}
//var ns4 ="http://www.niceoppai.net/"+ns2[3]+ "/" +ns3+"/?all",
//var ns4 = parseInt(ns2)-1;


var lianks = document.evaluate("//a[contains(@href, '/2/')]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < lianks.snapshotLength; i++) {
var link = lianks.snapshotItem(i);
link.href = link.href.replace( ns2+"/2/",ns3+"/?all");
//alert(ns3);
}