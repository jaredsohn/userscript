// ==UserScript==
// @name           Evernote height fixer for Chromium
// @description    fix the height of Evernote notes for Chromium browser
// @version        0.02
// @match        https://*.evernote.com/*
// ==/UserScript==


head = document.getElementsByTagName('head')[0];
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = "div#gwt-debug-noteView { height: 100%;} \n .mceLast {height: 100%;}";
head.appendChild(style);
