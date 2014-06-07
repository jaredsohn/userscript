// ==UserScript==
// @name           mixi Secure Login
// @namespace      http://www.rhathymia.net/
// @description    Redirect to HTTPS login. Appreciate Sugano Yoshihisa's foregoing efforts (http://userscripts.org/scripts/show/24848). 
// @include        http://mixi.jp/*
// ==/UserScript==

(function() {
　　if (document.getElementById('login_box') != null)
  {
    var loc = new String(location);
    var regexp = new RegExp('^http:(.*)$');

    if (regexp.exec(loc))
    {
//        var url = 'https:' + RegExp.$1;
        var url = 'https://mixi.jp';
        location.href = url;
    }
  }
 })();

