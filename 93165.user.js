// ==UserScript==
// @name        HootSuite Growl
// @namespace   http://hootsuite.com/
// @description Growl notification (Fluid SSB only)
// @include     http://hootsuite.com/*
// @version     1.1.0
// ==/UserScript==

(function () {
    if (!window.fluid) return;
	var settings = {};

	/**
	 * Mute Settings.
	 * Disable notifications for certain stream boxes or certain usernames.
	 * Each value must be a space-separated list.
	 *  boxId: a number which identify the stream box. (Right-click on the element and inspect it, the id like "box********" can be found.)
	 *  name: twitter screenname.
	 *
	 * ミュート設定
	 * 通知を行わないストリーム及びユーザー名を指定する
	 * スペース区切りで複数指定可
	 *  boxId: ストリームを識別する数字列 (ストリームを右クリックし「Inspect Element」を選ぶと、画面内に「box********」という数字列を伴った形式のID属性が見つかるはず)
	 *  name: Twitterのユーザー名
	 */
	//settings.muted_boxId = '12345678 12345679'; // example
	//settings.muted_name = 'username1 username2 username3'; // example
	settings.muted_boxId = '';
	settings.muted_name = '';


	/* -------------------------------------------------------- */

	var ar_boxId = (settings.muted_boxId || '').split(' ');
	var ar_name = (settings.muted_name || '').split(' ');

	$(document).bind('hsRefreshBoxDone', function(event, boxId, refreshType, data) {
		if (refreshType !== 'new' || data.count === 0) return;
		if (ar_boxId.indexOf(boxId + '') >= 0) return;

		data.viewData.messages.forEach(function(e) {
			if (ar_name.indexOf(e.user.screen_name) >= 0) return;

			var text = $('<div />').html(e.text).text().replace(/\s/g, ' '); // unescape html and remove line-break
			fluid.showGrowlNotification({
				title: e.user.screen_name,
				description: text,
				sticky: false,
				icon: e.user.profile_image_url
			});
		});
	});

})();