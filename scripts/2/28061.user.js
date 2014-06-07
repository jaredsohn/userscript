// ==UserScript==
// @name           load extensions
// @namespace      http://goosh.org/
// @description    Load extensions for Goosh at startup
// @include        http://*goosh.org*
// @author         YungSang
// @version        0.6.3
// ==/UserScript==
// v0.1 : 2008.06.02 : First Release
// v0.2 : 2008.06.03 : Change @inlucde a bit
// v0.3 : 2008.06.03 : Add exit.ext.js
// v0.4 : 2008.06.07 : Add yubnub.ext.js
// v0.5 : 2008.06.07 : Improve click events' behavior on the body and the input-field
// v0.6 : 2008.06.26 : for Goosh 0.5.0-beta #1

(function() {
	function loadScript(url) {
		var script     = document.createElement('script');
		script.type    = 'text/javascript';
		script.charset = 'utf-8';
		script.src     = url;

		document.getElementsByTagName('head')[0].appendChild(script);
	}

	loadScript('http://yungsang.com/goosh/twitter.ext.js');
	loadScript('http://yungsang.com/goosh/yubnub.ext.js');
	loadScript('http://yungsang.com/goosh/exit.ext.js');
})();

(function(window) {
	addEventListener(document.getElementById("inputfield"), "click", function(event) {
		if (!event) event = window.event;
		event.preventDefault();
		event.stopPropagation();
		return false;
	});

	function focusinput(event) {
		var selection = _getSelection();
		var input = document.getElementById("inputfield");

		if (selection) {
			var command = trim(input.value);
			command += (command ? ' ' : '') + selection;
			input.value = command;
		}
		if (input.style.display != "none") {
			input.focus();
		}
	}

	if (typeof unsafeWindow != 'undefined') { // Firefox
//		removeEventListener(document.body, "click", goosh.gui.focusinput);
		addEventListener(document.body, "click", focusinput);
	}
	else { // Safari, Fluid
		var timer = setInterval(function() {
			if (document.body.onclick) {
				clearInterval(timer);
				document.body.onclick = focusinput;
			}
		}, 500);
	}

	function _getSelection() {
		return (window.getSelection ? window.getSelection() :
			(document.getSelection) ? document.getSelection() :
				(document.selection ? document.selection.createRange().text : ''));
	}
	function trim(text) {
		return text.replace(/^\s+|\s+$/g, '');
	}
	function addEventListener(object, event, handler) {
		if (object.addEventListener) {
			object.addEventListener(event, handler, false);
		}
		else if (object.attachEvent) {
			object.attachEvent("on" + event, handler);
		}
	}
	function removeEventListener(object, event, handler) {
		if (object.removeEventListener) {
			object.removeEventListener(event, handler, false);
		}
		else if (object.detachEvent) {
			object.detachEvent("on" + event, handler);
		}
	}
})((typeof unsafeWindow != 'undefined') ? unsafeWindow : window);
