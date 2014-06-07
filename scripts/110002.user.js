// ==UserScript==
// @name           Google Image
// @author         Lewis Lv
// @namespace      www.jsbug.com
// @description    Open images of Google searching directly
// @include        http://www.google.*/*tbm=isch*
// @include        http://www.google.*/*tbs=sbi*
// @include        http://www.google.*/imgres?*
// @include        http://images.google.*/*tbm=isch*
// @include        http://images.google.*/*tbs=sbi*
// @include        http://images.google.*/imgres?*
// @include        https://www.google.*/*tbm=isch*
// @include        https://www.google.*/*tbs=sbi*
// @include        https://www.google.*/imgres?*
// @include        https://images.google.*/*tbm=isch*
// @include        https://images.google.*/*tbs=sbi*
// @include        https://images.google.*/imgres?*
// ==/UserScript==

function main() {
	var win = (typeof unsafeWindow !== "undefined") ? unsafeWindow : window;

	if (win.location.pathname === "/imgres") {
		win.location.href = win.document.getElementById("il_fi").src;
	}
	else {
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
		}

		win.document.addEventListener("mousemove", function(event) {
			event.stopPropagation();
		}, true);

		win.document.addEventListener("mouseover", function(event) {
			event.stopPropagation();
		}, true);

		win.document.addEventListener("click", function(event) {
			var link = closest(event.target, "a");
			if (link && /imgurl=/.test(link.href)) {
				link.target = "_blank";
				link.href = unescape(link.href.replace(/.*?imgurl=([^&]*)&.*/i, "$1").replace(/([^&]*)&.*/i, "$1"));
				event.stopPropagation();
			}
		}, true);
	}
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