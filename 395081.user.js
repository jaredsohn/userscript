// ==UserScript==
// @name Audio Latino RemoveDownloadPopupAdFly alt-torrent
// @match http://alt-torrent.com/movie/*
// ==/UserScript==

(function () {

$(document).ready(function() {
	var

	id = $('div[id^="star_"][class*="star"]').attr('id').substr(5),

	download_ = function (code) {
		$.get('/ajax/download.html', {id: id, code: code},
			function (data) {
				var url = window.prompt('Torrent:', data.replace(/^http.+http/, 'http'));
				if (url) window.location = url;
			}
		);
	},

	torrent_ = function () { download_(1); },

	magnet_ = function () { download_(0); };

	$('button[onclick="torrent();"]').attr('onclick', '').off('click').on('click', torrent_);
	$('button[onclick="magnet();"]').attr('onclick', '').off('click').on('click', magnet_);
});

})();