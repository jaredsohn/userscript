// ==UserScript==
// @name           Auto Focus
// @version        1.0
// @include        *
// ==/UserScript==

(function()
{
		var inputs = document.getElementsByTagName('input');
		for (var i=0; i<inputs.length; i++) {
			if (inputs[i].type == 'text') {
				inputs[i].focus();
				inputs[i].select();
				return;
			}
		}
})();