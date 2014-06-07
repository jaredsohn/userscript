// ==UserScript==
// @name Free Youtube!
// @namespace http://singpolyma.net/
// @version 1.9.12
// @description  Install and then use YouTube as normal, only without the flash.  Plays videos with your local MP4/FLV/WebM-capable media player (VLC recommended).  Some support for embed codes and other sites (Vimeo, Google Video, blip.tv, academicearth.org,  lastampa.it). 
// @include http://*.youtube.com/watch*
// @include http://*.vimeo.com/*
// @include http://*blip.tv/*
// @include http://video.google.com/videoplay*
// @include http://academicearth.org/lectures/*
// @include http://*.rai.tv/dl/*
// @include https://*.youtube.com/watch*
// @include https://*.vimeo.com/*
// @include https://*blip.tv/*
// @include https://video.google.com/videoplay*
// @include https://academicearth.org/lectures/*
// @include https://*.rai.tv/dl/*
// @include *
// ==/UserScript==

/*
Copyright (c) 2009-2010, Stephen Paul Weber <singpolyma.net>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/

if(typeof(unsafeWindow) == 'undefined') {
	this.unsafeWindow = window;
}

toremove = [];
lock = false;

function videoReplaceHTML(videourl, type, download, downloadtype, downloadlabel) {
	if(!type) type = 'video/flv';
	if(!download) download = videourl;
	if(!downloadtype) downloadtype = type;
	if(!downloadlabel) downloadlabel = 'Download';
	return '<object type="'+type+'" data="'+videourl+'" width="500" height="400"><param name="autoplay" value="false" /><param name="autoStart" value="0" /><param name="src" value="'+videourl+'" />Your browser doesn\'t seem to support this video, please use the download link below.</object>'
		+ '<a id="__fyt_download" type="'+downloadtype+'" style="display:block;text-align:center;font-size:2em;margin:1em;" href="'+download+'" rel="enclosure">'+downloadlabel+'</a>';
}

function embedLink(node, linkurl) {
	var link = document.createElement('a');
	link.href = linkurl;
	link.rel = 'enclosure';
	link.style.display = 'block';
	link.style.padding = '1em';
	link.style.border = '1px solid black';
	link.style.textAlign = 'center';
	link.style.maxWidth = '25em';
	link.innerHTML = 'Click for video';
	node.parentNode.insertBefore(link, node);
	toremove.push(node);
}

function embed_codes(objects) {
		for(var i = 0; i < objects.length; i++) {
			var linkurl = false;
			var data = objects[i].src || objects[i].data;
			var ytid = data.match(/youtube\.com\/v\/([^\&]+)/);
			var vimeoid = data.match(/vimeo\.com\/[^\?]+\?clip_id=([^\&]+)/);
			var blipid = data.match(/blip\.tv\/play\/.+$/);
			var wpid = data.match(/v\.wordpress\.com\/([^\/\&?#]+)/);
			var flowplayer = data.match(/flowplayer/);

			if(objects[i].parentNode.nodeName == "OBJECT")
				var o = objects[i].parentNode;
			else
				var o = objects[i];

			if(ytid && ytid[1]) {
				ytid = ytid[1];
				linkurl = 'https://youtube.com/watch?v=' + ytid;
			} else if(vimeoid && vimeoid[1]) {
				vimeoid = vimeoid[1];
				linkurl = 'https://vimeo.com/' + vimeoid;
			} else if(blipid) {
				GM_xmlhttpRequest({
					method: 'GET',
					url: objects[i].src,
					onload: function(responseDetails) {
						GM_xmlhttpRequest({
							method: 'GET',
							url: unescape(responseDetails.finalUrl.match(/file=([^\&]+)\&/)[1]),
							onload: function(responseInner) {
								linkurl = responseInner.responseText.match(/<item>[^\f]+<link>(.+)<\/link>/)[1];
								embedLink(o, linkurl);
								o.parentNode.removeChild(o);
							}
						});
					}
				});
			} else if(flowplayer) {
				var config = eval('(' + objects[i].getAttribute('flashvars').match(/^config=(\{.+\})$/)[1] + ')');
				var div = document.createElement('div');
				div.innerHTML = videoReplaceHTML(config.playlist[1].url, 'video/mp4');
				o.parentNode.insertBefore(div, o);
				toremove.push(o);
			} else if(wpid) {
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'https://v.wordpress.com/wp-content/plugins/video/video-xml.php?guid=' + wpid[1],
					onload: function(responseDetails) {
						var videourl = responseDetails.responseText.match(/movie_file>([^<]+)</)[1];

						o.innerHTML = videoReplaceHTML(videourl);
					}
				});
			} else if(o.getAttribute('flashvars')) {
				var videourl = o.getAttribute('flashvars').match(/file=(.+)/)[1];
				if(videourl) {
					var div = document.createElement('div');
					div.innerHTML = videoReplaceHTML(videourl);
					o.parentNode.insertBefore(div, o);
					toremove.push(o);
				}
			}

			if(linkurl) {
				embedLink(o, linkurl);
			}
		}
}

function init() {
	if(lock) return;
	lock = true;
	/* YOUTUBE */
	if(window.location.href.match(/youtube.com\/watch/)) {
		/* Some code from https://www.userscripts.org/scripts/show/25105 */
		var html = document.getElementById('watch-player').innerHTML;
		var videoFormats = html.match(/(?:"|\&amp;)url_encoded_fmt_stream_map=([^(\&|$)]*)/)[1];

		// parse fmt_url_map
		var sep1='%2C', sep2='%26', sep3='%3D';
		if (videoFormats.indexOf(',')>-1) {
			sep1=',';
			sep2='\\u0026';
			sep3='=';
			if (videoFormats.indexOf('&')>-1) {
				sep2='&';
			}
		}

		var videoURL = {};
		var videoFormatsGroup = videoFormats.split(sep1);
		for (var i = 0; i < videoFormatsGroup.length; i++){
			var videoFormatsElem = videoFormatsGroup[i].split(sep2);
			var url = videoFormatsElem[0].split(sep3)[1];
			var itag = videoFormatsElem[4].split(sep3)[1];
			videoURL[itag] = unescape(unescape(url)).replace(/\\\//g,'/').replace(/\\u0026/g,'&');
		}

		var types = {
			'video/mp4': [18, 22, 37, 38],
			'video/flv': [5, 34, 35],
			'video/webm': [43, 44, 45]
		};
		var type = null;
		var url = null;
		var videotypes = ['video/mp4', 'video/flv', 'video/webm'];
forvideo:
		for(var i in videotypes) {
			type = videotypes[i];
			for(var j in types[type]) {
				if(url = videoURL[types[type][j]]) break forvideo;
			}
		}

		var downloadlabel = null;
		var download = null;
		var downloadtype = null;
		var downloadtypes = ['video/webm', 'video/mp4', 'video/flv'];
fordownload:
		for(var i in downloadtypes) {
			downloadtype = downloadtypes[i];
			downloadlabel = (downloadtype == 'video/webm' ? 'Download WebM' : 'Download');
			for(var j in types[downloadtype].reverse()) {
				if(download = videoURL[types[downloadtype].reverse()[j]]) break fordownload;
			}
		}

		document.getElementById('watch-player').parentNode.innerHTML = videoReplaceHTML(url, type, download, downloadtype, downloadlabel);

	/* GOOGLE VIDEO */
	} else if (window.location.href.match(/video.google.com\/videoplay/)) {
		var videourl = unescape(document.getElementById('VideoPlayback').src.match(/videoUrl=(.+)$/)[1]);

		document.getElementById('player').innerHTML = videoReplaceHTML(videourl);

	/* VIMEO */
	} else if (window.location.href.match(/vimeo.com\/\d+\/?$/)) {
		var vimeoid = window.location.href.match(/vimeo.com\/(\d+)\/?$/)[1];
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'https://www.vimeo.com/moogaloop/load/clip:' + vimeoid,
			onload: function(responseDetails) {
				var isHD = (responseDetails.responseText.match(/<isHD>1<\/isHD>/) ? 'hd' : 'sd')
				var request_signature = responseDetails.responseText.match(/request_signature>([^<]+)</)[1];
				var request_signature_expires = responseDetails.responseText.match(/request_signature_expires>([^<]+)</)[1];
				var videourl = 'https://www.vimeo.com/moogaloop/play/clip:' + vimeoid + '/' + request_signature + '/' + request_signature_expires + '/?q=' + isHD;
				document.getElementById('meat').children[0].children[0].innerHTML = videoReplaceHTML(videourl);
			}
		});

	/* BLIP.TV */
	} else if(window.location.href.match(/blip\.tv\/file\/\d+\/?$/)) {
		var videourl = '';
		for(var i in unsafeWindow.ATOf['attributes']) {
			if(unsafeWindow.ATOf['attributes'][i]['attribute'].match(/\.flv$/)) {
				videourl = unsafeWindow.ATOf['attributes'][i]['attribute'];
			}
		}
		document.getElementById('video_player').innerHTML = videoReplaceHTML(videourl);

	} else if(window.location.href.match(/viddler\.com\/.+\/videos\/\d+/)) {
		var videourl = window.location.href.replace(/\/?$/,'.flv')
		document.getElementById('flashcontent').innerHTML = videoReplaceHTML(videourl);

	/* ACADEMICEARTH.COM */
	} else if(window.location.href.match(/academicearth.org\/lectures\/.*$/)) {
		var videourl = unsafeWindow.flashVars.flvURL;
		var div = document.createElement('div');
		div.innerHTML = videoReplaceHTML(videourl);
		document.getElementById('video-player').parentNode.insertBefore(div, document.getElementById('video-player'));
		document.getElementById('video-player').parentNode.removeChild(document.getElementById('video-player'));

	/* LASTAMPA.IT */
	/* Code by Iron Bishop */
	} else if (window.location.href.match(/lastampa\.it\/multimedia/)) {
		var videourl = unescape(document.getElementById('VideoPlayer1').innerHTML.match(/.*x-mplayer2.*url=(.+)wmv/)[1]) + "wmv";
		document.getElementById('VideoPlayer1').innerHTML = videoReplaceHTML(videourl);

	} else if(window.location.href.match(/rai\.tv\/dl/)) {
		var videourl = unsafeWindow.videoURL;
		document.getElementById('Player').innerHTML = videoReplaceHTML(videourl);

	/* EMBED CODES */
	} else {
		unsafeWindow.addEventListener('DOMNodeInserted', init, false);
		embed_codes(document.getElementsByTagName('embed'));
		embed_codes(document.getElementsByTagName('object'));
		for(var i in toremove) {
			toremove[i].parentNode.removeChild(toremove[i]);
		}
		toremove = [];
	}
	lock = false;
}

// We really do want it to run twice if necessary.
init();
unsafeWindow.addEventListener('load', init, false);
