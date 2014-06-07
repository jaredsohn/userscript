// ==UserScript==
// @name           Ctrl+Enter Click-Submit Form
// @namespace      http://blog.perlover.com/2010/09/23/ctrl-enter-submit/
// @include        *
// ==/UserScript==

// Based on script "Ctrl+Enter Submit Any Form" by By Misha Splurov: http://userscripts.org/scripts/show/67743
// This script submits form through click method (not submit) by first submit button (some CGI scripts want to get name of submit button for properly working, submit() method doesn't do it)

(function(){

window.addEventListener('keypress', function(e){
	if (e.ctrlKey && e.keyCode == 13 && e.target.form) {
		if (e.shiftKey) {
			e.target.form.setAttribute('target', '_blank');
		}
		var els = e.target.form.getElementsByTagName('input');
		for (var i = 0; i < els.length; i++)
		 {
		  if (els[i].getAttribute('type') && els[i].getAttribute('type').toLowerCase() == 'submit')
	    	   {
		    els[i].click();
		    break;
		   }
		 }
		e.preventDefault();
		if (e.shiftKey) {
			e.target.form.removeAttribute('target');
		}
	}
}, false);

})();