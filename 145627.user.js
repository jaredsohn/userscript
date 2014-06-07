// ==UserScript==
// @name           OpenGG.Clean.Player
// @namespace      http://OpenGG.me
// @description    OpenGG.Clean.Player
// @version        1.16
// @updateURL      https://userscripts.org/scripts/source/120679.meta.js
// @downloadURL    https://userscripts.org/scripts/source/120679.user.js
// @match          http://*/*
// @match          https://*/*
// @exclude        http://www.kuaipan.cn/*
// ==/UserScript==
(function () {
	//Goddamn sina weibo.
	//'use strict';
	function run(callback) {
		var script = document.createElement('script');
		script.textContent = '(' + callback.toString() + ')();';
		document.body.appendChild(script);
	}
	function main() {
		var CONSTANTS = {
			PLAYER_DOM:	'object[data],embed[src],iframe[src]',
			PLAYERS: [
				{
					find: /^http:\/\/static\.youku\.com\/.*?q?(player|loader)(_[^.]+)?\.swf/,
					replace: 'http://player.opengg.me/loader.swf'
				},
				{
					find: /^http:\/\/js\.tudouui\.com\/.*?\/TudouVideoPlayer_Homer_[^.]*?.swf/,
					replace: 'http://player.opengg.me/TudouVideoPlayer_Homer_237.swf'
				},
				{
					find: /^http:\/\/player\.youku\.com\/player\.php\//,
					replace: 'http://player.opengg.me/player.php/'
				},
				{
					find: /^http:\/\/www.tudou.com\/(([a-z]|programs)\/.*)/,
					replace: 'http://player.opengg.me/td.php/$1'
				}
			],
			SHARE_DOM: '#panel_share input,input#copyInput.txt',
			SHARES: [
				{
					find: /http:\/\/player\.youku\.com\/player\.php\//,
					replace: 'http://player.opengg.me/player.php/'
				},
				{
					find: /http:\/\/www.tudou.com\/(.*v\.swf)/,
					replace: 'http://player.opengg.me/td.php/$1'
				}
			],
			TIPS_HOLDER: '#miniheader,#gTop',
			TIPS: '</a></div>',
			STYLE: '.playBox_thx #player.player,.playBox_thx #player.player object{min-height:' + Math.max(window.innerHeight * 0.6, 580) + 'px !important}.tips_container{position:absolute;top:3em;padding:1em 2em;right:50px;color:green;opacity:0.4;background:#ddd}.tips_container:hover{opacity:0.8}.tips_container #toggleGoogle{color:red;cursor:pointer}',
			NODEINSERTED_HACK: '@-moz-keyframes nodeInserted{from{opacity:0;}to{opacity:1;}}@-webkit-keyframes nodeInserted{from{opacity:0;}to{opacity:1;}}@-o-keyframes nodeInserted{from{opacity:0;}to{opacity:1;}}@keyframes nodeInserted{from{opacity:0;}to{opacity:1;}}embed,object{animation-duration:.001s;-ms-animation-duration:.001s;-moz-animation-duration:.001s;-webkit-animation-duration:.001s;-o-animation-duration:.001s;animation-name:nodeInserted;-ms-animation-name:nodeInserted;-moz-animation-name:nodeInserted;-webkit-animation-name:nodeInserted;-o-animation-name:nodeInserted;}',
			TOGGLE_BTN: '#toggleGoogle'
		};
		var DONE = [];
		var UTIL = {
			addCss: function (str) {
				var style = document.createElement('style');
				style.textContent = str;
				document.head.appendChild(style);
			},
			reloadFlash: function (elem) {
				var nextSibling = elem.nextSibling;
				var parentNode = elem.parentNode;
				parentNode.removeChild(elem);
				if (nextSibling) {
					parentNode.insertBefore(elem, nextSibling);
				} else {
					parentNode.appendChild(elem);
				}
			},
			initFlash: function (elem) {
				// console.log(elem);
				if (DONE.indexOf(elem) !== -1) {
					return;
				}
				if (this.rewriteFlash(elem)) {
					this.reloadFlash(elem);
					DONE.push(elem);
				}
			},
			rewriteFlash: function (elem) {
				var atrs = ['data', 'src'];
				var players = CONSTANTS.PLAYERS;
				var needReload = false;
				UTIL.forEach(atrs, function (atr) {
					UTIL.forEach(players, function (player) {
						if (elem[atr] && player.find.test(elem[atr])) {
							elem[atr] = elem[atr].replace(player.find, player.replace);
							needReload = true;
						}
					});
				});
				return needReload;
			},
			forEach: function (arr, callback) {
				if (this.isArrayLike(arr)) {
					if (Array.prototype.forEach) {
						Array.prototype.forEach.call(arr, callback);
					} else {
						var i = 0;
						for (i = 0; i < arr.length; ++i) {
							callback.call(arr[i], arr[i]);
						}
					}
				}
			},
			isArrayLike: function (obj) {
				if (typeof obj !== 'object') {
					return false;
				}
				var types = ['Array', 'NodeList', 'HTMLCollection'];
				var i = 0;
				for (i = 0; i < types.length; ++i) {
					if (Object.prototype.toString.call(obj).indexOf(types[i]) !== -1) {
						return true;
					}
				}
				return false;
			}
		};
		function init() {
			function onDOMNodeInsertedHandler(e) {
				var target = e.target;
				if (target.nodeType === 1 && /OBJECT|EMBED|IFRAME/ig.test(target.nodeName)) {
					UTIL.initFlash(target);
				}
			}
			function onAnimationStartHandler(e) {
				if (e.animationName === 'nodeInserted') {
					var target = e.target;
					// console.log(target);
					if (target.nodeType === 1 && /OBJECT|EMBED|IFRAME/ig.test(target.nodeName)) {
						UTIL.initFlash(target);
					}
				}
			}
			function animationNotSupported(){
				var style = document.createElement('div').style;
				var arr = ['animation', 'MozAnimation', 'webkitAnimation', 'OAnimation'];
				for(var i =0;i<arr.length;++i){
					if( arr[i] in style){
						return false;
					}
				}
				return true;
			}
			UTIL.addCss(CONSTANTS.NODEINSERTED_HACK);
			/*Firefox*/
			document.body.addEventListener('animationstart', onAnimationStartHandler, false);
			/*/Firefox*/
			/*Chrome*/
			document.body.addEventListener('webkitAnimationEnd', onAnimationStartHandler, false);
			/*/Chrome*/
			/*Opera 12+*/
			document.body.addEventListener('oAnimationStart', onAnimationStartHandler, false);
			/*/Opera 12+*/
			/*IE, but I never tested this*/
			document.body.addEventListener('msAnimationStart', onAnimationStartHandler, false);
			/*/IE, but I never tested this*/
			if (animationNotSupported()) {
				/*Old fashion, slower maybe*/
				document.body.addEventListener('DOMNodeInserted', onDOMNodeInsertedHandler, false);
				var matches = document.body.querySelectorAll(CONSTANTS.PLAYER_DOM);
				UTIL.forEach(matches, function (elem) {
					UTIL.initFlash(elem);
				});
			}
		}
		function tips() {
			var holder = document.body.querySelector(CONSTANTS.TIPS_HOLDER);
			if (holder) {
				var div = document.createElement('div');
				if (document.defaultView.getComputedStyle(holder, null).getPropertyValue('position') !== 'relative') {
					div.style.position = 'relative';
				}
				div.innerHTML = CONSTANTS.TIPS;
				holder.appendChild(div);
				UTIL.addCss(CONSTANTS.STYLE);
			}
		}
		function share(elem) {
			var pairs = CONSTANTS.SHARES;
			UTIL.forEach(pairs, function (item) {
				elem.value = elem.value.replace(item.find, item.replace);
			});
		}
		var CONTROLLER = [
			{
				host: '.',
				fn: function () {
					init();
				}
			},
			{
				host: 'youku.com',
				fn: function () {
					// UTIL.addCss(CONSTANTS.STYLE);

					var matches = document.body.querySelectorAll(CONSTANTS.SHARE_DOM);
					UTIL.forEach(matches, share);

					tips();

					var youkuPlayer = document.body.querySelector('.playBox');
					var notWide = !document.body.querySelector('.playBox_thx');
					if (youkuPlayer && notWide) {
						youkuPlayer.className += ' playBox_thx';
					}
				}
			},
			{
				host: 'tudou.com',
				fn: function () {
					// UTIL.addCss(CONSTANTS.STYLE);
					tips();
					var tudouPlayer = document.body.querySelector('#playerObject');
					var normalDom = document.querySelector('.normal');
					if (tudouPlayer && normalDom) {
						normalDom.className = normalDom.className.replace('normal','widescreen');
					}
					var g = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;
					var TUI_copyToClip = g.TUI.copyToClip;
					g.TUI.copyToClip = function () {
						var matches = document.body.querySelectorAll(CONSTANTS.SHARE_DOM);
						UTIL.forEach(matches, share);
						TUI_copyToClip.apply(g.TUI, arguments);
					};
				}
			}
		];
		var host = location.host;
		function PROC(item) {
			if (host.indexOf(item.host) !== -1) {
				item.fn();
				return;
			}
		}
		UTIL.forEach(CONTROLLER, PROC);
	}
	if (typeof unsafeWindow !== 'undefined') {
		main();
	} else {
		run(main);
	}
})();