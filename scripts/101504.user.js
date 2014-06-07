// ==UserScript==
// @name Anti-facebook Blocked
// ==/UserScript==

var url = window.location.href;
if (url.indexOf(".facebook.") != -1){
window.location.href.remove("facebook");
} else if(url.indexOf("69.63.189.11") != -1){
window.location.href.remove("69.63.189.11")
}