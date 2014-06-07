// ==UserScript==
// @name           tumblr hide radar
// @revision       1
// @author         KID the Euforia a.k.a. blueberrystream
// @description    
// @namespace      http://kid0725.usamimi.info
// @include        http://www.tumblr.com/*
// ==/UserScript==

void(function() {

byClass('radar')[0].style.display = 'none';

function byClass(className, parent) {
  var e = parent ? parent : document;
  return e.getElementsByClassName(className);
}

})();