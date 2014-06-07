// ==UserScript==
// @id             PT_Auto_Thanks@jiayiming
// @name           PT Auto Thanks
// @version        1.2
// @namespace      jiayiming
// @author         jiayiming
// @description    Auto thanks in TTG and NexusPHP. 
// @include        http://ttg.im/t/*/
// @include        http://*details.php*
// @updateURL      https://userscripts.org/scripts/source/174011.meta.js
// @downloadURL    https://userscripts.org/scripts/source/174011.user.js
// @run-at         document-end
// ==/UserScript==


(function() {

	function $(css, contextNode) {
		return (contextNode || document).querySelector(css);
	}

	function Thanks() {
		var url = location.href;
		var btn = '';

		if (url.indexOf('ttg') > 0) {
			btn = $('#ajaxthanks');
		} else if (url.indexOf('details') > 0) {
			btn = $('#saythanks');
		}
		if (btn != undefined && btn.disabled != true) {
			//alert(url);
			//btn.onclick = undefined;
			btn.click();
		}
	}

	window.addEventListener('load', Thanks(), false);
})();