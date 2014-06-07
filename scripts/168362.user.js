// ==UserScript==
// @name           Kat.ph Remove Redirect
// @namespace      http://userscripts.org/users/oskybb
// @author         Nitrus
// @description    Remove the Kat.ph URLs Redirect.
// @include        http://www.kat.ph/*
// @include        http://kat.ph/*
// @include        http://www.katmirror.com/*
// @include        http://katmirror.com/*
// @include        http://www.katmirror.co/*
// @include        http://katmirror.co/*
// @include        http://www.ka.tt/*
// @include        http://ka.tt/*
// @include        http://www.kickass.to/*
// @include        http://kickass.to/*
// @version        1.0
// @icon           https://kat.ph/favicon.ico
// @updateURL      https://userscripts.org/scripts/source/168362.meta.js
// ==/UserScript==

/*THIS SCRIPT IS AN UPDATE and MODIFIED VERSION OF THIS: https://userscripts.org/scripts/review/167241 
  Created by: Nikko Cheng - https://userscripts.org/users/mynikko */

(function() {
	var $ajaxLinks = document.evaluate("//a[contains(@href, '/confirm/url/')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
	 
	for (var $i=0; $i < $ajaxLinks.snapshotLength; $i++) {	  
	  $ajaxLinks.snapshotItem($i).href = $ajaxLinks.snapshotItem($i).text; 
	  $ajaxLinks.snapshotItem($i).className = "";
	  $ajaxLinks.snapshotItem($i).target = "_blank";
	}
}) ();