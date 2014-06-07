// ==UserScript==
// @name           Hide Google Buzz albums in Picasa Web Albums
// @namespace      http://www.google.com
// @include        http://picasaweb.google.com/home*
// ==/UserScript==

(function(){ 

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
var el = getElementsByClass(document,'SPRITE_buzz','*');
for (i=0;i < el.length; i++) {
 el[i].parentNode.parentNode.parentNode.parentNode.style.display='none';
}
})();