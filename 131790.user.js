// ==UserScript==
// @name       CodeProject Newsletter IFrame Removal
// @namespace  http://www.AdamTibi.net/
// @version    0.1
// @description Removes the iframe from CodeProject Newsletter by redirecting to the actual page
// @match      http://www.codeproject.com/script/News/View.aspx?nwid=*
// @copyright  2012, Adam Tibi
// ==/UserScript==

var iframeNode = document.getElementById("ctl00_MC_Frame");
if (!iframeNode || !iframeNode.src) {
    return;
}
self.location = iframeNode.src;