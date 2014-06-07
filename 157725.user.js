// ==UserScript==
// @name youtube buffer thingie
// @namespace youtbuecabufferthingie
// @description youtube buffer thingie for <Addyct> adds &gl=CA to a youtube url (only on youtube) for faster buffering
// @include http://youtube.com/*
// @include https://youtube.com/*
// @include http://*.youtube.com/*
// @include https://*.youtube.com/*
// @version 2
// ==/UserScript==

function youtubebuffer() {
console.log('test');
var currenturl = document.URL;
console.log(currenturl);

var x = currenturl.indexOf("watch?v=");
var n = currenturl.indexOf("&gl=CA");

if (x===-1) {} 
else if (n===-1) { 
window.location = document.URL+"&gl=CA";
}

}
// Add script to the page
document.addEventListener('DOMContentLoaded', function(e) {
    var s = document.createElement('script');
    s.textContent = "(" + youtubebuffer.toString() + ')();';
    document.head.appendChild(s)
});