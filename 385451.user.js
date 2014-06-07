// ==UserScript==
// @name OpenGG.Clean.Local.Player
// @author cs_imba
// @description 通过替换swf播放器的方式来解决优酷的黑屏广告 (基于 OpenGG.Clean.Player(Bae 修改而成)
// @version 1.0.1
// @namespace http://userscripts.org/users/583911
// @updateURL 
// @downloadURL http://userscripts.org/scripts/source/385451.user.js
// @icon http://d.pr/i/Z3sd.png
// @include http://*/*
// @include https://*/*
// @run-at document-start
// ==/UserScript==
/*
 * === 说明 ===
 * 本脚本基于 OpenGG.Clean.Player(Bae 修改而成 (http://userscripts.org/scripts/show/162286)
 * 本人水平很差，初次尝试改别人的脚本。。。
 * 初衷是希望在英国能看爽优酷，动机是今天看到 Adkill and Media Downloader 更新支持本地播放器
 * 而本人同时也不怎么想在 Mac 上用 Chrome，平时主要都在用 Safari，所以只好自己改脚本以支持本地播放器
 * 
 * Safari 可以用 NinjaKit 来安装本脚本 https://github.com/os0x/NinjaKit 
 * 至于 OS X 怎么架设本地文件服务器请自行 Google 查阅
 * 
 * 改动日志
 * 
 * 1.0.1
 * 完善说明等等。。
 * 
 * 1.0
 * 播放器下载地址是 http://player.opengg.me/player.swf
 * 目前仅支持优酷，而且还是旧版播放器。。。
 * 播放器本地地址是 http://127.0.0.1/OpenGGCleanLocalPlayer.swf
 * 因为目前仅支持优酷所以下面有很多应用于别的视频网站的没用代码，我也不懂哪些该删除就放在那了
 * 至于用旧版播放器的原因是我试了几个新版播放器都没法用，旧版就旧版吧，反正对我来说没多大差
 * 
 * 以下说明内容是 OpenGG.Clean.Player(Bae 的信息
 * {
 * version 1.368.2
 * namespace http://userscripts.org/users/Kawaiiushio
 * updateURL https://userscripts.org/scripts/source/162286.meta.js
 * downloadURL https://userscripts.org/scripts/source/162286.user.js
 * icon http://extensiondl.maxthon.cn/skinpack/17276781/1366787326/icons/icon_48.png
 * }
 * 
 * 以下说明内容是 OpenGG.Clean.Player(Bae 的说明内容
 * {
 * 本脚本参考http://bbs.kafan.cn/thread-1514537-1-1.html 感谢卡饭大神
 * Chrome用户也可以使用Adkill and Media download这个扩展
 * 此脚本设计修改人员OpenGG  Harv  xplsy  15536900  yndoc  KawaiiUshio 5B4B铅笔
 * Bilibili黑科技由FireAway提供      参考：http://userscripts.org/scripts/show/165424
 * Opera兼容部分由Gerald修改
 * In God，We Trust.
 * THX.
 * }
 */

/* 
 * 
 */
