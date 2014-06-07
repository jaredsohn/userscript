// ==UserScript==
// @name           Lord Spanky
// @namespace      ...
// @description    Changes all instances of "Lord Snakie" to "Lord Spanky".
// @include        *
// ==/UserScript==

document.getElementsByTagName('head')[0].innerHTML = document.getElementsByTagName('head')[0].innerHTML.replace(/snakie/gi,"Spanky");
document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML.replace(/snakie/gi,"Spanky");
