// ==UserScript==
// @id             youtube-me-again
// @name           YouTube Me Again!
// @namespace      hateradio)))
// @author         hateradio
// @version        4.1
// @description    YouTube Me Again! automatically converts YouTube and Vimeo links into real embedded videos. Allowing you to hide, rescale, and change any video's aspect ratio.
// @homepage       https://userscripts.org/scripts/show/60843
// @updateURL      https://userscripts.org/scripts/source/60843.meta.js
// @icon           https://dl.dropboxusercontent.com/u/14626536/userscripts/i/ytma/ytma32.png
// @icon64         https://dl.dropboxusercontent.com/u/14626536/userscripts/i/ytma/ytma64.png
// @screenshot     http://i.min.us/ic9lvy.png http://i.min.us/kc9lvy.jpg

// @include        http://*.neogaf.com/forum/showthread.php*
// @include        http://*.neogaf.com/forum/showpost.php?p*
// @include        http://*.neogaf.com/forum/newreply.php*
// @include        http://*.neogaf.com/forum/editpost.php*
// @include        http://*.neogaf.com/forum/private.php*

// @include        http://*.neogaf.net/forum/showthread.php*
// @include        http://*.neogaf.net/forum/showpost.php?p*
// @include        http://*.neogaf.net/forum/newreply.php*
// @include        http://*.neogaf.net/forum/editpost.php*
// @include        http://*.neogaf.net/forum/private.php*

// @match          http://*.neogaf.com/forum/showthread.php*
// @match          http://*.neogaf.com/forum/showpost.php?p*
// @match          http://*.neogaf.com/forum/newreply.php*
// @match          http://*.neogaf.com/forum/editpost.php*
// @match          http://*.neogaf.com/forum/private.php*

// @match          http://*.neogaf.net/forum/showthread.php*
// @match          http://*.neogaf.net/forum/showpost.php?p*
// @match          http://*.neogaf.net/forum/newreply.php*
// @match          http://*.neogaf.net/forum/editpost.php*
// @match          http://*.neogaf.net/forum/private.php*

// @include        http*://*what.cd/forums.php?*viewthread*
// @include        http*://*what.cd/torrents.php?*
// @include        http*://*what.cd/user.php?*

// @match          *://*.what.cd/forums.php?*viewthread*
// @match          *://*.what.cd/torrents.php?*
// @match          *://*.what.cd/user.php?*

// @updated        24 Aug  2013 | 17,400
// -updated        04 June 2013 | 13,586

// @grant          GM_xmlhttpRequest
// ==/UserScript==

// Do not modify and re-release this script. If you would like to add support for another site, tell me and I'll put it in the includes.

// Whitelist these sites on NoScript/NotScript/etc.
// neogaf.com or neogaf.net, youtube.com, youtube-nocookie.com, vimeo.com, vimeocdn.com, dropboxusercontent.com

/*jslint indent: 4, maxerr: 50, browser: true, devel: true, nomen: true, plusplus: true, regexp: true, newcap: true */

