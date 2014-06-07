// ==UserScript==
// @name add-html5-true-to-youtube-urls
// @namespace    http://userscripts.org
// @description  This adds html5=true parameter to each and every Youtube URL you click (and then, perhaps, copy for later pasting)
// @include      http://youtube.com/*
// @include      https://youtube.com/*
// @run-at       document-start
// @version      2013.11.16-11
// ==/UserScript==

console.log("[userscript] Adding html5=true to the URL")

var url = location.href
if (!url.contains("html5")) {
  document.location = url + "&html5=true"
}
