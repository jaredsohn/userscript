// ==UserScript==
// @name           iGoogle Header Remover
// @namespace      www.signal-eleven.com
// @include        http*://www.google.*/ig*
// ==/UserScript==

var link;
var snapResults = document.evaluate("//*[@class='gbh']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
	var elm = snapResults.snapshotItem(i);
	elm.style.display='none';
}

elm=document.getElementById("footerwrap");
elm.style.display='none';

link=document.createElement("div");
link.innerHTML="<script> var navdiv; navdiv=document.getElementById('nhdrwrapsizer') ; navdiv.style.display='none';</script> <a style=\"font-family:arial;border:1px solid navy; font-size: 10px;margin: 2px;padding: 1px;\" href='#' onClick=\"if(navdiv.style.display == 'none'){ navdiv.style.display=''} else {navdiv.style.display = 'none'}\"> Toggle header </a>";
document.body.insertBefore(link, document.body.firstChild);