(function () {
	'use strict';

	var $$, strg, update;

	if (!Function.prototype.bind) {
		Function.prototype.bind = function (self) {
			var args = [].slice.call(arguments, 1), fn = this;
			return function () {
				return fn.apply(self, args.concat([].slice.call(arguments)));
			};
		};
	}

	// DOM Handle
	$$ = {
		s : function (selector, cb) { var s = document.querySelectorAll(selector), i = -1; while (++i < s.length) { if (cb(s[i], i, s) === false) { break; } } },
		o : function (object, cb) { var i; for (i in object) { if (object.hasOwnProperty(i)) { if (cb(i, object[i], object) === false) { break; } } } },
		a : function (e) { var i = 1, j = arguments.length, f = document.createDocumentFragment(); for (i; i < j; i++) { f.appendChild(arguments[i]); } e.appendChild(f); return e; },
		e : function (t, o, e, p) { var a, b, c = document.createElement(t); if (typeof (o) === 'object') { for (a in o) { if (o.hasOwnProperty(a)) { b = a.charAt(0); switch (b) { case '_': c.style[a.substring(1)] = o[a]; break; case '$': c.setAttribute(a.substring(1), o[a]); break; default: c[a] = o[a]; break; } } } } if (e && p) { c.appendChild(e); } else if (e) { e.appendChild(c); } return c; },
		p : function (el, search) { // search is a regexp
			if (search.test(el.tagName)) {
				return el;
			}
			if (el.parentElement) {
				return this.p(el.parentElement, search);
			}
			return false;
		}
	};

	// S T O R A G E HANDLE
	strg = {
		on: (function () { try { var a, b = localStorage, c = Math.random().toString(16).substr(2, 8); b.setItem(c, c); a = b.getItem(c); return a === c ? !b.removeItem(c) : false; } catch (e) { return false; } }()),
		read: function (key) { return this.on ? JSON.parse(localStorage.getItem(key)) : false; },
		save: function (key, dat) { return this.on ? !localStorage.setItem(key, JSON.stringify(dat)) : false; },
		wipe: function (key) { return this.on ? !localStorage.removeItem(key) : false; },
		zero: function (o) { var k; for (k in o) { if (o.hasOwnProperty(k)) { return false; } } return true; },
		grab: function (key, def) { var s = strg.read(key); return strg.zero(s) ? def : s; }
	};

	// U P D A T E HANDLE
	update = {
		name : 'YouTube Me Again!',
		version : 4100,
		key : 'ujs_YTMA_UPDT_HR',
		callback : 'ytmaupdater',
		page : 'https://userscripts.org/scripts/show/60843',
		urij : 'https://dl.dropboxusercontent.com/u/14626536/userscripts/updt/ytma/ytma.json',
		uric : 'https://dl.dropboxusercontent.com/u/14626536/userscripts/updt/ytma/ytma.js', // If you get "Failed to load source for:" in Firebug, allow dropboxusercontent.com to run scripts.
		checkchrome: false,
		interval: 5,
		day: (new Date()).getTime(),
		time: function () { return new Date(this.day + (1000 * 60 * 60 * 24 * this.interval)).getTime(); },
		top: document.head || document.body,
		css: function (t) {
			if (!this.style) {
				this.style = document.createElement('style');
				this.style.type = 'text/css';
				this.top.appendChild(this.style);
			}
			this.style.appendChild(document.createTextNode(t + '\n'));
		},
		js: function (t) {
			var j = document.createElement('script');
			j.type = 'text/javascript';
			j[/^https?\:\/\//i.test(t) ? 'src' : 'textContent'] = t;
			this.top.appendChild(j);
		},
		notification: function (j) {
			if (j) {if (this.version < j.version) { window.localStorage.setItem(this.key, JSON.stringify({date: this.time(), version: j.version, page: j.page })); } else { return true; } }
			var a = document.createElement('a'), b = JSON.parse(window.localStorage.getItem(this.key));
			a.href = b.page || '#';
			a.id = 'userscriptupdater';
			a.title = 'Update now.';
			a.textContent = 'An update for ' + this.name + ' is available.';
			document.body.appendChild(a);
			return true;
		},
		check: function (opt) {
			if (typeof (GM_updatingEnabled) === 'boolean' || !strg.on) { return; }
			var stored = strg.read(this.key), J, page;
			this.csstxt();
			if (opt || !stored || stored.date < this.day) {
				page = stored && stored.page ? stored.page : '#';
				strg.save(this.key, {date: this.time(), version: this.version, page: page});
				if (!opt && typeof (GM_xmlhttpRequest) === 'function' && !this.chrome()) {
					GM_xmlhttpRequest({method: 'GET', url: update.urij, onload: function (r) { update.notification(JSON.parse(r.responseText)); }, onerror: function () { update.check(1); } });
				} else {
					J = this.notification.toString().replace('function', 'function ' + this.callback).replace('this.version', this.version).replace(/(?:this\.key)/g, "'" + this.key + "'").replace('this.time()', this.time()).replace('this.name', 'j.name');
					this.js(J);
					this.js(this.uric);
				}
			} else if (this.version < stored.version) { this.notification(); }
		},
		chrome: function () {
			if (this.checkchrome === true && typeof (chrome) === 'object') { return true; }
		},
		csstxt: function () {
			if (!this.pop) { this.pop = true; this.css('#userscriptupdater,#userscriptupdater:visited{-moz-box-shadow:0 0 6px #787878;-webkit-box-shadow:0 0 6px #787878;box-shadow:0 0 6px #787878;border:1px solid #777;-moz-border-radius:4px;border-radius:4px;cursor:pointer;color:#555;font-family:Arial, Verdana, sans-serif;font-size:11px;font-weight:700;text-align:justify;min-height:45px;position:fixed;z-index:999999;right:10px;top:10px;width:170px;background:#ebebeb url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAACLCAYAAAD4QWAuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1NUIzQjc3MTI4N0RFMDExOUM4QzlBNkE2NUU3NDJFNCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGN0Q1OEQyNjdEQzUxMUUwQThCNEE3MTU1NDU1NzY2OSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGN0Q1OEQyNTdEQzUxMUUwQThCNEE3MTU1NDU1NzY2OSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NUIzQjc3MTI4N0RFMDExOUM4QzlBNkE2NUU3NDJFNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1NUIzQjc3MTI4N0RFMDExOUM4QzlBNkE2NUU3NDJFNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Po6YcvQAAAQFSURBVHja7JzBSxRRHMdnp+gkiLdOgtshKGSljQVF8CK0biEErYfwFmT+BQpdA0MIBEFtTx2qSxESaAt5ioUQFDp5sjl06rbnumzfp7+VbZx5M+/Nb9wZ+f3g56wzO28//ua93/u9J/stdDodx2/P3o85llaFT8JvwlvwTfhf00a2Hv8IPO86PHYHvg//An8OfwRfg/9RfzvTZ7DBvoZXQq6p6D7MCuwT+N2I92zAB/sNO0yPO8quwxf7DasABmK+d0XTVVKHnYIvG96z1i9Ymw8ep/R2obAqNdkm41e2sFct71v1/f4BiXyOJpRpHKZ918s9527B5+FvLwJWDaoR3zmvZ/bZw2HPNyMeBOTeb/BfaXaDEuVMvx2G3QDQMkW21wZsUpkp7GbIeU9zz3TI+WXTVGYCW6XRbApb1lxbTwt2VVMltS1hVWRnuWFVqhoNudbW9NchHIpc+ToO7GDE49JFtRij/ZG4gy0O7CIVIjZWNuhiw0lhK1SA6GzI8ppxKouCjTNaOWC7qWzKFrYaNw/SQOKwNVtYk4KjyAQ7RpnHCHaeCg7ugZQon7sBj3RYM62mHdmTVAaGxbiRNVmqRM3/bUvgDQCX/CcLvZsceEOF1v82dgPTrkdVVp2iXU8Q4e9ob0IHu59gUecxdwdlMwBunusGAJ1NuPr0KLoFdYQ3GGBXAiMLWC9gBRDX2gTa9g3Wp7Rbk8TqaPfjWWRp9I0kaLARVCbiXMO/xLGwdfCd7Oa4eDGQdD0fYYcJ7z/bzXHpxbWEDRaddO1FF3aSobE6pazAawztX0H7465mXWVqB2hwqWdwFeFfGaM+Wlh4V/rkMO2fpmy3VWTf5AD0NzLLkYsfn53T7fUs21k2UPmw5jBs9qZgx/AH4Ns+VxvQwJg0rGXTMPUfnhYgj0MLmayb6+TIBFZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBTZzVrg3U+Nsz1iTo7m7c+GRFU2ONGBFkyMNWNHkSANWNDl0xqbJAZ+j1/nR5HBOv6zm/8JaPjQ5KKqiyRFVpORfk8PRf3NZq8lRrd3PhiaHc6pvcLk0ORDdfGlyAFg0OdKAPUlliG76mhyGUNaDLXOaHIjuJdXkoKVKXzU5wlJZZjU5AFyKKhErFkuVbjcoUo3Apcmhnu6Ebkcmc5oczd2dZlA3YNHkUAFwUtLkcJlWnm1a1ng94AvkbKnM1SxVTKwRMphYNDkAPNiFFU0OZuPV5NDMYiyaHOgKvJoc8CVftFk1ORRsi/FxvYR3yH9qZjYba+VGkwOTw5GCzZcmByzTmhyI6ra/kNkiz4wmByD/0+T4J8AAyDkZArebBxMAAAAASUVORK5CYII=) no-repeat 13px 15px;padding:12px 20px 10px 65px}#userscriptupdater:hover,#userscriptupdater:visited:hover{color:#55698c!important;background-position:13px -85px;border-color:#8f8d96}'); }
		}
	};
	update.check();

	// Y T M A CLASS
	/**
		@param id Unique ID
		@param site Website eg: youtube, vimeo
		@param a The link
	*/
	function YTMA(id, site, a) {
		if (!YTMA.sites[site]) {
			return;
		}

		this.data = {
			id : id,
			uid : id + (YTMA.num += 1),
			site : site,
			uri : a.href,
			thumb : 1
		};

		this.spn = $$.e('span', {title: 'YouTube Me!', className : 'ylinks _' + this.data.id});
		this.spn.addEventListener('click', this.show.bind(this), false);
		this.wrp = $$.e('div', {className : 'ytmwrap'});
		this.wrs = $$.e('div', {id : 'w' + this.data.uid, className : 'yclear y_' + this.data.site});
		this.ul  = $$.e('ul', {className : 'ytmbar arialsans'});

		this.setup(a);
	}

	YTMA.num = 0;
	YTMA.sites = {
		youtube : 'https://www.youtube-nocookie.com/',
		vimeo : 'http://vimeo.com/'
		// soundcloud : 'http://soundcloud.com',
		// vine : 'https://vine.co/'
	};
	YTMA.siteByTest = {
		youtu : 'youtube',
		vimeo : 'vimeo'
		// soundcloud : 'soundcloud',
		// vine : 'vine'
	};
	YTMA.reg = {
		not  : /(?:\b(?:smallfont|user_title|spoiler)\b)/, // Class attributes to ignore
		id   : /(?:(?:youtu)(?:\.be\/|.*?(?:v\=|#p\/u\/\d*?\/)|.*?(?:v\=|#p\/c\/[a-zA-Z0-9]+\/\d*?\/))([A-Za-z0-9-_]{11}))|(?:vimeo\.com\/(\d+))/i, //|(?:vine\.co\/v\/([A-Za-z0-9-_]{11}))|(?:soundcloud\.com\/(.+?\/.+))
		site : /(youtu)|(vimeo)|(vine)/,
		time : /(?:t\=(?:(\d+)m)?(\d+)?s?)/,
		ios  : /(?:\b(?:ipod|iphone|ipad))\b/i
	};
	YTMA.img = {
		play : {
			youtube : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAXCAYAAACMLIalAAAACXBIWXMAAAsSAAALEgHS3X78AAADJElEQVRIx81WTWsbVxQ9782bL5kWSgUuuDbdhPyBrmqQCBSs4kXwpjQmm/yALpyf0IVJtsnWKAVBjbKSITWi4NLYqJumcYvpRrjpxhiDbIITyaN5H/d2YTu17AGP/BF64THDMPe88869794rmBnH9tXUbWjTj5Lk7UMhcI+ZP8A1mhCCmfkX34++jaMP/2r+tAQAUCd/0rov+2mv6py9AwEIiOvkBAYLMG4RJ00p/DKAV2dIeX5wu/+mc0dKD+BDt/dhbPWnVunvANw9Q+rtm71vwAxy7jzZYa1FmqaQUiIMQ0gpAeYLHyNNDyrH7wOkkqT3mRDiXIWstRgbG8NUpYJ2u41fWy30ej3EcYxD/+GNKP04kxQRyTwA3W4XU5UK5ubmwADWnj9HrVZDq9WCMQZRFF2YXBapXOo75xBF0WEoAZTKZZTKZayuruL7J0+wtrYGIrowuQFSjiiXkyOCO8q746eUEqVSCZOTk2g2m1hYWMD6+jo8KRGE4VCk5CmlhloAwMxgZjjnYK2FEALT09NYXFzE/Pw8xicm0O12c+OdIeWcG2pl+RhjkKYplFKYnZ1FvV7HzMwMkiTJhXcmfJwzfEwEcjQQvtNl0TkHz5MYHR3FxPg4rDHwlbrmnCJ3tLn9jwoDQgBBEEAphY2NDTx69BjLy8vwgyA3vjodvry3z1oDYwy01u++B0GAIPDRbrdRrVbRaCxhf38fIyMjYOaBvBmmJOQsdHSUPymM0VBKIYoibG7+jVqthkZjCZ3OLgqFGHEc58a9lFJEBK01hJBQSmF7exv1+lPU60+xs7ODOI5RKMRDYV5aqcD3sbLyM27evIGXL//As2c/YmtrC2EYolAoDIWV2VtPzlPFYvE3AJ/nmINgjAERwVr7LrEva7u7uyJLqddSnt/+mBlKKTAzgiC4qtmqn1k8i8VPVojy58Blmu7pQ4Z+9Gcmqb29TlVK+Q/eswkhcHDQe5BJyvNkh4i/ZuZNIcSVKXGO0n2t9f2knzQyb58QEkT0QgjxhbX2LhF9qZT6yPO8qx1/Dxu4cc698DzvB6317ycFGLh9/xf7F99PHfxrdBcwAAAAAElFTkSuQmCC',
			vimeo   : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAXCAYAAACMLIalAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAalJREFUeNrMl79PwkAUx6/XH1SUCAmLCaCTMammYdKB0bnp3r+AkT+AjakbIwNbNwdgYMDJGCbDbEhHFhckBaECLa3vQps46GChHt/kc/On7727vDJom0vgDuAAH9HJG/AM2AwcV4ABZAAP0QtxeQB0Upl7IA2sEN0IwC1wg+FgKVcojB94JDDFGfpVDu/4ZbEkqpQvSVJCFEUmDrmoUp6maaeDweCiXC6nOY5jDkEKQZUQVEus1+tnRA4kU8lkktlHayNLed72wvI8z8iyLBqGkev3++eqqp5ks1k2EPP/VeqnFIvFo1arlQdyiqKkCoUCjzGmKxWmVCoddzqdfKVSyQiC8Od54+KQWiwWG2jntN1uzx3HQdSloHWzRqNh9Xq9eTBTmJqUaZqrWq027na788lk4gYykZ6KnaWWy6Wn6/q42WxOR6ORs49Z3UkKZmZWrVbHw+Fw5bquH7Uy+5JioVXvtm176/X6+z6EaEohy7JiW3fCfepQQqrNEqlPslgdwF6Fg859kOMJ0ACJ4kpMhMgz8gi8hsN5DcjBz8OGUttM4AWYfQkwAOU+isXJ6aEzAAAAAElFTkSuQmCC'
		},
		fav : {
			youtube : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAABUUlEQVQ4y8WTP0sDQRDFf3e3iQlBIQeCYAgaEVGMTRr9AKnERtTCwg9hYWkRBBEFEf+g4OcwgWgTRSy0EhTBKmAnsYiex2Yva2GUZCMRKxceu8O893YGZuC/j3XlxqLAMTACpIHwL5pbQAJ3k5W3JaE0q8DiHz5NN+7MRTz2ZCt0VqFpRhAOMbR3SCiVwswZyNo1SNaAZgSRCO7cAhOnJeKz85j5JiRtqXGlhma818H3faRtM7i9y8DWDqorgsmTGldIcNrb1Hie9x11T8+QCAIeV5ZNoiNqWrfL660GL+UypYN9Ej9whYQAowqNxvd9AO4Lec7X1xiVPtKyTH0gpKYC9LYYqDpetcrZ5gbP+RPGhY2DhWwvoGId9USvgUyLLXApFcPCoc+2Os3EjVDoomkAMBX+7EqhOxkUhdLkgH5g7GvCOggegNfGuwDk/n0Z+QAjkqDhSKnyRwAAAABJRU5ErkJggg==',
			vimeo   : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABhQTFRFutjhDKrTKqzN+Pz9H5CxT7nVis7g////lqc5nAAAAAh0Uk5T/////////wDeg71ZAAAAP0lEQVR42iTMyREAMAgCQASP/jsOGj7s8AATPxzwUDai0AG1SQhsYdeEolVLt8c8llZHYuXyTeb9YYo/8wQYAC81AOQXjj+CAAAAAElFTkSuQmCC'
		},
		css : {
			bar  : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAuCAIAAABmjeQ9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFBJREFUeNp0jNENgEAIQ6EuwSre/vOcC1jwegkfJkryQqEUO8fANSeyCiTBm6hKZL6p5ZvZJ/KavhURcWh2941K/e9PA90os3RnW2uf5CPAAIQ5NuW1miKmAAAAAElFTkSuQmCC',
			load : 'data:image/gif;base64,R0lGODlhDgAKAJEAAP///+BKV////wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgACACwAAAAADgAKAAACHFSOeQYI71p6MtAJz41162yBH+do5Ih1kKG0QgEAIfkEBQoAAgAsAAABAA0ACAAAAhSUYGEoerkgdIzKGlu2ET/9ceJmFAAh+QQFCgACACwAAAEADQAIAAACFJRhcbmiglx78SXKYK6za+NxHyYVACH5BAUKAAIALAAAAQANAAgAAAIWVCSAl+hqEGRTLhtbdvTqnlUf9nhTAQAh+QQFCgACACwAAAEADQAIAAACFZRiYCh6uaCRzNXYsKVT+5eBW3gJBQAh+QQJCgACACwAAAAADgAKAAACGpSPaWGwfZhwQtIK8VTUvuxpm9Yp4XlmpiIUADs='
		}
	};

	YTMA.selector = 'a[href*="youtube."], a[href*="youtu.be"], a[href*="vimeo.com"]'; //, a[href*="vine.co"]
	YTMA.pod = YTMA.reg.ios.test(navigator.userAgent);
	YTMA.ie = document.documentMode; // IE, basically | window.navigator.cpuClass

	/**
		0 "Frame", 1 Flash // 3 Hidden, 4 Small (240p), 5 Medium (360p), 6 Large (480p), 7 (720p) // 1 4:3, 2 16:9, 3 10:16 // Description // URL Anchor
		// 4 240, 5 360, 6 480, 7 720, 8 1080
	 */
	YTMA.user = {
		init : function () {
			this.load();
			if (strg.on) {
				this.form();
				this.mark();
			}
		},
		defaults : function () {
			return {
				focus : 0,
				desc : 1, // Autoload descriptions. 1 = Yes, 0 = No
				flash : YTMA.pod || YTMA.ie ? 0 : 1, // if iOS or IE9+, use "html5" player
				ratio : 2,
				size : 360,
				quality : 360
			};
		},
		load : function () {
			var s = strg.grab('ytmasetts', {}), d = this.defaults();// if(s){console.log(s);}
			YTMA.user.opt = {
				flash   : isNaN(s.flash) ? d.flash : +s.flash,
				size    : isNaN(s.size) || s.size < 240 ? d.size : +s.size,
				ratio   : isNaN(s.ratio) ? d.ratio : +s.ratio,
				desc    : isNaN(s.desc) ? d.desc : +s.desc,
				focus   : isNaN(s.focus) ? d.focus : +s.focus,
				quality : isNaN(s.quality) ? d.quality : +s.quality
			};
			// console.log(YTMA.user.opt.toSource());
			// console.log(YTMA.user.opt);
		},
		save : function (evt) {
			var e = evt.target;
			if (e.tagName.toLowerCase() === 'input') {
				switch (e.name) {
				case 'ytmaframe':
					YTMA.user.opt.flash = +e.checked;
					break;
				case 'ytmasize':
					YTMA.user.opt.size = e.value;
					break;
				case 'ytmaratio':
					YTMA.user.opt.ratio = +e.value;
					break;
				case 'ytmainfo':
					YTMA.user.opt.desc = +e.checked;
					break;
				case 'ytmafocus':
					YTMA.user.opt.focus = +e.checked;
					break;
				case 'ytmaiq':
					YTMA.user.opt.quality = +e.value;
					break;
				default:
					return;
				}
				YTMA.user.error.className = strg.save('ytmasetts', YTMA.user.opt) ? 'ytnone' : '';
				YTMA.user.load(); // console.log('n'+YTMA.user.opt.toSource()); console.log('n'+YTMA.user.opt);
			}
		},
		mark : function () {
			var a = {};
			a.ytmaframe = !!YTMA.user.opt.flash;
			a.ytmainfo = !!YTMA.user.opt.desc;
			a.ytmafocus = !!YTMA.user.opt.focus;
			a['ytmaratio' + YTMA.user.opt.ratio] = true;
			a['ytmasize' + YTMA.user.opt.size] = true;
			a['ytmaiq' + YTMA.user.opt.quality] = !!YTMA.user.opt.quality;
			$$.o(a, function (idx, bool) {
				try {
					document.getElementById(idx).checked = bool;
				} catch (e) {}
			});
		},
		reset : function () {
			YTMA.user.opt = YTMA.user.defaults();
			YTMA.user.mark();
			strg.wipe('ytmasetts');
		},
		form : function () {
			var f = [
				'<form action=""><div id="ytmasettingst">YouTube Me Again! Persistent Site Settings</div><p><small>Change video defaults.</small></p><div id="ytmaclears"><fieldset><legend>Information</legend><p><input name="ytmainfo" type="checkbox" id="ytmainfo" value="info" /><label for="ytmainfo">Load titles and descriptions automatically.</label></p></fieldset><fieldset><legend>Flash Support</legend><p><input name="ytmaframe" type="checkbox" id="ytmaframe" value="f" /><label for="ytmaframe">Use Flash.*</label></p></fieldset>',
				'<fieldset id="ytmasizefield"><legend>Player Size</legend><p><span class="ytmahalf"><input type="radio" name="ytmasize" value="240" id="ytmasize240" /><label for="ytmasize240">S <small>240p</small></label></span><span class="ytmahalf"><input name="ytmasize" type="radio" id="ytmasize360" value="360" /><label for="ytmasize360">M <small>360p</small></label></span><span class="ytmahalf"><input type="radio" name="ytmasize" value="480" id="ytmasize480" /><label for="ytmasize480">L <small>480p</small></label></span><span class="ytmahalf"><input type="radio" name="ytmasize" value="720" id="ytmasize720" /><label for="ytmasize720">X <small>720p</small></label></span></p></fieldset>',
				'<fieldset><legend>Quality</legend><p><span class="ytmahalf"><input name="ytmaiq" value="240" id="ytmaiq240" type="radio"><label for="ytmaiq240">240p</label></span><span class="ytmahalf"><input name="ytmaiq" id="ytmaiq360" value="360" type="radio"><label for="ytmaiq360">360p</label></span><span class="ytmahalf"><input name="ytmaiq" value="480" id="ytmaiq480" type="radio"><label for="ytmaiq480">480p</label></span><span class="ytmahalf"><input name="ytmaiq" value="720" id="ytmaiq720" type="radio"><label for="ytmaiq720">720p</label></span><span class="ytmahalf"><input name="ytmaiq" value="1080" id="ytmaiq1080" type="radio"><label for="ytmaiq1080">1080p</label></span></p></fieldset>',
				'<fieldset><legend>Window Focus</legend><p><input name="ytmafocus" type="checkbox" id="ytmafocus" value="focus" /><label for="ytmafocus">After clicking the thumbnail, set the video at the top of the window.</label></p></fieldset>',
				'<fieldset><legend>Aspect Ratio</legend><p><span class="ytmahalf"><input name="ytmaratio" type="radio" id="ytmaratio2" value="2" /><label for="ytmaratio2">16:9</label></span><span class="ytmahalf"><input type="radio" name="ytmaratio" value="1" id="ytmaratio1" /><label for="ytmaratio1">4:3</label></span><span class="ytmahalf"><input type="radio" name="ytmaratio" value="3" id="ytmaratio1" /><label for="ytmaratio1">6:19</label></span></p></fieldset>',
				'</div><p><small id="ytmasettingserror" class="ytnone">Error! Your settings could not be saved.</small></p><p id="ytmaopts"><small id="ytmaclose">Close</small> <small id="ytmareset">Reset</small> <small>*Disable this option for iOS and other devices.</small></p></form>'
			].join('');

			YTMA.form = $$.e('div', {id : 'ytmasettings', className : 'ytnone', innerHTML : f}, document.body);
			YTMA.user.error = document.getElementById('ytmasettingserror');

			YTMA.form.addEventListener('click', YTMA.user.save, false);
			document.getElementById('ytmaclose').addEventListener('click', YTMA.user.toggle, false);
			document.getElementById('ytmareset').addEventListener('click', YTMA.user.reset, false);
		},
		toggle : function (force) {
			YTMA.form.className = (force === true || /(?:ytnone)/.test(YTMA.form.className)) ? '' : 'ytnone';
		}
	};
	YTMA.css = function () {
		update.css(['\n/* youtube me again! */\n.yclear,.ytmwrap,object{clear:both;text-align:left}.yclear{overflow:auto;margin:0 0 6px}#ytmasettings,.arialsans{font-family:Arial,Helvetica,sans-serif!important}.ylinks{display:block;width:118px;height:68px;overflow:hidden;font-style:normal;background-color:#111!important;background-repeat:no-repeat!important;background-position:center -11px!important;cursor:pointer;-moz-border-radius:2px;border-radius:1px;position:relative;float:left;-moz-box-shadow:0 0 2px #222;box-shadow:0 0 2px #222;margin:4px}.ylinks img{border:0;opacity:1;top:28px;left:42px;z-index:9;position:absolute}.ylinks:hover img{opacity:.9}.ytmainit{display:block;background:#111;color:#fff;text-shadow:#333 0 0 2px;opacity:1.0;text-align:left;font-size:11px;margin:0;padding:3px;-moz-border-radius:2px 2px 0 0;border-radius:2px 2px 0 0;height:12px}.ytmainit:after{content:" "; display:block; width:104%; height:52px; background: url(', YTMA.img.play.youtube, ') no-repeat center center;}.ytmainit:hover:after{opacity:.9}.y_vimeo .ytmainit:after{background-image: url(', YTMA.img.play.vimeo, ');}.ytmwrap{overflow:hidden;font-style:normal;margin:3px 0 0;padding:1px 2px} ul.ytmbar{overflow:hidden;margin:0;padding:3px 0 4px;list-style-position:outside !important}.ytmbar li{-webkit-user-select:none;-moz-user-select:none;-o-user-select:none;user-select:none;list-style-type:none;cursor:pointer;float:left;color:#858585;border:1px solid #222;border-bottom:1px solid #000;box-shadow:0 0 1px #333;height:14px;font-size:12px!important;line-height:12px!important;background:#161616 url(', YTMA.img.css.bar, ');margin:0 !important;padding:5px 9px 3px !important}.yliop{-moz-border-radius:2px 0 0 2px;border-radius:2px 0 0 2px}.ylimi{border-left:0!important}li.ylicl{border-left:0!important;-moz-border-radius:0 2px 2px 0;border-radius:0 2px 2px 0;margin:0 2px 0 0 !important}.ylicr{-moz-border-radius:2px;border-radius:2px}.ytmbar li:hover{color:#ccc;text-shadow:1px 1px 0 #333;background:#222 url(', YTMA.img.css.bar, ') 0 -23px} .ytmbar li[id]{color:#ddd;text-shadow:0 0 2px #444} span.yloading{font-style:italic;background:url(', YTMA.img.css.load, ') 0 3px no-repeat;text-indent:17px}.ypg,.ypgv{background:url(', YTMA.img.fav.youtube, ') 2px -1px no-repeat !important;-moz-border-radius:1px;border-radius:1px;padding:0 3px 0 21px !important}.ypgv{background:url(', YTMA.img.fav.vimeo, ') 3px 2px no-repeat !important;padding:0 3px 0 16px !important}.ypg b,.ypg strong{font-weight:400!important}.ypg u{text-decoration:none}.ypg i,.ypg em{font-style:normal}.ypg:hover{background-color:#fff}.ytitled{float:left;max-width:500px;font-style:normal;font-weight:700;margin:5px 0 0 3px}.yterror{color:#CC2F24;font-style:italic} q[ondblclick]{cursor:pointer}.ydescr{display:block;word-wrap:break-word;font-weight:400;max-height:48px;overflow:auto;padding-right:20px}.ydescropen{resize:both;white-space:pre-line;}.ydescropen[style]{max-height:none}#ytmasettings{font-size:12px;width:410px;border-radius:3px;background:#fbfbfb;border:1px solid #bbb;color:#444;box-shadow:0 0 5px rgba(0,0,0,.2), 0 0 3px rgba(239,239,239,.1) inset;margin:1px 0 5px;padding:4px 8px 0}#ytmasettings *{font-weight:400}#ytmasettings p{font-size:12px;clear:both;margin:5px 0;padding:0}#ytmaclears{overflow:hidden}#ytmasettings fieldset{border-radius:3px;border:1px solid #ccc;display:inline-block;width:180px;margin:0 2px;padding:4px 7px 9px}#ytmasettings p>input{margin:3px 3px 0 4px !important}#ytmasettings p>span>input[type=radio]{margin:3px 5px!important}#ytmasettingst{font-size:14px;border-bottom:1px dashed #D00;margin-bottom:6px;padding:0 3px 3px}#ytmasettings .ytmahalf{width:80px;display:inline-block}#ytmasettings .ytmahalf label{width:50px;display:inline-block;cursor:pointer}#ytmasettingserror{font-weight:700;color:#d00}#ytmaopts small{cursor:pointer;display:inline-block;margin-right:20px}#ytmaopts small:hover{color:#222}.ytnone,.ypg br{display:none}'].join(''));
	};
	YTMA.jid = {
		sites: {},
		init: function () {
			$$.o(YTMA.sites, function (site) {
				YTMA.jid.sites[site] = {
					set: {},
					current: 0,
					length: 0,
					throttle: null
				};
			});
		},
		add: function (id, site) {
			if (!this.sites[site].set[id]) {
				this.sites[site].set[id] = true;
				this.sites[site].length += 1;
			}
		}
	};
	YTMA.json = {
		maxBatch : 50,
		intervals : [250, 10000],
		start: function () {
			var time = 0;
			if (YTMA.jid.sites.youtube.length > 100) {
				time = 2500;
				YTMA.json.intervals[1] = 15000;
			}
			$$.o(YTMA.sites, function (site) {
				return new YTMA.json.Batch(site, time);
			});
		},
		contentScope : function () {
			var $Y_T_M_A = {
				version: 'ytma.4.1.dat',
				cb: function (json) {
					var o, site;
					if (json.provider_name) {
						site = 'soundcloud';
						o = $Y_T_M_A.fn.soundcloud(json);
					} else if (json.entry) {
						site = 'youtube';
						o = $Y_T_M_A.fn.youtube(json.entry);
					} else { // Object.prototype.toString.call(json) === '[object Array]'
						site = 'vimeo';
						o = $Y_T_M_A.fn.vimeo(json[0]);
					}
					if (o.desc && o.desc.length > 140) {
						o.full = o.desc;
						o.desc = o.desc.substr(0, 130) + ' . . .';
					}
					$Y_T_M_A.set(site, o);
					$Y_T_M_A.proc(o);
				},
				fn: {
					soundcloud: function (j) {
						return {
							id: unescape(j.html).match(/tracks\/(\d+)/)[1],
							title: j.title,
							desc: j.description,
							th: j.thumbnail_url
						};
					},
					vimeo: function (j) {
						return {
							id: j.id,
							title: j.title + ' ' + $Y_T_M_A.secs(j.duration),
							desc: j.description.replace(/<br.?.?>/g, ''),
							th: unescape(j.thumbnail_medium)
						};
					},
					youtube: function (j) {
						var o = { id: j.media$group.yt$videoid.$t };
						if (!j.media$group.yt$duration) {
							o.error = true;
						} else {
							o.title = j.title.$t + ' ' + $Y_T_M_A.secs(j.media$group.yt$duration.seconds);
							o.desc = j.media$group.media$description.$t;
						}
						return o;
					}
				},
				data: {},
				set: function (site, obj) {
					if (!this.data[site]) {
						this.data[site] = {};
					}
					this.data[site][obj.id] = obj;
					this.save();
				},
				read: function (d) {
					try {
						d = JSON.parse(localStorage.getItem(this.version));
						if (d instanceof Object) {
							this.data = d;
						}
					} catch (e) { console.error(e); }
					// alert(this.data);
				},
				save: function () {
					try {
						// count this.data props < 1300
						localStorage.setItem(this.version, JSON.stringify(this.data));
					} catch (e) {}
				},
				secs: function (secs) {
					var p, H, M, S;
					try {
						H = Math.floor(secs / 3600) % 60;
						M = H ? ('0' + Math.floor(secs / 60) % 60).slice(-2) : Math.floor(secs / 60) % 60;
						S = ('0' + secs % 60).slice(-2);
						p = [' (', H ? H + ':' : '', M, ':', S, ')'].join('');
					} catch (e) {}
					return p;
				},
				proc: function (data) {
					if (data.error) {
						return $Y_T_M_A.select('.ytitled._' + data.id, function (el) {
							el.textContent = 'Error, unable to load data.';
							el.className = 'yterror ytitled';
						});
					}

					if (data.th) { // for Vimeo thumbs
						$Y_T_M_A.select('.ylinks', function (el) {
							el.setAttribute('style', 'background: url(' + data.th + ')');
						});
					}

					$Y_T_M_A.select('.ytitled._' + data.id, function (el) {
						var q;
						el.textContent = data.title;
						el.className = 'ytitled _' + data.id;
						if (data.desc) {
							q = document.createElement('q');
							q.className = 'ydescr';
							q.textContent = data.desc;
							if (data.full) {
								q.setAttribute('data-full', data.full);
								q.title = 'Click to toggle the length of the description.';
								q.ondblclick = $Y_T_M_A.titleToggle;
							}
							el.appendChild(q);
						}
					});
				},
				select: function (selector, cb) {
					var s = document.querySelectorAll(selector), i = -1;
					while (++i < s.length) {
						cb(s[i]);
					}
				},
				titleToggle: function () {
					this.className = this.className === 'ydescr' ? 'ydescr ydescropen' : 'ydescr';
					this.textContent = this.textContent.length < 140 ? this.getAttribute('data-full') : this.getAttribute('data-full').substr(0, 130) + ' . . .';
				}
			};
			return $Y_T_M_A;
		},
		runner : function () { // content-scrope runner
			update.js('var $Y_T_M_A = (' + this.contentScope + ')(); $Y_T_M_A.read();');
		},
		script : function (id, site) {
			var s = $$.e('script', { id : id, src : YTMA.DB.json[site].replace('%id', id) });
			s.addEventListener('error', YTMA.json.errors, false);
			s.addEventListener('load', YTMA.json.loads, false);
			document.body.appendChild(s);
		},
		loads : function () { // console.log('loads');
			document.body.removeChild(this);
		},
		errors : function () {
			$$.s('.ytitled._' + this.id, function (el) {
				el.textContent = 'Error, unable to load video data.';
				el.className = 'yterror ytitled';
			});
			document.body.removeChild(this);
		}
	};

	YTMA.$ = YTMA.json.contentScope();
	YTMA.$.data = strg.grab(YTMA.$.version, {});

	YTMA.json.Batch = function (site, time) {
		this.site = site;
		this.ref = YTMA.jid.sites[site];
		this.fromStorage();
		this.timeouts(time);
	};
	YTMA.json.Batch.prototype = {
		constructor: YTMA.json.Batch,
		fromStorage: function () {
			$$.o(this.ref.set, function (id) { // console.log('current:', id, this.ref.current);
				if (strg.on && YTMA.$.data[this.site] && YTMA.$.data[this.site][id]) {
					console.log('from strg', id);
					delete this.ref.set[id];
					this.ref.length -= 1;
					YTMA.$.proc(YTMA.$.data[this.site][id]);
					return;
				}
			}.bind(this));
		},
		timeouts : function (ms) {
			if (this.ref.throttle) { // console.log('clear YTMA.json.throttle');
				window.clearInterval(this.ref.throttle);
			}
			if (this.ref.length > 0) {
				console.log(YTMA.json.intervals[1]);
				window.setTimeout(this.setInterval.bind(this), ms);
			}
		},
		setInterval: function () {
			this.ref.throttle = window.setInterval(this.loader.bind(this), YTMA.json.intervals[0]);
		},
		loader : function () {
			console.log(this.ref.length);
			if (this.ref.length > 0) {
				$$.o(this.ref.set, function (id) { // console.log('current:', id, this.ref.current);

					delete this.ref.set[id];
					this.ref.length -= 1;
					this.ref.current += 1;
					YTMA.json.script(id, this.site);

					if (this.ref.current > 0 && this.ref.current % YTMA.json.maxBatch === 0) {
						this.timeouts(YTMA.json.intervals[1]); // console.log('000');
						return false;
					}
				}.bind(this));
			} else {
				window.clearInterval(this.ref.throttle); // console.log('cleared: loader');
			}
		}
	};
	YTMA.getIdAndSite = function (uri) {
		var id, site;
		try {
			site = YTMA.siteByTest[YTMA.reg.site.test(uri) ? RegExp.lastMatch : ''];
			id = uri.href.match(YTMA.reg.id).filter(function (i) { return i; })[1];
			if (id && site) {
				// console.log(id, site);
				return [id, site];
			}
			throw TypeError('invalid id/site: ' + uri);
		} catch (e) {
			console.log(e);
			return false;
		}
	};
	YTMA.factory = function () {
		$$.s(this.selector, function (el, i) {
			var p = el.parentNode,
				idSite = YTMA.getIdAndSite(el);
			if (p && !YTMA.reg.not.test(p.className) && idSite) {
				YTMA.set[idSite[0] + '_' + i] = new YTMA(idSite[0], idSite[1], el);
			}
		});
		// console.log(YTMA.set);
		if (YTMA.user.opt.desc) {
			YTMA.json.start();
		}
	};
	YTMA.set = [];
	YTMA.init = function () {
		if (!this.initializer) {
			this.initializer = true;
			YTMA.css();
			YTMA.jid.init();
			YTMA.user.init();
			YTMA.json.runner();
			YTMA.factory();
		}
	};
	YTMA.DB = {
		ratios : {
			1 : 3 / 4,
			2 : 9 / 16,
			3 : 16 / 10
		},
		sizes : {
			0   : 0,
			240 : 360,
			360 : 640,
			480 : 853,
			720 : 1280
		},
		qualities : {
			240  : 'small',
			360  : 'medium',
			480  : 'large',
			720  : 'hd720',
			1080 : 'hd1080'
		},
		json : {
			youtube : 'https://gdata.youtube.com/feeds/api/videos/%id?v=2&alt=json-in-script&callback=$Y_T_M_A.cb',
			vimeo : 'http://vimeo.com/api/v2/video/%id.json?callback=$Y_T_M_A.cb',
			soundcloud : 'http://soundcloud.com/oembed?format=json&callback=$Y_T_M_A.cb&iframe=' + true + '&url=' // (!!YTMA.user.opt.flash) http://soundcloud.com/matas/hobnotropic
		},
		sources : {
			youtube : function () {
				return [['text/html', YTMA.sites[this.parent.data.site] + 'embed/' + this.parent.data.id + '?theme=dark&color=white&showinfo=1&vq=' + this.$quality + '#at=' + this.$start],
					['application/x-shockwave-flash', YTMA.sites[this.parent.data.site] + 'v/' + this.parent.data.id + '?version=3&theme=dark&color=white&showinfo=1&vq=' + this.$quality + '&start=' + this.$start]];
			},
			vimeo : function () {
				return [['text/html', 'http://player.vimeo.com/video/' + this.parent.data.id + '?badge=0'], false];
			},
			vine : function () {
				return [['text/html', 'https://vine.co/v/' + this.parent.data.id + '/embed#/simple', 'vine-embed'], false];
			},
			soundcloud : function () {
				return [['text/html', 'https://w.soundcloud.com/player/?url=http://api.soundcloud.com/tracks/' + this.parent.data.id], false];
			}
		}
	};
	/**
		@param parent YTMA object
	*/
	YTMA.Player = function (parent) {
		this.parent = parent;
		this.$obj = this.$quality = this.$size = this.$ratio = this.$source = null;
		this.init_start();
		this.$quality = YTMA.DB.qualities[YTMA.user.opt.quality] || YTMA.DB.qualities[360];
		this.$source = YTMA.DB.sources[this.parent.data.site].call(this)[YTMA.user.opt.flash] || YTMA.DB.sources[this.parent.data.site].call(this)[(YTMA.user.opt.flash + 1) % 2];
		this.init_frame();
		this.size();
	};
	YTMA.Player.prototype = {
		constructor : YTMA.Player,
		dimmensions : function (n) {
			// var bar = (this.parent.data.site === 'youtube' && this.$size > 0) ? 30 : 0; // +30 pixels for the youtube bar
			this.$ratio = n === null || isNaN(n) ? YTMA.user.opt.ratio : n;
			console.log(n, this.$ratio, YTMA.user.opt.ratio);
			this.$obj.height = Math.round(this.$obj.width * YTMA.DB.ratios[this.$ratio]); // + bar;
		},
		size : function (n) {
			this.$size = isNaN(n) ? YTMA.user.opt.size : n;
			this.$obj.width = YTMA.DB.sizes[this.$size] > -1 ? YTMA.DB.sizes[this.$size] : YTMA.DB.sizes[360];
			this.dimmensions(this.$ratio);
		},
		reset : function () {
			this.size();
			this.parent.selected.item.call(this.parent, this.parent.ul.querySelector('li[n="' + this.$size + '"]'), 'size');
		},
		init_start : function () {
			try {
				var m = this.parent.data.uri.match(YTMA.reg.time);
				m = [m[1] * 60, +m[2]];
				this.$start = m[1] ? m[0] + m[1] : m[0];
			} catch (e) { this.$start = 0; }
		},
		init_frame : function () {
			// console.log(this.$source);
			if (YTMA.user.opt.flash && this.$source[0] === 'application/x-shockwave-flash') {
				this.$obj = $$.e('object', {type : 'application/x-shockwave-flash', data : this.$source[1]});
				$$.a(this.$obj, $$.e('param', { name : 'movie', value : this.$obj.data }), $$.e('param', {name : 'AllowScriptAccess', value : 'always'}), $$.e('param', {name : 'allowFullScreen', value : 'true'}));
			} else {
				this.$obj = $$.e('iframe', {$frameborder : 0, $allowfullscreen : 'always', type : 'text/html', src : this.$source[1], className: this.$source[2] || ''});
			}
		}
	};
	YTMA.prototype = {
		// constructor : YTMA,
		settings : function (evt) {
			var e = evt.target,
				n = +e.getAttribute('n'),
				t = e.getAttribute('data-type'),
				b = false;
			if (e.tagName.toLowerCase() === 'li') {// switch or this.settings.fire[t].call(this, e, n)
				if (t === 'settings') {
					if (YTMA.form.parentNode != this.wrp) {
						b = !!this.wrp.insertBefore(YTMA.form, this.ul.nextSibling);
					}
					YTMA.user.toggle(b);
				} else if (t === 'close') {
					this.toggle();
				} else if (t === 'ratio') {
					this.player.dimmensions(n);
					this.selected.item.call(this, e, 'ratio');
				} else if (t === 'size') {
					this.player.size(n);
					this.selected.item.call(this, e, 'size');
				}
			}
		},
		selected : {
			size : null,
			ratio: null,
			item : function (e, type) {
				e.id = type + this.data.uid;
				try {
					this.selected[type].removeAttribute('id');
				} catch (er) {}
				this.selected[type] = e;
			}
		},
		manual : function (e) {
			e.preventDefault();
			var p = e.target.parentNode;
			p.className += ' yloading';
			p.textContent = 'Loading data . . .';
			YTMA.json.script(this.data.id, this.data.site);
		},
		setup : function (link) {
			var className = this.dom.mod[this.data.site].call(this, link);
			this.dom.link.call(this, link, className);
			this.dom.span.call(this);
		},
		dom : {
			li : function (type, txt, n, t, c) {
				var l = $$.e('li', {'$data-type' : type, textContent : txt, $n : n, title : t, className : c});
				if ((type === 'size' && this.player.$size === n) || (type === 'ratio' && this.player.$ratio === n)) {
					this.selected.item.call(this, l, type);
				}
				return l;
			},
			link : function (link, css) {
				if (link.getElementsByTagName('img').length === 0 && css) {
					link.className += ' ' + css;
				}
				link.title = 'Visit the video page.';
				link.parentNode.insertBefore(this.wrs, link.nextSibling);
			},
			mod : { // modifies the link or other site-specific items; return css class for the link
				youtube : function (a) {
					this.spn.addEventListener('mouseover', this.thumb.start.bind(this), false);
					this.spn.addEventListener('mouseout', this.thumb.stop.bind(this), false);
					this.spn.style.backgroundImage = ['url(https://i3.ytimg.com/vi/', this.data.id, '/', this.data.thumb, '.jpg)'].join('');
					a.href = a.href.replace('http:', 'https:').replace('youtu.be/', 'youtube.com/watch?v=');
					return 'ypg';
				},
				vimeo : function () {
					this.spn.title = 'Vimeo Me Too!';
					return 'ypgv';
				},
				vine : function () {
					this.spn.title = 'Vine Me!';
					return 'ypgvine';
				},
				soundcloud: function () {
					this.spn.title = 'Sound Off!';
					return 'ypgsc';
				}
			},
			ui : function () {
				var close = 'ylicr', f = document.createDocumentFragment();

				// todo, YTMA.db.SIZE.PORTRAIT, etc
				$$.a(f,
					this.dom.li.call(this, 'ratio', '4:3', 1, 'SD', 'yliop'),
					this.dom.li.call(this, 'ratio', '16:9', 2, 'Widescreen', 'ylimi'),
					this.dom.li.call(this, 'ratio', '10:16', 3, 'Portrait', 'ylicl'),
					this.dom.li.call(this, 'size', '\u00D8', 0, 'Hide the video.', 'yliop'),
					this.dom.li.call(this, 'size', 'S', 240, '240p', 'ylimi'),
					this.dom.li.call(this, 'size', 'M', 360, '360p', 'ylimi'),
					this.dom.li.call(this, 'size', 'L', 480, '480p', 'ylimi'),
					this.dom.li.call(this, 'size', 'X', 720, '720p', 'ylicl'));

				if (strg.on) {
					f.appendChild(this.dom.li.call(this, 'settings', '!', null, 'Edit YTMA\'s settings.', 'yliop'));
					close = 'ylicl';
				}

				f.appendChild(this.dom.li.call(this, 'close', '\u00D7', null, 'Close the video.', close));

				this.ul.appendChild(f);
				this.ul.addEventListener('click', this.settings.bind(this), false);
				this.wrp.appendChild(this.ul);
				this.spn.parentNode.insertBefore(this.wrp, this.spn.nextSibling);
			},
			span : function () {
				var a, f = document.createDocumentFragment();

				$$.e('span', {className : 'ytmainit arialsans', textContent : this.spn.title}, this.spn);
				f.appendChild(this.spn);
				if (YTMA.user.opt.desc) {
					YTMA.jid.add(this.data.id, this.data.site);
					f.appendChild($$.e('span', {className : 'ytitled yloading _' + this.data.id,  textContent : 'Loading data . . .' }));
				} else {
					a = $$.e('a', { textContent: 'Load description.', href: '#', title: 'Load this video\'s description.' });
					a.addEventListener('click', this.manual.bind(this), false);
					f.appendChild($$.a($$.e('span', {className : 'ytitled ymanual _' + this.data.id}), a));
				}
				this.wrs.appendChild(f);
			}
		},
		createPlayer : function () {
			this.player = new YTMA.Player(this);
			this.dom.ui.call(this);
		},
		show : function () {
			if (!this.player) {
				this.createPlayer();
			}
			this.toggle(true);
			if (YTMA.user.opt.focus) {
				document.location.set = '#' + this.wrs.id;
			}
		},
		toggle : function (show) {// the object is removed from or reattached to the DOM
			if (show) {
				if (this.player.$size === 0) {
					this.player.reset();
				}
				this.spn.className += ' ytnone';
				this.wrp.className = this.wrp.className.replace(' ytnone', '');
				this.wrp.appendChild(this.player.$obj);
			} else {
				this.spn.className = this.spn.className.replace(' ytnone', '');
				this.wrp.className += ' ytnone';
				this.wrp.removeChild(this.player.$obj);
			}
		},
		thumb : {
			start : function () {
				this.data.thumb = this.data.thumb < 3 ? this.data.thumb + 1 : 1;
				this.spn.style.backgroundImage = ['url(https://i3.ytimg.com/vi/', this.data.id, '/', this.data.thumb, '.jpg)'].join('');
				this.data.timeout = window.setTimeout(this.thumb.start.bind(this), 1000);
			},
			stop : function () {
				window.clearTimeout(this.data.timeout);
			}
		}
	};
	YTMA.init();

}());