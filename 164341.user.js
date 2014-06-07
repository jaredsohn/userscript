// ==UserScript==
// @name         Youtube Show Uploads Only
// @namespace    http://userscripts.org/users/zackton
// @description  Shows only uploads on subscription pages
// @include      *.youtube.com/*
// @updateURL    http://userscripts.org/scripts/source/164341.meta.js
// @grant        none
// @version      1.3.7
// ==/UserScript==

window.setTimeout(UploadsOnly,0)

function UploadsOnly() {
console.log('test2');
var currenturl = document.URL;
console.log(currenturl);

var load = currenturl.indexOf("feed/");
var add = currenturl.indexOf("/u");

if (load===-1) {} 
else if (add===-1) { 
window.location = document.URL+"/u";
}

}
// Add script to the page
document.addEventListener('DOMContentLoaded', function(e) {
    var s = document.createElement('script');
    s.textContent = "(" + UploadsOnly.toString() + ')();';
    document.head.appendChild(s)
});