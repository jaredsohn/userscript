// ==UserScript==
// @name        Maccabi-Health remember me
// @namespace   http://userstyles.org
// @description Maccabli-Health, remember ID and password
// @include     https://da.maccabi-health.co.il/dana-na/auth/url_default/welcome.cgi
// @include     https://da.maccabi-health.co.il/dana-na/auth/url_default/welcome.cgi?*
// @version     2
// ==/UserScript==

(function(){
  var loginForm = document.getElementById('frmLogin');
  if (!loginForm) return;
  loginForm.setAttribute("autocomplete", "on");
})();
