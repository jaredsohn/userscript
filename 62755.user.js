// ==UserScript==
// @name          Remove Suggestions
// @namespace     Steven Saltarelli
// @description   Prevents the "Suggestions" box from appearing on the homepage.
// @version       1.0
// @unwrap
// @include       http://*.facebook.com/*
// ==/UserScript==
(function() {
var head = document.getElementsByTagName('head')[0], 
    style = document.createElement('style'), 
    css = '#pymk_hp_box { display: none !important; }';
if (!head || self.location != top.location) {return}
style.type = 'text/css';
try {style.innerHTML = css}
catch(x) {style.innerText = css}
head.appendChild(style);
})();