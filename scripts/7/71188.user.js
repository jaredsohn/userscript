// ==UserScript==
// @name           secure livedoor
// @namespace      http://looxu.blogspot.com/
// @description    secure livedoor login
// @include        http://member.livedoor.com/login*
// @author         Arc Cosine
// @version        1.0
// ==/UserScript==
// License : Public Domain
(function(){
  window.opera.addEventListener('BeforeScript',function(){
    location.href =  location.href.replace(/^http:/,'https:');
  }, false );
})();
