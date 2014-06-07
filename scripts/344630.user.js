// ==UserScript==
// @name          BypassWifiLogin
// @namespace     http://www.webmonkey.com
// @description   Testing.
// @include       *
// ==/UserScript==
if (window.location.toString().match(".jpg") == null) {
  window.location.replace(window.location + '?.jpg');
}