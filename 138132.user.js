// ==UserScript==
// @name           Google Search
// @author         Lewis Lv
// @namespace      www.jsbug.com
// @description    Open Google searching target page directly
// @include        http://www.google.*/*
// @include        https://www.google.*/*
// ==/UserScript==


function main() {
	var win = (typeof unsafeWindow !== "undefined") ? unsafeWindow : window;

	// execute code below.
	function closest(element, tagName) {
		while (element) {
			try {
				if (element.tagName.toLowerCase() == tagName) {
					return element;
				}
			}
			catch (e) {
				return null;
			}

			try {
				element = element.parentNode;
			}
			catch (e) {
				return null;
			}
		}

		return null;
	};

	var nop = function() {};
	win.document.addEventListener("mousedown", function(event) {
		if (win.rwt !== nop) {
			win.rwt = nop;
		}

		var link = closest(event.target, "a");
		if (link && (/http:\/\/webcache\.googleusercontent\.com\//.test(link.href) ||
					/http:\/\/translate\.google\..+\//.test(link.href))) {
			link.href = link.href.replace(/^http/, "https");
		}
	}, true);
}


// Firefox
if (typeof wrappedJSObject !== "undefined") {
	main();
}
// Chrome
else {
	var script = document.createElement("script");
	script.appendChild(document.createTextNode("(" + main + ")();"));
	(document.body || document.head || document.documentElement).appendChild(script);
}
