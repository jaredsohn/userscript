// ==UserScript==
// @name           Free bilibili
// @author         DickyT
// @namespace      http://userscripts.org/scripts/show/485808
// @description    Replace extrenal player to original player
// @icon           http://www.bilibili.tv/favicon.ico
// @include        http://www.bilibili.tv/video/av*
// @include        http://bilibili.kankanews.com/video/av*
// @updateURL      https://userscripts.org/scripts/source/485808.meta.js
// @downloadURL    https://userscripts.org/scripts/source/485808.user.js
// @grant          GM_xmlhttpRequest
// @grant          GM_openInTab
// @version        0.5
// ==/UserScript==

$(document).ready(function() {
	refresh_btn = $('<i/>', {
		class: 'fa fa-refresh'
	}).click(function() {
		$('div.free-bilibili-controler > i:first-child').addClass('fa-spin');
		$.reload_player();
	});

	$('<div/>', {
		class: 'free-bilibili-controler'
	}).append(refresh_btn).append($('<p/>', {
		text: '刷新播放器'
	})).appendTo('div.viewbox');

	$.preload_player = function() {
		$('.scontent#bofqi').empty();
		
		$('<iframe/>', {
			class: 'player',
			src: 'https://secure.bilibili.tv/secure,cid=' + flashvars.cid + '&aid=' + aid,
			scrolling: 'no',
			border: '0',
			frameborder: 'no',
			framespacing: '0'
		}).load(function() {
			$(window).attr('securePlayerFrameLoaded', true);
			setTimeout(function() {
				$('div.free-bilibili-controler > i:first-child').removeClass('fa-spin');
			}, 450);
		}).attr('height', '482').attr('width', '950').appendTo('.scontent#bofqi');
	};

	$.reload_player = function() {
		$('.scontent#bofqi').empty();
		
		$('<embed/>', {
			id: 'bofqi_embed',
			style: 'width:100%;height:590px;',
			pluginspage: 'http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash',
			allowfullscreeninteractive: 'true',
			flashvars: 'cid=' + flashvars.cid + '&aid=' + aid,
			src: 'https://static-s.bilibili.tv/play.swf',
			type: 'application/x-shockwave-flash',
			allowscriptaccess: 'always',
			allowfullscreen: 'true',
			quality: 'high'
		});
	};

	$('<link/>', {
		'rel': 'stylesheet',
		'href': '//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css'
	}).appendTo('head');

	$('<style/>').attr('id', 'freebilibili').html('.free-bilibili-controler{text-align:center;color:black;position:absolute;margin-left:100%;top:250px;width:100px;height:100px}.free-bilibili-controler>i:first-child{font-size:100px}').appendTo('head');
	
	$.getScript('http://cdn.bootcss.com/twitter-bootstrap/3.0.3/js/bootstrap.min.js');

	if ($('a[card]').attr('href') == 'http://space.bilibili.tv/928123') {
		$.preload_player();
	}
});