// ==UserScript==
// @name           Auto-download Mythica videos
// @namespace      http://pile0nades.wordpress.com/
// @description    Auto-downloads the video from a useruploads.mythica.org page.
// @include        http://useruploads.mythica.org/view/*
// ==/UserScript==

var dl = get("/html/body/center/table/tbody/tr/td/center/table/tbody/tr/td[2]/center/font/a[contains(@href, 'http://useruploads.mythica.org/download/')]").snapshotItem(0);

window.location = dl.getAttribute("href");

function get(query) {
  var result = document.evaluate(
    query,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  return result;
}