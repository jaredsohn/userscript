// ==UserScript== 
// @name                IP Replacement for Google Image
// @version		1.0
// @run-at              document-start
// @author		OM19
// @include             *Google*
// @include             *images.google.com*
// ==/UserScript== 

var imgs = document.getElementsByTagName("img");
var imgURLs=new Array(imgs.length);
for(var i = 0;i<imgs.length;i++){
   imgURLs[i] = imgs[i].src;
   imgs[i].src=imgURLs[i].replace("t0.gstatic.com","203.208.46.243");
   imgs[i].src=imgURLs[i].replace("t1.gstatic.com","203.208.46.243");
   imgs[i].src=imgURLs[i].replace("t2.gstatic.com","203.208.46.243");
   imgs[i].src=imgURLs[i].replace("t3.gstatic.com","203.208.46.243");
   //document.write(imgs[i].src);
   //document.write("<br>");
}
alert('');