// ==UserScript==

// @name          Mindodo

// @description   Mindodo Adremover
// @include       http://www.mindomo.com/edit*

// ==/UserScript==

document.body.removeChild(document.body.childNodes[2]);
document.getElementsByTagName('div')[0].innerHTML = '';
document.getElementsByTagName('tr')[0].removeChild(document.getElementsByTagName('tr')[0].childNodes[3]);
