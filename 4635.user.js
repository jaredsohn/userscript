// ==UserScript==
// @name          MozillaZine Forums Login Referrer
// @namespace     http://loucypher.wordpress.com/
// @include       http://forums.mozillazine.org/login.php*
// @exclude       http://forums.mozillazine.org/login.php*redirect=*
// @description	  Return to previous page after login.
// ==/UserScript==

if(!document.referrer || document.referrer.match(/login\.php/)) return;
var ref = document.referrer.match(/\w+\.php\S+/);
if(!ref) return;
document.forms[0].elements[3].value = ref;

