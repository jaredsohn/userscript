// ==UserScript==
// @name       Reddit - Open Links in New Tab as Default
// @namespace  www.reddit.com
// @version    0.1
// @description  Set all the links on Reddit to open in a new tab when clicked.
// @include    *www.reddit.com*
// @copyright  Doron Shem Tov
// ==/UserScript==

var x = document.getElementsByTagName('a');

for(var i=0;i<x.length;i++)
{
    x[i].setAttribute('target','_blank');
}