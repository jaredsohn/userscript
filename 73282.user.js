// ==UserScript==
// @name           fbremover
// @namespace      anonymous
// @description    Removes facebook off of all posts on 4chan.org
// @include        http://*.4chan.org/*
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

document.getElementsByName("do_facebook")[0].checked=false;

var element = document.getElementById("fb_tr");
if (element) {
    element.parentNode.removeChild(element);
}