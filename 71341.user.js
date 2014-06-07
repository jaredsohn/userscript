// ==UserScript==
// @name           sendto all
// @namespace      http://s*.ikariam.*/index.php*
// @include        http://s*.ikariam.*/index.php*
// ==/UserScript==

var div = document.createElement("div")
div.setAttribute('id', 'sendtoall')
div.innerHTML = '<a href="/index.php?view=sendIKMessage&allyId=6029&msgType=51">SEND TO ALL</a>'
document.getElementById('GF_toolbar').appendChild(div)