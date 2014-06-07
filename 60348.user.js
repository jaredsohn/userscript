// ==UserScript==
// @name           Go2Google2
// @namespace      hi
// @include        http*://www.google.com/#*
// ==/UserScript==
var a = document.URL.split("//"); // split at protocol
a = (a[1] ? a[1] : a[0]).split("/");
// use last element of a; split at /
// host is a[0]; path is a[1..(n-1)]; a[n] is page
var hi = a[1];
var test = document.URL.split("&");
alert(test[2]);
window.location="http://www.google.com/search?client=firefox-a&rls=org.mozilla%3Aen-US%3Aofficial&channel=s&hl=en&source=hp&"+test[2];