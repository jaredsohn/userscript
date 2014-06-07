// ==UserScript==
// @name           apktop real download
// @namespace      Bubba Damaged
// @description    download direct link without need of email confirmation updated
// @include        http://www.*apktop.com*
// ==/UserScript==

// ============================================================================
// removes email confirmation link and replace with the real download link
// ============================================================================

var links = document.links;

for (i=0; i<links.length; i++) {
	links[i].href = links[i].href.replace("/?p","/getFile.php?p").replace("download/?id=","wp-content/plugins/download-monitor/download.php?id=");
}