// ==UserScript==
// @name Fix DallasCowboysCentral.com smallfont style
// @namespace http://jdallen.org
// @description Fix DallasCowboysCentral.com smallfont style
// @include http://dallascowboyscentral.com/*
// @include http://www.dallascowboyscentral.com/*
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

addGlobalStyle('.smallfont { color: black ! important; }');
addGlobalStyle('li { color: black ! important; }');
addGlobalStyle('.fieldset  { color: black ! important; }');
addGlobalStyle('.fieldset, .fieldset td, .fieldset p, .fieldset li { color: black ! important; }');
