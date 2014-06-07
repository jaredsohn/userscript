// ==UserScript==
// @id             WhutBBCode
// @name           WhutBBCode?
// @namespace      hateradio)))
// @author         hateradio
// @version        3.0.2
// @description    This is a cross-browser BBCode helper. It works with both What.CD and Waffles.fm and other sites . . . CDs and waffles, mmm.
// @homepage       https://www.userscripts.org/scripts/show/89544
// @updateURL      https://userscripts.org/scripts/source/89544.meta.js
// @icon           data:image/png;base64,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
// @icon64         data:image/png;base64,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
// @screenshot     http://i.min.us/iMfJGx70.png

// @include        http*://*what.cd/*
// @exclude        http*://*what.cd/*logchecker*
// @exclude        http*://*what.cd/user.php?action=notify*
// @exclude        http*://*what.cd/reportsv2.php*

// @include        http*://*waffles.fm/forum/*
// @include        http*://*waffles.fm/details.php*
// @include        http*://*waffles.fm/my.php*
// @include        http*://*waffles.fm/bbcode.php*
// @include        http*://*waffles.fm/forums.php*
// @include        http*://*waffles.fm/upload.php*

// @include        http*://*indietorrents.com/*

// @update         Aug 04 2013
// @since          Sep 30 2010
// 2010+, hateradio
// Please don't modify or edit my script and re-release it. D:
// Send me a message if you want something modified.
// ==/UserScript==

