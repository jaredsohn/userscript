// ==UserScript==
// @name           LDR - Absolutize
// @namespace      http://iwamot.com/
// @include        http://reader.livedoor.com/reader/
// ==/UserScript==

(function() {
	var w = unsafeWindow || window;
	var _onload = w.onload;
	w.onload = function () {
		_onload();
		main();
	}

	function main() {
		location.href = 'javascript:(' + function() {(function(w) {with (w) {

			// if you use only keyboard shortcuts, should set this false
			var ABSOLUTIZE_TITLE = true;

			// http://www.json.com/2008/04/08/the-future-ajax-wrapper/
			function absoluteUrl(baseUrl, relativeUrl) {
				if (relativeUrl.match(/\w+:\/\//))
					return relativeUrl;
				if (relativeUrl.charAt(0)=='/') {
					baseUrl = baseUrl.match(/.*\/\/[^\/]+/)
					return (baseUrl ? baseUrl[0] : '') + relativeUrl;
				}
					//TODO: handle protocol relative urls:  ://www.domain.com
				baseUrl = baseUrl.substring(0,baseUrl.length - baseUrl.match(/[^\/]*$/)[0].length);// clean off the trailing path
				if (relativeUrl == '.')
					return baseUrl;
				while (relativeUrl.substring(0,3) == '../') {
					baseUrl = baseUrl.substring(0,baseUrl.length - baseUrl.match(/[^\/]*\/$/)[0].length);
					relativeUrl = relativeUrl.substring(3);
				}
				return baseUrl + relativeUrl;
			}

			function resolve_url(url) {
				url = url.replace('http://reader.livedoor.com', '');
				if (/^https?\:/.test(url)) return url;
				var feed = get_active_feed();
				if (!feed) return;
				return absoluteUrl(subs_item(feed.subscribe_id).feedlink, url);
			}

			function absolutize_title(feed, index) {
				if (index >= feed.items.length) return;
				var item = feed.items[index];
				if (/^https?\:/.test(item.link)) return;
				var div_id = 'item_' + item.id;
				if (!$(div_id)) {
					setTimeout(function() {
						absolutize_title(feed, index);
					}, 1000);
					return;
				}
				$(div_id).innerHTML = $(div_id).innerHTML.replace(
					item.link, absoluteUrl(
						subs_item(feed.subscribe_id).feedlink, item.link
					), 'g'
				);
				absolutize_title(feed, index + 1);
			}

			if (ABSOLUTIZE_TITLE) {
				register_hook('after_printfeed', function(feed) {
					absolutize_title(feed, 0);
				});
			}

			Keybind.add('v|ctrl+enter', function() {
				var item = get_active_item(true);
				if (!item) return;
				var url = resolve_url(item.link);
				if (!url) return;
				window.open(url) || message('cannot_popup');
			});

			toggle_pin = function(item_id) {
				var pin_button = $("pin_" + item_id);
				var item = $("item_" + item_id);
				var a = item.getElementsByTagName("a");
				if(!a.length) return;
				var title = a[0].innerHTML;
				var url   = resolve_url(a[0].href);
				if (!url) return;
				if(pin.has(url)){
					pin.remove(url);
					pin_button && removeClass(pin_button, "pin_active");
					removeClass(item, "pinned");
				} else {
					// feed info
					var info = subs_item(State.now_reading);
					pin.add(url,title,info);
					pin_button && addClass(pin_button, "pin_active");
					addClass(item, "pinned");
				}
			}
		}})(this.unsafeWindow || window);}.toString() + ')()';
	}
})();