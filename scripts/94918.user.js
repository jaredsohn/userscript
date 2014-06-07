// ==UserScript==
// @name           NicoNicoPlaylist for Chrome
// @namespace      http://www.nicovideo.jp/
// @original      http://d.hatena.ne.jp/kotas
// @description    List up the series of movies and play them all! for Google Chrome
// @include        http://www.nicovideo.jp/*
// @exclude        http://www.nicovideo.jp/thumb*
// @version        1.0.0
// @licemse 	       The MIT License 
// ==/UserScript==

(function () {
	var w = (this.unsafeWindow || window), document = w.document;

	var NicoNicoPlaylist = {
		version: "1.13",
		getUserAgent: function () {
			return "NicoNicoPlaylist/" + NicoNicoPlaylist.version + " Greasemonkey";
		}
	};

	var NicoNico = {
		WATCH_PAGE_REGEXP:   /^http:\/\/[^\/]+?\.nicovideo\.jp\/watch\/([^\/?<>"'#]+)/,
		WATCH_URL:           "http://www.nicovideo.jp/watch/",
		GETRELATION_API_URL: "http://www.nicovideo.jp/api/getrelation?page=1&sort=p&order=d&video=",
		// VIDEO_CLASS_REGEXP:  /\b(?:video|watch)\b(?!.*\bnoadd\b)/
		VIDEO_CLASS_REGEXP: /\b(?:video|watch|vinfo_title)\b(?!.*\bnoadd\b)/
	};

	NicoNico.Player = function () { this.initialize.apply(this, arguments); };
	NicoNico.Player.prototype = {
		initialize: function (id) {
			this.player = (typeof id != "string") ? id : document.getElementById(id);
		},
		isReady: function () {
			return (this.player && this.player.ext_getStatus &&
				this.player.ext_getStatus() !== undefined);
		},
		getStatus: function () {
			return this.player.ext_getStatus();
		},
		isFullScreen: function () {
			return (this.player.ext_getVideoSize() != "normal");
		},
		setFullScreen: function (full) {
			this.player.ext_setVideoSize(full ? "fit" : "normal");
			return this;
		}
	};

/*
	var Storage = (typeof GM_getValue == "function") ?
		{
			getItem: function (key) { return GM_getValue(key); },
			setItem: function (key, value) { GM_setValue(key, value); }
		}
	: (function (store) {
		return {
			getItem: function (key) { return store[key]; },
			setItem: function (key, value) { store[key] = value; }
		};
	})(w.localStorage || w.globalStorage[w.location.hostname]);
*/
    // modiby for Chrome Extention
	var Storage = (function (store) {
		return {
			getItem: function (key) { return store[key]; },
			setItem: function (key, value) { store[key] = value; }
		};
	})(w.localStorage || w.globalStorage[w.location.hostname]);

	var Util = {
		observe: function (elem, event, func, capture) {
			if (elem.attachEvent) {
				elem.attachEvent("on" + event, func);
			} else if (elem.addEventListener) {
				elem.addEventListener(event, func, !!capture);
			} else {
				elem["on" + event] = func;
			}
		},
		stopObserving: function (elem, event, func, capture) {
			if (elem.detachEvent) {
				elem.detachEvent("on" + event, func);
			} else if (elem.removeEventListener) {
				elem.removeEventListener(event, func, !!capture);
			} else {
				delete elem["on" + event];
			}
		},
		request: typeof GM_xmlhttpRequest == "function" ? GM_xmlhttpRequest : function (options) {
			var req = new XMLHttpRequest();
			req.open(options.method || "GET", options.url, true);
			if (options.onload) {
				req.onload = function () {
					options.onload(req);
				}
			}
			if (options.onerror) {
				req.onerror = function () {
					options.onerror(req);
				}
			}
			if (options.onreadystatechange) {
				req.onreadystatechange = function () {
					options.onreadystatechange(req);
				}
			}
			if (options.overrideMimeType) {
				req.overrideMimeType(options.overrideMimeType);
			}
			if (options.headers) {
				for (var key in options.headers) {
					req.setRequestHeader(key, options.headers[key]);
				}
			}
			req.send(options.data || null);
			return req;
		}
	};

	var Video = function () { this.initialize.apply(this, arguments); };
	Video.prototype = {
		initialize: function () {
			this.id    = arguments[0] || "";
			this.title = arguments[1] || "";
		},
		serialize: function () {
			return [
				w.escape(this.id),
				w.escape(this.title)
			].join("&");
		},
		unserialize: function (data) {
			var r = [];
			if (data) r = data.split(/&/);
			this.id    = w.unescape(r[0]);
			this.title = w.unescape(r[1]);
		},
		getPlayUri: function () {
			return NicoNico.WATCH_URL + this.id;
		},
		play: function () {
			w.location.href = this.getPlayUri();
		},
		getRelatedVideos: function (iterator, terminator) {
			if (typeof iterator != "function") return;
			terminator = terminator || function () { };

			Util.request({
				method: "GET",
				url: NicoNico.GETRELATION_API_URL + this.id,
				headers: { "User-Agent": NicoNicoPlaylist.getUserAgent() },
				onload: function (r) {
					if (200 <= r.status && r.status < 300) {
						var tags = r.responseText.match(/<video>([\S\s]+?)<\/video>/gm);
						if (!tags) return false;
						for (var i = 0, len = tags.length; i < len; i++) {
							var m;
							m = tags[i].match(/<url>([^<]+)<\/url>/);
							if (!m) continue;
							m = m[1].match(NicoNico.WATCH_PAGE_REGEXP);
							if (!m) continue;
							var videoId = m[1];

							m = tags[i].match(/<title>([^<]+)<\/title>/);
							if (!m) continue;
							var title = m[1];
							iterator(videoId, title);
						}
					}
					terminator(r);
				},
				onerror: terminator
			});
		}
	};

	var PlayList = function () { this.initialize.apply(this, arguments); };
	PlayList.all = function () {
		var list = Storage.getItem("all_playlist");
		return list ? list.split(/,/) : [];
	};
	PlayList.add = function (playlist) {
		var list = PlayList.all();
		list.push(playlist.id);
		Storage.setItem("all_playlist", list.join(","));
	};
	PlayList.prototype = {
		initialize: function () {
			this.id     = arguments[0] || 'default';
			this.title  = arguments[1] || 'プレイリスト';
			this.videos = [];
			this.load();
		},
		serialize: function () {
			var videos = [];
			for (var i = 0, len = this.videos.length; i < len; i++) {
				videos.push(this.videos[i].serialize());
			}

			return [
				w.escape(this.id),
				w.escape(this.title),
				videos.join(":")
			].join(";");
		},
		unserialize: function (data) {
			var r = [];
			if (data) r = data.split(/;/);
			this.id    = w.unescape(r[0]);
			this.title = w.unescape(r[1]);

			this.videos = [];
			if (r[2]) {
				var vids = r[2].split(/:/);
				for (var i = 0; i < vids.length; i++) {
					if (vids[i]) {
						var v = new Video();
						v.unserialize(vids[i]);
						this.videos.push(v);
					}
				}
			}
		},
		save: function () {
			Storage.setItem("playlist_" + this.id, this.serialize());
			PlayList.add(this);
		},
		load: function () {
			var data = Storage.getItem("playlist_" + this.id);
			if (data) this.unserialize(data);
		},
		push: function (video) {
			this.videos.push(video);
		},
		insertBefore: function (video, index) {
			if (index < 0)
				index = 0;
			if (index > this.videos.length)
				index = this.videos.length;

			this.videos.splice(index, 0, video);
		},
		pop: function () {
			return this.videos.shift();
		},
		popRandom: function () {
			if (this.videos.length == 0) return undefined;
			var i = Math.floor(Math.random() * this.videos.length);
			var v = this.videos[i];
			this.videos.splice(i, 1);
			return v;
		},
		remove: function (index) {
			if (index >= 0 && index < this.videos.length) {
				var v = this.videos[index];
				this.videos.splice(index, 1);
				return v;
			}
			return false;
		},
		clear: function () {
			this.videos = [];
		}
	};

	var PlayListController = function () { this.initialize.apply(this, arguments); };
	PlayListController.prototype = {
		initialize: function (playlist) {
			this.playlist = playlist;
			this.mode = "none";
			this.random = Storage.getItem("random_" + this.playlist.id) == "true";   		// mod
			this.loop = Storage.getItem("loop_" + this.playlist.id) == "true";						// mod
			this.fullScreen = Storage.getItem("fullScreen_" + this.playlist.id) == "true";		// mod
			this.pinned = Storage.getItem("pinned_" + this.playlist.id) == "true";				// mod
			this.container = null;
			this.visible = true;
			this.opened = false;
			this.closeTimer = null;
			this.update();
		},
		getPageVideoId: function () {
			var m;
			if (m = w.location.href.match(NicoNico.WATCH_PAGE_REGEXP)) {
				return m[1];
			} else {
				return false;
			}
		},
		isWatchPage: function () {
			return this.getPageVideoId() != false;
		},
		pushVideo: function (videoId, title) {
			var video = new Video(videoId, title);
			this.playlist.push(video);
			this.playlist.save();
			this.update();
		},
		pushVideos: function (videos) {
			for (var i = 0, len = videos.length; i < len; i++) {
				if (videos[i].id) {
					var video = new Video(videos[i].id, videos[i].title);
					this.playlist.push(video);
				}
			}
			this.playlist.save();
			this.update();
		},
		pushThisVideo: function () {
			var videoId = this.getPageVideoId();
			if (videoId) {
				// var h1s = document.getElementsByTagName("h1");
				// if (h1s.length == 0) return;
				// var a = h1s[0].firstChild;
				// if (!a || !a.tagName || a.tagName.toUpperCase() != "A") return;
				// var title = a.innerHTML;
				var title = document.title;
				title = title.substr(0,title.length - 13 );

				this.pushVideo(videoId, title);
			}
		},
		pushAllVideos: function () {
			var as = document.getElementsByTagName("a");
			var videos = [];
			for (var i = 0, len = as.length; i < len; i++) {
				var a = as[i];
				if (!a.href) continue;
				var m;
				if (m = a.href.match(NicoNico.WATCH_PAGE_REGEXP)) {
					if (NicoNico.VIDEO_CLASS_REGEXP.test(a.className)) {
						videos.push({ id: m[1], title: a.innerHTML });
					}
				}
			}

			var videoId = this.getPageVideoId();
			if (videoId) {
				var self = this;
				var thisVideo = new Video(videoId);
				thisVideo.getRelatedVideos(function (videoId, title) {
					videos.push({ id: videoId, title: title });
				}, function () {
					self.pushVideos(videos);
				});
			} else {
				this.pushVideos(videos);
			}
		},
		playNext: function () {
			var video;
			if (this.random)
				video = this.playlist.popRandom();
			else
				video = this.playlist.pop();
			if (video) {
				if (this.loop) this.playlist.push(video);
				this.playlist.save();
				video.play();
			}
		},
		remove: function (index) {
			this.playlist.remove(index);
			this.playlist.save();
			this.update();
		},
		move: function (index, destIndex) {
			var video = this.playlist.remove(index);
			if (video) {
				this.playlist.insertBefore(video, destIndex);
				this.playlist.save();
				this.update();
			}
		},
		clear: function () {
			this.playlist.clear();
			this.playlist.save();
			this.update();
		},
		setMode: function (mode) {
			if (this.mode == mode) return;

			if (mode == "add") {
				this.__captureVideoLinks(true);
			} else if (this.mode == "add") {
				this.__captureVideoLinks(false);
			}

			this.mode = mode;
			this.update();
		},
		setPinned: function (pinned) {
			this.pinned = pinned;
			Storage.setItem("pinned_" + this.playlist.id, this.pinned);

			if (this.closeTimer) {
				clearTimeout(this.closeTimer);
				this.closeTimer = null;
			}
		},
		setRandom: function (random) {
			this.random = random;
			Storage.setItem("random_" + this.playlist.id, this.random);
		},
		setLoop: function (loop) {
			this.loop = loop;
			Storage.setItem("loop_" + this.playlist.id, this.loop);
		},
		setFullScreen: function (fullScreen) {
			this.fullScreen = fullScreen;
			Storage.setItem("fullScreen_" + this.playlist.id, this.fullScreen);
		},
		open: function () {
			this.visible = this.opened = true;
			this.updateClassName();
		},
		close: function () {
			this.opened = false;
			this.updateClassName();
		},
		show: function () {
			this.visible = true;
			this.updateClassName();
		},
		hide: function () {
			this.visible = false;
			this.updateClassName();
		},
		updateClassName: function () {
			if (this.container) {
				this.container.className = "playlist-controller"
					+ (this.opened ? " opened" : " closed")
					+ (this.visible ? " visible" : " hidden");
			}
		},
		closeLater: function (msec) {
			var self = this;
			this.cancelClosing();
			this.closeTimer = setTimeout(function () {
				self.closeTimer = null;
				self.close();
			}, msec || 500);
		},
		cancelClosing: function () {
			if (this.closeTimer) {
				clearTimeout(this.closeTimer);
				this.closeTimer = null;
			}
		},
		update: function () {
			var self = this;
			var listScrollTop = 0;

			var box = document.getElementById("playlistcontroller_" + this.playlist.id);
			if (!box) {
				box = document.createElement("div");
				box.id = "playlistcontroller_" + this.playlist.id;
				box.className = "playlist-controller";

				var isBoxEvent = function (ev) {
					var el = ev.relatedTarget || ev.target;
					while (el && el != box) {
						try { el = el.parentNode } catch (e) { el = box; }
					}
					return el != box;
				};
				Util.observe(box, "mouseover", function (ev) {
					if (isBoxEvent(ev)) {
						if (!self.opened) {
							self.open();
						} else {
							self.cancelClosing();
						}
					}
				});
				Util.observe(box, "mouseout", function (ev) {
					if (self.opened && !self.pinned && !self.closeTimer && isBoxEvent(ev)) {
						self.closeLater();
					}
				});
				document.body.appendChild(box);
			} else {
				var lists = box.getElementsByTagName("ul");
				for (var i = 0, len = lists.length; i < len; i++) {
					var ul = lists[i];
					if (ul && /\bplaylist-list-inner\b/.test(ul.className)) {
						listScrollTop = ul.scrollTop;
						break;
					}
				}
				box.innerHTML = "";
			}
			this.container = box;
			this.updateClassName();

			var header = document.createElement("div");
			header.className = "playlist-header";
			box.appendChild(header);

			this.__addLinkButton(header, {
				caption: "×",
				title: "プレイリストを閉じる",
				className: "playlist-window-button playlist-window-button-close",
				click: function () { self.close(); }
			});
			this.__addLinkButton(header, {
				caption: "p",
				title: "自動で閉じないようにする",
				className: "playlist-window-button playlist-window-button-pin"
					+ (self.pinned ? " pinned" : ""),
				click: function () {
					self.setPinned(!self.pinned);
					if (self.pinned) {
						this.className += " pinned";
					} else {
						this.className = this.className.replace(" pinned", "");
					}
				}
			});

			var title = document.createElement("p");
			title.className = "playlist-title";
			title.innerHTML = this.playlist.title;
			header.appendChild(title);

			var buttons = document.createElement("div");
			buttons.className = "playlist-buttons";
			box.appendChild(buttons);

			var empty = (this.playlist.videos.length == 0);
			if (this.isWatchPage()) {
				this.__addButton(buttons, {
					caption: "この動画を追加",
					className: "playlist-button-add-this-video",
					click: function () { self.pushThisVideo(); }
				});
			}
			this.__addButton(buttons, {
				caption: "ページ中の動画を追加",
				className: "playlist-button-add-videos-in-page",
				click: function () { self.pushAllVideos(); }
			});
			this.__addButton(buttons, {
				caption: "再生",
				className: "playlist-button-play",
				click: function () { self.playNext(); },
				disabled: empty
			});
			this.__addButton(buttons, {
				caption: "全て削除",
				className: "playlist-button-clear",
				click: function () { self.clear(); },
				disabled: empty
			});

			var listbox = document.createElement("div");
			listbox.className = "playlist-list-outer";
			box.appendChild(listbox);

			var list = document.createElement("ul");
			list.className = "font12 playlist-list-inner";
			listbox.appendChild(list);

			for (var i = 0, len = this.playlist.videos.length; i < len; i++) {
				var v = this.playlist.videos[i];
				var item = document.createElement("li");
				item.className = "playlist-list-item " + (i % 2?"even":"odd");

				if (this.mode == "remove") {
					this.__addLinkButton(item, {
						caption: "×",
						title: "「" + v.title + "」 を削除する",
						className: "playlist-list-item-button playlist-list-item-button-del",
						click: (function (index) {
							return function () { self.remove(index); };
						})(i)
					});
				} else if (this.mode == "order") {
					this.__addLinkButton(item, {
						caption: "↑",
						title: "先頭へ移動",
						className: "playlist-list-item-button playlist-list-item-button-movetop",
						click: (function (index) {
							return function () { self.move(index, 0); };
						})(i)
					});
					this.__addLinkButton(item, {
						caption: "▼",
						title: "1つ下へ移動",
						className: "playlist-list-item-button playlist-list-item-button-movedown",
						click: (function (index) {
							return function () { self.move(index, index + 1); };
						})(i)
					});
					this.__addLinkButton(item, {
						caption: "▲",
						title: "1つ上へ移動",
						className: "playlist-list-item-button playlist-list-item-button-moveup",
						click: (function (index) {
							return function () { self.move(index, index - 1); };
						})(i)
					});
				}

				var anchor = document.createElement("a");
				anchor.className = "playlist-list-item-title video noadd";
				anchor.href = v.getPlayUri();
				anchor.innerHTML = anchor.title = v.title;
				item.appendChild(anchor);

				list.appendChild(item);
			}

			if (listScrollTop > 0) {
				list.scrollTop = listScrollTop;
			}

			var footer = document.createElement("div");
			footer.className = "playlist-footer font12";
			box.appendChild(footer);

			var selector = document.createElement("select");
			selector.className = "playlist-mode-selector";
			Util.observe(selector, "change", function () { self.setMode(this.value); });
			footer.appendChild(selector);

			var modes = {
				"none": "-",
				"add": "追加モード",
				"remove": "削除モード",
				"order": "並替モード"
			};
			for (var mode in modes) {
				var opt = document.createElement("option");
				opt.value = mode;
				opt.innerHTML = modes[mode];
				if (this.mode == mode) opt.selected = true;
				selector.appendChild(opt);
			}

			if (this.mode != "none") {
				this.__addLinkButton(footer, {
					caption: "終了",
					title: "モードを終了する",
					className: "playlist-mode-finish",
					click: function () { self.setMode("none"); }
				});
			}

			this.__addCheckBox(footer, {
				id: "playlist-" + this.playlist.id + "-checkbox-full",
				caption: "最大化",
				className: "playlist-checkbox-full",
				click: function () { self.setFullScreen(this.checked); },
				checked: this.fullScreen
			});
			this.__addCheckBox(footer, {
				id: "playlist-" + this.playlist.id + "-checkbox-random",
				caption: "ランダム",
				className: "playlist-checkbox-random",
				click: function () { self.setRandom(this.checked); },
				checked: this.random
			});
			this.__addCheckBox(footer, {
				id: "playlist-" + this.playlist.id + "-checkbox-loop",
				caption: "ループ",
				className: "playlist-checkbox-loop",
				click: function () { self.setLoop(this.checked); },
				checked: this.loop
			});
			
			// pined の時は自動で開く
			if (!self.opened && self.pinned) {
				self.open();
			}

		},
		__addButton: function (parent, def) {
			var btn = document.createElement("input");
			btn.type = "button";
			btn.value = def.caption;
			btn.className = "submit playlist-button";
			if (def.id) btn.id = def.id;
			if (def.className) btn.className += " " + def.className;
			if (def.disabled) btn.disabled = true;
			if (def.click) Util.observe(btn, "click", (function (b, f) {
				return function () { f.apply(b, arguments); };
			})(btn, def.click));
			parent.appendChild(btn);
		},
		__addLinkButton: function (parent, def) {
			var btn = document.createElement("a");
			btn.href = "javascript:void(0);";
			btn.innerHTML = def.caption;
			btn.className = "playlist-link-button";
			if (def.id) btn.id = def.id;
			if (def.className) btn.className += " " + def.className;
			if (def.title) btn.title = def.title;
			if (def.click) Util.observe(btn, "click", (function (b, f) {
				return function () { f.apply(b, arguments); };
			})(btn, def.click));
			parent.appendChild(btn);
		},
		__addCheckBox: function (parent, def) {
			var chk = document.createElement("input");
			chk.type = "checkbox";
			chk.className = "playlist-checkbox";
			if (def.id) chk.id = def.id;
			if (def.className) chk.className += " " + def.className;
			if (def.disabled) chk.disabled = true; 
			if (def.checked) chk.checked = true;
			if (def.click) Util.observe(chk, "click", (function (c, f) {
				return function () { f.apply(c, arguments); };
			})(chk, def.click));
			parent.appendChild(chk);

			var label = document.createElement("label");
			label.className = "playlist-checkbox-label";
			label.innerHTML = def.caption;
			if (def.id) label.htmlFor = chk.id;
			parent.appendChild(label);
		},
		__captureVideoLinks: function (capture) {
			if (!this.__captureHandler) {
				var self = this;

				this.__captureHandler = function (ev) {
					var el = ev.target || ev.srcElement;

					var title = false;
					if (el.tagName.toUpperCase() == "A") {
						title = el.innerHTML;
					}

					var isLink = false;
					while (el && el.parentNode != el) {
						title = title || el.title || el.alt;

						if (el.tagName
						&&	el.tagName.toUpperCase() == "A"
						&&	el.href
						&&	el.href.substring(0, 11) != "javascript:") {
							if (/\bvideo\b/.test(el.className)) {
								title = el.innerHTML;
							}
							isLink = true;
							break;
						}
						el = el.parentNode;
					}
					if (!isLink) return;

					var matched = el.href.match(NicoNico.WATCH_PAGE_REGEXP);
					if (matched) {
						var video = new Video(matched[1], title);
						self.playlist.push(video);
						self.playlist.save();
						self.update();
					} else {
						if (w.confirm("クリックされたリンクは動画ではありません\n追加モードを終了して、このページへ移動しますか？")) {
							return;
						}
					}

					if (ev.preventDefault) {
						ev.preventDefault();
						ev.stopPropagation();
					} else {
						ev.returnValue = false;
						ev.cancelBubble = true;
					}
				}
			}
			if (capture) {
				Util.observe(w, "click", this.__captureHandler);
			} else {
				Util.stopObserving(w, "click", this.__captureHandler);
			}
		}
	};

	var playlist = new PlayList();
	var controller = new PlayListController(playlist);

	var callQueue = [];
	setInterval(function () {
		while (callQueue.length > 0) {
			var a = callQueue.shift();
			controller[a[0]].apply(controller, a[1]);
		}
	}, 100);

	w.gm_playlistController = {};
	["pushVideo", "pushVideos", "pushThisVideo", "pushAllVideos",
	 "playNext", "clear", "open", "close"].forEach(function (s) {
		w.gm_playlistController[s] = function () {
			callQueue.push([s, arguments]);
		};
	});

	var playerElem = document.getElementById('flvplayer');
	if (playerElem) {
		var player = new NicoNico.Player(playerElem);
		var started = false, ended = false;
		(function (next) {
			var t = setInterval(function () {
				// if (started) {
				if (typeof playerElem.ext_getStatus == "undefined" ||
					 typeof playerElem.ext_getVideoSize == "undefined" ) {
					playerElem = window.document.getElementById('flvplayer');
					player = new NicoNico.Player(playerElem);
				// } else if (started ) {
				// mod for Chrome
				} else if (isPlaying() ) {
					clearInterval(t);
					if (controller.fullScreen) {
						player.setFullScreen(true);
						controller.hide();
					}
					next();
				}
			}, 200);
		})(function () {
			var lastFullScreen = false;
			var t = setInterval(function() {
				if (isEnded()) {
					clearInterval(t);
					controller.show();
					controller.playNext();
				}
				if (player.isFullScreen() != lastFullScreen) {
					lastFullScreen = !lastFullScreen;
					lastFullScreen ? controller.hide() : controller.show();
				}
			}, 1000);
		});
		/*  Chrome では効かない？
		var oldSetPlayerStatus = w.setPlayerStatus;
		w.setPlayerStatus = function (status) {
			if (status == "playing") {
				started = true;
			}
			if (status == "end") {
				ended = true;
			}
			if (oldSetPlayerStatus) {
				oldSetPlayerStatus();
			}
		};
		*/
		var isPlaying = function(){
			return playerElem.ext_getStatus() == "playing";
		};
		var isEnded = function(){
			return playerElem.ext_getStatus() == "end";
		}
	}

	//
	// Style definitions
	//

	GM_addStyle([
		'.playlist-controller {',
		'	position: absolute;',
		'	width: 400px;',
		'	left: 0px;',
		'	top: 30px;',
		'	border: 1px solid #CCC;',
		'	background-color: #FFF;',
		'	overflow: hidden;',
		'}',
		'.playlist-controller.closed {',
		'	left: -395px;',
		'}',
		'.playlist-controller.hidden {',
		'	display: none;',
		'}',

		'.playlist-header {',
		'	margin: 5px;',
		'	padding: 2px 5px;',
		'	border-bottom: 1px solid #333;',
		'}',
		'.playlist-title {',
		'	font-size: 90%;',
		'	font-weight: bold;',
		'}',
		'a.playlist-window-button {',
		'	float: right;',
		'	display: block;',
		'	width: 16px;',
		'	height: 16px;',
		'	font-size: 12px;',
		'	font-family: monospace;',
		'	font-weight: bold;',
		'	line-height: 16px;',
		'	text-align: center;',
		'	text-decoration: none;',
		'	border-width: 1px;',
		'	border-style: solid;',
		'	border-color: #CCC #999 #999 #CCC;',
		'	margin-right: 2px;',
		'	outline: none;',
		'}',
		'a.playlist-window-button-pin.pinned {',
		'	border-color: #999 #CCC #CCC #999;',
		'	background-color: #AAA;',
		'}',

		'.playlist-buttons {',
		'	margin: 10px;',
		'	position: relative;',
		'}',
		'.playlist-buttons:after {',
		'	content: ".";',
		'	clear: both;',
		'	display: block;',
		'	height: 0;',
		'	visibility: hidden;',
		'}',
		'.playlist-button {',
		'	margin-right: 5px;',
		'	float: left;',
		'}',
		'.playlist-button-clear {',
		'	float: right;',
		'}',

		'.playlist-list-outer {',
		'	margin: 0 10px;',
		'	padding: 0;',
		'	border: 1px solid #999;',
		'	height: 205px;',
		'}',

		'.playlist-list-inner {',
		'	list-style-type: none;',
		'	margin: 0;',
		'	padding: 0;',
		'	width: 100%;',
		'	height: 100%;',
		'	overflow: auto;',
		'}',

		'.playlist-list-item {',
		'	white-space: nowrap;',
		'}',
		'.playlist-list-item.even {',
		'	background-color: #EEE;',
		'}',

		'a.playlist-list-item-title {',
		'	display: block;',
		'	padding: 2px 5px;',
		'	overflow: hidden;',
		'	outline: none;',
		'}',
		'a.playlist-list-item-button {',
		'	font-size: 12px;',
		'	font-family: monospace;',
		'	font-weight: bold;',
		'	text-decoration: none;',
		'	padding: 2px 5px;',
		'	float: right;',
		'	outline: none;',
		'}',
		'a.playlist-list-item-button-del {',
		'	color: #D00;',
		'}',

		'.playlist-footer {',
		'	margin: 5px 10px;',
		'	text-align: right;',
		'}',
		'.playlist-footer:after {',
		'	content: ".";',
		'	clear: both;',
		'	display: block;',
		'	height: 0;',
		'	visibility: hidden;',
		'}',

		'.playlist-mode-selector {',
		'	float: left;',
		'}',
		'a.playlist-mode-finish {',
		'	float: left;',
		'	font-size: 12px;',
		'	text-decoration: none;',
		'	padding: 0 5px;',
		'	border-width: 1px;',
		'	border-style: solid;',
		'	border-color: #CCC #999 #999 #CCC;',
		'	outline: none;',
		'	margin-left: 5px;',
		'}',

		'.playlist-checkbox {',
		'	margin-left: 10px;',
		'	vertical-align: middle;',
		'}',
		'.playlist-checkbox-label {',
		'	vertical-align: middle;',
		'}'
	].join(''));

	// define CommandEvent
	[
		['GMNNPPushAllVideos', function () { controller.pushAllVideos(); }],
		['GMNNPPushThisVideo', function () { controller.pushThisVideo(); }],
		['GMNNPPlayNext',      function (r) {
			var numofdel = isNaN(r.command) ? 0 : (r.command - 1);
			for (var i=0 ; i<numofdel ; ++i) controller.remove(0);
			controller.playNext();
		}],
		['GMNNPRemove',        function (r) {
			controller.remove((!isNaN(r.command) && r.command > 0) ? (r.command - 1) : 0);
		}],
		['GMNNPClear',         function () { controller.clear(); }],
		['GMNNPRandom',        function () {
			var check = !controller.random;
			controller.setRandom(check);
			var result = document.evaluate('//input[contains(@id, "-checkbox-random")]',
				document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			if (result.singleNodeValue) result.singleNodeValue.checked = check;
		}],
		['GMNNPLoop',          function () {
			var check = !controller.loop;
			controller.setLoop(check);
			var result = document.evaluate('//input[contains(@id, "-checkbox-loop")]',
				document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			if (result.singleNodeValue) result.singleNodeValue.checked = check;
		}],
		['GMNNPFullScreen',    function () {
			var check = !controller.fullScreen;
			controller.setFullScreen(check);
			var result = document.evaluate('//input[contains(@id, "-checkbox-full")]',
				document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			if (result.singleNodeValue) result.singleNodeValue.checked = check;
		}]
	].forEach( function (a){
		Util.observe(window.content || window, a[0], a[1], false);
	});

})();
