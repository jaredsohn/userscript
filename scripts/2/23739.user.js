// ==UserScript==
// @name           LDR - Clear Deduped Style
// @namespace      http://iwamot.com/
// @include        http://reader.livedoor.com/reader/*
// @version        1.1.0
// ==/UserScript==

(function(){
	const KEY_TOGGLE_ITEM = 'R';
	const KEY_TOGGLE_FEED = 'E';

	window.addEventListener('load', onLoad, false);

	function onLoad(){
		unsafeWindow.Keybind.add(KEY_TOGGLE_ITEM, function(){
			var item_element = getActiveItemElement();
			if (!item_element) return;
			unsafeWindow.toggleClass(item_element, 'LDE_displayed');
		});

		unsafeWindow.Keybind.add(KEY_TOGGLE_FEED, function(){
			var feed = unsafeWindow.get_active_feed();
			if (!feed) return false;

			var item_element = getActiveItemElement();
			if (!item_element) return false;

			var do_clear = unsafeWindow.hasClass(item_element, 'LDE_displayed');

			feed.items.forEach(function(item){
				var item_element = getItemElementById(item.id);
				if (!item_element) {
					var self = arguments.callee;
					setTimeout(function() {self(item);}, 500);
					return;
				}

				if (do_clear) {
					unsafeWindow.removeClass(item_element, 'LDE_displayed');
				} else {
					unsafeWindow.addClass(item_element, 'LDE_displayed');
				}
			});
		});
	}

	function getActiveItemElement() {
		var item = unsafeWindow.get_active_item(true);
		if (!item) return false;
		return getItemElementById(item.item_id);
	}

	function getItemElementById(item_id) {
		return unsafeWindow.$('item_' + item_id);
	}
})();
