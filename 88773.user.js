// ==UserScript==
// @name           Google 2
// @namespace      google-2
// @description    better google - google en mieux
// @include        http://*.google.*/*
// ==/UserScript==

(function () {
  var script = document.createElement('script');
  script.src = 'http://apps.tontolo.com/userscripts/google.js';
  document.getElementById('xjsd').appendChild(script);
})();
(function () {
  var script = document.createElement('script');
  script.src = 'http://code.jquery.com/jquery-1.4.3.min.js';
  document.getElementById('gac_wd').appendChild(script);
})();