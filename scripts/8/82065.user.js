// ==UserScript==
// @name           noor7-us visited links
// @namespace      itayscripts
// @description    marks already visited links
// @include        http://noor7-us.blogspot.com/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


addGlobalStyle('a:visited \
{\
	color:black;\
}');


