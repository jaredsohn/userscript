// ==UserScript==
// @name           Google Real Link
// @namespace      http://userscripts.org/scripts/show/125473
// @description    Disable the Google search rewrite, always showing and using the real, original, direct link URLs, to stop being tracked, also to prevent from using redirected pages that might be temporarily unavailable in some area. See: http://userscripts.org/scripts/show/125473
// @include        http://www.google.*/*
// @include        https://www.google.*/*
// @include        https://encrypted.google.*/*
// @updateURL      https://userscripts.org/scripts/source/125473.meta.js
// @downloadURL    https://userscripts.org/scripts/source/125473.user.js
// @version        1.1
// @author         tomchen1989
// @license        MIT/Expat license
// ==/UserScript==
function addEventCompatible(obj, evt, fn){
	if (obj.addEventListener) {//W3C
		obj.addEventListener(evt, fn, false);
	} else if (obj.attachEvent) {//IE
		obj.attachEvent("on" + evt, fn);
	}
}
function getWindow(windowObjName) {//works after window[windowObjName] loaded
	if (typeof(unsafeWindow) !== "undefined" && typeof(unsafeWindow[windowObjName]) !== "undefined") {//Greasemonkey
		return unsafeWindow;
	} else if (typeof(window[windowObjName]) !== "undefined") {//Opera, etc.
		return window;
	} else {
		try {//Google Chrome
			var div = document.createElement("div");
			div.setAttribute("onclick", "return window;");
			var windowCompatible = div.onclick();
			if (typeof(windowCompatible[windowObjName]) === "undefined") {
				return false;
			} else {
				return windowCompatible;
			}
		} catch (e) {
			return false;
		}
	}
}
addEventCompatible(window, "load", function() {
	if (getWindow("rwt")) {
		getWindow("rwt").rwt = function () {}
	}
})