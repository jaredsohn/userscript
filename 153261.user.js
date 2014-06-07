// ==UserScript==
// @name イニシエリプレイ
// @description イニシエダンジョンの検索窓からログのリプレイができます
// @version 1.0.3
// @namespace http://userscripts.org/users/344441/scripts/inishie-replay
// @match http://inishie-dungeon.com/*
// @updateURL http://userscripts.org/scripts/source/153261.meta.js
// @downloadURL https://userscripts.org/scripts/source/153261.user.js
// ==/UserScript==
(function () {
	var searchBox = document.getElementById('search_box');
	if (!searchBox) {
		return;
	}

	var code = function () {
		var origSearch = window.search;
		var searchBox = document.getElementById('search_box');
		if (!origSearch || !searchBox || !window.replaySend) {
			return;
		}
		function getReplayId() {
			var query = searchBox.value;
			var match = query.match(/(?:^\s*|=)(\d+)\s*$/);
			return match ? match[1] : null;
		}
		var searchTip = document.getElementById('search_tip');
		if (searchTip) {
			searchTip = searchTip.getElementsByClassName('tip_text')[0];
			if (searchTip) {
				var searchTipDefault = searchTip.textContent;
				searchBox.addEventListener('keyup', function () {
					searchTip.textContent = getReplayId() ? "リプレイ" : searchTipDefault;
				}, false);
			}
		}
		window.search = function () {
			if (searchBox) {
				var id = getReplayId();
				if (id) {
					searchBox.value = id;
					window.replaySend(id);
					return;
				}
			}
			origSearch();
		};
	};

	// http://stackoverflow.com/questions/10485992/hijacking-a-variable-with-a-userscript-for-chrome
	var script = document.createElement('script');
	script.textContent = '(' + code + ')()';
	(document.head||document.documentElement).appendChild(script);
	script.parentNode.removeChild(script);
})();
