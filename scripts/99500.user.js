// ==UserScript==
// @name           ImageShack Direct Link without register
// @namespace      http://kubofonista.net
// @description    Disables anti-copy imageshack direct link protection
// @include        http://img*.imageshack.us/content_round.php?page=done*
// @include        http://imageshack.us/content_round.php?page=done*
// ==/UserScript==

var link = document.getElementsByClassName("readonly");
link[1].removeAttribute('disabled');
link[1].removeAttribute('readonly');
link[1].removeAttribute('ondoubleclick');
link[1].removeAttribute('onclick');
link[1].removeAttribute('onselectstart');
link[1].removeAttribute('onmousedown');
//link[1].removeAttribute('class');

var tool = document.getElementsByClassName("tooltip");
tool[2].innerHTML = '';