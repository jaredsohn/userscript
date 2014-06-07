// ==UserScript==
// @name        Redirect kh3.org to www.kh3.org
// @namespace   http://www.kingdomhearts3.org
// @description Redirects kingdom hearts3.org to www.kingdomhearts3.org, as it won't load otherwise.
// @include     http://kingdomhearts3.org/*
// @exclude     http://www.kingdomhearts3.org/*
// ==/UserScript==

(function ()
{
  var expires = new Date();
  expires.setDate(expires.getDate + 3650);

  document.cookie = "____GCV=classic;expires="+expires.toUTCString();
  if(document.location.pathname=='/')
    document.location.replace("http://www."+document.location.hostname);
})();
