// ==UserScript==
// @name        VK music download buttons with bitrate checking support
// @version     1.7
// @date        02-03-2011
// @namespace   http://operafan.net/forum/index.php?topic=3809.0
// @author      B@rmaley.e><e (fixed by Dither)
// @include     http://vkontakte.ru/*
// @include     http://vk.com/*
// @include     http://*.vkontakte.ru/*
// @include     http://*.vk.com/*

// ==/UserScript==

(function () {
	if (!String.prototype.trim) { String.prototype.trim = function () { return this.replace(/^\s+|\s+$/g, ''); };}
	var tools = {
		select: function (opts, context) {
			var query = '',
				length = 0,
				nodes = [],
				special = ['className', 'class', 'id', 'tagName'];
			context = context || document;
			var formSelector = arguments.callee.formSelector = arguments.callee.formSelector ||
			function () {
				var query = '',	flag;
				if (this.tagName) query += this.tagName;
				if (this.id) query += '#' + this.id;
				if (this.className) query += '.' + this.className;
				for (var key in this) {
					flag = !~ (special.indexOf(key));
					if (flag) { query += '[' + key + '="' + this[key] + '"]'; }
				}
				return query;
			};
			if (!(opts instanceof Array)) opts = [opts];
			if (context.querySelectorAll) {
				query = tools.map(opts, formSelector).join(',');
				return query && (nodes = context.querySelectorAll(query)).length ? nodes : null;
			}

			tools.foreach(opts, function () {
				var elems = document.getElementsByName(opts.tagName || '*'),
					opts = this;
				delete opts.tagName;
				tools.foreach(elems, function (i) {
					var flag = true;
					for (var key in opts) {
						switch (key) {
						case 'tagName':
							break;
						case 'className':
							flag = new RegExp('(?:^|\\b)' + opts[key] + '(?:$|\\b)', 'i').test(this.className);
							break;
						default:
							flag = this[key] == opts[key];
						}
						if (!flag) {
							return;
						}
					}
					if (flag) {
						nodes.push(this);
					} else {
						elems.splice(i, 1);
					}
				});
			});
			return nodes.length ? nodes : null;
		},

		serialize: function (obj) {
			var i, length, arr = [];
			if (obj instanceof HTMLElement) { obj = tools.serializeToObject(obj); }
			for (i in obj) { arr.push(i + '=' + encodeURIComponent(obj[i])); }
			return arr.join('&');
		},

		deserialize: function (str) {
			var obj = {},
				i = 0,
				k, length;
			str = str.split('&');
			for (length = str.length; i < length; ++i) {
				k = str[i].split('=');
				obj[k[0]] = decodeURIComponent(k[1]);
			}
			return obj;
		},

		ajax: function (method, url, data, callback) {
			var request = new XMLHttpRequest();
			data = data || '';
			if (typeof data !== 'string') data = tools.serialize(data);
			request.open(method.toUpperCase(), url || location.href, true);
			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			request.onreadystatechange = function () {
				if (request.readyState != 4) return;
				if (request.status == 200) {
					if (typeof callback == 'function') { callback(request.responseText, request); }
				} else { console.log('[VKAudioDL] Error while processing XMLHttpRequest #' + request.status); }
			};
			try { request.send(data); } catch (e) {;}
		},

		foreach: function (nodes, callback) {
			for (var i = 0, length = nodes.length; i < length; ++i) callback.call(nodes[i], i);
		},

		map: function (nodes, callback) {
			var arr = [];
			for (var i = 0, length = nodes.length; i < length; ++i) arr.push(callback.call(nodes[i], i));
			return arr;
		},

		formatSize: function (length) {
			var i = 0,
				type = ['\u0431', '\u041a\u0431', '\u041c\u0431', '\u0413\u0431', '\u0422\u0431', '\u041f\u0431'],
				tLength = type.length;
			while ((length / 1000 | 0) && i < tLength) {
				length /= 1024;
				++i;
			}
			return length.toFixed(2) + ' ' + type[i];
		},

		createElement: function (tag, opts) {
			var element = document.createElement(tag),
				key;
			opts = opts || {};
			return tools.extend(element, opts);
		},

		extend: function (origObj, newObj) {
			for (var key in newObj) {
				if (typeof newObj[key] == 'object') {
					origObj[key] = {};
					tools.extend(origObj[key], newObj[key]);
				} else origObj[key] = newObj[key]
			}
			return origObj;
		},

		messenger: {
			Sender: function () {
				var obj = {};
				if (window.postMessage) {
					obj.send = function (data, receiver) {
						receiver.contentWindow.postMessage(tools.serialize(data), '*');
					};
					window.addEventListener("message", function (event) {
						if (typeof obj.onMessage == 'function') obj.onMessage(tools.deserialize(event.data));
					}, false);
				} else {
					var interval;
					obj.send = function (data, receiver) {
						receiver.src += '#' + tools.serialize(data);

						if (!receiver.getHash) receiver.getHash = function () {
							var hash = this.src.match(/#.+/i);
							return hash ? hash[0] : '';
						};
						if (!interval) {
							var hash = receiver.getHash();
							setInterval(function () {
								var curHash = receiver.getHash();
								if (hash != curHash) {
									hash = curHash;
									if (typeof obj.onMessage == 'function') obj.onMessage(tools.deserialize(hash.substring(1)));
								}
							}, 500);
						}
					}
				}
				return obj;
			},

			Receiver: function () {
				var obj = {};
				if (window.postMessage) {
					obj.send = function (data) {
						window.parent.postMessage(tools.serialize(data), '*');
					};
					window.addEventListener("message", function (event) {
						if (typeof obj.onMessage == 'function') obj.onMessage(tools.deserialize(event.data));
					}, false);
				} else {
					obj.send = function (data) {
						var frame = window.parent.document.getElementById('_dataTransferFrame');
						frame.src = frame.src.replace(/#.+$/, '') + '#' + tools.serialize(data);
					};
					var hash = location.hash;
					setInterval(function () {
						if (location.hash != hash) {
							hash = location.hash;
							if (typeof obj.onMessage == 'function') obj.onMessage(tools.deserialize(hash.substring(1)));
						}
					}, 500);
				}
				return obj;
			}
		}
	},
	imgBS64 = 'data:image/gif;base64,R0lGODlhEAARAJEAAJqxxu7u7v///199nSH5BAAAAAAALAAAAAAQABEAAAImFIapCLafDpy0DoEznlrTLliedYXkiSbgBq1mGqGNVDVCgOe6LhQAOw==';
	var domain = location.host.match(/(vkontakte\.ru|vk\.com)$/i);
	if (!domain) { console.log('[VKAudioDL] Can not resolve domain'); return; }
	domain = domain[1];
	document.domain = domain;
	if (~location.hash.indexOf('dataTransfer')) {
		var obj = tools.messenger.Receiver();
		obj.onMessage = function (data) {
			if (data.type == 'request') tools.ajax('head', data.file, '', function (text, xhr) {
				var length = xhr.getResponseHeader('Content-Length'),
					nData = {
						'id': data.id,
						'length': length,
						'type': 'response'
					};
				obj.send(nData);
			});
		};
		return;
	}
	window.addEventListener('DOMContentLoaded', function () {
		var style = tools.createElement('style', {
			'innerHTML': '.__getBitrate {cursor:help}' 
			+ '.__draggable:hover table {text-shadow:1px 1px 1px #e0e0e0; cursor:pointer}' 
			+ '.play {float:left}'
		});
		document.getElementsByTagName('head')[0].appendChild(style);

		var iframe = tools.createElement('iframe', {
				'style': {
					'position': 'absolute',
					'top': '-999px',
					'left': '-999px',
					'height': '1px',
					'width': '1px'
				},
				'id': '_dataTransferFrame'
		});

		var obj = tools.messenger.Sender(), durations = {};
		obj.onMessage = function (data) {
			if (data.type == 'response') {
				var div = durations[data.id], duration;
				if (!div) console.log('[VKAudioDL] Unwkown ID in message for #' + data.id);
				duration = div.innerHTML.split(':');
				duration = duration[0] * 60 + Number(duration[1]);
				div.innerHTML += ' | ' + ((data.length / duration / 125) | 0) + ' \u041a\u0431\u0438\u0442/\u0441 | ' + tools.formatSize(data.length);
			}
		};

		function extractElements(element) {
			if (!element || !element.innerHTML) return;
			
			var playBtn = tools.select({ tagName: 'td>a' }, element);
			if (!playBtn) { console.log('[VKAudioDL] Cannot get play button for #' + element.id); return; }
			
			var duration = tools.select({ tagName: 'div.duration' }, element);
			if (!duration) { console.log('[VKAudioDL] Cannot get div.duration for #' + element.id); return; }
			
			var track, artist, name, 
				title = tools.select({ tagName: 'td.info' }, element);
			if (!title) { console.log('[VKAudioDL] Cannot get title for #' + element.id); }
			else {
				artist = tools.select({ tagName: 'b' }, title[0]);
				track = tools.select({ tagName: 'span' }, title[0]);
				artist = artist ? artist[0].innerText.trim() : 'Unknown artist';
				track = track ? track[0].innerText.trim() : 'Unknown track';
				name = artist + ' - ' + track;
			}
			if (!name) { console.log('[VKAudioDL] Cannot get name for #' + element.id); return; }
			
			//dumb fix for vertical div stacking, pls help with a correct CSS
			var node = duration[0].cloneNode(true);
			duration[0].parentNode.appendChild(node);
			duration[0].parentNode.removeChild(duration[0]);

			var url = element.innerHTML.match(/https?:\/\/(\w+)\.(?:vkontakte\.ru|vk\.com)\/(\w+)\/audio\/(\w+)\.mp3/i);
			if (!url) {
				url = element.innerHTML.match(/operate\(\d+,\s*(\d+),\s*(\d+),\s*'(\w+)',\s*\d+\)/i);
				if (url) { url = 'http://cs' + url[1] + '.vkontakte.ru/u' + url[2] + '/audio/' + url[3] + '.mp3'; }
			} else url = url[0];
			
			if (!url) { console.log('[VKAudioDL] Cannot get url for #' + element.id); return; }
		
			return {
				'play':  playBtn[0],
				'duration':  node, // +fix
				'data': { 'name': name.replace(/\s+/g, ' ').trim(), 'url': url }
			};
		}

		document.body.appendChild(iframe);

		function processAudio() {
			var node;
			//checking for existing download button
			node = tools.select({ tagName: 'a#download_link' }, this); // node = this.querySelectorAll('a#download_link');
			if (node) return;
			
			if (this.id && this.id == 'audio_global') return;
			
			var self = this, elements = extractElements(this);
			if (!elements) return;
			
			var file = elements.data.url, fileName = elements.data.name,
				play = elements.play, duration = elements.duration;

			//play and download buttons on single line fix
			play.parentNode.style.minWidth = '37px';
			play.parentNode.style.height = '17px';
			node = tools.select({ tagName: 'div.play_new' }, this);
			if (node && node.length) node[0].style.display = 'inline-block';
			
			//add to my list button location fixes
			node = tools.select({ tagName: 'td.info' }, this);
			if (node && node.length) node[0].style.width = '340px';
			node = tools.select({ tagName: 'div.title_wrap' }, this);
			if (node && node.length) node[0].style.width = '300px';
		
			//button adding
			var downloadlink = tools.createElement('a', { 'href': file + (fileName ? '?/' + (fileName) + '.mp3' : '') , 'id': 'download_link'});
			downloadlink.innerHTML = '';

			var downloadimg = tools.createElement('div');
			downloadimg.setAttribute('class','play_new');
			downloadimg.setAttribute('onmouseover', 'showTooltip(this, {text: "\u0421\u043a\u0430\u0447\u0430\u0442\u044c \u0442\u0440\u0435\u043a", showdt: 200})');
			downloadimg.style.backgroundImage = 'url('+imgBS64+')';

			downloadimg.style.display = 'inline-block';
			downloadimg.style.width = '17px';
			downloadlink.appendChild(downloadimg);
								
			//downloadlink.title = '\u0421\u043a\u0430\u0447\u0430\u0442\u044c \u0444\u0430\u0439\u043b';
			play.parentNode.insertBefore(downloadlink, play.nextSibling);
		
			var subdomain = file.match(/^(http:\/\/\w+\.(?:vkontakte\.ru|vk\.com))/);
			if (!subdomain) { console.log('[VKAudioDL] Cannot get subdomain for #' + this.id); return; }
			subdomain = subdomain[1];

			window.addClass(duration, '__getBitrate'); //add(remove)Class is VK JS API reference
			duration.setAttribute('onmouseover', 'showTooltip(this, {text: "\u041d\u0430\u0436\u043c\u0438\u0442\u0435, \u0447\u0442\u043e\u0431\u044b \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0431\u0438\u0442\u0440\u0435\u0439\u0442", showdt: 200})');
			duration.onclick = function () {
				var data = {
					'id': self.id,
					'file': file,
					'action': 'dataTransfer',
					'type': 'request'
				}, url = subdomain;
				if (iframe.src != url) {
					iframe.src = url + '/#dataTransfer';
					iframe.onload = function () { obj.send(data, iframe); };
				} else obj.send(data, iframe);

				this.removeAttribute('onmouseover');
				this.onclick = null;
				
				window.removeClass(duration, '__getBitrate');
				this.removeAttribute('title');
			};
			durations[this.id] = duration;
		}
		
		var audios;	
		function addButtons(){
			document.body.removeEventListener('DOMNodeInserted', onNodeInserted, false);
			if (!audios || !audios.length || !audios[0].parentNode) {
				audios = tools.select([
					{ tagName: 'div.audio'}
					//,{ tagName: 'div.somenewshit' }
				]);
				if (audios && audios.length && audios[0].parentNode) tools.foreach(audios, processAudio);
			}
			document.body.addEventListener('DOMNodeInserted', onNodeInserted, false);
		}
		
		//to prevent overloads trying to disable DOMNodeInserted listener on heavy loads
		var inserttimes = [0,0,0,0,0,0]; // last 6 timestamps for DOMNodeInserted	
		function onNodeInserted(event) {
			var now = new Date().getTime();
			var then = inserttimes.pop();
			inserttimes.unshift(now);
			if (now - then < 300) {
			    // we had 6 events in less than 300ms assuming page is doing some work
			    document.body.removeEventListener('DOMNodeInserted', onNodeInserted, false);
			    setTimeout(onDeferred, 1200);
			}
			else { audios = null; }
		} 
		function onDeferred() {
			audios = null;
			document.body.addEventListener('DOMNodeInserted', onNodeInserted, false);
		}
		
		addButtons();
		setInterval(addButtons, 600);
	}, true);
})();