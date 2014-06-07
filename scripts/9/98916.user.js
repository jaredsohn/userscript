// ==UserScript==

// @name           remove banner from send SMS page at mts.com.ua

// @namespace      j2ck

// @include        http://www.mts.com.ua/*/sendsms.php?*

// ==/UserScript==

document.getElementById('pageContent').style.visibility = 'visible';

var temp = document.getElementById('smsAdvert');

temp.parentNode.removeChild(temp);