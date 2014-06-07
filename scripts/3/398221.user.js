// ==UserScript==
// @name       		pt auto thanks
// @namespace  		https://pt.sjtu.edu.cn/
// @description		auto thanks uploader on pt
// @version    		0.1
// @match      		https://pt.sjtu.edu.cn/details.php?id*
// @copyright  		2014+, delta
// ==/UserScript==

(function() {
	function onDOMNodeInsertedHandler() {
		var btn = document.getElementById('saythanks');
		if (btn && btn.click) {
			btn.click();
		}
	}
	document.body.addEventListener('DOMNodeInserted', onDOMNodeInsertedHandler, false);
})();
