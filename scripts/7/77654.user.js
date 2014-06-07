// ==UserScript==
// @name Block external scripts
// @author Lex1
// @version 1.3.10
// @description Block external scripts (and js-advertising).
// @include http://*
// @exclude http://*youtube.com/*
// @exclude http://*metacafe.com/*
// @exclude http://*lastfm.ru/*
// @exclude http://*livegames.ru/*
// @exclude http://*vkontakte.ru/*
// @exclude http://*eurosport.ru/*
// @exclude http://*imageshack.us*
// @exclude http://*britannica.com/*
// @exclude http://*newegg.com/*
// @exclude http://*yahoo.com/*
// @exclude http://*facebook.com/*
// @exclude http://*deviantart.com/*
// @exclude http://*hotmail.com/*
// @exclude http://picasaweb.google.com/*
// @exclude http://playset.ru/*
// @exclude http://molotok.ru/*
// @exclude http://www.piter.fm/*
// @exclude http://kinozal.tv/*
// @exclude http://tvshack.net/*
// @exclude http://anonym.to/*
// @exclude http://twitter.com/*
// @exclude http://*flickr.com/*
// @exclude http://*myspace.com/*
// @exclude http://*bbc.co.uk/*
// @exclude http://*ebay.com/*
// @exclude http://*wikipedia.org/*
// @exclude http://*opera.com/*
// @exclude http://example.com/*
// @ujs:documentation http://ruzanow.ru/index/0-5
// @ujs:download http://ruzanow.ru/userjs/block-external-scripts.js
// ==/UserScript==



(function(){
	var skip = '^data:|^http://ipinfodb.com/|^http://vkontakte.ru/|^http://savefrom.net/|^http://api-maps.yandex.ru/|^http://ajax.googleapis.com/|^http://www.google.com/jsapi|^http://maps.google.com/|^http://[0-9a-z-]+.gstatic.com/'
	+ '|^http://[0-9a-z-]+.appspot.com/|^http://www.google.com/recaptcha/|^http://api.recaptcha.net/|^http://yui.yahooapis.com/|^http://script.aculo.us/'
	+ '|^http://css.yandex.net/|^http://s\\d+.ucoz.net/src/u.js|^http://[0-9a-z-]+.imgsmail.ru/|^http://62.105.135.100/|^http://auth.tbn.ru'
	+ '|swfobject.js$|show_afs_search.js$|chart.js$|ajax.js$|widgets.js$|common.js$|AC_RunActiveContent.js$|jquery[0-9a-z.-]*.js$';
	skip = new RegExp(skip.replace(/[.\/]/g, '\\$&'), 'i');
	var blocked = '';
	var prefix = 'ujs_block_ext_scripts';
	var enabled = document.cookie.indexOf(prefix+'=disabled') == -1;

	var setValue = function(name, value, days){
		var date = new Date();
		date.setTime(date.getTime()+((days || 10*365)*24*60*60*1000));
		var curCookie = name+'='+escape(value)+'; expires='+date.toGMTString()+'; path=/';
		if(document.cookie.split(';').length < 30 && document.cookie.length+curCookie.length < 4000){document.cookie = curCookie}else{alert('Cookies is full!')};
	};
	var getTLD = function(domain, full){
		if(!domain)return '';
		var r = domain.match(/^((?:\d{1,3}\.){3})\d{1,3}$/); if(r)return r[1] + '0';
		var a = domain.split('.'); var l = a.length; if(l < 2)return domain;
		return full ? a[l - 2] + '.' + a[l - 1] : a[(l > 2 && /^(co|com|net|org|edu|gov|mil|int)$/i.test(a[l - 2])) ? l - 3 : l - 2];
	};
	var createButton = function(){
		if(enabled && !blocked)return;
		var ru = window.navigator.language == 'ru';
		var lng_u = ru ? '\u0420\u0430\u0437\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C: ' : 'Unblock: ';
		var lng_d = ru ? '\u0411\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u043E' : 'Blocking disabled';
		var lng_b = ru ? '\u0417\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D' : 'Blocked';
		var lng_s = ru ? '\u0441\u043A\u0440\u0438\u043F\u0442' : 'script';
		var count = blocked.split('; ').length;
		if(count > 1){
			if(ru){lng_b += '\u043E'; lng_s += (count > 4) ? '\u043E\u0432' : '\u0430'}else{lng_s += 's'};
		};
		var txt = enabled ? lng_b + ' ' + count + ' ' + lng_s : lng_d;
		var title = enabled ? lng_u + blocked : '';

		var b = document.getElementById(prefix);
		if(b){b.value = txt; b.title = title; return};
		b = document.createElement('input');
		b.type = 'button';
		b.value = txt;
		b.title = title;
		b.id = prefix;
		b.setAttribute('style', 'display:inline-block;position:fixed;visibility:hidden;right:100;bottom:0;width:auto;height:auto;margin:0;padding:1px 8px;font:12px Times New Roman;z-index:9999;cursor:pointer;');
		b.addEventListener('click', function(e){
			if(e.ctrlKey){prompt('Please, copy urls', blocked.replace(/; /g, '\r\n')); return};
			if(enabled){setValue(prefix, 'disabled')}else{setValue(prefix, 'enabled', -1)};
			this.parentNode.removeChild(this);
			window.location.reload(false);
		}, false);
		b.addEventListener('mouseout', function(){b.setAttribute('style', 'visibility:hidden;'); b.parentNode.removeChild(b)}, false);
		(document.body || document.documentElement).appendChild(b);
		var maxWidth = b.offsetWidth;
		b.style.width = 0;
		b.style.visibility = 'visible';
		var timer = window.setInterval(function(){
			var width = parseInt(b.style.width || maxWidth) + 20;
			if(width > maxWidth){clearTimeout(timer); width = maxWidth};
			b.style.width = width + 'px';
		}, 10);
	};


	if(enabled)window.opera.addEventListener('BeforeExternalScript', function(e){
		var s = e.element.src; if(!s || skip.test(s))return;
		var h = window.location.hostname; var n = !/\.(com|[a-z]{2})$/.test(h);
		var a = s.match(/^https?:\/\/([^\/]+@)?([^:\/]+)/i); var d = a ? a[2] : h;
		if(getTLD(d, n) != getTLD(h, n)){
			e.preventDefault();
			if(blocked.indexOf(s) == -1)blocked += blocked ? '; ' + s : s;
			//if(window.opera)window.opera.postError('On <' + h + '> blocked external script: ' + s);
		}
	}, false);

	document.addEventListener('mousemove', function(e){
		var docEle = (document.compatMode == 'CSS1Compat' && window.postMessage) ? document.documentElement : document.body;
		if(docEle && docEle.clientHeight - e.clientY < 20 && docEle.clientWidth - e.clientX < 40)createButton();
	}, false);
})();
