// ==UserScript==
// @name           Fix IEEE Title
// @namespace      http://owlwatch.blogspot.com/
// @include        http://ieeexplore.ieee.org/xpls/abs_all.jsp*
// ==/UserScript==
var title = document.evaluate('//h1', document, null, XPathResult.STRING_TYPE, null).stringValue.replace(/^\s+|\s+$/g,"");

if(title){
   document.title = title;
}