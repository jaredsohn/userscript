// Unfocuser
// version 0.1
// 2008-08-07
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          unfocuser
// @description   Forces blur on all text inputs and textareas on page load
// @include       http://*
// @include       https://*
// ==/UserScript==
//

window.addEventListener(
    'load', 
	function(){
		unsafeWindow.setTimeout(function(){
			var foo = document.getElementsByTagName('input');
			for(var i=0;i < foo.length;i++){
				var inp = foo[i];
				if(inp.type == 'text')
					inp.blur();
			}
			var bar = document.getElementsByTagName('textarea');
			for(var i=0;i < bar.length;i++){
				bar[i].blur();
			}
		},200);
}, true);

