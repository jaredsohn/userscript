// ==UserScript==
// @name           Install Script on all pages
// @description Easier to install script
// @version       1.4
// @history        1.0
// @include       http://userscripts.org/scripts/*
// @exclude      http://userscripts.org/scripts/show/*
// ==/UserScript==

var instScript = document.createElement('div');
instScript.id = 'install_script';
instScript.innerHTML = '<a href="http://userscripts.org/scripts/source/'+window.location.href.substring(window.location.href.lastIndexOf('/')+1)+'.user.js" class="userjs">Install</a><a href="/about/installing" class="help" title="how to use greasemonkey">How do I use this?</a>';
var contentElement = document.getElementById('content');
content.insertBefore(instScript, content.childNodes(0));