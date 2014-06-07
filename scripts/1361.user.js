// ==UserScript==
// @name          Congregative Cavity
// @namespace     http://moeffju.net/dA/hack/js/congregativeCavity
// @description	  Makes deviantART most politically correctest
// @include       http://*.deviantart.com/*
// ==/UserScript==

// ÃÂ© 2005 Matthias Bauer <http://moeffju.deviantart.com/>
// Idea: `jnc in http://forum.deviantart.com/devart/general/366916/6929875

(function() {

function CongregativeCavityInit() {
  var c = document.getElementById('address').firstChild.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling;
  
  c.textContent = c.textContent.replace(/collective rectum/, 'congregative posterior cavity');
  
  return;
}

CongregativeCavityInit();

})();
