// ==UserScript==
// @name           Wowhead Google Reader
// @namespace      tosshin
// @description    This script adds wowhead power to google reader
// @include        https://www.google.com/reader/view/*
// @include 	   http://www.google.com/reader/view/*
// @version        0.3
// ==/UserScript==

function addGlobalScript() {
    var head, script;
    
    head = document.getElementsByTagName('head')[0];
    if (!head) {
    	return; 
    }
    
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://www.wowhead.com/widgets/power.js';
    
    head.appendChild(script);
}

addGlobalScript();