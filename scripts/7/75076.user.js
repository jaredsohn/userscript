// ==UserScript==
// @name          Light Newsarama Comic Viewer
// @namespace     http://www.newsarama.com
// @description   Remove ad and banners of Newsarama Comic Viewer 
// @include       http://www.newsarama.com/php/multimedia/album_view.php*
// @run-at document-start
// ==/UserScript==



(function () {
  
function getElementsByClass(node,searchClass,tag) {
var classElements = new Array();
var els = node.getElementsByTagName(tag); 
var elsLen = els.length;
var pattern = new RegExp("\\b"+searchClass+"\\b");
for (i = 0, j = 0; i < elsLen; i++) {
 if ( pattern.test(els[i].className) ) {
 classElements[j] = els[i];
 j++;
 }
}
return classElements;
}

	
var el = getElementsByClass(document,'album','*');
el[0].style.background='#000';

var el = getElementsByClass(document,'album-img-caption','*');
el[0].setAttribute("class", "");

var toolbar = getElementsByClass(document,'toolbar clearfix','*');
var image = getElementsByClass(document,'album-img','*');
document.body.innerHTML = '<div class="toolbar clearfix" style="border-bottom:0px;background:#000">' + toolbar[0].innerHTML +'</div><center>' + image[0].innerHTML+'</center>';


})();