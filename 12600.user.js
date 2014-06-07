// ==UserScript==
// @name           Hushmail - Skip upgrade page
// @namespace      http://mablung.net
// @include        https://*.hushmail.com/welcome-upgrade
// ==/UserScript==

var form = document.getElementsByTagName('form')[0];

if (form.name == 'freeserver') {
 form.submit();
}