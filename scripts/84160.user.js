// ==UserScript==
// @name           forums cancer ctrl z
// @namespace      global
// @include        http://forums.somethingawful.com/*
// ==/UserScript==

(function(){
  var a=document.createElement('style');
  a.type='text/css';
  a.innerHTML='.cancerous, .cancerous .bbc-block{opacity:1.0 !important;}';
  document.body.appendChild(a);
})();