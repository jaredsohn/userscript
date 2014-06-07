// ==UserScript==
// @name           KickassTorrents - Redirect Converter
// @namespace      http://userscripts.org/users/musichemyst
// @author         musichemyst
// @description    Converts redirect links on KAT torrent pages to point to the raw URL.
// @include        http://www.kickass.to/*
// @include        https://www.kickass.to/*
// @include        http://kickass.to/*
// @include        https://kickass.to/*
// @include        http://www.katmirror.co/*
// @include        https://www.katmirror.co/*
// @include        http://katmirror.co/*
// @include        https://katmirror.co/*
// @version        1.1
// @icon           https://kickass.to/favicon.ico
// @updateURL      https://userscripts.org/scripts/source/178035.meta.js
// ==/UserScript==

/* THIS SCRIPT IS AN UPDATE and MODIFIED VERSION OF THE FOLLOWING:
    http://userscripts.org/scripts/review/167241 (Created by: Nikko Cheng / http://userscripts.org/users/mynikko)
    http://userscripts.org/scripts/review/168362 (Created by: Nitrus / http://userscripts.org/users/oskybb) */

(function() {
  var $ajaxLinksConfirm = document.evaluate("//a[contains(@href, '/confirm/url/')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var $ajaxLinksAnon = document.evaluate("//a[contains(@href, 'anonym.to/?')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var anonHREF, anonBaseHREF;

  for (var $i = 0; $i < $ajaxLinksConfirm.snapshotLength; $i++) {
    $ajaxLinksConfirm.snapshotItem($i).href = $ajaxLinksConfirm.snapshotItem($i).text;
    $ajaxLinksConfirm.snapshotItem($i).className = "";
    $ajaxLinksConfirm.snapshotItem($i).target = "_blank";
  }

  for (var $i = 0; $i < $ajaxLinksAnon.snapshotLength; $i++) {
    anonHREF = $ajaxLinksAnon.snapshotItem($i).href;
    anonBaseHREF = anonHREF.substr(0,anonHREF.indexOf("anonym.to/?") + 11);
    $ajaxLinksAnon.snapshotItem($i).href = anonHREF.replace(anonBaseHREF,"");
    $ajaxLinksAnon.snapshotItem($i).className = "";
    $ajaxLinksAnon.snapshotItem($i).target = "_blank";
  }
}) ();