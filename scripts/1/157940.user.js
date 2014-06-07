// ==UserScript==
// @name wykopalistko
// @namespace OK
// @include http://www.wykop.pl/ludzie/kaifasz
// @version 1
// ==/UserScript==

var a = document.getElementById('body-con');
var o = document.getElementsByTagName('a'), count=o.length;
for(var i=0;i<count;i++){
if(o.item(i).href.indexOf('observe')>0) document.location.href=o.item(i).href;
} 