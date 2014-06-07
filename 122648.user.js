// ==UserScript==
// @name           moodle-link-fixer
// @namespace      moodle_link_fixer
// @author         Danny Hvam
// @description    This will fix links decorations in moodle to make them more visible
// @version        0.2
// @include        http://*.moodle.aau.dk/*
// ==/UserScript==

var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = "a:link{color: #720C0C; text-decoration: underline;} .sideblock {border: 1px solid #87939C !important;}";
head.appendChild(style);

