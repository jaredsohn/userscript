// ==UserScript==
// @name           force simple google image search
// @namespace      google
// @include        http://www.google.com.ua/images*
// @description    force redirection to "simple images search"
// ==/UserScript==
if (unsafeWindow.location.search.match(/(&|\?)sout=1/) == null) {
 unsafeWindow.location.search += '&sout=1'
}