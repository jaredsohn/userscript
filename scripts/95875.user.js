// ==UserScript==
// @name flashback linkskipp
// @namespace slashskipp
// @include *flashback.org/leave.php*
// ==/UserScript==

var url = window.location.href;
window.location.href = unescape(url.substring(url.lastIndexOf("http")));

