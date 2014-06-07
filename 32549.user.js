// ==UserScript==
// @name        Force Qualifier Language
// @namespace   http://kathar.in
// @description Forces qualifiers to be in your native language.
// @include     http://www.plurk.com/*
// @author      Katharine Berry
// ==/UserScript==

(function () {
	// We need to use the unsafeWindow to bypass GreaseMonkey security measures.
	// Said measures are unnecessary here.
	// To make GreaseKit happy as well, we use the standard 'window' object if unsafeWindow doesn't exist.
	var win = window;
	if(typeof(unsafeWindow) != 'undefined') win = unsafeWindow;
	 if(!win.Plurks) return; // Check we're on the right page.
	// Override the Plurk renderer.
	win.Plurks.Lang_Forced_orig_renderPlurk = win.Plurks.renderPlurk;
	win.Plurks.renderPlurk = function(plurkData, isReply) {
		plurkData.lang = win.GLOBAL.session_user.default_lang;
        var plurk = win.Plurks.Lang_Forced_orig_renderPlurk(plurkData, isReply);
        return plurk;
	};
})();

/* Useful plurk thingies:
 * Plurks.renderPlurk(plurkData, isReply)
 * - Renders a plurk
 */