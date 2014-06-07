// ==UserScript==
// @name            Facebook Redesign Header Jog Fixer
// @namespace       Platypus
// @include         http://hs.facebook.com/*
window.addEventListener("load", function () {
	document.getElementById('nav_unused_2').setAttribute('style', 'background-color: #3b5998; height: 2.425em; margin: -0.8em 0 0; padding: 0.7em 0 0;');
}, false);