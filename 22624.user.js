// ==UserScript==
// @name          hateda_mobile
// @namespace     http://d.hatena.ne.jp/bluerabbit/
// @include       http://d.hatena.ne.jp/*/mobile?*
// ==/UserScript==
(function() {
	var url = window.location.href;
	var user_id = url.split('/')[3];
	var _date = url.split("date=");
	if (_date.length == 1) {
		window.location.href = "http://d.hatena.ne.jp/" + user_id;
	}
	var date = _date[1].toString().substring(0, 8);		
	window.location.href = "http://d.hatena.ne.jp/" + user_id + "/" + date;
})();