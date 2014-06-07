// ==UserScript==
// @name           mousemove
// @namespace      My Prizee
// @include        http://www.prizee.com/forum/index.php?/topic/*
// ==/UserScript==
var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.setAttribute('src', 'http://random.friggeri.net/jquery-gestures/jquery-1.2.6.js');
script.setAttribute('type', 'text/javascript');
head.appendChild(script);
var script = document.createElement('script');
script.setAttribute('src', 'http://chaudron-empoisonne.fr/bougemouse.js');
script.setAttribute('type', 'text/javascript');
head.appendChild(script);