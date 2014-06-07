// ==UserScript==
// @name	MikroOdświeżacz
// @description	Automatycznie pokazuje nowe wpisy w mikroblogu zamiast ramki, że zostały dodane.
// @namespace	http://userscripts.org/scripts/show/163317
// @updateURL	http://userscripts.org/scripts/source/163317.meta.js
// @include	http://www.wykop.pl/mikroblog*
// @include     http://wykop.pl/mikroblog*
// @grant	none
// @version	1.0.2
// @run-atdocument-end
// ==/UserScript==

function main() {
	var refreshTimeout;
	var initialTimeout;
	function showNewEntries() {
		if(!refreshTimeout) {
			initialTimeout = setTimeout(showNewEntries, 3000);
		}
		if(jQ('div#recent > .cpointer').length > 0) {
			jQ('div#recent > .cpointer').trigger('click');
			if(initialTimeout) {
				clearTimeout(initialTimeout);
			}
			refreshTimeout = setTimeout(showNewEntries, 15000);
		} else if (refreshTimeout) {
			refreshTimeout = setTimeout(showNewEntries, 15000);
		}
	}
	jQ('div.recentPlaceHolder').attr('style', 'visibility:hidden;margin-top:-16px;');
	showNewEntries();
}

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	script.setAttribute("type", "text/javascript");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

if (window.addEventListener) {
	window.addEventListener('load', function() { addJQuery(main); }, false);
} else {
	addJQuery(main); 
}