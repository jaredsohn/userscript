// ==UserScript==
// @name           kat.ph External Link Bypass
// @namespace      marki
// @description    Bypass external links in kat.ph
// @include        http://kat.ph/*
// @include        https://kat.ph/*
// @version        0.2
// @icon           https://kat.ph/favicon.ico
// @author         http://userscripts.org/users/435429
// ==/UserScript==



(function() {

var links = document.evaluate("//a[contains(@href, '/confirm/url/')]", document, null, 
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
 
for (var i=0; i < links.snapshotLength; i++) 
{ 
  
  var thisLink = links.snapshotItem(i); 
  
  thisLink.href = thisLink.href.replace("https", "http");
  thisLink.className = "";
  thisLink.target = "_blank";
} 

if (document.URL.indexOf("/confirm/url/") !== -1) {
   
   window.location.replace(document.forms[2].action);
	
}
}) ();