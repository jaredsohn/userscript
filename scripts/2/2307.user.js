// ==UserScript==
// @name          Wrap long lines
// @namespace     http://beachy.freeshell.org/greasemonkey/
// @include       *txt
// @description	  Wraps long lines automatically (makes text files less annoying to read). It's really just a Greasemonkified version of the force wrap bookmarklet at http://www.squarefree.com/bookmarklets/zap.html#force_wrap
// ==/UserScript==


(function() {

	var pres = document.getElementsByTagName('pre');
	if(pres.length > 0) 
		{ if(pres.item(0).getAttribute('style') == null) 
			{  pres.item(0).setAttribute('style','white-space:-moz-pre-wrap'); }
		else {  pres.item(0).removeAttribute('style'); }
		}
	})();
