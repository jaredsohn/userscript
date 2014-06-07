// ==UserScript==
// @name           Remove Writeboard.com sidebar
// @author         http://sindro.me/
// @version        1.0
// @namespace      http://userscripts.org/scripts/show/50113
// @description    Removes the right sidebar from writeboard.com
// @include        *123.writeboard.com/*/v/new
// ==/UserScript==

var container = document.getElementById('Container');
container.getElementsByClassName('Right')[0].style.display = 'none';
container.getElementsByClassName('Left')[0].style.width = '100%';

document.getElementsByClassName('title')[0].style.width = '97%'
document.getElementById('version_body').style.width = '97%'