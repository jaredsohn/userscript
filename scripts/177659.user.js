// ==UserScript==
// @name           Youtube All Videos Auto Like
// @namespace      
// @description    Clicks the 'like' button for you
// @include        http://*.youtube.com/watch*v=*
// @include        http://youtube.com/watch*v=*
// @include        https://*.youtube.com/watch*v=*
// @include        https://youtube.com/watch*v=*
// @copyright      tkhemani
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @grant          GM_getValue
// @grant          GM_log
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// ==/UserScript==

// Run the script in an anonymous fn
(function autolike() {
document.getElementById("watch-like").click();
})();