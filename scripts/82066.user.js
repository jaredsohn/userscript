// ==UserScript==
// @name          Protection You Can Count On
// @namespace     itwontleak
// @description   redirects your handgun from your head to the speakers
// Author: knux
// @include       http://boards.4chan.org/b/*
// ==/UserScript==
(function(){a = document.getElementsByTagName("embed"); for(b in a) if(a[b].src == "http://swf.4chan.org/gma.swf") a[b].parentNode.removeChild(a[b])})()