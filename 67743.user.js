// ==UserScript==
// @name           Ctrl+Enter Submit Any Form
// @namespace      http://userscripts.org/users/splurov/
// @include        *
// ==/UserScript==

(function(){

window.addEventListener('keypress', function(e){
	if (e.ctrlKey && e.keyCode == 13 && e.target.form) {
		if (e.shiftKey) {
			e.target.form.setAttribute('target', '_blank');
		}
		e.target.form.submit();
		e.preventDefault();
		if (e.shiftKey) {
			e.target.form.removeAttribute('target');
		}
	}
}, false);

})();