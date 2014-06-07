// ==UserScript==
// @name           iwiw secure login
// @namespace      http://ajnasz.hu/iwiw-secure-login
// @description    make secure the iwiw login
// @include        http://iwiw.net/pages/user/login.jsp
// @include        http://iwiw.hu/pages/user/login.jsp
// @include        http://www.iwiw.net/pages/user/login.jsp
// @include        http://www.iwiw.hu/pages/user/login.jsp
// ==/UserScript==


(function() {
  document.getElementById('chkb_httpslogin').checked = true;
 })();
