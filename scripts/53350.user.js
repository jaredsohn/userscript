// ==UserScript==
// @name           Jellyneo Stock Checker
// @namespace      #aVg
// @description    Checks to see if an item is in stock @jellyneo.
// @include        http://items.jellyneo.net/index.php?*
// @version        0.1.1
// ==/UserScript==
(function() {
function $(A) {return document.getElementById(A)}
if ($("content").childNodes[1].textContent != "Search Results") return;
var items = document.evaluate("//td/a[starts-with(@href, '?go=i')]/img/..", document, null, 6, null), item, i = items.snapshotLength;
function check(A) {
	GM_xmlhttpRequest({
		url : A.href,
		method : "GET",
		onload : function(B) {
			if(B.responseText.indexOf("Purchase via Neopian")==-1) return;
			var C=new Image();
			C.src = "http://i28.tinypic.com/dq5emx.png";
			A.parentNode.appendChild(C);
		}
	});
}
while(item=items.snapshotItem(--i))
	check(item);
})();