(function () {
	Function.prototype.bind = function () {
		var fn = this,
			args = Array.prototype.slice.call(arguments),
			obj = args.shift();
		return function () {
				return fn.apply(obj, args.concat(Array.prototype.slice.call(arguments)));
			};
	};

	function YoukuAntiAds() {}
	YoukuAntiAds.prototype = {
		_players: null,
		_rules: null,
		_done: null,
		get players() {
			if (!this._players) {
				this._players = {
					'youku_loader': 'http://127.0.0.1/OpenGGCleanLocalPlayer.swf',
					'youku_player': 'http://127.0.0.1/OpenGGCleanLocalPlayer.swf',
				};
			}
			return this._players;
		},
		get rules() {
			if (!this._rules) {
				this._rules = {
					'youku_loader': {
						'find': /^http:\/\/static\.youku\.com(\/v[\d\.]+)?\/v\/swf\/loader\.swf/i,
						'replace': this.players['youku_loader']
					},
					'youku_player': {
						'find': /^http:\/\/static\.youku\.com(\/v[\d\.]+)?\/v\/swf\/q?player[^\.]*\.swf(\?.*)?/i,
						'replace': this.players['youku_loader'] + '$2'
					},
					'youku_out': {
						'find': /^http:\/\/player\.youku\.com\/player\.php\/.*sid\/([\w=]+).*(\/v)?\.swf.*/i,
						'replace': this.players['youku_loader'] + '?showAd=0&VideoIDS=$1'
					},
					'ku6': {
						'find': /^http:\/\/player\.ku6cdn\.com\/default\/.*\/\d+\/player\.swf/i,
						'replace': this.players['ku6']
					},
					'ku6_out': {
						'find': /^http:\/\/player\.ku6\.com\/(inside|refer)\/([^\/]+)\/v\.swf.*/i,
						'replace': this.players['ku6_out'] + '?vid=$2'
					},
					'iqiyi': {
						'find': /^http:\/\/www\.iqiyi\.com\/player\/\d+\/player\.swf/i,
						'replace': this.players['iqiyi']
					},
					'iqiyi_out': {
						'find': /^http:\/\/(player|dispatcher)\.video\.i?qiyi\.com\/(.*[\?&]vid=)?([^\/&]+).*/i,
						'replace': this.players['iqiyi_out'] + '?vid=$3'
					},
					'tudou': {
						'find': /^http:\/\/js\.tudouui\.com\/.*player[^\.]*\.swf/i,
						'replace': this.players['tudou']
					},
					'tudou_out': {
						'find': /^http:\/\/www\.tudou\.com\/.*(\/v\.swf)?/i,
						'replace': this.players['tudou_olc'] + '?tvcCode=-1&swfPath=' + this.players['tudou_sp']
					},
					'letv': {
						'find': /http:\/\/.*letv[\w]*\.com\/(.*\/(?!live)((v2)?[\w]{4}|swf)player[^\.]*|[\w]*cloud)\.swf/i,
						'replace': this.players['letv']
					},
					'letv_out': {
						'find': /http:\/\/.*letv\.com\/player\/swfplayer\.swf(\?.*)/i,
						'replace': this.players['letv'] + '$1'
					}
				}
			}
			return this._rules;
		},
		get done() {
			if (!this._done) {
				this._done = new Array();
			}
			return this._done;
		},
		initPreHandlers: function () {
			this.rules['iqiyi']['preHandle'] = function (elem, find, replace, player) {
				if (document.querySelector('span[data-flashplayerparam-flashurl]')) {
					replace = this.players['iqiyi5'];
				}
				this.reallyReplace.bind(this, elem, find, replace)();
			}
			this.rules['iqiyi_out']['preHandle'] = function (elem, find, replace, player) {
				var match = player.match(/(autoplay)=[^&]+/ig);
				if (match) {
					replace += '&' + match.join('&');
				}
				this.reallyReplace.bind(this, elem, find, replace)();
			}
			this.rules['tudou_out']['preHandle'] = function (elem, find, replace, player) {
				var fn = this;
				var isFx = /firefox/i.test(navigator.userAgent);
				GM_xmlhttpRequest({
					method: isFx ? 'HEAD' : 'GET',
					url: isFx ? player : 'https://query.yahooapis.com/v1/public/yql?format=json&q=' + encodeURIComponent('use"https://haoutil.googlecode.com/svn/trunk/firefox/tudou_redirect.yql.xml" as tudou; select * from tudou where url="' + player + '" and referer="' + window.location.href + '"'),
					onload: function (response) {
						var finalUrl = (isFx ? response.finalUrl : response.responseText);
						var match = finalUrl.match(/(iid|youkuid|resourceid|autoplay|snap_pic)=[^&]+/ig);
						if (match && !/error/i.test(finalUrl)) {
							replace += '&' + match.join('&');
							fn.reallyReplace.bind(fn, elem, find, replace)();
						}
					}
				});
			}
		},
		addAnimations: function () {
			var style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML = 'object,embed{\
-webkit-animation-duration:.001s;-webkit-animation-name:playerInserted;\
-ms-animation-duration:.001s;-ms-animation-name:playerInserted;\
-o-animation-duration:.001s;-o-animation-name:playerInserted;\
animation-duration:.001s;animation-name:playerInserted;}\
@-webkit-keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}\
@-ms-keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}\
@-o-keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}\
@keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}';
			document.getElementsByTagName('head')[0].appendChild(style);
		},
		animationsHandler: function (e) {
			if (e.animationName === 'playerInserted') {
				this.replace(e.target);
			}
		},
		replace: function (elem) {
			if (this.done.indexOf(elem) != -1) return;
			this.done.push(elem);

			var player = elem.data || elem.src;
			if (!player) return;

			var i, find, replace, isReplacing = false;
			for (i in this.rules) {
				find = this.rules[i]['find'];
				if (find.test(player)) {
					replace = this.rules[i]['replace'];
					if ('function' === typeof this.rules[i]['preHandle']) {
						isReplacing = true;
						this.rules[i]['preHandle'].bind(this, elem, find, replace, player)();
					}
					if (!isReplacing) {
						this.reallyReplace.bind(this, elem, find, replace)();
					}
					break;
				}
			}
		},
		reallyReplace: function (elem, find, replace) {
			elem.data && (elem.data = elem.data.replace(find, replace)) || elem.src && ((elem.src = elem.src.replace(find, replace)) && (elem.style.display = 'block'));
			this.reloadPlugin(elem);
		},
		reloadPlugin: function (elem) {
			var nextSibling = elem.nextSibling;
			var parentNode = elem.parentNode;
			parentNode.removeChild(elem);
			var newElem = elem.cloneNode(true);
			this.done.push(newElem);
			if (nextSibling) {
				parentNode.insertBefore(newElem, nextSibling);
			} else {
				parentNode.appendChild(newElem);
			}
		},
		init: function () {
			this.initPreHandlers();

			var handler = this.animationsHandler.bind(this);

			document.body.addEventListener('webkitAnimationStart', handler, false);
			document.body.addEventListener('msAnimationStart', handler, false);
			document.body.addEventListener('oAnimationStart', handler, false);
			document.body.addEventListener('animationstart', handler, false);

			this.addAnimations();
		}
	};

	new YoukuAntiAds().init();
})();