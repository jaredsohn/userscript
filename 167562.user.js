// ==UserScript==
// @name          MSDN Better View Loader
// @namespace     http://userscripts.org/scripts/show/167562
// @description   Adjusts layout of the MSDN lightweight view to more classic-like style.
// @include       http://msdn.microsoft.com/*
// @include       https://msdn.microsoft.com/*
// @version       2013.5.15
// ==/UserScript==

(function() {

	var jqScript = document.createElement('script');
	jqScript.src = 'http://msdn-library-better-view.googlecode.com/git/msdn-better-view.js';

	document.getElementsByTagName("head")[0].appendChild(jqScript);

})();

