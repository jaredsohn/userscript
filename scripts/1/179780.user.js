// ==UserScript==
// @name           YouTube Link Cleaner
// @namespace      tfr
// @description    Removes unneeded parameters and redirection pages from YouTube links.
// @downloadURL    https://userscripts.org/scripts/source/179780.user.js
// @updateURL      https://userscripts.org/scripts/source/179780.meta.js
// @include        http://youtube.com/*
// @include        http://www.youtube.com/*
// @include        https://youtube.com/*
// @include        https://www.youtube.com/*
// @version        2
// @grant          none
// ==/UserScript==

/* Dieses Skript steht unter CC0 / This script is licensed under CC0:
 * http://creativecommons.org/publicdomain/zero/1.0/deed.de
 * http://creativecommons.org/publicdomain/zero/1.0/deed.en */

/* If on a redirect page, redirect */
if(window.location.pathname == "/redirect") {
  window.location.href.match(/(&|\?)q=(.*?)(&|$)/);
  window.location.replace(window.decodeURIComponent(RegExp.$2));
}
/* If a unneeded parameter exists, remove it */
if(window.location.href.match(/(&(feature|src_vid|annotation_id|gl|hl)=[a-zA-Z0-9_-]*|\?(feature|src_vid|annotation_id|gl|hl)=[a-zA-Z0-9_-]*$)/)) {
  window.location.replace(window.location.href.replace(/(&(feature|src_vid|annotation_id|gl|hl)=[a-zA-Z0-9_-]*|\?(feature|src_vid|annotation_id|gl|hl)=[a-zA-Z0-9_-]*$)/g, ''));
}
LinkCount = 0;
function ChangeLinks() {
  if(LinkCount != window.document.links.length) {
    for (var i = 0; i < window.document.links.length; i++) {
      /* Remove unneeded parameters */
      window.document.links[i].href = window.document.links[i].href.replace(/(&(feature|src_vid|annotation_id|gl|hl)=[a-zA-Z0-9_-]*|\?(feature|src_vid|annotation_id|gl|hl)=[a-zA-Z0-9_-]*$)/g, '');
      /* Do not use redirect pages, disable AJAX on links */
      window.document.links[i].className = window.document.links[i].className.replace(/(yt-uix-redirect-link|spf-link)/g, "");
    }
    LinkCount = window.document.links.length;
  }
}
ChangeLinks();
window.setInterval(ChangeLinks, 1000);