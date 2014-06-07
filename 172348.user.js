// ==UserScript==
// @name YouTube URL Cleaner
// @author Robin Zalek (BtEO)
// @version 1.0
// @include http://*youtube.com/*
// @include https://*youtube.com/*
// ==/UserScript==



//var youtubeChannelRegex = /user\/[^#]+(?:#p\/([aufp])|$)/i;
//var youtubeChannelRegex = /\/(?:user\/)?(?!watch)[^#\n]+(?:#p\/([aufp]))?/i;
//var youtubeChannelRegex = /^\/(?:watch|channels|playlist|videos|shows|movies|my_videos|my_subscriptions|my_history|my_watch_later_list|inbox|account)?$/i;
//else if (!(location.pathname.match(youtubeChannelRegex))) {
//	// opera.postError(!(location.pathname.match(youtubeChannelRegex)));
//	if (location.hash && location.hash.match(/#p/i)) location.replace(location.href.replace('#p/', '#g/'));
//	else if (!(location.hash))location.replace(location.href + '#g/u');
//}

(function () {
	var result;
	
	if (location.hostname.match(/^(?:(?:www|br|fr|ie|it|jp|mx|nl|pl|es|uk|de)\.)?youtube.com$/) && location.search.match(/v=[A-Za-z0-9-_]+/)) {
		var youtubeFeaturesRegex, youtubeFeatures = '';

		youtubeFeatures = '(.*?)(?:' +

		                          '&?feature=(?:' +
		                          'channel_page' +
		                          '|channel' +
		                          '|player_embedded' +
		                          '|player_detailpage' +
		                          '|related' +
		                          '|fvw' +
		                          '|BFa' +
		                          '|youtube_gdata(?:_player)?' +
		                          '|youtu\\.be' +
		                          '|rec-[\\w\\-+]+' +
		                          '|plpp_video' +
		                          '|relmfu' +
		                          '|plcp' +
		                          '|plpp' +
		                          '|watch_response(?:_rev)?' +
		                          ')' +

		                          '|&?eurl=[^&]+' +

		                          '|&?context=[^&]+' +

		                          '|&?list=[^&]+(?:&index=\\d+)?' +

		                          ')(?:&(?=v=))?(.*)?';

		var youtubeFeaturesRegex = new RegExp(youtubeFeatures, 'i');
		if (result = location.href.match(youtubeFeaturesRegex)) location.replace(result[1] + result[2]);
	}
})();