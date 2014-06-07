// ==UserScript==
// @name           FA HTTP-to-HTTPS
// @namespace      Iovis
// @description    Converts all HTTP FA links to HTTPS
// @include        http*://*.furaffinity.net/*
// @exclude        
// ==/UserScript==

(function(){
  if(/^http:\/\/(?!forums)/.test(location.href)) location.href = location.href.replace(/http\:/, 'https:');
  
  var lnks = document.getElementsByTagName('a');
  for(var i in lnks)
  {
  	lnks[i].href = lnks[i].href.replace(/^http:(\/\/(?!forums).+?\.furaffinity\.net)/, "https:$1");
  }
})();