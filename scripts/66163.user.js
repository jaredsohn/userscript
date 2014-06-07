// ==UserScript==
// @name verycd URL change
// @description verycd url fix
// @include http://www.verycd.com*
// ==/UserScript==
(function() {
if(window.location.href.match(/www\.verycd\.com/i)) {
var oldstr=window.location.toString();
window.location.href=oldstr.replace("www.verycd.com", "info.verycd.com");
}
}
)();