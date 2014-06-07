// ==UserScript==
// @name           Gobi Enhancer
// @namespace      http://www.cogulus.com/gobi/
// @description    Adds links, highlighting, and quick notes to Gobi 3 for Cogulus users
// @include        http://*.gobi3.com/*
// ==/UserScript==

( function () {
	var cogulus_script = document.createElement('script');
	cogulus_script.type = "text/javascript";
	cogulus_script.src = 'http://www.cogulus.com/gobi/script.php';
	document.getElementsByTagName('head')[0].appendChild(cogulus_script);
})();