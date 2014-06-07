// ==UserScript==
// @name          vkach
// @namespace     https://github.com/dizel3d/
// @description   vkontakte.ru content downloader
// @author        Valentin Sarychev <dizel3d@gmail.com>
// @copyright     Valentin Sarychev, 2011
// @include http://vkontakte.ru/*
// @include http://vk.com/*
// ==/UserScript==

;(function() {
	// for browsers without @include directive supporting
	if (!location.hostname.match("^(vkontakte\.ru|vk\.com)$")) {
		return;
	}

	/**
	 * Function for injection of javascript file to the document.
	 * @param src script source
	 */
	var script_load = function(src) {
		// solve document.head problem
		if (document.head === undefined) {
			document.head = document.getElementsByTagName('head')[0];
		}

		if (!window.document || !document.head) {
			return setTimeout(function(){script_load(src)}, 1);
		}
		var elem = document.createElement("script");
		elem.setAttribute("src", src);
		elem.setAttribute("type", "text/javascript");
		document.head.appendChild(elem);
	}

	// loading scripts
	script_load((typeof(GM_getValue) !== 'undefined' && GM_getValue("path") || "https://raw.github.com/dizel3d/vkach/build") + "/vkach.js");

	// GM script commands
	if (typeof(GM_registerMenuCommand) !== 'undefined') {
		GM_registerMenuCommand("Dev mode", function() {
			// get new configuration
			var elem = document.getElementById("post_field");
			if (!elem) {
				alert("There is no configuration");
				return;
			}

			GM_setValue("path", elem.value);
			location.reload();
		});
		GM_registerMenuCommand("User mode", function() {
			GM_deleteValue("path");
			location.reload();
		});
	}
})();

