// ==UserScript==
// @name           All the people you follow in Google Reader
// @namespace      http://www.google.com
// @include        http://www.google.com/reader*
// @include        https://www.google.com/reader*
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
var el = getElementsByClass(document,'lhn-section-secondary','*');
for (i=0;i < el.length; i++) {
 el[i].style.height='100%';
}
})();