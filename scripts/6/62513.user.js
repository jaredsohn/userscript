// ==UserScript==
// @name       Friendly GameTrailers.com
// @namespace  http://gm.forge12.com
// @include    http://www.gametrailers.com/video/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// ==/UserScript==
try {
	$(function() {
		try {

			// Embed the video
			var so = unsafeWindow.so;
			so.addParam('autoPlay', 'false');
			var o = so.variables;
			o.CONFIG_URL = o.CONFIG_URL.replace(/(autoplay)=true/i,'$1=false');
			o.CONFIG_URL = o.CONFIG_URL.replace(/(%26(prerollOption|siteNameInAdTags|impressiontype|ssc|testmode)=(.*?)(?=%26|$))|%26$/gi, '');
			so.write($('div.MovieLayer div, div#MovieLayer div').attr('id'));
		} catch (ex) { }
	});
} catch (ex) { }