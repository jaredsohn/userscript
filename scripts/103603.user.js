// ==UserScript==
// @name Easy Facebook blocker
// ==/UserScript==

var url = window.location.href;
if (url.indexOf(".facebook.") != -1){
alert("Stay away!")
window.location.href="http://google.com";
} else if(url.indexOf("69.63.189.11") != -1){
window.location.href="http://google.com";
}