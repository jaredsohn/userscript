// ==UserScript==
// @name           GoogleDocsBG
// @namespace      GoogleDocsBG
// @description    GoogleDocs "Writer mode" - set background to MS Word blue gradient
// @include        http*://docs*.google.com/document/*
// ==/UserScript==


(function () {

	changeBGColor();

	/*
	// Capture F11 and before switching to the fullscreen mode run View > Hide Controls and change colors
	// But it doesn't work in Chrome right now
	// And I have yet to find out how to call Hide Controls from that minified mess

	document.addEventListener('keydown', function (e) {
		if (e.which === 122) {
			changeBGColor();
			return false;
		}
	}, true);
	*/

	function changeBGColor() {
		setCSSbyClass('kix-appview-editor', 'background', '-webkit-gradient(linear, left top, left bottom, from(#9dbce5), to(#6490c9))');
		setCSSbyClass('kix-appview-editor', 'background', '-moz-linear-gradient(top, #9dbce5, #6490c9)');

		setCSSbyClass('kix-ruler kix-unprintable', 'background', '#9dbce5');

		setCSSbyClass('kix-noteviewmanager-fade1', 'background', '#9dbce5');
		setCSSbyClass('kix-noteviewmanager-fade2', 'background', '#9dbce5');
		setCSSbyClass('kix-noteviewmanager-fade3', 'background', '#9dbce5');
	}

	function setCSSbyClass(cl, prop, val) {
		var 	els = document.getElementsByClassName(cl),
			len = els.length,
			el, i;

		for (i = 0; i < len; i++) {
			el = els[i];
			el && (el.style[prop] = val);
		}
	}

}) ();