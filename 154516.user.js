// ==UserScript==
// @name        Hide NZBsrUS Porn
// @namespace   nzbsrus.com
// @include     https://www.nzbsrus.com/nzbbrowse.php*
// @version     1
// ==/UserScript==

var a=new Array('br_o0','br_o1');
for(var k=0;k< a.length;k++){
var t = document.getElementsByClassName(a[k]);

for(var i=0; i < t.length; i++) {

   var y = t[i].getElementsByTagName("a");
   for (var j=0; j < y.length; j++) {
      if (y[j].getAttribute('href') == "/nzbbrowse.php?cat=111" || y[j].getAttribute('href') == "/nzbbrowse.php?cat=108")
      t[i].style.display = "none";
   }
}
}