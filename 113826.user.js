// ==UserScript==
// @name		Prevent accidental page navigation while textarea has focus.
// @namespace		v1
// @include		*
// ==/UserScript==

var script = document.createElement("script");
script.textContent = "(window.onbeforeunload = function(){ if (document.activeElement.tagName == 'TEXTAREA') return false; })();";
document.body.appendChild( script );