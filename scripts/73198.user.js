// ==UserScript==
// @name           my 4chan facebook link auto-uncheck and remove
// @namespace      ee
// @description    unchecks and removes facebook option
// @include        *4chan.org*
// ==/UserScript==



document.getElementsByName("do_facebook")[0].checked=false;

var a = document.getElementById('fb_tr');
a.parentNode.removeChild(a);