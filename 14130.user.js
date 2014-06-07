// ==UserScript==
// @name           Gunnaignore
// @namespace      http://forums.worldofwarcraft.com/*
// @include        http://www.kabby.net/*
// @author		   fafhrd
// @description    Hides Gunna's posts on MB forums
// ==/UserScript==
nameSpans = document.evaluate( "//span[@class='postername']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
for(var i = 0; i < nameSpans.snapshotLength; i++) {
	 var span = nameSpans.snapshotItem(i);
	 if (span.lastChild.nodeValue=="Gunna")
	 {
		 p = span.parentNode.parentNode.parentNode;
		 p.style.visibility="collapse";
	 }
}

nameTds = document.evaluate( "//td[@class='quote-header']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
for(var i = 0; i < nameTds.snapshotLength; i++) {
	 var td = nameTds.snapshotItem(i);
	 if (td.lastChild.nodeValue=="Gunna wrote:")
	 {
		 p = td.parentNode.parentNode;
		 p.style.visibility="collapse";
	 }
 }
