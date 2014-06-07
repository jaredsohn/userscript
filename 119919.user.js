// ==UserScript==
// @name Common Application Paste Fix
// @namespace http://codejoust.com/
// @author Iain
// @description Fixes the paste on commonapp.org
// @version 0.2
// @liscence Creative Comons Attribution-NonCommercial-NoDerivs 3.0
// @include http*://*commonapp.org/
// ==/UserScript==

(function(document){
  setTimeout(function(){
    var textarea = document.getElementsByTagName('textarea')
    for(area in textarea){ textarea[area].onbeforepaste=null; textarea[area].onpaste = null; }
  }, 100);
})(document);

