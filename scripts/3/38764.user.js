// ==UserScript==
// @name           dezactiveaza votul
// @namespace      http://userscripts.org/users/andone
// @include        http://www.muromania.com/*
// ==/UserScript==


window.addEventListener('load', function(){

//alert('gigi1');
var vinovat = document.evaluate( '//div[.="Remind me in 10 minutes."]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
//alert('gigi2');
var Elem = null;
if ( vinovat.snapshotLength > 0 )
	Elem = vinovat.snapshotItem(0);
//alert(Elem.innerHTML);
Elem.style.display="none";
Elem.previousSibling.style.display="none";
},false);