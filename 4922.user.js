// ==UserScript==
// @name          Cheggit Forum Re-titler
// @namespace     http://nipsden.blogspot.com
// @description   Makes the post title a part of the page title
// @include       http://cheggit.net/forums.php?*op=view*
// ==/UserScript==
//
// Upon suggestion of Tarkus on <http://cheggit.net/forums.php?op=view&p=13126#post28533>

var postnum=window.location.href.replace(/.*p=(\d+).*/, '$1');

document.title = document.getElementById('post'+postnum).firstChild.data + " post on " + document.title;
