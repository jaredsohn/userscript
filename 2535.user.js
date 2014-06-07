// ==UserScript==
// @name          Blingo Customized Google
// @description	  Uses Blingo Search instead of Google search
// @include       http://*.google.com/ig*
// ==/UserScript==

(function() {
	document.forms[1].setAttribute('action','http://www.blingo.com/search');
})();
