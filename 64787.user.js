// ==UserScript==
// @name           PinAllCommand
// @namespace      http://whym.github.com
// @description    Type 'A' to mark all items. Type 'R' to reverse marked/unmarked. Requires Minibuffer & LDRize.
// @include        *
// @version        0.0.1
// ==/UserScript==

(function() {

	const COMMAND_PINALL  = 'pin-all';
	const COMMAND_PININV  = 'pin-invert';
	const KEY_PINALL      = 'A';
	const KEY_PININV      = 'R';

var boot = function() {
	var $X = window.Minibuffer.$X;
	var D  = window.Minibuffer.D;

	window.Minibuffer.addShortcutkey({
		key: KEY_PINALL,
		description: 'Pin all items in screen',
		command: function() {
			window.Minibuffer.execute('all-node | clear-pin | set-pin');
		}
	});

	window.Minibuffer.addShortcutkey({
		key: KEY_PININV,
		description: 'Invert pinned-ness in screen',
		command: function() {
			window.Minibuffer.execute('all-node | toggle-pin');
		}
	});
};

	if (document.body.id == 'tinymce')
		return;

	if (window.Minibuffer) {
		boot();
	} else {
		window.addEventListener('GM_MinibufferLoaded', boot, false);
	}

})();
