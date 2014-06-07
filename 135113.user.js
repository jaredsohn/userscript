// ==UserScript==
// @name        TorrentLink
// @namespace   TorrentLink
// @description bring link to torrent file back
// @include     http://thepiratebay.se/search/*
// @version     1.01
// @require 	http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==

(function($){
	$('div.detName').each(function(){
		var wrapper = $(this);
		var href = '//torrents.thepiratebay.se/'+ wrapper.find('a').attr('href').replace('/torrent/','')+ '.torrent';
		wrapper.after($('<a>').attr('href', href).append('<img src="http://dl.dropbox.com/u/7556017/torrent.png" alt="downlad torrent"/>'));
	});
})(jQuery);