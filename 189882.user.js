// ==UserScript==
// @name       Mark Forums Read
// @version    0.1
// @description  Adds a link to mark all forums read.
// @include    http://thefanfictionforum.net*
// @copyright  2012+, You
// ==/UserScript==

var a = document.createElement('a');
var linkText = document.createTextNode("Mark Forums Read");
a.appendChild(linkText);
a.href = "http://thefanfictionforum.net/misc.php?action=markread&my_post_key=e6e5d0f9434ca22b5d8d03093ffab24c";
document.getElementById('panel').appendChild(a); 