// ==UserScript==
// @name		DownloadMedia Bar
// @version		0.96
// @include http://*
// @date		2011-01-03
// @author		Small_Z
// ==/UserScript==


(function () {

	var SFlist = 'youtube.com,myspace.com,metacafe.com,spike.com,sevenload.com,rutube.ru,smotri.com,yandex.ru,rambler.ru,tvigle.ru,intv.ru,guitar-tube.com,gametrailers.com,mail.ru,rutv.ru,mreporter.ru,bibigon.ru,russia.ru,amik.ru,lifenews.ru,a1tv.ru,blip.tv';
	var SFglobplayers = 'http://www.youtube.com/v/,http://www.youtube-nocookie.com/v/,http://video.rutube.ru/,rutv.ru/i/rutv.swf?vid,bibigon.ru/i/flvplayer.swf?vid,http://rutube.ru/player.swf,video.google.com/googleplayer.swf?docid=,mediaservices.myspace.com/services/media/embed.aspx,www.metacafe.com/fplayer/';

	var SVlist = 'youtube.com,myspace.com,smotri.com,russia.ru,tvigle.ru,video.privet.ru,rutv.ru,www.ntv.ru,1tv.ru,championat.ru,tv.km.ru,video.online.ua,vimeo.com,dailymotion.com,megavideo.com,break.com,sevenload.com,current.com,veoh.com,video.yahoo.com,flickr.com,howcast.com,5min.com,myvideo.de,clipfish.de,video.gmx.net,video.web.de,focus.de,tu.tv,dalealplay.com,video.libero.it,videos.sapo.pt,vision.ameba.jp,mgoon.com,tagstory.com,freecaster.tv,extreme.com' //	+',vision.rambler.ru,metacafe.com'
	;
	var SVglobplayers = 'rutv.ru/i/rutv.swf?vid' //	+',http://www.youtube.com/v/,http://www.youtube-nocookie.com/v/'
	;
	var KTlist = 'photobucket.com,megavideo.com,collegehumor.com,spike.com,xhamster.com,pornhub.com,xvideos.com,xnxx.com,megaporn.com,keezmovies.com,youjizz.com,slutload.com,pornotube.com,jizzhut.com';

	var players = 'd.yimg.com/,.ntv.ru/swf/vps,static.ak.fbcdn.net,/video,portal_3,/moogaloop,moogaloop_local,guitar-tube.com/play,swf/tvigle_single,tvigle.ru/swf/tvigle,.ntv.ru/swf/v,static.video.yandex.ru,/portal_3,.current.com/swf/current/,lads.myspace.com/videos/,tu.tv/tutv.swf,.vision.ameba.jp/mcs.swf,static.pbsrc.com/flash/,vision.rambler.ru,.ytimg.,player';


	var trustXDRdomains = ['http://vimeo.com/moogaloop/load/clip:', 'http://www.youtube.com/crossdomain.xml?#/get_'];
	var MaxXDRconnections = 0;

	var msgLabel = 'ujs_msg_123456789';

	function postMessage(msg, doc, wnd) {
		window.postMessage ? wnd.postMessage(msg, '*') : doc.postMessage(msg, '*');
	};

	var isOp10 = (typeof(window.opera.version) == 'function') ? (window.opera.version() >= 10) : false;

	function addMessageEventListener(func) {
		if (isOp10) window.addEventListener('message', func, false);
		else document.addEventListener('message', func, false);
	}

	function removeMessageEventListener(func) {
		if (isOp10) window.removeEventListener('message', func, false);
		else document.removeEventListener('message', func, false);
	}

	var getParam = function (e, n) {
		var v = '', r = new RegExp('^(' + n + ')$', 'i'), param = e.getElementsByTagName('param');
		for (var i = 0, p; p = param[i]; i++) {
			if (p.hasAttribute('name') && p.getAttribute('name').match(r)) {
				v = p.getAttribute('value');
				break
			};
		};
		return v;
	};

	var pageParam = function () {
		var p = '', q = '';
		if (location.href.indexOf('http://www.collegehumor.com/') == 0) {
			var v = '', is = document.selectNodes('//input[@type and @name and @value]'), i = is.length;
			while(i--){if( (v = is[i].value) && (v.indexOf('<object type="') != -1) && (v = v.match(/clip_id=(\d+)/i)) && (v = v ? v[1] : '') )return v};
		};
		return '';
	};

	var getLng = function () {
		switch (window.navigator.language) {
		case 'ru':
			return {
				download: '\u0421\u043A\u0430\u0447\u0430\u0442\u044C\u0020\u044D\u0442\u043E\u0442\u0020\u0440\u043E\u043B\u0438\u043A',
				requestSF: '\u0417\u0430\u043F\u0440\u043E\u0441\u0438\u0442\u044C\u0020\u0441\u0441\u044B\u043B\u043A\u0443\u0020\u043D\u0430\u0020\u0432\u0438\u0434\u0435\u043E\u0020\u0447\u0435\u0440\u0435\u0437\u0020savefrom.net',
				requestKT: '\u0417\u0430\u043F\u0440\u043E\u0441\u0438\u0442\u044C\u0020\u0441\u0441\u044B\u043B\u043A\u0443\u0020\u043D\u0430\u0020\u0432\u0438\u0434\u0435\u043E\u0020\u0447\u0435\u0440\u0435\u0437\u0020keep-tube.com',
				requestSV: '\u0417\u0430\u043F\u0440\u043E\u0441\u0438\u0442\u044C\u0020\u0441\u0441\u044B\u043B\u043A\u0443\u0020\u043D\u0430\u0020\u0432\u0438\u0434\u0435\u043E\u0020\u0447\u0435\u0440\u0435\u0437\u0020savevideo.me'
			};
		default:
			return {
				download: 'Download this media',
				requestSF: 'Request MediaLink via savefrom.net',
				requestKT: 'Request MediaLink via keep-tube.com',
				requestSV: 'Request MediaLink via savevideo.me'
			}
		}
	};
	var url = location.href;

	var getMegaVars = function () {
		if (domain.indexOf('mega') == -1 && !domain.match(/(^|\.)mega(video|porn)\.com/)) return '';
		var dl_url = '',vars = {};

		var scripts = document.getElementsByTagName("script");
		for (var i = 0, len = scripts.length; i < len; i++) {
			var str = scripts[i].innerHTML;

			if (str.match(/\svar flashvars/) && str.match(/flashvars\.v = /) && str.match(/flashvars\.s = /) && str.match(/flashvars\.un = /) && str.match(/flashvars\.k1 = /) && str.match(/flashvars\.k2 = /)) {
				extractVars(str);
				dl_url = '&megavars=' + vars.v + '.' + vars.s + '.' + vars.un + '.' + vars.k1 + '.' + vars.k2 + '.' + vars.hd_s + '.' + vars.hd_un + '.' + vars.hd_k1 + '.' + vars.hd_k2;
				break;
			}
		}

		function extractVars(str) {
			vars.hd_s = vars.hd_un = vars.hd_k1 = vars.hd_k2 = '';
			vars.v = str.match(/flashvars\.v = \"(.*)\";/)[1];
			vars.s = str.match(/flashvars\.s = \"(.*)\";/)[1];
			vars.un = str.match(/flashvars\.un = \"(.*)\";/)[1];
			vars.k1 = str.match(/flashvars\.k1 = \"(.*)\";/)[1];
			vars.k2 = str.match(/flashvars\.k2 = \"(.*)\";/)[1];
			if (str.indexOf('flashvars.hd_s') != -1) {
				vars.hd_s = '' || (str.match(/flashvars\.hd_s = \"(.*)\";/)[1]);
				vars.hd_un = str.match(/flashvars\.hd_un = \"(.*)\";/)[1];
				vars.hd_k1 = str.match(/flashvars\.hd_k1 = \"(.*)\";/)[1];
				vars.hd_k2 = str.match(/flashvars\.hd_k2 = \"(.*)\";/)[1];
			}
		}

		return dl_url;
	}


	var frameParser = function (url) {
		var p = '',q = '',s = '';
		if( url.indexOf('vimeo.com/moogaloop/load/clip:') != -1 && (s = document.getElementsByTagName('request_signature')) && (q = document.getElementsByTagName('request_signature_expires')) )return url.replace('/load/', '/play/') + '/' + (s.item(0).firstChild.nodeValue || s.item(0).nodeValue) + '/' + (q.item(0).firstChild.nodeValue || q.item(0).nodeValue) + '/?q=sd';
		if( url.indexOf('http://www.youtube.com/crossdomain.xml?#/get_') == 0 ) {
			var getQuery = function (s, q){var a = s.match(new RegExp('(^|[&?])' + q + '=([^&]+)'));return a ? a[2] : ''};
			var decodeURL = function (s){try{return decodeURIComponent(s)}catch(e){return unescape(s)}};
			var getXmltext = function (s){var x = new XMLHttpRequest();x.open('GET',s,false);x.send(null);return x.responseText};
			if( (q = getXmltext(url.replace('/crossdomain.xml?#', ''))) && (p = decodeURL(getQuery(q, 'fmt_url_map')).match(/\d{2}\|([^,]+)/)) && (p = p ? p[1] : '') )return p + (!p.match(/signature.+&title=.+/i) ? ((q = (getQuery(q, 'title') || getQuery(q, 'keywords'))) ? '&title=youtube-' + encodeURIComponent(decodeURL(q).replace(/[^\w\-\u0410-\u044F]/g, '_').replace(/_+/g, '_').substr(0, 70)) : '') : '');
		}
		return '';
	};

	var getVideo = function (src, flashvars, flag) {
		var getLink = function(s){var rez = s ? s.match(/[^\s\x22=&?]+\.[^\s\x22=&?\/]*(flv|mp4|mp3)/i) : ''; return rez ? rez[0] : ''};
		var getQuery = function(s, q){var a = s.match(new RegExp('(^|[&?])'+q+'=([^&]+)')); return a ? a[2] : ''};
		var getJson = function(s, q){var rez = s.match(new RegExp('\x22'+q+'\x22:\\s*(\x22.+?\x22)')); return rez ? eval(rez[1]) : ''};
		var getXml = function(s, t){var x = new XMLHttpRequest(); x.open('GET', s, false); x.send(null); return x.responseXML && x.responseXML.getElementsByTagName(t)[0]};
		var getXmltext = function(s){var x = new XMLHttpRequest(); x.open('GET', s, false); x.send(null); return x.responseText};
		var getURL = function(f, s){return f.match(/^(\w+:\/\/|\/|$)/) ? f : s.replace(/[#?].*$/, '').replace(/[^\/]*$/, f)};
		var getYhash = function(s){var a = s.match(/[^\w-]([\w-]{11})([^\w-]|$)/);return a ? a[1] : ''};
		var decodeURL = function(s){try{return decodeURIComponent(s)}catch(e){return unescape(s)}};

		var q = '', flv = decodeURL(flashvars), url = location.href;flag.pageParam = '';flag.flv = flv;

		if( url.indexOf('youtube.com/') != -1 && src.indexOf('http://s.ytimg.com/yt/swf') == 0 && (q = decodeURL(getQuery(flashvars, 'fmt_url_map')).match(/\d{2}\|([^,]+)/) || ( ( q = (url.match(/(v=|#)(.*\W|<?)([\w-]{11})([^\w-]|$)/) ? url.match(/(v=|#)(.*\W|<?)([\w-]{11})([^\w-]|$)/)[3] : (getQuery(flashvars, 'video_id') || getYhash(getQuery(flashvars, 'iurl')) || getYhash(getQuery(flashvars, 'thumbnail_url')))) ) ? decodeURL(getQuery(getXmltext('http://www.youtube.com/get_video_info?video_id='+q+'&el=detailpage'), 'fmt_url_map')).match(/\d{2}\|([^,]+)/) : '' )) )return q[1]+'&title='+encodeURIComponent( url.match(/v=[\w-]{11}([^\w-]|$)/) ? document.title : 'youtube-'+(getQuery(flv, 'title') || getQuery(flv, 'keywords') || document.title).replace(/[^\w\-\u0410-\u044F]/g,'_').replace(/_+/g,'_').substr(0,70) );
		if( url.indexOf('http://video.google.') == 0 && url.match(/^http:\/\/video\.google\.\w{2,3}\/videoplay\?/) && ((q = getQuery(src, 'videoUrl')) || (q = src.match(/\.swf$/i) ? '1' : src)) )return decodeURL(q == '1' ? '' : q);
		if( url.indexOf('metacafe.com/watch/') != -1 && (q = getJson(flv, 'mediaURL')) )return q+'?__gda__='+getJson(flv, 'key');
		if( url.indexOf('.break.com/') != -1 && (q = getQuery(flv, 'videoPath') ) )return q+'?'+getQuery(flv, 'icon');
		if( url.indexOf('dailymotion.com/') != -1 && (q = getJson(flv, 'hqURL') || getJson(flv, 'sdURL')) )return q;
		if( url.indexOf('my-hit.ru/film/') != -1 && (q = getLink(flv)) )return q+'?start=0&id='+getQuery(flv, 'id');
		if( url.indexOf('vd.reborn.ru/?a=watch') != -1 && (q = getQuery(src, 'filename')) )return 'http://flv.reborn.ru:81/'+q+'.flv';
		if( url.indexOf('vision.rambler.ru/') != -1 && (q = getXml(url+'flash_basic_data.xml?where=video', 'flv')) )return q.firstChild.nodeValue;
		if( url.indexOf('tvigle.ru/') != -1 && (q = getXml('http://www.tvigle.ru/xml/single.php?obj='+getQuery(flv, 'obj'), 'video')) )return q.getAttribute('bigmp4') || q.getAttribute('file') || q.getAttribute('low_file');
		if( url.indexOf('http://www.collegehumor.com/') == 0 && (q = pageParam() || getQuery(flv, 'clip_id')) && (flag.pageParam = q) && (q = getXmltext('http://www.collegehumor.com/moogaloop/video:'+q)) && (q = q.match(/http:\/\/[\w-\.\/]+\.(mp4|flv)/ig)) )return q[3] || q[2] || q[1] || q[0];
		if( src.indexOf('http://www.youtube') == 0 && src.match(/\/v\/([\w-]{11})([^\w-]|$)/) && (q = src.match(/\/v\/([\w-]{11})([^\w-]|$)/)[1]) && (flag.XDR = 'XDRneed') )return 'http://www.youtube.com/crossdomain.xml?#/get_video_info?video_id='+q+'&el=detailpage';
		if( src.indexOf('http://vkontakte.ru') == 0 || src.indexOf('http://vk.com') == 0 ){
			if( src.indexOf('/VideoPlayer') != -1 && (q = getQuery(flv, 'uid')) && (q = (q == '0') ? ('http://'+getQuery(flv, 'host')+'/assets/videos/'+getQuery(flv, 'vtag')+getQuery(flv, 'vkid')+'.vk') : (q = getQuery(flv, 'host')+'u'+q+'/video/'+getQuery(flv, 'vtag'))) )return (getQuery(flv, 'hd') == '0') ? ( (getQuery(flv, 'no_flv') == '0') ? (q+'.flv') : (q+'.240.mp4') ) : (q+'.360.mp4');
			if( src.indexOf('/audioplayer.swf') != -1 && (q = getQuery(flv, 'host')) && (q = 'http://cs' + q + '.vkontakte.ru/u' + getQuery(flv, 'user') + '/audio/' + getQuery(flv, 'id') + '.mp3') )return q;
		};
		if( src.indexOf('/moogaloop') != -1 && (getQuery(flv, 'server') == 'vimeo.com' || getQuery(src, 'server') == 'vimeo.com') && (q = getQuery(flv, 'clip_id') || getQuery(src, 'clip_id')) && (flag.XDR = 'XDRneed') )return 'http://vimeo.com/moogaloop/load/clip:'+q;
		if( src.indexOf('http://v.kiwi.kz/v/') == 0 )return src.replace('http://v.kiwi.kz/','http://farm.kiwi.kz/');
		if( src.indexOf('http://kiwi.kz/') == 0 && (q = getQuery(flv, 'file')) )return q;

		if( flashvars && flv != flashvars ){
			if( q = flashvars.match(/[^\s\x22=&?]+\.(flv|iflv|mp4|mp3)[^\s\x22=&?]+/i) )return getURL(decodeURL(q[0]));
		};
		return getURL(getLink(flv) || decodeURL(getLink(src)), src);
	};

	var suppDomain = function(domain,list){
		var arr = list.split(','),i = arr.length;
		while(i--)if(domain.slice(-arr[i].length)==arr[i]&&(domain==arr[i]||domain.substr(-arr[i].length - 1,1)=='.'))return true;
		return false;
	};

	var domain = location.hostname, videogoogle = (domain.substr(0, 13) == 'video.google.') && url.match(/^http:\/\/video\.google\.\w{2,3}\/videoplay\?/);
	var isSFdomain = suppDomain(domain, SFlist) || videogoogle;
	var isKTdomain = suppDomain(domain, KTlist);
	var isSVdomain = suppDomain(domain, SVlist) // || videogoogle
	;
	var getLinks = function (obj) {
		if(!obj || !obj.tagName)return false;
		var src = '', flashvars = '', q = obj.tagName.toLowerCase(), p = '', Links = [], flag = [];
		if( q == 'object' ){
			src = obj.getAttribute('data') || obj.getAttribute('src') || getParam(obj, 'movie|data|src|code|filename|url') || (obj.getElementsByTagName('embed').length && obj.getElementsByTagName('embed')[0].getAttribute('src'));
			if( src )flashvars = getParam(obj, 'flashvars');
		}
		else if( q == 'embed' ){
				src = obj.getAttribute('src');
				if( src )flashvars = obj.getAttribute('flashvars');
			};

		if(!src)return false;
		if(src.substr(0, 1) == '/')src = 'http://' + location.hostname + src;
		Links[1] = getVideo(src, flashvars, flag);
		Links[0] = flag.XDR;
		Links[10] = flag.pageParam;
		var srcLC = src.toLowerCase(),url = document.URL,q = '';

		var suppPlayer = function (playerAdr,list){var arr=list.split(','),i = arr.length;
			while(i--)if(playerAdr.indexOf(arr[i]) != -1)return true;
			return false;
		};

		if (suppPlayer(srcLC, SFglobplayers)) {
			if (src.indexOf('http://www.youtube') == 0 && src.match(/\/v\/([\w-]{11})([^\w-]|$)/)) q = 'http://www.youtube.com/watch?v=' + src.match(/\/v\/([\w-]{11})([^\w-]|$)/)[1] + '&feature=player_embedded';
			if (src.substr(0, 27) == 'http://rutube.ru/player.swf') q = 'http://rutube.ru/tracks/' + (url.indexOf('http://rutube.ru/tracks/') == 0 ? url.match(/\d{6,}/) || '0000000' : '0000000') + '.html?v=' + Links[1].match(/[a-f0-9]{12,}/);
			if (!q) q = src;
			Links[11] = 'http://savefrom.net/?url=' + encodeURIComponent(q);
			q = '';
		};

		if (suppPlayer(srcLC, SVglobplayers)) {
			if (src.indexOf('http://www.youtube') == 0 && src.match(/\/v\/([\w-]{11})([^\w-]|$)/)) q = 'http://www.youtube.com/watch?v=' + src.match(/\/v\/([\w-]{11})([^\w-]|$)/)[1] + '&feature=player_embedded$NAME=' + encodeURIComponent('youtube-' + document.title.replace(/[^\w\-\u0410-\u044F]/g, '_').replace(/_+/g, '_').substr(0, 70));
			if (!q) q = src;
			Links[13] = 'http://savevideo.me#' + q;
			q = '';
		};

		if( !suppPlayer(srcLC, players) || ((location.pathname.length < 5 || (location.pathname.substr(0, 6) == '/index' && location.pathname.length < 11)) && location.search.length < 5) )return (Links[1] || Links[11] || Links[13]) ? Links : false;
		var getQuery = function (s, q){var a = s.match(new RegExp('(^|[&?])' + q + '=([^&]+)'));return a ? a[2] : ''};
		var getYhash = function (s){var a = s.match(/[^\w-]([\w-]{11})([^\w-]|$)/);return a ? a[1] : ''};

		if (isSFdomain && !Links[11]) {
			if (url.indexOf('http://video.google.') == 0 && url.match(/#docid=-?\d{7,}/)) q = url.replace(/videoplay\?.+/, 'videoplay?' + url.match(/#(docid=.+)/)[1]);
			if (url.indexOf('http://www.youtube.com/') == 0) {
				if (url.match(/(v=|#)(.*\W|<?)([\w-]{11})([^\w-]|$)/)) {
					if (url.match(/#(.*\W|<?)([\w-]{11})([^\w-]|$)/)){q = 'http://www.youtube.com/watch?v=' + url.match(/#(.*\W|<?)([\w-]{11})([^\w-]|$)/)[2]}
					else q = url;
				} else {
					q = getQuery(flag.flv, 'video_id') || getYhash(getQuery(flag.flv, 'iurl')) || getYhash(getQuery(flag.flv, 'thumbnail_url'));
					q = q ? 'http://www.youtube.com/watch?v=' + q : 'none';
				};
			};
			if (!q) q = url;
			if (q != 'none') Links[11] = 'http://savefrom.net/?url=' + encodeURIComponent(q);
			q = '';
		};


		if (isKTdomain) {Links[12] = 'http://keep-tube.com/?url=' + encodeURIComponent(url) + getMegaVars() + '&nojava=1';};


		if (isSVdomain && !Links[13]) {
			if (url.indexOf('http://video.google.') == 0 && url.match(/#docid=-?\d{7,}/)) q = url.replace(/videoplay\?.+/, 'videoplay?' + url.match(/#(docid=.+)/)[1]);
			if (url.indexOf('video.yahoo.com') != -1 && !url.match(/^http:\/\/video\.yahoo\.com\/(watch|network)\/\d{5,}/)) q = 'none';
			if (url.indexOf('http://www.youtube.com/') == 0) {
				if (url.match(/(v=|#)(.*\W|<?)([\w-]{11})([^\w-]|$)/)) {
					if (url.match(/#(.*\W|<?)([\w-]{11})([^\w-]|$)/)) {q = 'http://www.youtube.com/watch?v=' + url.match(/#(.*\W|<?)([\w-]{11})([^\w-]|$)/)[2]}
					else q = url;
				} else {
					q = getQuery(flag.flv, 'video_id') || getYhash(getQuery(flag.flv, 'iurl')) || getYhash(getQuery(flag.flv, 'thumbnail_url'));
					q = q ? 'http://www.youtube.com/watch?v=' + q : 'none';
				};
				if (url.match(/v=[\w-]{11}([^\w-]|$)/) && q != 'none') {q = q + '$NAME=' + encodeURIComponent(document.title.replace(/[^\w\-\u0410-\u044F]/g, '_').replace(/_+/g, '_').substr(0, 70))}
				else if(q != 'none')q = q + '$NAME=youtube-' + encodeURIComponent((getQuery(flag.flv, 'title') || getQuery(flag.flv, 'keywords') || document.title).replace(/[^\w\-\u0410-\u044F]/g, '_').replace(/_+/g, '_').substr(0, 70));
			};
			if (!q) q = url;
			if (q != 'none') Links[13] = 'http://savevideo.me#' + q;
			q = '';
		};

		if( Links[1] || Links[11] || Links[12] || Links[13] )return Links;
		return false;
	};

	function removeFromArray(ar, el) {
		var r = [];
		for (var k = 0, gap = 0; k < ar.length; k++) {
			if (gap > 0) ar[k - gap] = ar[k];
			if (ar[k] == el) gap++;
		};
		ar.length = ar.length - gap;
		return ar;
	};

	var clones = [];

	function resetPositions() {
		var m = '',k = clones.length;
		while(k--){
			if (m = clones[k]) {
				var o = m.__object;
				if (o && o.parentNode) {
					var box = o.getBoundingClientRect();
					var m_y = box.bottom + window.pageYOffset,m_x = box.left + window.pageXOffset;
					m.style.top = m_y + 'px!important';
					m.style.left = m_x + 'px!important';
					if ((m_y == 0) && (m_x == 0)) removeMenu(m)
				} else if (m && m.parentNode) removeMenu(m); //if object is deleted from document, then remove toolbar
			};
		};
	};

	function removeMenu(m) {
		removeFromArray(clones, m);
		if (m && m.parentNode) m.parentNode.removeChild(m);
	};

	var def_styles = 'border:none!important;vertical-align:top!important;text-align:center!important;padding:0px!important;margin:2px!important;margin-top:0px!important;display:inline-block!important;width:16px!important;height:16px!important;float:left!important;font-size:10px!important;text-decoration:none!important;box-sizing:border-box!important;';

	var lng = getLng();

	function refreshMenu(menu) {
		if (menu.__XDRstate == 'XDRproceed') return;
		var tmplinks = [menu.__XDRstate, menu.childNodes[0].href],i = 4;
		while(i--){tmplinks[i + 10] = menu.childNodes[i].href;menu.removeChild(menu.childNodes[i])};
		tmplinks[10] = menu.__pageParam;
		setTimeout(function (){var i = 4;while(i--)menu.appendChild(bars.template.cloneNode(true).childNodes[i]);fillmenu(menu, tmplinks)}, 20);
	};


	function procXDR(menu, links) {

		menu.__XDRstate = 'XDRproceed';
		menu.childNodes[0].style = def_styles + 'background: -o-skin("Transfer Loading")top no-repeat !important;';
		var trustXDR = false;
		for (var i = 0, domain; domain = trustXDRdomains[i]; i++) {
			if (links[1].toLowerCase().indexOf(domain) == 0) trustXDR = true;
		};
		if (trustXDR) {
			var f = document.createElement('iframe');
			f.src = links[1];
			f.width = 0;
			f.height = 0;
			f.frameBorder = 'no';
			f.scrolling = 'no';
			f.setAttribute('ujs_external_unblocked', '1', false);
			menu.childNodes[0].appendChild(f);
			addMessageEventListener(function msgreceiv(e) {
				var d = '',c = '';
				if (e.data && (e.data.indexOf(msgLabel) == 0) && (d = e.data.split('\n')) && (links[1] == decodeURIComponent(d[1])) && (d[2].length > 3)) {
					c = decodeURIComponent(d[2]);
					if( c != 'none' && (!isOp10 || links[1].indexOf(e.origin) == 0) ){
						if( links[1].indexOf('youtube.com/crossdomain.xml?#/get_') != -1 )c = !c.match(/signature.+&title=.+/i) ? c + '&title=' + encodeURIComponent('youtube-' + document.title.replace(/[^\w\-\u0410-\u044F]/g, '_').replace(/_+/g, '_').substr(0, 70)) : c;
						menu.childNodes[0].href = c
						menu.__XDRstate = '';
					} else menu.__XDRstate = 'XDRneed';
					removeMessageEventListener(msgreceiv);
					refreshMenu(menu);
				};
			});

			setTimeout(function (){postMessage(msgLabel+'\n'+encodeURIComponent(links[1])+'\nnone',window.document,window)},9000);

		} else {
			menu.childNodes[0].removeAttribute('href');
			menu.childNodes[0].title = 'Blocked: ' + links[1];
			menu.__XDRstate = '';
		};

	};



	function fillmenu(menu, links) {
		menu.__XDRstate = links[0];
		menu.__pageParam = links[10];

		if (links[1]) {
			if (menu.__XDRstate != 'XDRproceed') {
				menu.childNodes[0].title = lng.download;
				menu.childNodes[0].style = def_styles + 'background: -o-skin("Attachment Video")top no-repeat !important;';
				menu.childNodes[0].href = links[1];
			};
			menu.childNodes[0].onclick = function (e) {
				e.stopPropagation();
				e.preventDefault();
				window.open(menu.childNodes[0].href, menu.childNodes[0].href, "width=400,height=280");
				return false;
			}
		} else {
			menu.childNodes[0].style.display = 'none!important'
		};

		if (links[11]) {
			menu.childNodes[1].href = links[11];
			menu.childNodes[1].title = lng.requestSF;
			menu.childNodes[1].target = '_blank';
			menu.childNodes[1].style = def_styles + 'background: url(data:image/gif;base64,R0lGODlhEAAQALMPAFfJLM7OzuPl4/n5+TysFJbeZvHx8XjHZZG7jG+TaZrMlODg4Ojo6P///8DAwP///yH5BAEAAA8ALAAAAAAQABAAAARm8LlJa5Wr6c31ml24TUM5IEmaIOZAmogiy+1bIkd+KLVjGAKBThf8TX4JAmDJJCSMPkOSuSQ4oYzstJkQZCdZLaBQACTCjElwnSB31wI1fJFaBO1xx2LP7/cnAX6CCwEOEhaIEw8RADs=)top no-repeat !important;';
			menu.childNodes[1].onclick = function (e) {
				e.stopPropagation();
				e.preventDefault();
				popupWin = window.open(links[11], links[11], "width=1000,height=380");
				popupWin.focus();
				return false;
			}
		} else {
			menu.childNodes[1].style.display = 'none!important'
		};

		if (links[12]) {
			menu.childNodes[2].href = links[12];
			menu.childNodes[2].title = lng.requestKT;
			menu.childNodes[2].style = def_styles + 'background: url(data:image/gif;base64,R0lGODlhEAAQALMAAP/////MzP+Zmf9mZv8zM8zMzMxmZswzM5kzM2bMZgCZAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAAARfUMlJq1WpyHz1nkkHjtfmcZJXUkVbBEIsy0HQGkSu78MQBwiAcAfg+Q6EYm+Q7BF8PSRgMK0CBFRAYCA1VL1UamB6OADA52qYizAfBNeswDAGHNrlvF5vKCDwe3ltBREAOw==)top no-repeat !important;';
			menu.childNodes[2].target = '_blank';
			menu.childNodes[2].onclick = function (e) {
				e.stopPropagation();
				e.preventDefault();
				var popupWin = window.open(links[12], links[12], "width=740,height=740");
				popupWin.focus();
				return false;
			};

		} else {
			menu.childNodes[2].style.display = 'none!important'
		};

		if (links[13]) {
			menu.childNodes[3].href = links[13];
			menu.childNodes[3].title = lng.requestSV;
			menu.childNodes[3].target = '_blank';
			menu.childNodes[3].style = def_styles + 'background: url(data:image/gif;base64,R0lGODlhEAAQAKIAAP///8zMzJmZmWZmZjMzMwAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAAANJCLLcrSDKORe9UqjBQwzeJwQCYZrgEjKD2RLpCJDLq0bMrJanpju4F0FDY3gEg4UL1/C4bKIbQIjKSEmcQUi09WEoli9Y4ShbEgA7)top no-repeat !important;';
			menu.childNodes[3].onclick = function (e) {
				e.stopPropagation();
				e.preventDefault();
				popupWin = window.open(links[13], links[13], "width=770,height=700");
				popupWin.focus();
				return false;
			};
		} else {
			menu.childNodes[3].style.display = 'none!important'
		};
	};

	function patchObject(o, bars, links) {

		if (!bars.template) {
			bars.fragment = document.createDocumentFragment();
			var template = bars.template = document.createElement('downloadmediabar');
			template.innerHTML = '<a>&nbsp;</a><a>&nbsp;</a><a>&nbsp;</a><a>&nbsp;</a>';
		}

		var menu = bars.template.cloneNode(true);
		clones.push(menu);
		menu.__object = o;
		o.__download_menu = menu;
		menu.__locationhref = location.href;

		menu.style = 'border: 1px solid  #d3d3d3!important;padding:0!important;margin:0!important;position:absolute!important;width:auto!important;background-color:white!important;z-index:9999!important;height:20px!important;box-sizing:border-box!important;opacity:0.08!important;border-bottom-right-radius: 6px;border-bottom-left-radius: 6px;';

		fillmenu(menu, links);
		if (links[0] == 'XDRneed') procXDR(menu, links);

		if (menu.__object.parentNode) {

			menu.__object.parentNode.onmouseover = function (e) {
				resetPositions();
				menu.style.opacity = '0.4!important';
			};
			menu.__object.parentNode.onmouseout = function (e) {
				menu.style.opacity = '0.08!important';
			};
		};

		menu.onmouseover = function (e) {
			menu.style.opacity = '1!important';
			if (e.target == menu && (!e.relatedTarget || !e.relatedTarget.parentNode || e.relatedTarget.parentNode != menu)) {

				if (menu.__XDRstate == 'XDRdelayed') menu.__XDRstate = 'XDRneed';
				if (menu.__locationhref != location.href || menu.__pageParam != pageParam()) {
					menu.__locationhref = location.href;
					var links = getLinks(menu.__object);
					if (!links) var links = [];
					if (links[0] == 'XDRneed') {
						procXDR(menu, links)
					} else fillmenu(menu, links);
				} else if (menu.__XDRstate == 'XDRneed') {
					var tmplinks = ['', menu.childNodes[0].href];
					procXDR(menu, tmplinks);
				};
				resetPositions();
			};
		};

		menu.onmouseout = function (e) {
			if (e.target == menu && (!e.relatedTarget || !e.relatedTarget.parentNode || e.relatedTarget.parentNode != menu)) menu.style.opacity = '0.08!important';
		};

		bars.fragment.appendChild(menu);

	};

	var addResizeListener = function () {
		addEventListener('resize', resetPositions, false);
		addResizeListener = function () {};
	};

	if (domain.substr(0, 5) == 'keep-' && ((url.indexOf('http://keep-tube.com/?url=http') == 0) || (url.indexOf('http://keep-porn.com/?url=http') == 0))) {
		setTimeout(function () {
			window.scrollTo(0, 350);
		}, 2000);
		addEventListener('DOMContentLoaded', function () {
			window.scrollTo(0, 350);
		}, false);
	};

	if (domain == 'savevideo.me' && url.indexOf('#http://') != -1) {
		if ((url.indexOf('$NAME=') != -1)) {
			var d = url.match(/#(.+)(\$NAME=)/)[1], c = url.match(/\$NAME=(.*)/)[1], count = 0;
			if( url.match(/#.+youtube.com\/watch.+\$NAME=/) )var setName = setInterval(function () {
				var k = 0,hreF = '',hs = document.selectNodes('//A[@href]');
				for(var h; h = hs[k]; k++){
					if(h.href.indexOf('.youtube.com') != -1 && h.href.indexOf('signature') != -1 && !h.href.match(/signature.+(%26|&)title/i) && h.href.match(/videoplayback.+sparams.+ipbits.+signature/) && document.getElementsByName('url')[0].value == d){
						h.href = h.href.match(/%2F.+%3F/) ? (h.href + '%26title%3D' + c) : (h.href + '&title=' + c);
						count = 998;
					};
				};
				count++;
				if (count > 999) clearInterval(setName);
			}, 500);
		} else var d = url.match(/#(.+)/)[1];

		setTimeout(function (){var urlarea = document.getElementsByName('url')[0];if(urlarea)urlarea.value = d},1500);

		addEventListener('DOMContentLoaded', function () {
			var urlarea = document.getElementsByName('url')[0];
			urlarea.value = d;
		}, false);

	}
	else {

		var bars = {template: null,fragment: null},XDRnum = 0;
		if (opera) {
			opera.addEventListener('PluginInitialized', function (e) {
				if( !e.element || e.element.__download_menu || !(e.element.nodeType == 1) ) return false;
				var links = getLinks(e.element);
				if (!links) return false;
				if (links[0] == 'XDRneed') XDRnum++;
				if (XDRnum > MaxXDRconnections) links[0] = 'XDRdelayed';
				if (XDRnum == 1) setTimeout(function () {
					XDRnum = 0
				}, 9000);
				patchObject(e.element, bars, links);

				if (bars.fragment) {
					document.documentElement.appendChild(bars.fragment);
					resetPositions();
					addResizeListener();
				};

			}, false);
		};

		addEventListener('load', function () {
			setTimeout(function () {
				if (!(navigator.plugins.length == 0)) {
					var k = 0, os = document.selectNodes('//object[@type and @data] | //embed[not(ancestor::object[@type and @data]) and @type and @src]');
					for (var o; o = os[k]; k++) {
						if (!o || !(o.nodeType == 1)) continue;
						if( o.__download_menu ){refreshMenu(o.__download_menu);continue};
						var links = getLinks(o);
						if (!links) continue;
						if (links[0] == 'XDRneed') XDRnum++;
						if (XDRnum > MaxXDRconnections) links[0] = 'XDRdelayed';
						if (XDRnum == 1) setTimeout(function (){XDRnum = 0},9000);
						setTimeout(patchObject,k*50,o,bars,links);
					};

					if (k > 0) {
						setTimeout(function () {
							if (bars.fragment) {
								document.documentElement.appendChild(bars.fragment);
								resetPositions();
							}
						}, k * 50);
						addResizeListener();
					};
				};

			}, 1000);

		}, false);
	};

	addEventListener('load', function () {
		if (!document.scripts) {
			var link = frameParser(url);
			if (link) {
				var inFrame = false;
				try{if (window.parent != window)inFrame = true}
				catch(e){inFrame = true};
				if (inFrame) {
					var msg = msgLabel + '\n' + encodeURIComponent(url) + '\n' + encodeURIComponent(link);
					postMessage(msg, window.parent.document, window.parent);
				} else alert(lng.download + ':\n' + link);
			};
		};
	}, false);

})(window.opera);