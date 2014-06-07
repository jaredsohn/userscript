// ==UserScript==
// @name           Muxtape 2.0
// @namespace      http://muxtape.com/
// @description    Notify current song by Growl for fluidapp
// @include        http://*.muxtape.com/*
// @author         YungSang
// @version        2.2
// ==/UserScript==
// v2.0 : 2008.06.30 : for new Muxtape System
// v2.1 : 2008.06.30 : Resume a song on reload
// v2.2 : 2008.07.04 : Fix descriptions to notify

(function() {
	if (typeof fluid == 'undefined') return;

	var title = $$('.flag h1')[0].get('html').replace('&amp;','&').trim();

	var all_keys = [];
	$$('.stripe').each(function(li) {
		all_keys.push(li.getProperty('id').substring(6));
	});

	var _Cutter_loadStarted = Cutter_loadStarted;
	window.Cutter_loadStarted = function(song_key) {
		_Cutter_loadStarted(song_key);

		location.hash = '#' + song_key;

		var description = $$('#stripe' + song_key + ' .name')[0].get('html').replace('&amp;','&').trim()
		description = description.replace(/<[^>]+>/g, '');

		fluid.showGrowlNotification({
			title: title,
			description: description,
			priority: 0,
			sticky: false,
			identifier: song_key,
			onclick: function(){}
		});
		fluid.dockBadge = (all_keys.indexOf(song_key) + 1) + ' / ' + all_keys.length;
	};

	var _Cutter_finishedPlaying = Cutter_finishedPlaying;
	window.Cutter_finishedPlaying = function(song_key) {
		_Cutter_finishedPlaying(song_key);

		fluid.dockBadge = '';
		if (song_key == all_keys[all_keys.length - 1]) {
			setTimeout(function() {
				location.hash = '#' + all_keys[0];
				location.reload();
			}, 0);
		}
	};
})();
