// ==UserScript==
// @name           Automatically Check Remember Me Checkbox on Amex Login Page
// @namespace      http://www.stealthmonkey.com
// @description    Automatically checks the Remember Me checkbox on the American Express login page
// @include        https://home.americanexpress.com/home/mt_personal_cm.shtml*
// ==/UserScript==

var objs = document.getElementsByName('REMEMBERME');
if (objs.length == 1) {
  objs[0].checked = true;
}