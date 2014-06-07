// ==UserScript==
// @name           Hootoh Blog Forum
// @namespace      http://www.hootoh.my
// @description    Forum Diskusi Blogger
// @version        Edit version by Hootoh Tudia
// ==/UserScript==

/*!
 * 
 * 
 *
 * Hootoh Forum
 * Diskusi mengenai blog
 * 
 */

		if (!window.chatter) {
			window.chatter = function() { return this; }();
		}
		if (!window.chatter.embeds) {
			window.chatter.embeds = {};
		}
		window.chatter.embed = function(host, args) {
			var host = host;
			var cid = Math.floor((Math.random())*1000000000).toString();
			var default_height = 1600;
			var embed_url = window.location.href.split('#')[0];

			var current_path = window.location.hash.substr(1);
			var disable_path = current_path && current_path[0] != "/";
			disable_path |= (window != top);

			if (!current_path || disable_path) {
				if (!current_path && !disable_path) {
					location.href = embed_url + "#/";
				}
				current_path = "/";
			}

			if (window.gadgets)
				embed_url = ''; // Don't let the site change the hash

			window.chatter.embeds[cid] = this;

			handleCommand = function (cmd) {
				if (cmd[0] == 'ch_resize') {
					resizeFrame(cmd[1]);
				} else if (cmd[0] == 'ch_load') {
					if (disable_path)
						current_path = cmd[1];
					else {
						current_path = window.location.hash.substr(1);
						if (current_path != cmd[1]) {
							current_path = cmd[1];
							location.href = embed_url + "#" + current_path;
						}
					}
				} else if (cmd[0] == 'ch_unload') {
					if (window.attachEvent || findPosScroll('chatterframe'+cid) < 0)
						document.getElementById('chatterframe'+cid).scrollIntoView(true);
					// resizeFrame(default_height);
				} else if (cmd[0] == 'ch_scrollto') {
					window.scrollTo(0, findPos('chatterframe'+cid)+parseInt(cmd[1], 10));
				} else if (cmd[0] == 'ch_delfoot'){
					var a = document.getElementById(cmd[1]);
					a.parentNode.removeChild(a);
				}
			}

			if (window.postMessage) {
				function onMessage(e) {
					var cmd = e.data.split(':');
					var frame = document.getElementById('chatterframe'+cid);
					if (frame.contentWindow != e.source)
						return;
					handleCommand(cmd);
				}
				if (window.addEventListener)
					window.addEventListener("message", onMessage, false);
				else
					window.attachEvent("onmessage", onMessage);
			} else {
				/* Fall back for browsers that don't support HTML5's postMessage */
				var msg_seq = null;
				function checkMessages() {
					var chatter_frame = window.frames['chatterframe'+cid];
					if (!chatter_frame)
						return;

					try {
						var bus = chatter_frame.frames.msg_frame;
						var hash = bus.location.hash.substr(10);
					} catch(e) {
						return;
					}

					var cmd = hash.split(':');
					var seq = cmd[0];
					if (msg_seq == seq)
						return;
					msg_seq = seq;
					cmd.splice(0, 1);
					handleCommand(cmd);
				}
				setInterval(checkMessages, 300);
			}

			function checkHash() {
				var path = window.location.hash.substr(1);
				if (!path)
					path = "/";

				if (path != current_path) {
					current_path = path;
					window.frames['chatterframe'+cid].location.replace(buildURL(path));
				}
			}

			if (!window.gadgets) {
				if (!disable_path) {
					if ("onhashchange" in window) {
						if (window.addEventListener)
							window.addEventListener("hashchange", checkHash, false);
						else
							window.attachEvent("onhashchange", checkHash);
					} else {
						setInterval(checkHash, 300);
					}
				}
			}

			function buildURL(path) {
				return 'http://' + host + path + "?" + args + "&cid=" + cid + "&eh=" + encodeURIComponent(embed_url);
			}

			function resizeFrame(height) {
				var el = document.getElementById('chatterframe'+cid);
				el.style['height'] = height + "px";
				if (window.gadgets) {
					gadgets.window.adjustHeight();
				}
			}

			function findPosScroll(id) {
				var node = document.getElementById(id);
				var curtop = 0;
				var curtopscroll = 0;
				if (node.offsetParent) {
					do {
						curtop += node.offsetTop;
						curtopscroll += node.offsetParent ? node.offsetParent.scrollTop : 0;
					} while (node = node.offsetParent);
					return curtop - curtopscroll;
				}
				return -1;
			}

			function findPos(id) {
				var node = document.getElementById(id);
				var curtop = 0;
				if (node.offsetParent) {
					do {
						curtop += node.offsetTop;
					} while (node = node.offsetParent);
					return curtop;
				}
				return -1;
			}

			//--Auto Theming:
			try{
				var theme_args = '';
				if (window.chatter_options) {
					if ('css_append' in window.chatter_options) {
						theme_args = '&cssa='+encodeURIComponent(window.chatter_options['css_append']);
					} else if ('css_replace' in window.chatter_options) {
						theme_args = '&cssr='+encodeURIComponent(window.chatter_options['css_replace']);
					}
				}
				if (theme_args === '') {
					document.write("<span id='probe"+cid+"'></span>");
					var op = document.getElementById('probe'+cid);
					var p = op;
					var i = 0;
					var color = null;
					var font = null;
					while (i < 1000){
						p = p.parentNode;
						if (window.getComputedStyle) {
							var style = window.getComputedStyle(p, null);
							color = style.getPropertyValue('background-color');
						} else {
							color = p.currentStyle.backgroundColor;
						}
						if(color != 'transparent' && color != '' && color != 'rgba(0, 0, 0, 0)') {
							break;
						}
						color = null;
						i++;
					}
					if (window.getComputedStyle) {
						var style = window.getComputedStyle(op, null);
						font = style.getPropertyValue('font-family');
					} else {
						font = op.currentStyle.fontFamily;
					}

					//ie8 no like this
					//delete op.parentNode.removeChild(op);

					if (font)
						font = font.replace(/[\'\"]/g,'');

					theme_args = '&f='+encodeURIComponent(font) +'&t='+encodeURIComponent(color)+'&nocss=1';
				}
			} catch(e) { }

			var forum_code = "<iframe id='chatterframe"+cid+"' name='chatterframe"+cid+"' src='" + buildURL(current_path) + theme_args + "' style='width:100%; height:" + default_height + "px; border:0;' scrolling='no' frameborder='0' border='0' width='100%' height='" + default_height + "'></iframe>";
			document.write(forum_code);
			return this;
		};
		try {
			if (window.location.hash.substr(0, 9) != "#msgframe")
				window.chatter.embed('alzcjslie9.embed.tal.ki', '');
		} catch(e) {
			document.write("<div style='background-color:white; color:black';>Forum failed to load: " + e + "</div>");
		}
	