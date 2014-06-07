// ==UserScript==
// @name          Native video player
// @namespace     http://dmitriy.geels.googlepages.com/
// @description   Watch flash video embeds with MPlayer/Xine/VLC
// @include       *beerbottle.ru/*
// @include       *blogs.mail.ru/*
// @include       *doseng.org/*
// @include       *li.ru/*
// @include       *life.ru/*
// @include       *lj-toys.com/*
// @include       *lj-toys.ru/*
// @include       *maniacworld.com/*
// @include       *news2.ru/story/*
// @include       *nnm.ru/*
// @include       *rutube.ru/*
// @include       *video.google.com/videoplay*
// @include       *voffka.com/*
// @include       *yaplakal.com/*
// ==/UserScript==

var mimetype = 'video/flv';
// embed height adjust value for totem plugin
var controls_height = 27;

var players = document.getElementsByTagName('embed');
GM_log(players.length);

if(players.length > 0) {
	var fmt = '';
	var playerQueue = {};
	var format = GM_getValue('mplayer_format', 'default');
	switch (format) {
	  case '6':
		if (video_info.fmt_map) {
		  fmt = '&fmt=6';
		  break;
		}
	  case '18':
		fmt = '&fmt=18';
		break;
	}
	GM_registerMenuCommand('YouTube: ~200kpbs mono', function() {
	  GM_setValue('mplayer_format', 'default');
	  location.reload();
	});

	GM_registerMenuCommand('YouTube: ~512kbps stereo', function() {
	  GM_setValue('mplayer_format', '18');
	  location.reload();
	});
/*
	GM_registerMenuCommand('YouTube: ~900 kbps mono', function() {
	  GM_setValue('mplayer_format', '6');
	  location.reload();
	});
*/
	for(i=players.length-1; i >= 0; i--) {
		var player = players[i];
		var src = player.src;
			GM_log(src);
		if(!src) continue;

		if(src.indexOf('rutube.ru') != -1) {
			var url = false;
			//we're on rutube
			if(document.location.hostname.indexOf('rutube.ru') != -1) {
				var tmp = player.getAttribute('flashvars');
				if(tmp) tmp = tmp.match(/file=([\w\.%]+)\&/);
				if(tmp[1]) url = unescape(tmp[1]);
			//or elsewhere
			} else {
				var tmp = src.match(/video\.rutube\.ru\/(\w+)/);
				if(tmp[1])
					url = 'http://bl.rutube.ru/' + tmp[1] + '.iflv';
			}
			if(url)
				replaceObject(player, url);
		} else if(src.indexOf('img.mail.ru/r/video/player_full_size.swf') != -1) {
			var tmp = src.match(/par=(.+)$/);
			if(!tmp[1]) continue;

			var url = tmp[1].replace(/^(http:\/\/video\.mail\.ru\/.+)\/\$(\d+)\$\d+\$\d+$/, "$1/v-$2.flv");
			replaceObject(player, url);
		} else if(document.location.hostname.indexOf('google.com') != -1) {
			var url = src.match(/.+videoUrl=([^&]+)&.+$/);
			GM_log(url);
			if(!url[1]) continue;
			url = unescape(url[1]);

			replaceObject(player, url);
		} else if(document.location.hostname.indexOf('maniacworld.com') != -1) {
			var tmp = player.getAttribute('flashvars');
			tmp = tmp.match(/file=([^&]+)(?:&|$)/);
			if(!tmp[1]) continue;

			var off = document.location.href.lastIndexOf('/');
			var url = document.location.href.substr(0, off+1) + tmp[1];
			replaceObject(player, url);
		} else if(src.indexOf('yapfiles.ru') != -1) {
			var tmp = src.match(/file=([^&]+)(?:&|$)/);
			if(!tmp[1]) continue;

			var url = tmp[1];
			replaceObject(player, url);
		} else if(src.indexOf('blogger.com') != -1) {
			var tmp = src.match(/videoUrl=([\w\.%\-_]+)&/);
			if(!tmp[1]) continue;

			var url = unescape(tmp[1]);
			replaceObject(player, url);
		} else if(src.indexOf('youtube') != -1) {
			var key = src.match(/youtube\.\w+\/v\/([\w\-]+)(?:&|$)/);
			if(!key[1]) continue;
			key = key[1];

			playerQueue[key] = player;
			var tmp = {
					'method': 'GET',
					'url': src,
					'onload': function(responseDetails) {
						var url = false;
						if(responseDetails.status == 200) {
							url = responseDetails.finalUrl;
						} else if (responseDetails.status == 302 || responseDetails.status == 303) {
							url = responseDetails.responseHeaders.match(/Location: ([^\n]*)\n/);
							if(url[1]) url = url[1];
							else url = false;
						}
						if(!url) return;

						var tmp = url.match(/youtube\..+video_id=([\w\-]+)&.+t=([\w\-]+)&?.*$/);
						if(tmp[1] && tmp[2]) {
							url = 'http://youtube.com/get_video?video_id=' + tmp[1] + '&t=' + tmp[2] + fmt;
							replaceObject(playerQueue[tmp[1]], url);
							delete playerQueue[tmp[1]];
						}
					}
				};
			GM_xmlhttpRequest(tmp);
		} else if(src.indexOf('myvi.ru') != -1) {
			var key = src.match(/myvi\.ru\/\w+\/\w+\/\w+\/([\w\-]{22})[\w\-]+$/);
			if(!key[1]) continue;
			key = key[1];

			playerQueue[key] = player;
			var tmp = {
					'method': 'GET',
					'url': src,
					'onload': function(responseDetails) {
						var url = false;
						if(responseDetails.status == 200) {
							url = responseDetails.finalUrl;
						} else if (responseDetails.status == 302 || responseDetails.status == 303) {
							url = responseDetails.responseHeaders.match(/Location: ([^\n]*)\n/);
							if(url[1]) url = url[1];
							else url = false;
						}
						if(!url) return;

						var tmp = url.match(/myvi\.ru.+\?(c=[\w\-]+)(?:&.+)?&v=(\d+)(?:&.+)?&m=([\w\-\.\/%]+)(?:$|\/)/);
						if(tmp[1] && tmp[2] && tmp[3]) {
							url = unescape(tmp[3]) + tmp[2] + '.flv?' + tmp[1];
							var key = tmp[1].substr(2, 22);
							replaceObject(playerQueue[key], url);
							delete playerQueue[key];
						}
					}
				};
			GM_xmlhttpRequest(tmp);
		} else if(src.indexOf('life.ru') != -1) {
			var tmp = player.getAttribute('flashvars');
			if(!tmp) continue;
			tmp = tmp.match(/cfgurl=(.+)$/);
			if(!tmp[1]) continue;
			src = 'http://life.ru' + tmp[1];
			var key = src.match(/media\/video\/\w+\/(\w{32})\..+$/);
			if(!key[1]) continue;
			key = key[1];

			playerQueue[key] = player;
			var tmp = {
					'method': 'GET',
					'url': src,
					'onload': function(responseDetails) {
						var url = false;
						if(responseDetails.status == 200) {
							url = responseDetails.finalUrl;
						} else if (responseDetails.status == 302 || responseDetails.status == 303) {
							url = responseDetails.responseHeaders.match(/Location: ([^\n]*)\n/);
							if(url[1]) url = url[1];
							else url = false;
						}
						if(!url) return;

						var key = url.match(/media\/video\/\w+\/(\w{32})\..+$/);
						if(key[1]) {
							key = key[1];
							var tmp = responseDetails.responseText.match(/video=['"](\/media\/video\/\w+\/\w{32}\.flv)['"]/);
							if(tmp && tmp[1]) {
								url = 'http://life.ru' + tmp[1];
								replaceObject(playerQueue[key], url);
							}
							delete playerQueue[key];
						}
					}
				};
			GM_xmlhttpRequest(tmp);
		}
	}
}

function replaceObject(embed, src) {
	var width = embed.width;
	var height = parseInt(embed.height) + controls_height;
	var parent = embed.parentNode;
	if(parent && parent.tagName == 'OBJECT') {
		embed = parent;
		parent = parent.parentNode;
	}
	if(!parent) return false;

	var new_embed = document.createElement('object');
	new_embed.setAttribute('width', width);
	new_embed.setAttribute('height', height);
	new_embed.setAttribute('loop', 'no');
	new_embed.setAttribute('autoplay', 'no');
	new_embed.setAttribute('type', mimetype);
	new_embed.setAttribute('data', src);

	parent.replaceChild(new_embed, embed);
	return true;
}
