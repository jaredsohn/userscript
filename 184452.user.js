// ==UserScript==
// @name        Select text inside link
// @namespace   http://xiaoxiao.cwahi.net/
// @include     *
// @version     1
// @run-at	document-start
// ==/UserScript==

( function () {

altk = false;

window.addEventListener('mousedown', function(e){
	if(e.altKey)
		altk = true;
}, true);

window.addEventListener('click', function(e){
	if(document.getSelection().toString() != '' && altk){
		altk = false;
		e.stopPropagation();
		e.preventDefault();
		return false;
	}
}, true);

})();