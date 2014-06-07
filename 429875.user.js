// ==UserScript==
// @name        Google Search
// @namespace   google.com
// @include     https://www.google.com*
// @version     1
// @grant       none
// ==/UserScript==
setTimeout(function(){
var a=document.getElementsByTagName('a');
len=a.length;

for(var i=0;i<len;i++) {
    a[i].removeAttribute('onmousedown');
}
},3000);