// ==UserScript==
// @name           Livedoor Secure Login
// @namespace      http://www.misao.gr.jp/~koshian/
// @description    Auto transfer https URL on Livedoor login
// @include        http://member.livedoor.com/login/*
// ==/UserScript==

(function() {
  var loc = new String(location);
  var regexp = new RegExp('^http:(.*)$');

  if (regexp.exec(loc))
    {
      var url = 'https:' + RegExp.$1;
      location.href = url;
    }
 })();

