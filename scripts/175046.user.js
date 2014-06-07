// ==UserScript==
// @name        Stack Overflow Careers Cover Letter Spellcheck
// @namespace   DeMeyer.Greasemonkey.UserScripts
// @description Flips the "spellcheck" attribute on the modal iframe that contains cover letters so that active spellchecking can occur.
// @include     http://careers.stackoverflow.com/jobs/*
// @require     http://code.jquery.com/jquery-latest.min.js
// @version     1.0.0
// ==/UserScript==

if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
	function addJQuery(callback) {
	  var script = document.createElement("script");
	  script.setAttribute("src", "http://code.jquery.com/jquery-latest.min.js");
	  script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	  }, false);
	  document.body.appendChild(script);
	}

	// the guts of this userscript
	function main() {
		jQuery.noConflict();
		(function($) {
			function addSpellCheck() {
				if ($("#sc_apply_wrapper > iframe").contents().find("#CoverLetter_ifr").contents().find("body").length) {
					$("#sc_apply_wrapper > iframe").contents().find("#CoverLetter_ifr").contents().find("body").attr("spellcheck","true");
				}
				else {
					setTimeout( function () { addSpellCheck() }, 300);
				}
			}
			addSpellCheck();
		})(jQuery);
	}
	
	// load jQuery and execute the main function
	addJQuery(main);
}
else {
	jQuery.noConflict();
	(function($) {
		function addSpellCheck() {
			if ($("#sc_apply_wrapper > iframe").contents().find("#CoverLetter_ifr").contents().find("body").length) {
				$("#sc_apply_wrapper > iframe").contents().find("#CoverLetter_ifr").contents().find("body").attr("spellcheck","true");
			}
			else {
				setTimeout( function () { addSpellCheck() }, 300);
			}
		}
		addSpellCheck();
	})(jQuery);
}