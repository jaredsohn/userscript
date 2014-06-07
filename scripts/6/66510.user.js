// ==UserScript==
// @name   ExtJS stop the silly messages
// @author Denilson
// @version 1.1
// @description  Stops those silly and annoying messages at the top, and
//    thus saves a lot of CPU cycles (important while on laptop battery)
// @include http://www.extjs.com/*
// @include http://extjs.com/*
// ==/UserScript==

(function () {
	function remove_by_id(id) {
		var el = document.getElementById(id);
		if(el && el.parentNode)
			el.parentNode.removeChild(el);
	}
	//remove_by_id('msg-inner');
	//remove_by_id('msg');
	remove_by_id('msg-ct');

	function write_to_console(msg) {
		if(window.console)
			window.console.info(msg);
		else if(window.opera)
			window.opera.postError(msg);
	}

	// This is ugly... A very very ugly hack. I'm almost ashamed of it.
	window.setTimeout(function(){
		// Code below courtesy of:
		// http://userscripts.org/topics/43509#posts-207995

		var i=window.setInterval(function(){}, 99);
		write_to_console('Userscript clearing ' + i + ' (or less) intervals in this page.');

		while(i>0) {
			window.clearInterval(i);
			i--;
		}
	}, 2000);
})();
