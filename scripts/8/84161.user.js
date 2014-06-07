// ==UserScript==
// @name           redirect PayPal-Shopping.Com
// @namespace      Yokahnannan
// @description    Redirects stupid paypal-shopping.com back to paypal.com
// @include        *paypal-shopping.com*
// ==/UserScript==
location = window.location.href;
window.location.href="https://www.paypal.com/cgi-bin/webscr?cmd=_login-run"