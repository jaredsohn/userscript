// ==UserScript==
// @name           Photo.net de-<p>
// @namespace      http://userscripts.org/users/40332
// @description    Remove the often seen <p> tag from forum posts. By <p>, I mean the literal &gt;p&lt; which infests the HTML!
// @include        http://photo.net/*
// ==/UserScript==

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i);
    node.data = node.data.replace('<p>', ''); 
}
