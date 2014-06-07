// ==UserScript==
// @name           securityxploded download
// @namespace      Bubba Damaged
// @description    download with direct links
// @include        http://*securityxploded.com*
// ==/UserScript==

// ============================================================================
// removes a extra download page and replace with the semi-real download link
// (source taken from my "apktop real download" script) 
// ============================================================================

var links = document.links;

for (i=0; i<links.length; i++) {
	links[i].href = links[i].href.replace("download-file.php","getfile_plus.php");
}
