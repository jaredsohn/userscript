// ==UserScript==
// @name           NoBrakes
// @namespace      directlink
// @include        http://forum.php.su/*
// ==/UserScript==
var topics = 
document.getElementById('ipbwrapper').
children[0].
children[0].
children[0].
children[9];
topics.innerHTML = topics.innerHTML.replace(/rd\.php\?/g,'');

