// ==UserScript==
// @name           printel4ubuntu
// @description    Fix display of www.printel.fr for Ubuntu
// @namespace      http://www.printel.fr/
// @include        http://www.printel.fr/*
// @version     1
// @grant       none
// ==/UserScript==

document.getElementById('PrintelBar').setAttribute('style', 'min-width: 1164px;');
document.getElementById('nav-main').firstChild.nextSibling.setAttribute('style', 'float: left; text-align: left; width: 200px; padding-top: 2px;');