(function () {
	'use strict';

	// helpers
	var dom, ie, strg, update;
	
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
		name: 'WhutBBCode?',
		version: 3020,
		key: 'ujs_WBB_UPDT_HR',
		callback: 'wbbupdt',
		urij: 'https://dl.dropboxusercontent.com/u/14626536/userscripts/updt/wbb/wbb.json',
		uric: 'https://dl.dropboxusercontent.com/u/14626536/userscripts/updt/wbb/wbb.js',
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
			if (ie) {
				this.style.cssText += t;
			} else {
				this.style.appendChild(document.createTextNode(t + '\n'));
			}
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

	ie = !document.body.addEventListener && document.selection;

	// M I S C HANDLE
	dom = {
		// a simple list iterator function for arrays, nodelists, etc
		aEach: function (list, cb, scope) { var i, j = list.length; for (i = 0; i < j; i++) { if (cb.call(scope, list[i], i, list) === false) { break; } } },
		// a simple object-type iterator | todo reverse cb order
		oEach: function (object, cb, scope) { var key; for (key in object) { if (object.hasOwnProperty(key)) { if (cb.call(scope, key, object[key], object) === false) { break; } } } },
		dom: function (name, attr, child, parent) {
			// dom element creator
			// attr is an object of attributes to apply
			// child to attach to this element
			// parent for this element
			var e = document.createElement(name);
			if (attr.txt) {
				e.appendChild(document.createTextNode(attr.txt));
				delete attr.txt;
			}
			dom.oEach(attr, function (key, data) {
				if (typeof data === 'object') {
					dom.oEach(data, function (name, value) {
						if (key === 'attr') {
							e.setAttribute(name, value);
						} else {
							e[key][name] = value;
						}
					});
				} else {
					e[key] = data;
				}
			});
			if (child) { e.appendChild(child); }
			if (parent) { parent.appendChild(e); }
			return e;
		},
		click: (function () {
			var e;

			if (ie) {
				e = document.createEventObject();
				return function (el) { return el && el.fireEvent('onclick', e); };
			}

			return function (el) {
				e = document.createEvent('MouseEvents');
				e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				return el && !el.dispatchEvent(e);
			};

		}()),
		evt: function (el, ev, cb, cap) {
			if (!ie) {
				return el.addEventListener(ev, cb, !!cap);
			}
			return el.attachEvent('on' + ev, function (e) {
				e.currentTarget = e.target = e.srcElement;
				e.preventDefault = function () { e.returnValue = false; };
				e.stopPropagation = function () { e.cancelBubble = true; };
				cb.call(el, e);
				e = null;
			});
		}
	};

	/**
	 * WhutBB Class
	 * The principal class should not be used directly,
	 * use WhutBB.create() instead
	 *
	 * Uses a textarea as a reference to attach elements and events
	 *
	 * @param textarea to use
	 * @param id to place on the textarea
	 */
	function WhutBB(textarea, id) {
		this.textarea = textarea;
		this.textarea.className += ' wbbarea';
		this.textarea.setAttribute('data-wbb', id);
		this.id = id;
		this.wrap = dom.dom('div', { className: 'wbbcode ' + WhutBB.$.data.getWrapClass() });

		WhutBB.Panel.copyTo(this);
		this.buttonList = this.makeButtonList();

		this.insert(WhutBB.config.beneath);
		this.events();
	}

	window.WhutBB = WhutBB;

	WhutBB.set = {};

	/**
	 * The factory gets all textareas on the page and creates new WhutBB instances
	 * for textareas that are not read-only or disabled
	 */
	WhutBB.factory = function () {
		dom.aEach(document.getElementsByTagName('textarea'), function (textarea) {
			if (!textarea.disabled && !textarea.readOnly) {
				WhutBB.create(textarea);
			}
		});
	};

	/**
	 * Creates a WhutBBCode? instance for a textarea
	 * Ignores textareas that contain the class noWhutBB
	 *
	 * Stores reference in WhutBB.set
	 *
	 * @param textarea to use
	 * @param force forces the creation of a new instance
	 */
	WhutBB.create = function (textarea, force) {
		if (!WhutBB.$.data.ignore.test(textarea.getAttribute('class'))) {
			var id = WhutBB.id(textarea);
			if (!WhutBB.set[id] || force === true) {
				WhutBB.set[id] = new WhutBB(textarea, id);
			}
			return WhutBB.set[id];
		}
	};

	/**
	 * Locates or returns a unique ID
	 * @param textarea to use
	 */
	WhutBB.id = function (textarea) {
		var dat = textarea.getAttribute('data-wbb');
		if (dat && dat.length > 0) {
			return dat;
		}
		return Math.random().toString(32);
	};

	/**
	 * Inserts the buttons beneath or below a textarea
	 */
	WhutBB.prototype.insert = function (beneath) {
		var node = beneath ? this.textarea.nextSibling : this.textarea;
		this.textarea.parentNode.insertBefore(this.wrap, node);
	};

	// WhutBB.prototype.update = function (textarea) {
		// // update the textarea
		// this.textarea = textarea;
		// // update the wrap
		// this.insert(WhutBB.config.beneath);
		// // update the events if the previous elements are different
		// this.events();
	// };

	/**
	 * Attaches event handlers
	 */
	WhutBB.prototype.events = function () {
		dom.evt(this.textarea, 'keydown', WhutBB.evt.key.register(this));
		dom.evt(this.wrap, 'click', WhutBB.evt.mouse.register(this));
	};

	/**
	 * Hides this instance's elements
	 */
	WhutBB.prototype.hide = function () {
		this.wrap.className += ' wbbhide';
	};

	/**
	 * Shows this instance's elements
	 */
	WhutBB.prototype.show = function () {
		this.wrap.className = this.wrap.className.replace(/(?: wbbhide)/g, '');
	};

	/**
	 * Returns a button (if any)
	 * @param name of the button to get
	 */
	WhutBB.prototype.getButton = function (name) {
		return this.buttonList[name];
	};

	/**
	 * Builds a list of DOM buttons for reference used
	 * by keyboard shortcuts
	 */
	WhutBB.prototype.makeButtonList = function () {
		var list = {};
		dom.aEach(this.panels.button.getElementsByTagName('button'), function (el) {
			list[el.name] = el;
		});
		return list;
	};

	// WhutBB.$ is a collection of misc functions and storage
	WhutBB.$ = {
		data: {
			ignore: /(?:\b(?:noWhutBB)\b)/i, // Ignore textareas with a CSS class of "noWhutBB"
			web: [
				[':test', /^$|^localhost$/],
				['what', /(?:what)\.cd/],
				['waffles', /(?:waffles\.fm)/],
				['indietorrents', /(?:indietorrents\.com)/],
				['passthepopcorn', /(?:passthepopcorn\.me)/]
				// /(?:(last)(?:fm)?\.fm)/,
			],
			wrapClasses: ['wbbimgless', 'wbbimg'], // Displays text or icons on buttons
			getWrapClass: function () {
				return this.wrapClasses[Number(WhutBB.user.settings.icon)];
			},
			glyph: {  // http://twitter.github.io/bootstrap/2.3.2/assets/img/glyphicons-halflings.png http://twitter.github.io/bootstrap/assets/img/glyphicons-halflings.png
				black: 'data:image/png;base64,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'
			},
			css: function (o) { // bootstrap icons first
				o = '[class^=icon-],[class*=" icon-"]{display:inline-block;width:14px;height:14px;margin-right:.3em;line-height:14px;vertical-align:text-top;background-image:url(' + this.glyph.black + ');background-position:14px 14px;background-repeat:no-repeat;margin-top:1px}.icon-white{background-image:url("http://twitter.github.io/bootstrap/assets/img/glyphicons-halflings.png")}.icon-glass{background-position:0 0}.icon-music{background-position:-24px 0}.icon-search{background-position:-48px 0}.icon-envelope{background-position:-72px 0}.icon-heart{background-position:-96px 0}.icon-star{background-position:-120px 0}.icon-star-empty{background-position:-144px 0}.icon-user{background-position:-168px 0}.icon-film{background-position:-192px 0}.icon-th-large{background-position:-216px 0}.icon-th{background-position:-240px 0}.icon-th-list{background-position:-264px 0}.icon-ok{background-position:-288px 0}.icon-remove{background-position:-312px 0}.icon-zoom-in{background-position:-336px 0}.icon-zoom-out{background-position:-360px 0}.icon-off{background-position:-384px 0}.icon-signal{background-position:-408px 0}.icon-cog{background-position:-432px 0}.icon-trash{background-position:-456px 0}.icon-home{background-position:0 -24px}.icon-file{background-position:-24px -24px}.icon-time{background-position:-48px -24px}.icon-road{background-position:-72px -24px}.icon-download-alt{background-position:-96px -24px}.icon-download{background-position:-120px -24px}.icon-upload{background-position:-144px -24px}.icon-inbox{background-position:-168px -24px}.icon-play-circle{background-position:-192px -24px}.icon-repeat{background-position:-216px -24px}.icon-refresh{background-position:-240px -24px}.icon-list-alt{background-position:-264px -24px}.icon-lock{background-position:-287px -24px}.icon-flag{background-position:-312px -24px}.icon-headphones{background-position:-336px -24px}.icon-volume-off{background-position:-360px -24px}.icon-volume-down{background-position:-384px -24px}.icon-volume-up{background-position:-408px -24px}.icon-qrcode{background-position:-432px -24px}.icon-barcode{background-position:-456px -24px}.icon-tag{background-position:0 -48px}.icon-tags{background-position:-25px -48px}.icon-book{background-position:-48px -48px}.icon-bookmark{background-position:-72px -48px}.icon-print{background-position:-96px -48px}.icon-camera{background-position:-120px -48px}.icon-font{background-position:-144px -48px}.icon-bold{background-position:-167px -48px}.icon-italic{background-position:-192px -48px}.icon-text-height{background-position:-216px -48px}.icon-text-width{background-position:-240px -48px}.icon-align-left{background-position:-264px -48px}.icon-align-center{background-position:-288px -48px}.icon-align-right{background-position:-312px -48px}.icon-align-justify{background-position:-336px -48px}.icon-list{background-position:-360px -48px}.icon-indent-left{background-position:-384px -48px}.icon-indent-right{background-position:-408px -48px}.icon-facetime-video{background-position:-432px -48px}.icon-picture{background-position:-456px -48px}.icon-pencil{background-position:0 -72px}.icon-map-marker{background-position:-24px -72px}.icon-adjust{background-position:-48px -72px}.icon-tint{background-position:-72px -72px}.icon-edit{background-position:-96px -72px}.icon-share{background-position:-120px -72px}.icon-check{background-position:-144px -72px}.icon-move{background-position:-168px -72px}.icon-step-backward{background-position:-192px -72px}.icon-fast-backward{background-position:-216px -72px}.icon-backward{background-position:-240px -72px}.icon-play{background-position:-264px -72px}.icon-pause{background-position:-288px -72px}.icon-stop{background-position:-312px -72px}.icon-forward{background-position:-336px -72px}.icon-fast-forward{background-position:-360px -72px}.icon-step-forward{background-position:-384px -72px}.icon-eject{background-position:-408px -72px}.icon-chevron-left{background-position:-432px -72px}.icon-chevron-right{background-position:-456px -72px}.icon-plus-sign{background-position:0 -96px}.icon-minus-sign{background-position:-24px -96px}.icon-remove-sign{background-position:-48px -96px}.icon-ok-sign{background-position:-72px -96px}.icon-question-sign{background-position:-96px -96px}.icon-info-sign{background-position:-120px -96px}.icon-screenshot{background-position:-144px -96px}.icon-remove-circle{background-position:-168px -96px}.icon-ok-circle{background-position:-192px -96px}.icon-ban-circle{background-position:-216px -96px}.icon-arrow-left{background-position:-240px -96px}.icon-arrow-right{background-position:-264px -96px}.icon-arrow-up{background-position:-289px -96px}.icon-arrow-down{background-position:-312px -96px}.icon-share-alt{background-position:-336px -96px}.icon-resize-full{background-position:-360px -96px}.icon-resize-small{background-position:-384px -96px}.icon-plus{background-position:-408px -96px}.icon-minus{background-position:-433px -96px}.icon-asterisk{background-position:-456px -96px}.icon-exclamation-sign{background-position:0 -120px}.icon-gift{background-position:-24px -120px}.icon-leaf{background-position:-48px -120px}.icon-fire{background-position:-72px -120px}.icon-eye-open{background-position:-96px -120px}.icon-eye-close{background-position:-120px -120px}.icon-warning-sign{background-position:-144px -120px}.icon-plane{background-position:-168px -120px}.icon-calendar{background-position:-192px -120px}.icon-random{background-position:-216px -120px;width:16px}.icon-comment{background-position:-240px -120px}.icon-magnet{background-position:-264px -120px}.icon-chevron-up{background-position:-288px -120px}.icon-chevron-down{background-position:-313px -119px}.icon-retweet{background-position:-336px -120px}.icon-shopping-cart{background-position:-360px -120px}.icon-folder-close{background-position:-384px -120px}.icon-folder-open{background-position:-408px -120px;width:16px}.icon-resize-vertical{background-position:-432px -119px}.icon-resize-horizontal{background-position:-456px -118px}.icon-hdd{background-position:0 -144px}.icon-bullhorn{background-position:-24px -144px}.icon-bell{background-position:-48px -144px}.icon-certificate{background-position:-72px -144px}.icon-thumbs-up{background-position:-96px -144px}.icon-thumbs-down{background-position:-120px -144px}.icon-hand-right{background-position:-144px -144px}.icon-hand-left{background-position:-168px -144px}.icon-hand-up{background-position:-192px -144px}.icon-hand-down{background-position:-216px -144px}.icon-circle-arrow-right{background-position:-240px -144px}.icon-circle-arrow-left{background-position:-264px -144px}.icon-circle-arrow-up{background-position:-288px -144px}.icon-circle-arrow-down{background-position:-312px -144px}.icon-globe{background-position:-336px -144px}.icon-wrench{background-position:-360px -144px}.icon-tasks{background-position:-384px -144px}.icon-filter{background-position:-408px -144px}.icon-briefcase{background-position:-432px -144px}.icon-fullscreen{background-position:-456px -144px}';
				return o + ' .wbbcode button::-moz-focus-inner{border:0;padding:0}.wbbcode div,.wbbcode ul{margin:.2em;padding:.1em}.wbbset li{display:inline;margin:2px}.wbbset label input{vertical-align:text-bottom}.wbbset li label input{margin:0 3px 0 0}.wbbcode{width:' + WhutBB.config.width + 'px;text-align:center;font-size:11px;font-family:Tahoma, sans-serif;margin:auto;padding:3px}.wbbcode.wbb_noimg button{background-image:none}.wbbcode.wbbimg button span{text-indent:-100px;overflow:hidden;margin:0}.wbbcode.wbbimgless button span{margin:0;background:none}.wbbcode button.whutbbutton{float:none;overflow:hidden;background:#eee;color:#555;font-size:11px;font-family:Arial, sans-serif;font-weight:400;cursor:pointer;width:22px;height:21px;text-shadow:#fff 1px 1px 1px;border-top:1px solid #fff;border-left:1px solid #fff;border-right:1px solid #ccc;border-bottom:1px solid #ccc;-moz-border-radius:2px;border-radius:2px;-moz-transition-duration:.2s;-webkit-transition-duration:.2s;-o-transition:none;transition-duration:.2s;vertical-align:middle;margin:0 1px 3px;padding:1px}.wbbcode button:hover{background-color:#fff;color:#555;border-top:1px solid #eee;border-left:1px solid #eee;border-right:1px solid #bbb;border-bottom:1px solid #bbb}.wbbcode button:active span{margin:3px 0 0 1px}.wbblink{padding:2px 0}.wbbemot,.wbbset{overflow:auto;margin:auto}.wbbemot{max-height:150px;box-shadow:0 0 3px #777;padding:3px}.wbbemot img,.wbbemot div{cursor:pointer}div.wbbcode button.wbbpressed{background-color:#ddd;border-top:1px solid #aaa;border-left:1px solid #aaa;border-right:1px solid #eee;border-bottom:1px solid #eee}.wbbcon{color:#d06620;display:block;padding:3px 0}textarea[id^=editbox]{max-height:400px;overflow:auto!important}.wbbarea{outline-color:#ADD8E6;max-height:500px!important;overflow:auto!important;display:block;margin:3px auto 6px}.wbbshortcut{overflow:hidden;text-align:center;color:#2F2F2F;margin:0;padding:0}.wbbshortcut li{background:#eee;border-top:1px solid #fff;border-left:1px solid #fff;border-right:1px solid #ccc;border-bottom:1px solid #ccc;border-radius:2px;display:inline-block;zoom:1;height:50px;vertical-align:top;width:58px;margin:3px;padding:2px 3px}* html .wbbshortcut li{display:inline}.wbbhide,.hidden.wbbarea{display:none !important}';
			}
		},
		findSite: function () {
			var website = ':generic';
			dom.aEach(this.data.web, function (site) {
				if (site[1].test(document.domain)) {
					website = site[0];
					return false;
				}
			});
			return website;
		}
	};

	/**
	 * The WhutBBCode? initializer
	 *
	 * @param config, see WhutBB.Settings
	 *
	 * example:
	 *
	 *   WhutBB.init({
	 *     emoticonDir: 'https://ssl.what.cd/static/common/smileys/',
	 *     emoticons: WhutBB.db.emoticons.gz.slice(0, 4),
	 *     blueprint: [
	 *       ['b', 'i', 'u', 's'], ['code'],
	 *       ['color', 'size'], ['*'],
	 *       ['url', 'img'], ['quote'],
	 *       ['erase'], ['emoticon', 'shortcut', 'settings']
	 *     ]
	 *   });
	 *
	 */
	WhutBB.init = function (config) {
		WhutBB.config = new WhutBB.Settings(config || WhutBB.db.getSiteSettings(WhutBB.$.findSite()));
		// try {
			// console.info('WhutBBCode? mode ' + WhutBB.config.name);
			// console.log(WhutBB.config);
		// } catch (e) {}
		WhutBB.user.load();
		update.css(WhutBB.$.data.css());
		WhutBB.Panel.construct();
		if (document.getElementById('content')) {
			dom.evt(document.getElementById('content'), 'click', WhutBB.evt.delegate.edit);
			if (document.getElementById('messageform')) {
				dom.evt(document.getElementById('messageform'), 'click', WhutBB.evt.delegate.inbox);
			}
		}
	};

	/**
	 * Settings storage management
	 * Uses localStorage to store a user's settings
	 *
	 * Sends an appropriate message when settings are saved or not
	 *
	 * All settings are stored in the options object. These are
	 * also used in the Panel class, which generates check boxes per option.
	 */
	WhutBB.user = {
		message: [
			'Settings failed to save. D:',
			'Settings saved. :D'
		],
		options: {
			prompt: {
				txt: 'Prompts',
				title: 'Show browser prompts.',
				value: false
			},
			icon: {
				txt: 'Icons',
				title: 'Show icons.',
				value: false
			},
			link: {
				txt: 'WhutBBCode? Link',
				title: 'Show WhutBBCode? link',
				value: true
			}
		},
		load: function () {
			this.set(strg.grab('wbb3', this.defaults()));
			// console.log('load', this.settings);
		},
		set: function (settings) {
			this.settings = this.validate(settings);
		},
		save: function (settings) {
			WhutBB.Panel.message(this.message[Number(strg.save('wbb3', this.validate(settings)))]);
			return strg.on ? this.load() : this.set(settings);
		},
		validate: function (settings) { // returns only valid settings that exist in options
			var valid = {};
			dom.oEach(this.options, function (name) {
				valid[name] = !!settings[name];
			});
			return valid;
		},
		defaults: function () {
			var defaults = {};
			dom.oEach(this.options, function (name, options) {
				defaults[name] = options.value;
			});
			return defaults;
		},
		settings: {}
	};

	/**
	 * Psuedo-Database
	 * Contains all sites, buttons, emoticons, shortcuts
	 *
	 * Shortcuts are sorted by modifier key (ctrl/alt/ctrl+alt)
	 * Modifier properties (a single letter) should correspond to a keyboard key letter
	 * and the value (text) to a button name (WhutBB.db.button[text])
	 * Don't use CTRL with W, T, N, O (Chromium/IE Bugs)
	 *
	 */
	WhutBB.db = {
		sites: {
			':default': function () {
				return {
					name: '',
					link: 'https://userscripts.org/scripts/show/89544',
					beneath: true,
					blueprint: [],
					width: 430,
					emoticonDir: '',
					emoticonMax: 39,
					emoticons: [['', '']], // null emoticon
					shortcuts: WhutBB.db.shortcuts
				};
			},
			':generic': function () {
				return {
					emoticonDir: 'https://what.cd/static/common/smileys/',
					emoticons: WhutBB.db.emoticons.gz.slice(0, 4),
					blueprint: [
						['b', 'i', 'u', 's'], ['code'],
						['color', 'size'], ['*'],
						['url', 'img'], ['quote'],
						['erase'], ['emoticon', 'shortcut', 'settings']
					]
				};
			},
			':test': function () { // for tests
				return {
					emoticonDir: 'https://what.cd/static/common/smileys/',
					emoticons: WhutBB.db.emoticons.gz,
					blueprint: [
						['b', 'i', 'u', 's'], ['important', 'heading', 'code'],
						['color', 'size'], ['gz_left', 'gz_center', 'gz_right'],
						['#', '*'], ['url', 'img'], ['quote', 'pre', 'gz_src'], ['hide', 'mature'],
						['torrent', 'artist',  'user', 'wiki', 'gz_rule'], ['tex', 'plain'],
						['erase'], ['emoticon', 'shortcut', 'settings']
					]
				};
			},
			':markdown': function () {
				return {};
			},
			what: function () {
				return {
					link: '/wiki.php?action=article&name=BBCode',
					emoticonDir: 'https://what.cd/static/common/smileys/',
					emoticons: 'gazelle',
					width: 430,
					blueprint: [
						['b', 'i', 'u', 's'], ['important', 'heading', 'code'],
						['color', 'size'], ['gz_left', 'gz_center', 'gz_right'],
						['#', '*'], ['url', 'img'], ['quote', 'pre', 'gz_src'], ['hide', 'mature'],
						['artist', 'torrent', 'user', 'wiki', 'gz_rule'], ['tex', 'plain'],
						[ 'erase'], ['emoticon', 'settings', 'shortcut']
					]
				};
			},
			indietorrents: function () {
				return {
					link: '/wiki.php?action=article&id=3',
					emoticonDir: 'static/common/smileys/',
					emoticons: 'indie',
					width: 440,
					blueprint: [
						['b', 'i', 'u', 's'], ['color', 'size'],
						['gz_left', 'gz_center', 'gz_right'], ['*'], ['url', 'img', 'youtube'],
						['quote', 'pre', 'gz_src', 'hide'], ['table', 'tr', 'th', 'td'],
						['artist', 'user', 'wiki'], ['tex', 'plain'],
						['erase'], ['emoticon', 'settings', 'shortcut']
					]
				};
			},
			waffles: function () {
				WhutBB.db.buttons.raw = WhutBB.db.buttons.plain;

				return {
					link: '/bbcode.php',
					emoticonDir: 'https://www.waffles.fm/pic/smilies/',
					emoticons: 'waffles',
					beneath: false,
					width: 540,
					blueprint: [
						['b', 'i', 'u', 's'], ['size', 'color', 'font', 'spoiler'],
						['*'], ['url', 'img', 'youtube'],
						['center', 'quote', 'pre', 'raw'],
						['artist', 'user', 'torrent', 'search'],
						['erase'], ['emoticon', 'settings', 'shortcut']
					]
				};
			}
		},
		buttons: {
			b: {title: 'Bold', icon: 'bold'},
			i: {title: 'Italic', icon: 'italic'},
			u: {title: 'Underline', icon: 'text-width'}, //underline
			s: {title: 'Strike', icon: 'minus'},
			code: {display: 'c', title: 'Inline Code', icon: 'leaf'},
			important: {display: '!', title: 'Important Text', icon: 'exclamation-sign'},
			color: {type: 1, display: '\u25ee', prompt: 'Enter a #hexadecimal or color name.', title: 'Color', val: '#', icon: 'tint'},
			size: {type: 1, display: '\u00b1', prompt: 'Enter a number.', title: 'Size', val: 3, icon: 'text-height'},
			align: {type: 1, display: '-', title: 'Align Text', icon: 'align-left'},
			left: {display: '<', title: 'Align Left', icon: 'align-left'},
			center: {display: '\u2013', title: 'Align Center', icon: 'align-center'},
			right: {display: '>', title: 'Align Right', icon: 'align-right'},
			'#': {type: 3, title: 'Ordered List Item', icon: 'list-alt'},
			'*': {type: 3, title: 'List Item', icon: 'list'},
			url: {type: 1, prompt: 'Enter a Link', title: 'Web Link', val: 'http://', icon: 'globe'},
			img: {title: 'Image', icon: 'picture'},
			quote: {type: 1, display: 'q', prompt: 'Enter an author or name.', title: 'Quote', placeholder: 'author', icon: 'comment'},
			pre: {title: 'Preformated text/Code block', icon: 'asterisk'},
			hide: {display: 'h', title: 'Hide content/Spoilers', icon: 'warning-sign'},
			spoiler: {display: '_', title: 'Spoilers!', icon: 'exclamation-sign'},
			mature: {display: 'm', title: 'Hide mature content', icon: 'eye-open'},
			artist: {display: 'a', title: 'Link to an artist/band on the site', icon: 'music'},
			user: {display: 'p', title: 'Link to a person on the site', icon: 'user'},
			wiki: {type: 4, tag: ['[[', ']]'], display: 'w', title: 'Link to a Wiki article', icon: 'share'},
			tex: {display: 't', title: 'LaTeX', icon: 'pencil'},
			plain: {display: 'x', title: 'Disable BB tags.', icon: 'ban-circle'},
			youtube: {type: 2, display: 'yt', title: 'YouTube video', icon: 'film'},
			font: {type: 1, display: 'f', prompt: 'Enter a font\'s name', title: 'Font', val: 'Arial', icon: 'font'},
			torrent: {display: 'id', title: 'Link to a torrent ID.', icon: 'download'},
			search: {type: 1, display: '@', prompt: 'Enter a search term', title: 'Link to a search term.', val: 'keywords', icon: 'search'},
			table: {display: 'tbl', title: 'Insert a table.', icon: 'th-large'},
			tr: {display: 'tr', title: 'Insert a table row.', icon: 'th-list'},
			th: {display: 'th', title: 'Insert a table heading.', icon: 'th'},
			td: {display: 'td', title: 'Insert a table cell.', icon: 'pencil'},
			heading: {type: 4, tag: '=', display: '=', title: 'Insert a heading', icon: 'arrow-right'},
			// Gazelle
			gz_left: {tag: 'align', val: 'left', type: 1, noPrompt: true, display: '<', title: 'Align left', icon: 'align-left'},
			gz_center: {tag: 'align', val: 'center', type: 1, noPrompt: true, display: '\u2013', title: 'Align center', icon: 'align-center'},
			gz_right: {tag: 'align', val: 'right', type: 1, noPrompt: true, display: '>', title: 'Align right', icon: 'align-right'},
			gz_src: {macro: ['quote', 'pre'], type: -3, display: '<>', title: 'Source code', icon: 'tasks'},
			gz_rule: {tag: 'rule', title: 'Link to a rule', icon: 'info-sign', display: 'r' },
			// Panels
			emoticon: {display: ':]', toggle: ';]', title: 'Emoticons', type: -1, icon: 'fire'},
			settings: {display: '%', title: 'Settings', type: -1, icon: 'wrench'},
			shortcut: {display: '?', title: 'Shortcuts', type: -1, icon: 'question-sign'},
			erase: {display: '-', title: 'Delete message', type: -2, icon: 'remove-sign'}
		},
		emoticons: {
			gazelle: [[":angry:", "angry.gif"], [":D", "biggrin.gif"], [":|", "blank.gif"], [":blush:", "blush.gif"], [":cool:", "cool.gif"], [":'(", "crying.gif"], ["&gt;.&gt;", "eyesright.gif"], [":creepy:", "creepy.gif"], [":frown:", "frown.gif"], ["&lt;3", "heart.gif"], [":unsure:", "hmm.gif"], [":whatlove:", "ilu.gif"], [":lol:", "laughing.gif"], [":loveflac:", "loveflac.gif"], [":ninja:", "ninja.gif"], [":no:", "no.gif"], [":nod:", "nod.gif"], [":ohno:", "ohnoes.gif"], [":omg:", "omg.gif"], [":o", "ohshit.gif"], [":paddle:", "paddle.gif"], [":(", "sad.gif"], [":shifty:", "shifty.gif"], [":sick:", "sick.gif"], [":)", "smile.gif"], [":-)", "smile.gif"], [":sorry:", "sorry.gif"], [":thanks:", "thanks.gif"], [":P", "tongue.gif"], [":wave:", "wave.gif"], [":wink:", "wink.gif"], [":worried:", "worried.gif"], [":wtf:", "wtf.gif"], [":wub:", "wub.gif"], [":qmarklove:", "ilqmark-what.gif"], [":ajaxlove:", "ilajax-what.gif"], [":athenalove:", "ilathena-what.gif"], [":alderaanlove:", "ilalderaan-what.gif"], [":anankelove:", "ilananke-what.gif"], [":bashmorelove:", "ilbashmore-what.gif"], [":brancusilove:", "ilbrancusi-what.gif"], [":brdlove:", "ilbrd-what.gif"], [":carllove:", "ilcarl-what.gif"], [":dumontlove:", "ildumont-what.gif"], [":entrapmentlove:", "ilentrapment-what.gif"], [":espressolove:", "ilespresso-what.gif"], [":gamehendgelove:", "ilgamehendge-what.gif"], [":hyperionlove:", "ilhyperion-what.gif"], [":iapetuslove:", "iliapetus-what.gif"], [":irimiaslove:", "ilirimias-what.gif"], [":irredentialove:", "ilirredentia-what.gif"], [":kitchenstafflove:", "ilkitchenstaff-what.gif"], [":kopitiamlove:", "ilkopitiam-what.gif"], [":kryptoslove:", "ilkryptos-what.gif"], [":lenreklove:", "illenrek-what.gif"], [":lesadieuxlove:", "illesadieux-what.gif"], [":lisbethlove:", "illisbeth-what.gif"], [":nandolove:", "ilnando-what.gif"], [":porkpielove:", "ilporkpie-what.gif"], [":sinetaxlove:", "ilsinetax-what.gif"], [":theseuslove:", "iltheseus-what.gif"], [":toruslove:", "iltorus-what.gif"], [":wtelove:", "ilwte-what.gif"], [":zettellove:", "ilzettel-what.gif"], [":a9love:", "ila9-what.gif"], [":bionicsockslove:", "ilbionicsocks-what.gif"], [":chailove:", "ilchai-what.gif"], [":changleslove:", "ilchangles-what.gif"], [":claptonlove:", "ilclapton-what.gif"], [":emmlove:", "ilemm-what.gif"], [":fzeroxlove:", "ilfzerox-what.gif"], [":hothlove:", "ilhoth-what.gif"], [":interstellarlove:", "ilinterstellar-what.gif"], [":jowalove:", "iljowa-what.gif"], [":kharonlove:", "ilkharon-what.gif"], [":lylaclove:", "illylac-what.gif"], [":marienbadlove:", "ilmarienbad-what.gif"], [":marigoldslove:", "ilmarigolds-what.gif"], [":mavericklove:", "ilmaverick-what.gif"], [":mnlove:", "ilmn-what.gif"], [":mre2melove:", "ilmre2me-what.gif"], [":mugglelove:", "ilmugglehump-what.gif"], [":nightoathlove:", "ilnightoath-what.gif"], [":oinkmeuplove:", "iloinkmeup-what.gif"], [":padutchlove:", "ilpadutch-what.gif"], [":paintrainlove:", "ilpaintrain-what.gif"], [":sdfflove:", "ilsdff-what.gif"], [":seraphiellove:", "ilseraphiel-what.gif"], [":sisterraylove:", "ilsisterray-what.gif"], [":snowflakelove:", "ilsnowflake-what.gif"], [":soamlove:", "ilsoam-what.gif"], [":spacireleilove:", "ilspacirelei-what.gif"], [":stwlove:", "ilstw-what.gif"], [":whatmanlove:", "ilwhatman-what.gif"], [":whynotmicelove:", "ilwhynotmice-what.gif"], [":xorianlove:", "ilxorian-what.gif"]],
			waffles: [[':waffleslove:', 'wubwaffles.gif'], [':opplove:', 'opplove.gif'], [':-)', 'smile1.gif'], [':smile:', 'smile2.gif'], [':-D', 'grin.gif'], [':lol:', 'laugh.gif'], [':w00t:', 'w00t.gif'], [':think:', 'think.gif'], [':-P', 'tongue.gif'], [';-)', 'wink.gif'], [':-|', 'noexpression.gif'], [':-/', 'confused.gif'], [':-(', 'sad.gif'], [':cry:', 'cry.gif'], [':crybaby:', 'crybaby.gif'], [':weep:', 'weep.gif'], [':-O', 'ohmy.gif'], [':o)', 'clown.gif'], ['8-)', 'cool1.gif'], ['|-)', 'sleeping.gif'], [':bite:', 'bite.gif'], [':innocent:', 'innocent.gif'], [':whistle:', 'whistle.gif'], [':unsure:', 'unsure.gif'], [':closedeyes:', 'closedeyes.gif'], [':cool:', 'cool2.gif'], [':fun:', 'fun.gif'], [':thumbsup:', 'thumbsup.gif'], [':thumbsdown:', 'thumbsdown.gif'], [':blush:', 'blush.gif'], [':yes:', 'yes.gif'], [':no:', 'no.gif'], [':love:', 'love.gif'], [':?:', 'question.gif'], [':!:', 'excl.gif'], [':idea:', 'idea.gif'], [':arrow:', 'arrow.gif'], [':arrow2:', 'arrow2.gif'], [':hmm:', 'hmm.gif'], [':hmmm:', 'hmmm.gif'], [':huh:', 'huh.gif'], [':geek:', 'geek.gif'], [':look:', 'look.gif'], [':rolleyes:', 'rolleyes.gif'], [':kiss:', 'kiss.gif'], [':shifty:', 'shifty.gif'], [':blink:', 'blink.gif'], [':smartass:', 'smartass.gif'], [':sick:', 'sick.gif'], [':crazy:', 'crazy.gif'], [':orly:', 'orly.gif'], [':wacko:', 'wacko.gif'], [':alien:', 'alien.gif'], [':wizard:', 'wizard.gif'], [':wave:', 'wave.gif'], [':wavecry:', 'wavecry.gif'], [':baby:', 'baby.gif'], [':angry:', 'angry.gif'], [':ras:', 'ras.gif'], [':sly:', 'sly.gif'], [':devil:', 'devil.gif'], [':evil:', 'evil.gif'], [':evilmad:', 'evilmad.gif'], [':sneaky:', 'sneaky.gif'], [':axe:', 'axe.gif'], [':slap:', 'slap.gif'], [':wall:', 'wall.gif'], [':rant:', 'rant.gif'], [':jump:', 'jump.gif'], [':yucky:', 'yucky.gif'], [':nugget:', 'nugget.gif'], [':smart:', 'smart.gif'], [':shutup:', 'shutup.gif'], [':shutup2:', 'shutup2.gif'], [':crockett:', 'crockett.gif'], [':zorro:', 'zorro.gif'], [':snap:', 'snap.gif'], [':beer:', 'beer.gif'], [':beer2:', 'beer2.gif'], [':drunk:', 'drunk.gif'], [':strongbench:', 'strongbench.gif'], [':weakbench:', 'weakbench.gif'], [':dumbells:', 'dumbells.gif'], [':music:', 'music.gif'], [':stupid:', 'stupid.gif'], [':dots:', 'dots.gif'], [':offtopic:', 'offtopic.gif'], [':spam:', 'spam.gif'], [':oops:', 'oops.gif'], [':lttd:', 'lttd.gif'], [':please:', 'please.gif'], [':sorry:', 'sorry.gif'], [':hi:', 'hi.gif'], [':yay:', 'yay.gif'], [':cake:', 'cake.gif'], [':hbd:', 'hbd.gif'], [':band:', 'band.gif'], [':punk:', 'punk.gif'], [':rofl:', 'rofl.gif'], [':bounce:', 'bounce.gif'], [':mbounce:', 'mbounce.gif'], [':thankyou:', 'thankyou.gif'], [':gathering:', 'gathering.gif'], [':hang:', 'hang.gif'], [':chop:', 'chop.gif'], [':rip:', 'rip.gif'], [':whip:', 'whip.gif'], [':judge:', 'judge.gif'], [':chair:', 'chair.gif'], [':tease:', 'tease.gif'], [':boxing:', 'boxing.gif'], [':guns:', 'guns.gif'], [':shoot:', 'shoot.gif'], [':shoot2:', 'shoot2.gif'], [':flowers:', 'flowers.gif'], [':wub:', 'wub.gif'], [':lovers:', 'lovers.gif'], [':kissing:', 'kissing.gif'], [':kissing2:', 'kissing2.gif'], [':console:', 'console.gif'], [':group:', 'group.gif'], [':hump:', 'hump.gif'], [':hooray:', 'hooray.gif'], [':happy2:', 'happy2.gif'], [':clap:', 'clap.gif'], [':clap2:', 'clap2.gif'], [':weirdo:', 'weirdo.gif'], [':yawn:', 'yawn.gif'], [':bow:', 'bow.gif'], [':dawgie:', 'dawgie.gif'], [':cylon:', 'cylon.gif'], [':book:', 'book.gif'], [':fish:', 'fish.gif'], [':mama:', 'mama.gif'], [':pepsi:', 'pepsi.gif'], [':medieval:', 'medieval.gif'], [':rambo:', 'rambo.gif'], [':ninja:', 'ninja.gif'], [':hannibal:', 'hannibal.gif'], [':party:', 'party.gif'], [':snorkle:', 'snorkle.gif'], [':evo:', 'evo.gif'], [':king:', 'king.gif'], [':chef:', 'chef.gif'], [':mario:', 'mario.gif'], [':pope:', 'pope.gif'], [':fez:', 'fez.gif'], [':cap:', 'cap.gif'], [':cowboy:', 'cowboy.gif'], [':pirate:', 'pirate.gif'], [':pirate2:', 'pirate2.gif'], [':rock:', 'rock.gif'], [':cigar:', 'cigar.gif'], [':icecream:', 'icecream.gif'], [':oldtimer:', 'oldtimer.gif'], [':trampoline:', 'trampoline.gif'], [':banana:', 'bananadance.gif'], [':smurf:', 'smurf.gif'], [':yikes:', 'yikes.gif'], [':osama:', 'osama.gif'], [':saddam:', 'saddam.gif'], [':santa:', 'santa.gif'], [':indian:', 'indian.gif'], [':pimp:', 'pimp.gif'], [':nuke:', 'nuke.gif'], [':jacko:', 'jacko.gif'], [':ike:', 'ike.gif'], [':greedy:', 'greedy.gif'], [':super:', 'super.gif'], [':wolverine:', 'wolverine.gif'], [':spidey:', 'spidey.gif'], [':spider:', 'spider.gif'], [':bandana:', 'bandana.gif'], [':construction:', 'construction.gif'], [':sheep:', 'sheep.gif'], [':police:', 'police.gif'], [':detective:', 'detective.gif'], [':bike:', 'bike.gif'], [':fishing:', 'fishing.gif'], [':clover:', 'clover.gif'], [':horse:', 'horse.gif'], [':shit:', 'shit.gif'], [':soldiers:', 'soldiers.gif'], [':search:', 'search.gif'], [':tinfoilhat:', 'tinfoilhat.gif'], [':moon1:', 'moon1.gif'], [':moon2:', 'moon2.gif'], [':user:', 'user.gif'], [':staff:', 'staff.gif'], [':eggo:', 'eggo.png']], /*, [':box:', 'box.gif']*/
			indie: [[':-)', 'smile.gif'], [';-)', 'wink.gif'], [':-D', 'biggrin.gif'], [':-P', 'tongue.gif'], [':-(', 'sad.gif'], ['>:-|', 'blank.gif'], [':-/', 'confused.gif'], [':-O', 'ohmy.gif'], [':o)', 'clown.gif'], ['8-)', 'cool1.gif'], ['|-)', 'sleeping.gif'], [':cupcake:', 'cupcake1.gif'], [':innocent:', 'innocent.gif'], [':whistle:', 'whistle.gif'], [':unsure:', 'hmm.gif'], [':closedeyes:', 'closedeyes.gif'], [':angry:', 'angry.gif'], [':smile:', 'smile2.gif'], [':lol:', 'laughing.gif'], [':cool:', 'cool.gif'], [':fun:', 'fun.gif'], [':thumbsup:', 'thumbsup.gif'], [':thumbsdown:', 'thumbsdown.gif'], [':blush:', 'blush.gif'], [':weep:', 'weep.gif'], [':yes:', 'yes.gif'], [':no:', 'no.gif'], [':love:', 'love.gif'], [':?:', 'question.gif'], [':!:', 'excl.gif'], [':idea:', 'idea.gif'], [':arrow:', 'arrow.gif'], [':hmm:', 'hmm.gif'], [':hmmm:', 'hmmm.gif'], [':huh:', 'huh.gif'], [':w00t:', 'w00t.gif'], [':geek:', 'geek.gif'], [':look:', 'look.gif'], [':rolleyes:', 'rolleyes.gif'], [':kiss:', 'kiss.gif'], [':shifty:', 'shifty.gif'], [':blink:', 'blink.gif'], [':smartass:', 'smartass.gif'], [':sick:', 'sick.gif'], [':crazy:', 'crazy.gif'], [':wacko:', 'wacko.gif'], [':alien:', 'alien.gif'], [':wizard:', 'wizard.gif'], [':wave:', 'wave.gif'], [':wavecry:', 'wavecry.gif'], [':baby:', 'baby.gif'], [':ras:', 'ras.gif'], [':sly:', 'sly.gif'], [':devil:', 'devil.gif'], [':evil:', 'evil.gif'], [':godisevil:', 'evil.gif'], [':evilmad:', 'evilmad.gif'], [':yucky:', 'yucky.gif'], [':nugget:', 'nugget.gif'], [':sneaky:', 'sneaky.gif'], [':smart:', 'smart.gif'], [':shutup:', 'shutup.gif'], [':shutup2:', 'shutup2.gif'], [':yikes:', 'yikes.gif'], [':flowers:', 'flowers.gif'], [':wub:', 'wub.gif'], [':osama:', 'osama.gif'], [':saddam:', 'saddam.gif'], [':santa:', 'santa.gif'], [':indian:', 'indian.gif'], [':guns:', 'guns.gif'], [':crockett:', 'crockett.gif'], [':zorro:', 'zorro.gif'], [':snap:', 'snap.gif'], [':beer:', 'beer.gif'], [':beer2:', 'beer2.gif'], [':drunk:', 'drunk.gif'], [':mama:', 'mama.gif'], [':pepsi:', 'pepsi.gif'], [':medieval:', 'medieval.gif'], [':rambo:', 'rambo.gif'], [':ninja:', 'ninja.gif'], [':hannibal:', 'hannibal.gif'], [':party:', 'party.gif'], [':snorkle:', 'snorkle.gif'], [':evo:', 'evo.gif'], [':king:', 'king.gif'], [':chef:', 'chef.gif'], [':mario:', 'mario.gif'], [':pope:', 'pope.gif'], [':fez:', 'fez.gif'], [':cap:', 'cap.gif'], [':cowboy:', 'cowboy.gif'], [':pirate:', 'pirate2.gif'], [':rock:', 'rock.gif'], [':cigar:', 'cigar.gif'], [':icecream:', 'icecream.gif'], [':oldtimer:', 'oldtimer.gif'], [':wolverine:', 'wolverine.gif'], [':strongbench:', 'strongbench.gif'], [':weakbench:', 'weakbench.gif'], [':bike:', 'bike.gif'], [':music:', 'music.gif'], [':book:', 'book.gif'], [':fish:', 'fish.gif'], [':stupid:', 'stupid.gif'], [':dots:', 'dots.gif'], [':kelso:', 'kelso.gif'], [':red:', 'red.gif'], [':dobbs:', 'bobdobbs.gif'], [':axe:', 'axe.gif'], [':hooray:', 'hooray.gif'], [':yay:', 'yay.gif'], [':cake:', 'cake.gif'], [':hbd:', 'hbd.gif'], [':hi:', 'hi.gif'], [':offtopic:', 'offtopic.gif'], [':band:', 'band.gif'], [':hump:', 'hump.gif'], [':punk:', 'punk.gif'], [':bounce:', 'bounce.gif'], [':mbounce:', 'mbounce.gif'], [':group:', 'group.gif'], [':console:', 'console.gif'], [':smurf:', 'smurf.gif'], [':soldiers:', 'soldiers.gif'], [':spidey:', 'spidey.gif'], [':rant:', 'rant.gif'], [':pimp:', 'pimp.gif'], [':nuke:', 'nuke.gif'], [':judge:', 'judge.gif'], [':jacko:', 'jacko.gif'], [':ike:', 'ike.gif'], [':greedy:', 'greedy.gif'], [':dumbells:', 'dumbells.gif'], [':clover:', 'clover.gif'], [':shit:', 'shit.gif'], [':thankyou:', 'thankyou.gif'], [':horse:', 'horse.gif'], [':box:', 'boxing.gif'], [':fight:', 'fighting05.gif'], [':gathering:', 'gathering.gif'], [':hang:', 'hang.gif'], [':chair:', 'chair.gif'], [':spam:', 'spam.gif'], [':bandana:', 'bandana.gif'], [':construction:', 'construction.gif'], [':oops:', 'oops.gif'], [':rip:', 'rip.gif'], [':sheep:', 'sheep.gif'], [':tease:', 'tease.gif'], [':spider:', 'spider.gif'], [':shoot:', 'shoot.gif'], [':shoot2:', 'shoot2.gif'], [':police:', 'police.gif'], [':lovers:', 'lovers.gif'], [':kissing:', 'kissing.gif'], [':kissing2:', 'kissing2.gif'], [':jump:', 'jump.gif'], [':happy2:', 'happy2.gif'], [':clap:', 'clap.gif'], [':clap2:', 'clap2.gif'], [':chop:', 'chop.gif'], [':lttd:', 'lttd.gif'], [':whip:', 'whip.gif'], [':yawn:', 'yawn.gif'], [':bow:', 'bow.gif'], [':slap:', 'slap.gif'], [':wall:', 'wall.gif'], [':please:', 'please.gif'], [':sorry:', 'sorry.gif'], [':finger:', 'finger.gif'], [':brown:', 'brownnoser.gif'], [':cloud9:', 'cloud9.gif'], [':pity:', 'mrt.gif'], [':mug:', 'mug.gif'], [':banned:', 'banned.gif'], [':tkfu:', 'ninja_hide.gif'], [':baldfresh:', 'baldy.png'], [':camera:', 'camera.gif'], [':loggeek:', 'log.jpg'], [':coleman83:', 'random'], [':locked:', 'lockd.gif'], [':tomjones1:', 'tomjones01.png'], [':tomjones2:', 'tomjones02.png'], [':D', 'biggrin.gif'], [':|', 'blank.gif'], [':\'(', 'crying.gif'], ['>.>', 'eyesright.gif'], [':frown:', 'frown.gif'], ['<3', 'heart.gif'], [':nod:', 'nod.gif'], [':ohno:', 'ohnoes.gif'], [':ohnoes:', 'ohnoes.gif'], [':omg:', 'omg.gif'], [':o', 'ohshit.gif'], [':O', 'ohshit.gif'], [':paddle:', 'paddle.gif'], [':(', 'sad.gif'], [':)', 'smile.gif'], [':thanks:', 'thanks.gif'], [':P', 'tongue.gif'], [':-p', 'tongue.gif'], [':wink:', 'wink.gif'], [':creepy:', 'creepy.gif'], [':worried:', 'worried.gif'], [':wtf:', 'wtf.gif'], [':lmgtfy:', 'lmgtfy.gif'], [':fart:', 'fart.gif'], [':hifi:', 'hifi.gif'], [':cheers:', 'cheers.gif'], [':jambox:', 'jambox.gif'], [':rimshot:', 'rimshot.gif'], [':rockout:', 'rockout.gif'], [':yourmom:', 'yourmom.gif'], [':bong:', 'bong.gif'], [':peace:', 'hippie.gif'], [':vinyl:', 'vinyl.gif'], ['\\m/', 'horns.gif']]
		},
		shortcuts: {
			alt: {
				c: 'gz_src'
			},
			ctrl: {
				b: 'b',
				i: 'i',
				u: 'u',
				s: 's',
				g: 'code',
				k: '#',
				l: '*',
				h: 'url',
				m: 'img',
				d: 'erase'
			},
			'ctrl+alt': {
				i: 'important',
				e: 'emoticon',
				u: 'settings',
				x: 'shortcut'
			}
		},
		getShortcut: function (modifier, letter) {
			if (this.shortcuts[modifier] && this.shortcuts[modifier][letter]) {
				return this.shortcuts[modifier][letter];
			}
		},
		getSiteSettings: function (name) {
			if (WhutBB.db.sites[name]) {
				var settings = WhutBB.db.sites[name]();
				settings.name = name;
				return settings;
			}
			return {};
		},
		/**
		 * Inserts or replaces buttons
		 * Use this method before initializing the script (WhutBB.init)
		 * @param buttons - object of objects
		 */
		insertButtons: function (buttons) {
			dom.oEach(buttons, function (name, object) {
				WhutBB.db.buttons[name] = object;
			});
		},
		/**
		 *  Adds emoticons to (an exisiting) emoticons DB array
		 *  Use this method before initializing the script (WhutBB.init)
		 *
		 * @param name of array in the emoticons DB to use
		 *        if none exist, it will be created
		 * @param emoticons array
		 *        make sure to use an array of arrays
		 *
		 *  Example: add two emoticons to WhutBB.db.emoticons.gazelle
		 *    WhutBB.db.addEmoticons('gazelle', [[':new:', 'new.png'], [':pop:', 'pop.png']]);
		 */
		addEmoticons: function (name, emoticons) {
			WhutBB.db.emoticons[name] = (WhutBB.db.emoticons[name] || []).concat(emoticons);
		}
	};

	/**
	 * Event manager
	 * Aliases/references event data for easier use within various methods
	 */
	WhutBB.e = {
		current: null, // alias for the current event
		target: null, // alias for the current event target element
		whut: null, // alias for the current event's WhutBB instance
		macro: false, // flag for events called through a macro
		set: function (event, target, wbb) {
			WhutBB.e.current = event;
			WhutBB.e.target = target;
			WhutBB.e.whut = wbb;
		},
		clean: function () {
			this.current = this.target = this.whut = null;
		}
	};

	/**
	 * Event Object
	 *
	 * Contains all possible events, divided into:
	 *    1) mouse, 2) key, and 3) general button events
	 *
	 * Mouse and Key events trigger Button events, depending
	 * on the button type
	 *
	 * As mentioned earlier, buttons with custom events should find
	 * a method with that button's name within WhutBB.evt.button.custom
	 *
	 * WhutBB instances register themselves with the 
	 * register methods.
	 *
	 * The registers return an annonymous function that
	 * is used for any subsequent click or key events.
	 *
	 */
	WhutBB.evt = {
		button: { // button events
			custom: { // Custom button events
				erase: function () { // erase button event
					WhutBB.e.whut.textarea.value = '';
				},
				emoticonLoader: function () { // removes "View all emoticons." div and loads remaining emoticons
					WhutBB.e.target.parentNode.removeChild(WhutBB.e.target);
					WhutBB.Panel.attach.emoticons(WhutBB.config.emoticonMax - 1,
						WhutBB.config.emoticons.length);
				}
			},
			macro: function (name, wbb) { // macro button events
				if (!WhutBB.e.macro) {
					WhutBB.e.macro = true;
					dom.aEach(WhutBB.db.buttons[name].macro || [], function (name) {
						// console.log(name);
						dom.click(wbb.getButton(name));
					});
					WhutBB.e.macro = false;
				}
			},
			bbcode: function () { // bbcode buttons
				WhutBB.Tag.get(WhutBB.e.target.name).insertTo(WhutBB.e.whut.textarea);
			},
			emoticon: function () { // emoticon buttons
				WhutBB.box.select(WhutBB.e.whut.textarea).insert([' ' + WhutBB.e.target.title, '']);
			},
			panel: { // panel buttons
				toggle: function (panel, el) { // el = WhutBB.e.target
					var visible = /(?:wbbpressed)/i.test(el.className); // panel's current visibility
					WhutBB.evt.button.panel.store(el);
					if (visible) {
						el.className = el.className.replace(' wbbpressed', '');
						panel.className += ' wbbhide';
					} else {
						WhutBB.e.whut.wrap.appendChild(WhutBB.Panel.global[el.name].element);
						el.className += ' wbbpressed';
						panel.className = panel.className.replace(' wbbhide', '');
					}
					WhutBB.evt.button.panel.toggleText(visible, el.firstChild);
				},
				toggleText: function (visible, span) {
					if (span.getAttribute('data-toggle') !== '') {
						span.firstChild.nodeValue = span.getAttribute(visible ? 'data-txt' : 'data-toggle');
					}
				},
				store: function (button) {
					// remove pressed/toggled state of previous stored button
					if (WhutBB.evt.button.panel.store[button.name]) {
						WhutBB.evt.button.panel.store[button.name].className = 'whutbbutton';
						WhutBB.evt.button.panel.toggleText(true, WhutBB.evt.button.panel.store[button.name].firstChild);
					}
					WhutBB.evt.button.panel.store[button.name] = button;
				},
				stored: {}
			}
		},
		delegate: {
			button: function () { // TODO Polymorphism plz?
				var t = WhutBB.e.target;
				// console.log(t);
				WhutBB.e.current.stopPropagation();
				if (+t.getAttribute('data-type') === -3) {
					// console.log(-3);
					return WhutBB.evt.button.macro(t.name, WhutBB.e.whut);
				}
				if (+t.getAttribute('data-type') === -2) {
					// console.log(-2);
					return WhutBB.evt.button.custom[t.name]();
				}
				if (+t.getAttribute('data-type') === -1) {
					// console.log(-1);
					return WhutBB.evt.button.panel.toggle(WhutBB.Panel.global[t.name].element, t);
				}
				if (t.getAttribute('data-type') === 'emoticon') {
					// console.log(2);
					return WhutBB.evt.button.emoticon();
				}
				// console.log(1);
				return WhutBB.evt.button.bbcode();
			},
			edit: function (evt) { // RegExp.lastParen should contain an ID
				var el = evt.target,
					onclick = el.getAttribute('onclick') || '';
				if (onclick.match(/(?:Edit_Form\('(\d+))/)) {
					return window.setTimeout(function () {
						var txt = document.getElementById('editbox' + RegExp.lastParen);
						txt.setAttribute('data-wbb', RegExp.lastParen);
						WhutBB.create(txt, true);
					}, 500);
				}
				if (onclick.match(/(?:Preview_Edit\((\d+))/) || onclick.match(/(?:Save_Edit\((\d+))/)) {
					return WhutBB.set[RegExp.lastParen].hide();
				}
				if (onclick.match(/(?:Cancel_Preview\((\d+))/)) {
					return WhutBB.set[RegExp.lastParen].show();
				}
			},
			inbox: function (evt) { // todo inbox.php
				var el = evt.target;
				// console.log('inbox');
				if (/(?:preview)/i.test(el.value)) {
					document.getElementById('quickpost').className += ' wbbhide';
					document.getElementById('quickpost').nextSibling.className += ' wbbhide';
				}
				if (/(?:editor)/i.test(el.value)) {
					document.getElementById('quickpost').className = document.getElementById('quickpost').className.replace(/(?: wbbhide)/g, '');
					document.getElementById('quickpost').nextSibling.className = document.getElementById('quickpost').nextSibling.className.replace(/(?: wbbhide)/g, '');
				}
			},
			settings: { // settings events
				update:  function () { // translates checks into settings to store
					var settings = {}, saved;

					dom.aEach(WhutBB.Panel.global.settings.element.getElementsByTagName('input'), function (el) {
						settings[el.name] = el.checked;
					});

					saved = WhutBB.user.save(settings);

					// calls a sub function based on a setting's name
					// additional argument if the settings were saved
					if (this.fn[WhutBB.e.target.name]) {
						this.fn[WhutBB.e.target.name](saved);
					}
				},
				fn: {
					icon: function () { // toggles button icons
						var cls = 'wbbcode ' + WhutBB.$.data.getWrapClass();
						dom.oEach(WhutBB.set, function (id, wbb) {
							wbb.wrap.className = cls;
						});
					},
					link: function () { // toggles WhutBBCode? link
						var cls = 'wbblink ' + (WhutBB.user.settings.link ? '' : ' wbbhide');
						dom.oEach(WhutBB.set, function (id, wbb) {
							wbb.panels.link.className = cls;
						});
					}
				}
			}
		},
		mouse: {
			target: function (target) {
				// WebKit issue -- This returns an actual button, instead of the span.icon-* within it
				return (/(?:icon-)/).test(target.getAttribute('class')) ? target.parentNode : target;
			},
			down: function () {
				if (WhutBB.e.target.getAttribute('data-type')) {
					return WhutBB.evt.delegate.button();
				}
				if (WhutBB.e.target.getAttribute('data-setting')) {
					return WhutBB.evt.delegate.settings.update();
				}
			},
			register: function (wbb) {
				return function (evt) { // context for _this_ is the container div.wbbbuttons
					// console.log('mouse.register/anon');
					WhutBB.e.set(evt, WhutBB.evt.mouse.target(evt.target), wbb);
					WhutBB.evt.mouse.down();
					WhutBB.e.clean();
				};
			}
		},
		key: {
			down: function () {
				this.fire(this.button());
			},
			letter: function () {
				return String.fromCharCode(WhutBB.e.current.which || WhutBB.e.current.keyCode).toLowerCase();
			},
			modifier: function () {
				if (WhutBB.e.current.ctrlKey && WhutBB.e.current.altKey) { return 'ctrl+alt'; }
				if (WhutBB.e.current.ctrlKey) { return 'ctrl'; }
				if (WhutBB.e.current.altKey) { return 'alt'; }
				return '';
			},
			button: function () {
				return WhutBB.e.whut.getButton(WhutBB.db.getShortcut(this.modifier(), this.letter()));
			},
			fire: function (button) {
				if (button) {
					WhutBB.e.current.preventDefault();
					// dom.click(button);
					WhutBB.e.target = button;
					WhutBB.evt.mouse.down();
				}
			},
			register: function (wbb) {
				return function (evt) {
					// console.log('key.register/anon');
					WhutBB.e.set(evt, this, wbb); // _this_ is a textarea
					WhutBB.evt.key.down();
					WhutBB.e.clean();
				};
			}
		}
	};

	/**
	 * Box Object (aka textarea stuff)
	 * 
	 * How it works:
	 *  WhutBB.box.select(textarea).insert(['{start}', '{end}']);
	 *
	 * An array is used because Tags parse to that data type.
	 *
	 * Result:
	 * <textarea>{start}{end}</textarea>
	 * 
	 * It's (more) magical when used in an event.
	 */
	WhutBB.box = {
		select: function (textarea) {
			this.textarea = textarea;
			WhutBB.box.range.data = this.range.get();
			return this;
		},
		range: {
			get: function () {
				// Todo abstract ie and standard methods
				return ie ? this.ie() : this.standard();
			},
			rdata: function (start, end, selection) {
				return { start: start, end: end, selection: selection };
			},
			ie: function () {
				WhutBB.box.textarea.focus(); // important here
				var ieRange = document.selection.createRange(),
					dup = ieRange.duplicate(),
					start,
					end,
					selection;
				dup.moveToElementText(WhutBB.box.textarea);
				dup.setEndPoint('EndToEnd', ieRange);

				start = dup.text.length - ieRange.text.length;
				end = start + ieRange.text.length;
				selection = ieRange.text.replace(/\r\n/g, '\n');
				if (end === 0 && start === 0) { // Push inserts to the end
					start = end = WhutBB.box.textarea.value.length;
				}
				// console.log('tx1 ' + ieRange.text, 'txs ' + dup.text, 'txt ' + ieRange.text.replace(/\r\n/g, '\n'), 'SST ' + start, 'SSE ' + end);
				ieRange = dup = null;
				return this.rdata(start, end, selection);
			},
			standard: function () {
				if (WhutBB.box.textarea.selectionStart < 0) { return; }
				if (WhutBB.box.textarea.selectionEnd > WhutBB.box.textarea.value.length) {
					WhutBB.box.textarea.selectionEnd = WhutBB.box.textarea.value.length;
				}
				var s = WhutBB.box.textarea.selectionStart || 0,
					e = WhutBB.box.textarea.selectionEnd || 0;
				return this.rdata(s, e, WhutBB.box.textarea.value.substring(s, e) || '');
			}
		},
		insert: function (tag) {
			var pre = WhutBB.box.textarea.value.substring(0, WhutBB.box.range.data.start) + tag[0],
				post = tag[1] + WhutBB.box.textarea.value.substring(WhutBB.box.range.data.end);
			WhutBB.box.textarea.value = [pre, WhutBB.box.range.data.selection, post].join('');
			WhutBB.box.selection(pre.length);
		},
		selection: function (start) {
			var r;
			WhutBB.box.textarea.focus();
			if (ie) {
				r = WhutBB.box.textarea.createTextRange();
				r.collapse(true);
				r.moveStart('character', start);
				r.moveEnd('character', WhutBB.box.range.data.selection.length);
				r.select();
			} else {
				WhutBB.box.textarea.setSelectionRange(start, start + WhutBB.box.range.data.selection.length);
			}
		}
	};

	/**
	 * WhutBBCode Settings Class
	 * Intended to be a singleton used within WhutBB.init()
	 *
	 * This class is used to store site configurations for WhutBBCode?
	 * Using these options, the script can create buttons, emoticons, etc.
	 *
	 * Effectively, without any settings, nothing really happens.
	 *
	 * The most important option is blueprint, which tells the script which
	 * buttons to create.
	 *
	 * The Panel class uses this blueprint to construct buttons, put them in the button
	 * panel, and attach them to WhutBB instances.
	 *
	 * All buttons that exist in WhutBB.db.buttons are stored as validButtons. The script
	 * uses validButtons to list available shortcuts to the user.
	 *
	 * To reiterate, options are the most important aspect of this class
	 *
	 * param @options object with the following (mostly optional) attributes
	 *
	 * if none is given, the script will try to find an appropriate match
	 * for the site.
	 *
	 * if no setting is found, the "generic" default options will be used
	 *
	 *  name: (String) [ default: '' ]
	 *    the website's name
	 *
	 *  link:
	 *    link to information about the site's BBCode or WhutBBCode? itself (default)
	 *
	 *  beneath: (Boolean) [ default: true ]
	 *    location to insert buttons, beneath or above the textarea
	 *
	 *  blueprint: (Array) [ default: [] ]
	 *    an array of arrays containing buttons to create
	 *
	 *    group buttons together to create a set of similiar types
	 *
	 *    example:
	 *
	 *      blueprint: [
	 *         ['b', 'i', 'u'], // a set of three buttons
	 *         ['shortcut', 'settings'] // a set of two
	 *      ]
	 *
	 *    buttons are then placed in the DOM in the following order
	 *    [b][i][u] [?][+]
	 *
	 *    each set is separated by a space
	 *
	 *  width: (Number) [ default: 430 ]
	 *    a width (in pixels) to set for the WhutBB.wrap so that buttons fit well
	 *
	 *  emoticonDir: [ default: '' ]
	 *    absolute or relative (to the current location) location to where emoticons reside
	 *    it should end in a slash (/)
	 *
	 *  emoticonMax: (Number) [ default: 39 ]
	 *    a limit of emoticons to create
	 *
	 *  emoticons: (String|Array) [ default: [['', '']] ] (a null emoticon)
	 *    - name of the object from WhutBB.db.emoticons[options.emoticons]
	 *      three possible options: gazelle, waffles, indie
	 *
	 *    - an array of arrays containing emoticons to create
	 *    
	 *    the sub-arrays are formed by the emoticon text and the name (and location) of the 
	 *    image to produce
	 *
	 *    example:
	 *      emoticons: [ [":)", "happy.png"], [":D", "grin.png"], [":(", "sad.png"] ]
	 *
	 *    these create images based on the emoticon directory (emoticonDir)
	 *    if the directory varies, it should be included
	 *
	 *      example:
	 *
	 *        [':D', 'some-other-dir/grin.png']
	 *
	 *    absolute paths are not supported unless emoticonDir is an empty string
	 *
	 *    To add emoticons to an existing object from WhutBB.db.emoticons, see
	 *    WhutBB.db.addEmoticons().
	 *
	 *  shortcuts: (Object) [ default: WhutBB.db.shortcuts ]
	 *    an object of objects that account for shotcut mapping, see "Keyboard Shortcuts"
	 *    part of the documentation
	 *
	 *    example:
	 *      shortcuts: {
	 *        ctrl: {
	 *          i: 'i'
	 *        },
	 *        'alt+ctrl': {
	 *          x: 'shotcuts'
	 *        }
	 *      }
	 *
	 */
	WhutBB.Settings = function Settings(options) {
		var def = WhutBB.db.sites[':default']();

		try {
			this.name = options.name || def.name;
			this.link = options.link || def.link;

			this.beneath = !!options.beneath;
			this.blueprint = options.blueprint || def.blueprint;
			this.width = options.width || def.width;

			this.emoticonDir = options.emoticonDir || def.emoticonDir;
			this.emoticonMax = options.emoticonMax || def.emoticonMax;
			this.emoticons = (typeof options.emoticons === 'string') ? WhutBB.db.emoticons[options.emoticons] : (options.emoticons || def.emoticons); // null emoticon

			this.shortcuts = options.shortcuts || WhutBB.db.shortcuts;
		} catch (e) {
			dom.oEach(def, function (name, setting) {
				this[name] = setting;
			}, this);
		}
		this.validButtons = {};
	};

	/**
	 * Button
	 *
	 * Generic button class that encapsulates data from
	 * WhutBB.db.buttons objects and creates a button element
	 *
	 * Do not use the constructor directly, use Button.create instead!
	 */
	WhutBB.Button = (function () {

		function Button(name) {
			this.name = name;
			this.data = WhutBB.db.buttons[name];
		}

		/**
		 * Button.create returns a Button or a Null button
		 * All possible buttons located at WhutBB.db.buttons
		 */
		Button.create = function (button) {
			if (WhutBB.db.buttons[button]) {
				return new Button(button);
			}
			return Button.Null;
		};

		/**
		 * Creates a button element and also validates it
		 */
		Button.prototype.make = function () {
			this.validate();
			return dom.dom('button', {
				className: 'whutbbutton',
				name: this.name,
				title: this.data.title,
				attr: {
					type: 'button',
					'data-type': this.data.type || 'button'
				}
			},  dom.dom('span', {
				className: 'icon-' + this.data.icon,
				txt: this.data.display || this.name,
				attr: {
					'data-txt': this.data.display || this.name,
					'data-toggle': this.data.toggle || ''
				}
			}));
		};

		/**
		 * Validates a button by adding it to WhutBB.config.validButtons
		 */
		Button.prototype.validate = function () {
			WhutBB.config.validButtons[this.name] = true;
			return this;
		};

		/**
		 * Space creates a single-spaced text node.
		 *
		 * Both Space and Null objects are intended to mimic Buttons
		 * without using any real inheritance
		 */
		Button.Space = {
			make: function () {
				return document.createTextNode(' ');
			},
			validate: function () {
				return this;
			},
			data: {}
		};

		/**
		 * Null creates a simple text node.
		 * It's used when there is no real button in the db.
		 */
		Button.Null = {
			make: function () {
				return document.createTextNode('');
			},
			validate: function () {
				return this;
			},
			data: {}
		};

		Button.emoticon = function (emoticonData) {
			return dom.dom('img', {
				title: emoticonData[0],
				alt: emoticonData[0],
				src: WhutBB.config.emoticonDir + emoticonData[1],
				attr: {
					'data-type': 'emoticon'
				}
			});
		};

		Button.emoticonLoader = function () {
			return dom.dom('div', {
				className: 'emoticonLoader',
				name: 'emoticonLoader',
				txt: 'View all emoticons.',
				title: 'Loads all emoticons.',
				attr: {
					'data-type': -2
				}
			});
		};

		return Button;

	}());

	/**
	 * Panel Class
	 * Generates all the panels used in the script.
	 * 
	 * A panel is an element intended to be within a WhutBBInstance.wrap div.
	 *
	 * eg:
	 *	{ div (WhutBBInstance.wrap)
	 *   [ wbb link panel   ]
	 *   [ buttons panel    ]
	 *   [ settings panel*  ]
	 *   [ shortcuts panel* ]
	 *	}
	 *
	 * *Global panels
	 * 
	 * Use Panel.factory, instead of new Panel().
	 *
	 * Global/public panels are static and part of the Panel object,
	 * not a WhutBB instance. They are typically transient, meaning that
	 * they appear in different WhutBB.wraps depending on the toggle state
	 *
	 * For example, emoticons are appended to WBB instace 1 when its
	 * emoticon button is clicked, but once WBB instace 2's emoticon button
	 * is clicked, the emoticon panel will be appended to WBB 2's wrap.
	 *
	 * This aliviates the need to generate each panel separately for every instance.
	 * This means that if there are 100s of emoticons, they will only be created once
	 * and moved around as needed, instead of creating 100s of emoticons per instance.
	 * 
	 * Private panels are stored in the Panel.set object.
	 * Once panels are initially created within Panel.construct(),
	 * private panels can be copied to (copyTo) a WhutBB instance.
	 *
	 * The only two private panels are Button and Link, because they
	 * are not meant to be transient. Buttons are needed at every instance.
	 *
	 */
	WhutBB.Panel = (function () {

		/**
		 * An element is part of the instance
		 */
		function Panel(element) {
			this.element = element;
		}

		/**
		 * A set of private panels
		 */
		Panel.set = {};

		/**
		 * A set of global panels
		 */
		Panel.global = {};

		/**
		 * Panel.factory creates both global and private panels
		 *
		 * @param name for the panel
		 * @param element to encapsulate
		 * @param priv true for private panels, otherwise global
		 */
		Panel.factory = function (name, element, priv) {
			if (priv) {
				if (!Panel.set[name]) {
					Panel.set[name] = new Panel(element);
				}
				return Panel.set[name];
			}
			if (!Panel.global[name]) {
				Panel.global[name] = new Panel(element);
			}
			return Panel.global[name];
		};

		/**
		 * Creates and initializes every necessary panel
		 */
		Panel.construct = function () {
			Panel.factory('link', dom.dom('div', {className: 'wbblink' + (WhutBB.user.settings.link ? '' : ' wbbhide') },
				dom.dom('a', {href: WhutBB.config.link, title: 'Version 3.0', txt: 'WhutBBCode?'})), true);
			Panel.factory('button', dom.dom('div', {className: 'wbbbuttons'}), true);

			// Global Panels
			Panel.factory('shortcut', dom.dom('ul', {className: 'wbbshortcut wbbhide'}));
			Panel.factory('emoticon', dom.dom('div', {className: 'wbbemot wbbhide'}));
			Panel.factory('settings', dom.dom('ul', {className: 'wbbset wbbhide'}, null, document.body));
			Panel.factory('console', dom.dom('div', {className: 'wbbcon', txt: ''}));
			Panel.attach.fill();
		};

		/**
		 * Copies private panels to a WhutBB Instance
		 */
		Panel.copyTo = function (wbbInst) {
			wbbInst.panels = {};
			dom.oEach(Panel.set, function (name, panel) {
				wbbInst.panels[name] = panel.element.cloneNode(true);
				wbbInst.wrap.appendChild(wbbInst.panels[name]);
			});
		};

		/**
		 * Prints a message to the console
		 */
		Panel.message = function (text, time) {
			var el = WhutBB.Panel.global.console.element;
			el.innerHTML = text;
			window.setTimeout(function () {
				el.innerHTML = '';
			}, isNaN(+time) ? 2500 : time);
		};

		Panel.attach = {
			fill: function () {
				// fills the panels appropriertly
				this.buttons();
				this.emoticons(-1, Math.min(WhutBB.config.emoticons.length,
					WhutBB.config.emoticonMax));
				this.settings();
				this.shortcuts();
			},
			buttons: function () {
				var f = document.createDocumentFragment();
				dom.aEach(WhutBB.config.blueprint, function (set) {
					dom.aEach(set, function (name) {
						f.appendChild(WhutBB.Button.create(name).make());
					});
					f.appendChild(WhutBB.Button.Space.make());
				});
				Panel.set.button.element.appendChild(f);
				f = null;
			},
			emoticons: function (i, max) {
				var f = document.createDocumentFragment();
				while (++i < max) {
					f.appendChild(WhutBB.Button.emoticon(WhutBB.config.emoticons[i]));
				}
				// attach the div that loads all emoticons if required
				if (max !== WhutBB.config.emoticons.length
						&& WhutBB.config.emoticons.length > WhutBB.config.emoticonMax) {
					f.appendChild(WhutBB.Button.emoticonLoader());
				}
				Panel.global.emoticon.element.appendChild(f);
				f = null;
			},
			settings: function () {
				var list = [];
				dom.oEach(WhutBB.user.options, function (name, data) {
					list.push('<li><label title="' + data.title + '" ><input type="checkbox" data-setting="true" name="' + name + '" '
						+ (WhutBB.user.settings[name] ? 'checked="checked" ' : '') + '/>' + data.txt + '</label></li>');
				});
				Panel.global.settings.element.innerHTML = list.join('');
				Panel.global.settings.element.appendChild(Panel.global.console.element);
			},
			shortcuts: function () {
				dom.oEach(WhutBB.config.shortcuts, function (key, shortcuts) {
					dom.oEach(shortcuts, function (letter) {
						if (WhutBB.config.validButtons[shortcuts[letter]]) { // Checks if the site uses this button
							Panel.global.shortcut.element.appendChild(dom.dom('li', {
								innerHTML: [
									key.toUpperCase(),
									'+',
									letter.toUpperCase(),
									'<br>',
									WhutBB.db.buttons[shortcuts[letter]].title
								].join('')
							}));
						}
					});
				});
			}
		};

		return Panel;

	}());

	/**
	 * Tag Class
	 * Creates a tag of given name
	 * 
	 * Use Tag.get(), not new Tag()!
	 * Tag.get() uses lazy loading, and stores all new
	 * tags within Tags.tags[]
	 * 
	 * A tag's type generates the appropriate parsing
	 * All tags parse as a two-index array
	 *
	 * If a tag does not require an endpoint (matching tag),
	 * an empty string is required
	 * 
	 *   ['[tag]', '[/tag]']
	 *   ['open', '']
	 *   ['', 'close']
	 * 
	 * Example, insert a tag directly into a textarea
	 *   bTag = Tag.get('b');
	 *   bTag.insertTo(someTextarea);
	 * 
	 * PS: Note the use of WhutBB.box within insertTo().
	 */
	WhutBB.Tag = (function () {

		function Tag(text) {
			Tag.tags[text] = this;
			this.button = WhutBB.db.buttons[text];
			this.tag = this.button.tag || text;
		}

		// Stores new Tags 
		Tag.tags = {};

		/**
		 * Gets a tag by a name.
		 * Finds a tag in the tags object or creates a new tag.
		 * Returns an update()'d tag
		 */
		Tag.get = function (name) {
			if (WhutBB.db.buttons[name]) {
				return (Tag.tags[name] || new Tag(name)).update();
			}
		};

		/**
		 * Each button has a type which is used as the parsing method
		 */
		Tag.types = {
			0: function () { // Basic tag [tag][/tag]
				return ['[' + this.tag + ']', '[/' + this.tag + ']'];
			},
			1: function () { // [tag=option][/tag]
				return ['[' + this.tag + '=' + this.option + ']', '[/' + this.tag + ']'];
			},
			2: function () { // [tag=]
				return ['[' + this.tag + '=', ']'];
			},
			3: function () { // List [*] or [#]
				var j = [], li = WhutBB.box.range.data.selection.split('\n');

				if (li.length > 1) {
					dom.aEach(li, function (item) {
						j.push('[' + this.tag + ']' + item);
					}, this);
					WhutBB.box.range.data.selection = j.join('\n');
					return ['', ''];
				}

				return ['[' + this.tag + ']', ''];
			},
			4: function () { // used for custom tags
				if (typeof this.tag === 'string') {
					return [this.tag, this.tag];
				}
				return [this.tag[0], this.tag[1]];
			}
		};

		Tag.prototype.toString = function () {
			return [this.tag, this.option, this.type].join(' ');
		};

		Tag.prototype.insertTo = function (textarea) {
			WhutBB.box.select(textarea).insert(this.parse());
		};

		/**
		 * Parse uses some JavaScript magic to get the function
		 * based on the tag type, and call it with _this_ tag's
		 * instance
		 */
		Tag.prototype.parse = function () {
			return Tag.types[this.type].call(this);
		};

		Tag.prototype.findOption = function () {
			// console.log('find option');
			return this.button.type === 1 && this.optionText();
		};

		Tag.prototype.defaultText = function () {
			return this.button.placeholder || this.button.val || '';
		};

		Tag.prototype.placeholderText = function () {
			return this.button.placeholder ? ('\n(Default text [' + this.button.placeholder + '] will be removed automatically.)') : '';
		};

		Tag.prototype.optionText = function () {
			if (!WhutBB.e.macro && WhutBB.user.settings.prompt && this.button.noPrompt !== true) {
				this.option = window.prompt(this.button.prompt + this.placeholderText(), this.defaultText());
			} else {
				this.option = this.defaultText();
			}
			if (this.option === this.button.placeholder) {
				this.option = false;
			}
			return true;
		};

		Tag.prototype.findType = function () {
			return this.option === false ? 0 : this.button.type || 0;
		};

		Tag.prototype.update = function () {
			this.findOption();
			this.type = this.findType();
			return this;
		};

		return Tag;

	}());

	WhutBB.init();
	WhutBB.factory();
}());