// ==UserScript==
// @name           Focus on the User
// @namespace      http://userscripts.org/users/ovreneli
// @description    don't be evil
// @include        http://www.google.tld/*
// @include        https://www.google.tld/*
// ==/UserScript==

window.__dbe || (function() {
  var script;
  window.__dbe = true;
  script = document.createElement('script');
  script.src = '//focusontheuser.org/dontbeevil/script.js?' + (new Date().getTime());
  document.body.appendChild(script);
})();
