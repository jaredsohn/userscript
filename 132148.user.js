// ==UserScript==
// @name           Nice Popups
// @namespace      fr.kergoz-panic.watilin
// @version        1.0.1
// @description    Removes archaic popup features like "resizable", "menurbar", "toolbar", etc.
// @include        *
// @run-at         document-start
// @grant          unsafeWindow
//
// @license        Public Domain
// ==/UserScript==

unsafeWindow.open = function open( url, target, features ){
	// "features" argument will be ignored
	return window.open(url, target);
};
