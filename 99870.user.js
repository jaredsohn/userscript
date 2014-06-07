// ==UserScript==

// @name           ImageShack Direct Link without register (fix)

// @namespace      http://kubofonista.net
// @namespace      http://userscripts.org/users/312902

// @description    Disables anti-copy imageshack direct link protection

// @include        http://*imageshack.us/*

// ==/UserScript==



var link = document.getElementsByClassName("readonly");

link[1].removeAttribute('disabled');

link[1].removeAttribute('readonly');

link[1].removeAttribute('ondoubleclick');

link[1].removeAttribute('onclick');

link[1].removeAttribute('onselectstart');

link[1].removeAttribute('onmousedown');

//link[1].removeAttribute('class');



var tool = document.getElementsByClassName("left-tooltip");

tool[2].innerHTML = '';