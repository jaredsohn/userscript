// ==UserScript==
// @grant          GM_xmlhttpRequest
// @run-at         document-start
// @updateURL      https://greasyfork.org/scripts/125/code.user.js
// @downloadURL    https://greasyfork.org/scripts/125/code.user.js
// @name           Bypass Wait, Code, & Login For Chrome
// @copyright      2012+, Yulei, Chrome Compatibility by Jixun.

/// 骑牛 CDN
// @require        http://cdn.staticfile.org/jquery/2.1.1-beta1/jquery.min.js
////               Based on [Crack Url Wait Code Login] By Yulei

// @author         jixun66
// @namespace      http://jixun.org/
// @description    Remove verify code, login requirement, counting down... and more!
// @version        0.6.3.11
// @create         2012-01-26
// @lastmodified   2014.04.19

//// 网盘域名匹配
///  国内一些「网赚」网盘，体验很差 orz
// @include http://www.azpan.com/*
// @include http://xddisk.com/*
// @include http://www.xddisk.com/*
// @include http://*.dxrr.com/*
// @include http://*.87pan.com/*
// @include http://www.nyhx.com/*
// @include http://yimuhe.com/*
// @include http://*.yimuhe.com/*
// @include http://www.79pan.com/*
// @include http://*.sudupan.com/*
// @include http://sudupan.com/*
// @include http://www.colafile.com/*
// @include http://dl.vmall.com/*
// @include http://dl.dbank.com/*
// @include http://d.119g.com/*
// @include http://www.lepan.cc/*
// @include http://*.lepan.cc/*
// @include http://*.qjwm.com/*
// @include http://*.7958.com/*
// @include http://www.2kuai.com/*
// @include http://*.32666.com/*

///  百度
// @include http://pan.baidu.com/share/link*
// @include http://pan.baidu.com/s/
// @include http://yun.baidu.com/share/link*
// @include http://yun.baidu.com/s/

///  it168 整个站就一个下载地址 ..
// @include http://down.it168.com/*

///  飞速盘
// @include http://*.rayfile.com/*/files/*
// @include http://rayfile.com/*/files/*

///  威盘
// @include http://www.vdisk.cn/down/index/*

///  城通系列
// @include http://www.pipipan.com/*
// @include http://www.ctdisk.com/*
// @include http://www.400gb.com/*
// @include http://www.bego.cc/*

///  好
// @include http://www.howfile.com/*
// @include http://howfile.com/*

// 快盘
// @include http://www.kuaipan.cn/*

// 短链接 (准备拆开, 暂时留在这)
// @include /\/\/(dc2\.us|dd\.ma|(ref|upan)\.so|t00y\.com)\//


// 音乐放这边 >.>
// @include http://jing.fm/*
// @include http://5sing.com/*
// @include http://*.5sing.com/*
// @include http://oyinyue.com/*
// @include http://*.oyinyue.com/*
// @include http://duole.com/*
// @include http://www.duole.com/*
// @include http://douban.fm/*
// @include http://moe.fm/*

// SongTaste
// @include http://songtaste.com/song/*
// @include http://songtaste.com/album/*
// @include http://songtaste.com/playmusic.php*
// @include http://*.songtaste.com/song/*
// @include http://*.songtaste.com/album/*
// @include http://*.songtaste.com/playmusic.php*

// 虾米音乐
// @include http://xiami.com/song/play
// @include http://www.xiami.com/song/play

// 565656
// @include http://www.565656.com/plus/player.ashx*

// 9ku
// @include http://www.9ku.com/play/*

// 人人电台
// @include http://kxt.fm/*
// @include http://fm.renren.com/*

// 腾讯电台
// @include http://fm.qq.com/*

// 音悦台
// @include http://yinyuetai.com/video/*
// @include http://yinyuetai.com/playlist/*
// @include http://v.yinyuetai.com/video/*
// @include http://v.yinyuetai.com/playlist/*
// @include http://www.yinyuetai.com/video/*
// @include http://www.yinyuetai.com/playlist/*

///  国外访问不能, 注释掉
//\\ @include /\/\/([a-z0-9-]+\.|)1ting\.com\//
//\\ @exclude /\/\/([a-z0-9-]+\.|)1ting\.com\/lrc/
// ==/UserScript==
/* jshint ignore:start */

// 兼容中文的 BASE64 编码系统: https://code.google.com/p/javascriptbase64/
function StringBuffer(){this.buffer=[]}StringBuffer.prototype.append=function(a){this.buffer.push(a);return this};StringBuffer.prototype.toString=function(){return this.buffer.join("")};var Base64={codex:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(a){var c=new StringBuffer;for(a=new Utf8EncodeEnumerator(a);a.moveNext();){var b=a.current;a.moveNext();var d=a.current;a.moveNext();var e=a.current,h=b>>2,b=(b&3)<<4|d>>4,g=(d&15)<<2|e>>6,f=e&63;isNaN(d)?g=f=64:isNaN(e)&&(f=64);c.append(this.codex.charAt(h)+this.codex.charAt(b)+this.codex.charAt(g)+this.codex.charAt(f))}return c.toString()},decode:function(a){var c=new StringBuffer;for(a=new Base64DecodeEnumerator(a);a.moveNext();){var b=a.current;if(128>b)c.append(String.fromCharCode(b));else if(191<b&&224>b){a.moveNext();var d=a.current;c.append(String.fromCharCode((b&31)<<6|d&63))}else a.moveNext(),d=a.current,a.moveNext(),c.append(String.fromCharCode((b&15)<<12|(d&63)<<6|a.current&63))}return c.toString()}};function Utf8EncodeEnumerator(a){this._input=a;this._index=-1;this._buffer=[]}Utf8EncodeEnumerator.prototype={current:Number.NaN,moveNext:function(){if(0<this._buffer.length)return this.current=this._buffer.shift(),!0;if(this._index>=this._input.length-1)return this.current=Number.NaN,!1;var a=this._input.charCodeAt(++this._index);13==a&&10==this._input.charCodeAt(this._index+1)&&(a=10,this._index+=2);128>a?this.current=a:(127<a&&2048>a?this.current=a>>6|192:(this.current=a>>12|224,this._buffer.push(a>>6&63|128)),this._buffer.push(a&63|128));return!0}};function Base64DecodeEnumerator(a){this._input=a;this._index=-1;this._buffer=[]}Base64DecodeEnumerator.prototype={current:64,moveNext:function(){if(0<this._buffer.length)return this.current=this._buffer.shift(),!0;if(this._index>=this._input.length-1)return this.current=64,!1;var a=Base64.codex.indexOf(this._input.charAt(++this._index)),c=Base64.codex.indexOf(this._input.charAt(++this._index)),b=Base64.codex.indexOf(this._input.charAt(++this._index)),d=Base64.codex.indexOf(this._input.charAt(++this._index)),e=(b&3)<<6|d;this.current=a<<2|c>>4;64!=b&&this._buffer.push((c&15)<<4|b>>2);64!=d&&this._buffer.push(e);return!0}};

/* getFlashVars 1.0 by Jixun [Jixun.Org]; MIT License */
/**
 * Get the flash var in Object format.
 * @param  {DOMElement} a Raw object element.
 * @return {Object}     flashvars
 */
function getFlashVars(a){if(!a)return{};a.jquery&&(a=a[0]);if(-1==a.type.indexOf("flash"))return{};for(var b,d={},c=a.childNodes.length;c--;)if("flashvars"==a.childNodes[c].name){b=a.childNodes[c];break}b&&b.value.replace(/([\s\S]+?)=([\s\S]+?)(&|$)/g,function(a,b,c){d[b]=decodeURIComponent(c)});return d};

function linkConv(sInput) {return Base64.decode((sInput.match(/:\/\/([\/+a-z0-9]+)/i) || [, ''])[1]).replace(/^\[FLASHGET\]|\[FLASHGET\]$|^AA|ZZ$/gi, ''); }

// 验证码绑定; 用法演示 (不绑定自定义回调):
// codeKeyBind('input#code', 4, 'button#check')
function codeKeyBind (inputBox, codeLen, btnTarget, callback) {
	$(inputBox).on('keyup', function (e) {
		if  (codeLen == this.value.length &&
			(!callback || callback(this.value, codeLen))) {

			$(btnTarget).click();
		}
	});
}

// 清 Cookie
function clearCookie(){var b=new Date,c,e,f,d,g;b.setTime(b.getTime()-864E5);e=document.cookie.split(";");d=document.domain;b=b.toGMTString();if(e)for(g in e)for(f in c=e[g].split("=")[0],c=["",c+"=; expires="+b+"; path=/; domain=."+d+"; ",c+"=; expires="+b+"; path=/; domain="+d+"; ",c+"=; expires="+b+"; domain=."+d+"; ",c+"=; expires="+b+"; domain="+d+"; ",c+"=; expires="+b+"; path=/; ",c+"=; expires="+b+"; "],c)document.cookie=c[f]}

function getUrlParam (a) {
	var z = {},
		b = a.substr(a.indexOf("?") + 1);
	if (b)
		for (var c = b.split("&"), i = 0; i < c.length; i++) {
			var d = c[i].toString(),
				e = d.indexOf("=");
			z[decodeURIComponent(d.substr(0, e))] = decodeURIComponent(d.substr(e + 1));
		}
	return z;
}
/* jshint ignore:end */

(function () {
	'use strict';

	var us = (typeof (unsafeWindow) != "undefined"),
		win = unsafeWindow;

	win.antiads = 0;
	win.CNZZ_AD_BATCH = tFunc;
	
	/* 
	 *   jPrintf: 自写函数，参考:
	 *	 http://jixun.org/1656-
	 *
	 *   $_GET: 自写全局变量, 模拟 php 端的 $_GET 变量。参考:
	 *	 http://jixun.org/1774-
	 */
	var d = document,
		l = location,
		lurl = l.href,
		gPathway = '',
		body = $('body')[0],
		numKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', '0', '←'],
		ubA = function (e) { e.outerHTML = e.outerHTML; },
		cE = function (e) { return d.createElement(e); },
		bugRepUrl = 'https://greasyfork.org/forum/post/discussion?Discussion/ScriptID=125',
		log = function (a1) { console.log((arguments.length > 1) ? arguments : a1); },
		dhost = ((new RegExp(/(\w+\.\w+)\//).exec(l.hostname + '/') || [, ''])[1]).toLowerCase(),
		jprintf = function () {
			var b = arguments,
				d = b.length - 1,
				c = b[0];
			if (d > 0) {
				for (var a = 1; a <= d; a++) c = c.replace(new RegExp("(\\$|%)" + a, "g"), b[a]);
				return c;
			}
		},
		$_GET = getUrlParam (lurl);
	

	var wordpressAudio = function () {
		log('WordPress Audio 插件通用代码 启动');

		var fixEmbed = function (obj) {
			if (obj.hasAttribute('CUWCL4C')) return;
			console.log ('fixEmbed: ', obj);
			$('<a>').html('下载音频<br>')
				.attr ({
					href: Base64.decode(getFlashVars(obj).soundFile),
					target: '_blank'
				}).insertBefore (obj);
			obj.setAttribute ('CUWCL4C', '^^');
		};

		new MutationObserver (function (e) {
			for (var i=0; i<e.length; i++)
				if (e[i].target.className == 'audioplayer_container' && e[i].addedNodes.length)
					fixEmbed(e[i].addedNodes[0]);
		}).observe ($('.post > .entry')[0], {
			childList: true,
			subtree: true
		});
		// Firefox fix.. = =
		$('object[id^="audioplayer_"]').each(function () { fixEmbed(this); });
		log('WordPress Audio 插件通用代码 结束');
	},
	
	parseHTML = function (responseText) {
		// For Firefox
		var ret = (new DOMParser()).parseFromString(responseText, "text/html");
		
		// For Chrome
		if (ret === undefined) {
			ret = document.implementation.createHTMLDocument("");
			ret.querySelector('html').innerHTML = responseText;
		}
		return ret;
	},
	
	waitUnTil = function (ver4Check, func, replaceVar) {
		var timer = setInterval(function () {
			if (typeof (ver4Check) == 'function') {
				if (!ver4Check()) return;
			} else if (typeof (win[ver4Check]) == 'undefined') {
				return;
			}
			clearInterval(timer);
			
			if (replaceVar && typeof (win[ver4Check]) == 'function') {
				log('Function [ ' + ver4Check + ' ] Hooked.');
				win[ver4Check] = replaceVar;
			}
			if (typeof (func) == 'function')
				func();
		}, 30);
	},
	
	makeCpfCss = function (name, param) {
		var ret = {};
		ret[name] = param;
		['o','ms','moz','webkit'].forEach (function (e) {
			ret['-' + e + '-' + name] = param;
		});
		return ret;
	},
	
	safeJump = function (sTargetUrl) {
		d.title = '正在跳转…';
		log('safeJump :: ' + sTargetUrl);
		
		if (!sTargetUrl) return false;
		
		return reDirWithRef(sTargetUrl);
	},
	
	makeDelayCss = function (sVar) {
		var sP = sVar || 'all .2s';
		return makeCpfCss('transition', sP);
	},
	
	makeRotateCss = function (deg) {
		return makeCpfCss('transform', 'rotate(' + deg + 'deg)');
	},
	
	createNumPad = function (maxLen, targetInput, finishCallback, codeResetCallback) {
		if (!codeResetCallback)
			codeResetCallback = eFunc;
		var table = cE('table'),
			rcde = $(targetInput)[0];
		$(table).css({
			'background-color': '#ffcc99',
			'position': 'relative',
			'bottom': '164px',
			'left': '170px'
		});
		for (var i = 0; i < 4; i++) {
			var tr = cE('tr');
			for (var j = 0; j < 3; j++) {
				var td = cE('td');
				td.innerHTML = $(td).attr('k', numKeys[i * 3 + j]).attr('k');
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
		$(table).find('td').click(function () {
			var val = rcde.value,
				len = val.length,
				key = $(this).attr('k') || '';
			$(rcde).focus();

			switch (key) {
				case '←':
					rcde.value = val.sub(1);
					break;
				case 'C':
					rcde.value = '';
					break;
				default:
					rcde.value += key;
					len ++;
					if (len >= maxLen) {
						if (finishCallback(rcde.value)) {
							$(table).hide();
						} else {
							codeResetCallback();
							rcde.value = '';
						}
					}
					break;
			}
		}).css({
			font: 'bold 25px Tahoma',
			color: 'red',
			cursor: 'pointer',
			verticalAlign: ' middle',
			textAlign: ' center',
			border: '1px solid #DDDDDD',
			padding: '6px',
			width: '40px',
			height: '40px'
		});
		return table;
	};
	
	log('脚本开始执行。');
	lurl = lurl.substr(0, (lurl + '#').indexOf('#')); // 过滤 # 后面的内容
	log(['调试信息如下:', dhost, lurl, $_GET]);
	log('脚本版本 [ ' + GM_info.script.version + ' ] , 如果发现脚本问题请提交到 [ ' + bugRepUrl + ' ] 谢谢。');
	
	// 文本类扩展 :: 删除文本后方指定位数
	String.prototype.sub = function (n) {
		return this.substr(0, this.length - n);
	};
	
	// 空白函数, 适合腾空页面函数。
	var eFunc = function () {},
		tFunc = function () { return !0; },
		fFunc = function () { return !1; },
	
	// 带有引用页的跳转
	reDirWithRef = function (targetUrl) {
		var GET = getUrlParam(targetUrl),
			form = $('<form>')
				.attr('action', targetUrl.replace(/\?.*$/, ''))
				.text('正在跳转: ' + targetUrl).prependTo(document.body)
				.css ({fontSize: 12});

		for (var g in GET)
			form.append($('<input>').attr({
				name: g,
				type: 'hidden'
			}).val(GET[g]));

		form.submit();
		return 1;
	},

	// 网盘地址自动导向 [基于 phpDisk 的网盘]
	chkDU = function (funcCallback){
		var chk = /\/(file|)(file|view)([\/.\-_].*)/;
		// Because location.xx = xx does not pass the refer, so we're going to make a dummy form.
		var bPassTest = chk.test (l.href);
		return bPassTest ?
			(funcCallback || reDirWithRef)(l.href.replace (chk, '/$1down$3')) : false;
	},
	
	// 插入样式表
	injStyle = function (s) {
		var st = cE('style');
		st.innerHTML = s;
		d.body.appendChild(st);
		return st;
	},
	
	// 强制隐藏/显示某些元素
	forceHide = function (what){ injStyle(what + ' { display: none !important }'); },
	forceShow = function (what){ injStyle(what + ' { display: block !important }'); },
	// 强制隐藏框架
	forceHideFrames = function (){ forceHide('iframe, frameset, frame');},
	
	// 移除站外链接
	clearOutsiteLink = function () {
		$('a').not('[href*="' + dhost + '/"],[href*="#"],[href^="j"],[href^="/"]').remove();
	},
	
	// 通用 jPlayer 注入
	jPlayerPatcher = function (callback, namespace) {
		// 默认为 jPlayer
		if (!namespace) namespace = 'jPlayer';
		log ('[-] Waiting for jPlayer to load...');
		waitUnTil(function () {
			return win.$[namespace].prototype.setMedia;
		}, function () {
			log ('[*] Backup old function...');
			var oldSetMedia = win.$[namespace].prototype.setMedia;
			log ('[*] Hook start!');
			win.$[namespace].prototype.setMedia = function (newMedia) {
				console.log (newMedia);
				callback(newMedia);
				return oldSetMedia.apply(this, arguments);
			};
			log ('[+] Hook finish, enjoy~');
		});
	};

	// DOMContentLoaded
	$(function () {
		log('进入 DOMContentLoaded 事件。');
		log('域名判断: ' + dhost);

		// HOOK STAGE 1
		var continueScript = false;
		switch (l.hostname.toLowerCase()) {
			case 'yun.baidu.com':
			case 'pan.baidu.com':
				// 因为度娘知道自己的所谓云管家不能在非 Windows 下运行
				// 因此识别器更改为非 Win32 即可绕过云管家提示。
				win.navigator.__defineGetter__ ('platform', function () {return 'Cracked by Jixun ^^';});
				break;

			default:
				continueScript = true;
		}
		if (!continueScript) return;

		setTimeout(function () {
			// 域名判断开始
			
			var continueScript = false;
			switch (l.hostname.toLowerCase()) {
				default:
					continueScript = true;
			}
			
			if (!continueScript) return;
			
			switch (dhost) {
				// 2014.04.06
				case 'lepan.cc':
					$('#header:first').next().hide();
					if (/\/file|\/view/.test(l.pathname)) {
						reDirWithRef($('#hsdownload').attr('href'));
						// console.log ();
						// $('#hsdownload').click();
						return;
					}
					forceHide ('[class^="banner"],#dl_tips');
					forceShow ('#down_box');
					if ($('.dianxin>a').attr('href') == 'vip.php') {
						forceHide ('.content_l>.down_list_1,.file_tip');
						$('.talk_show').html($('.talk_show').html()
							.replace(/none\.png(.*?)有广告/, 'right.jpg$1搭配 ABP 插件无广告')
							.replace(/none\.png(.*?)无权下载/, 'right.jpg$1插件用户任意下载')
						);
					}
					break;

				case 'kxt.fm':
				case 'duomi.com':
					wordpressAudio();
					break;

				case 'jing.fm':
					waitUnTil (function () {
						return win.Player.player.jPlayer;
					}, function () {
						log ('jing.fm Loader Start~');
						var myDlBox = $('<a>').appendTo($('#mscPlr')).css({
							position: 'absolute',
							right: 0,
							zIndex: 9
						}).attr('target', '_blank').text('下载');
						
						win.Player.player.bind(win.$.jPlayer.event.loadstart, function (eve) {
							myDlBox.attr('href', eve.jPlayer.status.src.replace(/\d+$/, 0));
						});
					});
					break;
				case 'colafile.com':
					chkDU ();
					forceHide ('.table_right, #down_link2, #down_link3, .tui, .ad1 > .ad1 > *');
					forceShow ('.ad1 > .ad1 > .downbox');
					break;
				// 通用 phpDisk 网盘
				case 'dxrr.com':
					if (chkDU(function (r) { return reDirWithRef(r.replace('v.', 'www.')); })) return;
					forceHide ('.ad,#vcode,#tui,.dcode,#down_box2,#dl_tips,.nal,.scbar_hot_td,.fbtn-vip-down');
					forceShow ('#down_box,#dl_addr');
					break;
				case '2kuai.com':
				case '32666.com':	// <- 乱七八糟广告就属它最多
					/* case "gxp.cc": */
					if (chkDU()) return;
					
					forceHide ('.ad,#vcode,#tui,.dcode,#down_box2,#dl_tips,.nal,.scbar_hot_td');
					forceShow ('#down_box,#dl_addr');
					break;
				case 'sudupan.com':
					var tU = lurl.replace(/\/down_/i, '/sudupan/xiazai_');
					if (tU != lurl) l.href = tU;
					forceHideFrames();
					break;
					
				case 'yinyuetai.com':
					// http://www.yinyuetai.com/insite/get-video-info?videoId=[视频ID]&json=true
					
					var fetchDlUrlById = function (iId, fCallback) {
						log('Loading video for ' + iId);
						// 因为跨域, 所以 =-=
						/* jshint ignore:start */
						GM_xmlhttpRequest ({
							method: 'GET',
							url: 'http://www.yinyuetai.com/insite/get-video-info?json=true&videoId=' + iId,
							onload: function (u) {
								var r = JSON.parse (u.responseText);
								fCallback (r.videoInfo.coreVideoInfo.videoUrlModels, r.videoInfo.coreVideoInfo.videoName);
							},
							onerror: function (r) {
								fCallback (false);
							}
						});
						/* jshint ignore:end */
					};
					
					var $appTo, $ap1After2, $display = '',
						eDiv = $('<div>'),
					
					appendDlLinks = function (dlLinks, videoTitle) {
						if (dlLinks === false) {
							console.error('解析失败! ID: ', currentVideoId);
							return;
						}
						eDiv.css ({
							color: 'white',
							'font-size': 'small',
							'margin-left': '7px'
						});
						eDiv.html('下载: ').css('display', $display);
						dlLinks.forEach(function (e) {
							$('<a>').text(e.QualityLevelName).attr('href', e.videoUrl)
							.attr('title', '下载: ' + videoTitle).appendTo(eDiv)
							.addClass ('c_cf9');
							eDiv.append(' | ');
						});
						eDiv.append('提供: CUWCL4C ' + sVer);
						if ($ap1After2 == 1)
							$appTo.append (eDiv);
						else // 2
							$appTo.after (eDiv);
						// $('#download').href = dlLink;
					}
					
					if (/^\/video/i.test(l.pathname)) {
						// Signal
						var currentVideoId = parseInt(l.pathname.match(/\d+/)[0]);
						$appTo = $('.vchart'); $ap1After2 = 2;
						fetchDlUrlById(currentVideoId, appendDlLinks);
					} else {
						$ap1After2 = 1;
						$display = 'inline';
						waitUnTil (function () {
							return $('.J_mv_content').length;
						}, function () {
							$('.J_mv_content').on('DOMSubtreeModified', function () { setTimeout (function () {
								log ('> Switch');
								$appTo = $('<div>').css('display', $display).appendTo('.J_video_info');
								fetchDlUrlById(($('.J_video_info a[href*="video/"]').attr('href').match (/\d+(\/|)$/)||[])[0], appendDlLinks);
							}, 10);});
						});
					}
					break;
					
					
				case 'renren.com':
					waitUnTil(function () {
						return win.XN.APP.WebRadioNotlogin.player.getPlayer();
					}, function () {
						// 插入播放按钮
						var dlLink = $('<a>').attr('title', '单击下载').css(makeRotateCss(90)).css({
							'width': '38px',
							'height': '36px',
							'background-position': '-4px -820px',
							'margin-top': '-2px'
						}).attr('href', win.XN.APP.WebRadioNotlogin.player.getPlayer().getAttribute('src'))
						.insertBefore($('.operation #lrc'));

						var oldPlay = win.XN.APP.WebRadioNotlogin.player.play;
						win.XN.APP.WebRadioNotlogin.player.play = function (url, f0) {
							console.warn(arguments);
							var ret = oldPlay.apply(win.XN.APP.WebRadioNotlogin.player, arguments);
							dlLink.attr('href', url);
							return ret;
						};
					});
					break;
					
				case 'qq.com':
					log('Waiting for fmQQ...');
					waitUnTil(function () {
						return (typeof (win.$.qPlayer.player.playUrl) == 'function');
					}, function () {
						log('fmQQ Hook start!');
						
						// CreateDLButton
						var dlLink = $('<a>').css(makeRotateCss(90)).css({
							'background-position': '-24px -73px'
						});
						$('.btn_del').after(dlLink);
						
						var firstRun = true;
						oldPlayurl = win.$.qPlayer.player.playUrl;
						win.$.qPlayer.player.playUrl = function (songUrl) {
							dlLink.attr('href', songUrl).attr('title', '单击下载: ' + win.$.qPlayer.playList.getSongInfoObj().msong);
							
							// 第一次为程序模拟解析, 所以不需要经过 oldPlayurl 路线
							if (firstRun)
								return (firstRun = 0);
							
							return oldPlayurl(songUrl);
						};
						win.$.qPlayer.player.playUrl(win.$.qPlayer.playList.getSongInfoObj().songurl);
						log('fmQQ Hook finish!');
					});
					break;
					
				case 'moe.fm':
					waitUnTil('playerInitUI', function () {
						// 登录破解
						win.is_login = true;
						
						log('fmMoe Hook start!!');
						var dlLink = $('<a>').addClass('player-button left').css(makeRotateCss(90)).css({
							'width': '26px',
							'background-position': '-19px -96px'
						});
						$('div.player-button.button-volume').first().after(dlLink);
						
						var oldPlayerInitUI = win.playerInitUI;
						win.playerInitUI = function (a) {
							dlLink.attr('href', a.completeUrl).attr('title', '单击下载: ' + a.title);
							log(a);
							return oldPlayerInitUI(a);
						};
						log('fmMoe Hook finish!!');
					});
					break;
					
				case "dbank.com":
				case "vmall.com":
					// 页面整理。
					$('#c_footer, #filelist_marker, div.link-left .panel-line, div[id^="ad_"], .panel-recommended, #hotkw, p.copyright-tips').remove();
					break;
					
				case "vdisk.cn":
					forceShow('#btnbox');
					forceHide('#loadingbox, #yanzhengbox, #yzmbox, #ShowDIV, ifarme');
					
					// 清理乱七八糟的链接
					clearOutsiteLink();
					break;
					
				case "qjwm.com":
				case "7958.com":
					if (l.href.toLowerCase().indexOf("down_") > 0) l.href = lurl.replace(/down_/i, 'download_');
					forceHide('#downtc,[id^="cpro_"],.download_alert,#inputyzm,#house,#uptown,a[href$="money.html"],a[href$="reg.html"]');
					forceShow('#downtc2,.new_down');
					waitUnTil('authad', function () {
						win.authad = win.bdshow = win.scrollTo = tFunc;
					});
					break;
					
				case "rayfile.com":
					//Feisu-Rayfile,nextpag,showdown
					if (win.vkey) {
						l.href = lurl + win.vkey;
					} else {
						win.filesize = 100;
						win.showDownload();
						win.showDownload = eFunc; // 防止 7 秒后按钮被覆盖。
						// 天知道这个错误怎么来的.. 语言错误就显示不了下载按钮..
						$('#downloadlink').addClass('btn_downNow_zh-cn');
						$('#vodlink').addClass('btn_downTools_zh-cn');
						// 整理页面
						$('div.left, iframe').remove();
					}
					break;
					
				case "songtaste.com":
					// SongTaste,Source-Code by (inc/common.js)
					// By Yulei 2012.11.30 ;Remove register and login tips.
					// Simplify Code + Simulate Official site action + Chrome Fix.
					
					var cssCode = {
						'font-size': '15px',
						'color': '#fff',
						'background-color': '#000',
						'text-decoration': 'none',
						'padding': '3px 5px'
					};
					var sId = $_GET.song_id;

					if (!sId) {
						if (lurl.toLowerCase().indexOf('/album/') != -1) {
							// 专辑页面功能添加
							log('ST :: 专辑页面调整');
							var btn_playAll = $('[value="连续播放"]');
							var btn_noPopPlay = btn_playAll.clone().attr({
								'value': '不弹窗播放',
								'onclick': ''
							});
							btn_noPopPlay.click(function () {
								var id = "",
									arr = win.chkArray;
								
								for (i = 0; i < arr.length; i++) {
									if (arr[i].checked) {
										id += arr[i].value + ",";
									}
								}
								
								if (id.length > 1) {
									id = id.sub(1);
									l.href = "/playmusic.php?song_id=" + id;
								} else {
									alert("请选择歌曲");
								}
							});
							btn_playAll.after(btn_noPopPlay);
							return;
						}
						log('ST :: 单曲模式解析');
						var Args = $("#playicon a")[0].href.replace(/ /g).replace(/\"/g, "'").split('\'');
						var sURL = Args[5],
							sType = Args[11],
							sHead = Args[13],
							songId = Args[15],
							sTime = ((new RegExp(/,(\d+)\)/).exec(Args[16]) || [, '0'])[1]),
							SongUrl;

						if (sURL.indexOf('rayfile') > 0) {
							SongUrl = sHead + sURL + win.GetSongType(sType);
						} else {
							SongUrl = $.ajax({
								type: 'POST',
								url: '/time.php',
								cache: true,
								/* 从缓存读，反正如果没记录可以跑到 ST 服务器下 */
								async: false,
								data: 'str=' + sURL + '&sid=' + songId + '&t=' + sTime,
								dataType: 'html',
							}).responseText;
						}
						$('a#custom_2').attr({
							'href': SongUrl,
							'title': 'Cracked By jixun66'
						}).css(cssCode).text('音乐直链');
						return false;
					} else {
						// 下载解析 - Hook 更换歌曲的函数，避免重复读取歌曲 + 不需要多次请求服务器不容易掉线。
						log('ST :: 列表模式解析');
						win.changeSong_e = win.changeSong;
						win.changeSong = function (a1, a2, a3) {
							// 2013.03.19 & 2013.04.09 修正:
							//   已经删除的歌曲自动跳到下一曲
							if (!a1.trim()) {
								win.pu.doPlayNext(2);
								return;
							}
							log('请求歌曲 :: ' + a1 + ' :: ' + a2);
							$('#dl_Link').attr({
								'href': a2,
								'title': a1
							});
							document.title = 'ST - ' + a1;
							// 转接给原函数
							win.changeSong_e(a1, a2, a3);
						};
						
						win.downSong = function () {
							win.open(win.theSongUrl);
						};
						$('div#left_music_div div.p_fun a:eq(2)').css(cssCode)
						.text('直链下载').attr({
							'id': 'dl_Link',
							'target': '_blank'
						});
						
						
						// 2013.03.19 添加:
						//   重建播放列表地址
						$('p.p_list_txt').append($('<a>').text('重建播放列表').click(function () {
							l.href = '?song_id=' + win.arr_ids.join(',');
						}).css({
							'cursor': 'pointer'
						}));
						
						
						log('ST :: 等待网页加载...');
						var iNv = setInterval(function () {
							if (!win.pu.doPlayNext) {
								return;
							}
							log('ST :: 官方播放器删除功能修正启动');
							
							// 修正播放器删除代码错误 :: 开始
							win.pu.doPlayNext = function (t) {
								var now, avl, i;
								for (i = 0; i < win.arr_ids.length; i++) {
									if (win.arr_ids[i] == win.cur_sid) {
										now = i;
										break;
									}
								}
								// 寻找下一首未删除的歌曲。
								//   * 2013.01.29 修正
								//	 1. 上一首查找失败的情况下会滚回到当前音乐的错误。
								//	 2. 如果没有可听歌曲情况下无限循环的错误。
								
								now = Math.abs((now || 0) + t);
								avl = 0;
								
								// 检查是否有歌曲剩余
								for (i = 0; i < win.arr_ids.length; i++) {
									if (win.arr_ids[i]) {
										avl++;
									}
								}
								if (avl === 0) {
									alert('歌都被删光了还听啥...');
									return;
								}
								
								// 寻找空位
								while (true) {
									if (win.arr_ids[now]) {
										log('切换歌曲 :: ' + now.toString());
										win.pu.utils(now);
										win.cur_sid = win.arr_ids[now];
										win.playSongRight();
										return;
									}
									now += t >= 0 ? 1 : -1;
									if (win.arr_ids.length <= now) {
										now = 0;
									}
									if (now < 0) {
										now = win.arr_ids.length;
									}
								}
							};
							
							win.delSongDiv = function (songid, isbox) {
								log('删除歌曲 :: ' + songid.toString());
								$('#' + songid).hide();
								var new_songlist = [];
								for (var i = 0; i < win.arr_ids.length; i++) {
									if (win.arr_ids[i] == songid) {
										if (songid == win.cur_sid)
											win.pu.doPlayNext(1);
										win.arr_ids[i] = 0;
									}
								}
							};

							// 修正播放器删除代码错误 :: 结束
							log('ST :: 官方播放器删除功能修正结束');
							
							clearInterval(iNv);
							
						}, 100);
					}
					break;
					
				case "oyinyue.com":
					if (l.href.toLowerCase().indexOf("/down.") > 0) {
						alert ('請返回音樂頁解析音樂, 此處腳本不負責解析… orz');
						break;
					}

					waitUnTil (function () {return win.player.getUrl (); }, function () {
						$('a[href*="/Down."]').attr({
							'href': win.player.getUrl(),
							'target': '_blank'
						}).html('<b/>直链下载');
					});
					break;
				case "5sing.com":
					//By Yulei 2012.11.27
					// Easy way of getting the link url: by jixun
					if (l.href.toLowerCase().indexOf("down") > 0) {
						if (confirm('单击确定返回到歌曲信息页面解析下载地址。')) {
							var urls = lurl.replace(/down\.aspx\?sid\=/i, '');
							l.href = urls + ".html";
						}
						break;
					}
					
					var $dl = $('<a>')
						.append($('<span>').text('>> 直链下載 <<'))
						.insertAfter ($('.zhe>.sup>span,.play>.play_intro_tit>h1,.mc_info_tit>h1').first())
						.attr('target', '_blank');
					
					waitUnTil (function () {
						return win.$wsp.mediaHelper.createPlugin;
					}, function () {
						console.log ('Hook 啓動~');
						var oldCreatePlugin = win.$wsp.mediaHelper.createPlugin;
						win.$wsp.mediaHelper.createPlugin = function (src) {
							console.log ('下載地址: %s', src);
							$dl.attr('href', src);
							return oldCreatePlugin.apply (this, arguments);
						};

						if (win.wplayer.playList.length) {
							$dl.attr('href', win.wplayer.playList[0].file);
							$('a[href^="/down/"]').attr ({
								href: win.wplayer.playList[0].file
							}).html('<b/>直链下载');
						}
					});
					break;
					
				case "it168.com":
					forceHide('.right_four,#wanyxShowAD');
					$("#download").html ('').append($('<a>').attr({
						href: $('.sign11.four_li1>a').attr('href'),
						class: 'sign11'
					}).css({
						paddingLeft: '2em',
						color: '#fff'
					}).text('点我下载'));
					break;
					
				case '119g.com':
					var reg = /^(\/f\/[a-z0-9]+)(_bak|)/i;
					if (!reg.test(location.pathname))
						return;
					
					var mat = location.pathname.match(reg) || [, '', ''];
					if (!mat[2])
						location.pathname = mat[1] + '_bak.html';
					
					break;
					
				case "yimuhe.com":
					// yimuhe ,Vcode,8s,By Yulei 2012.12.26
					// Make it easy by jixun66
					// /n_dd.php?file_id=476136&userlogin=niuge&ser=1
					chkDU();
					forceShow('#yzm');
					forceHide('#loading');
					$('.w632').css({height:368});
					var oldDL;
					$('#yzm>form')
						.append(createNumPad(4, '#code', function () {
							$('#yzm>form>input[name="Submit"]').click();
							setTimeout (function () {
								$('#download:visible>a:last').click();
							}, 200);
							return 1;
						}, function () {
							$('#vcode_img').click();
						}));
					if (!l.pathname.indexOf('/n_dd.php')) {
						forceHide('.ggao');
						reDirWithRef($('#downs').attr('href'));
					}
					break;
					
				case "djkk.com":
					// 参考 Music liker for Beauty 代码，感谢 @yulei
					var pl4 = document.getElementsByClassName('play_4')[0],
						rmp3 = win.list[0].m4a.replace(/mp\./, 'do.').replace(/m4a/g, 'mp3'),
						myStyle = 'background: transparent url("/images/p_down.gif") no-repeat left center; height:15px; width:15px;';
					if (/img/g.test(pl4.innerHTML)) {
						pl4.innerHTML = "<a href='" + win.list[0].m4a + "' style='color:blueviolet' target='_blank' title='试听音乐下载 - Cracked By Yulei'><b style='" + myStyle + "'>　</b>普通</a>";
						pl4.innerHTML += "<a href='" + rmp3 + "' title='高品质音乐下载 - Cracked By Yulei' target='_blank'><b style='" + myStyle + "'>　</b>高清</a>";
						pl4.style.width = "82px";
						document.getElementsByClassName('play_2')[0].style.display = "none";
					}
					break;
					
				case 'kuaipan.cn':
					// 火狐下失效 囧…
					//waitUnTil('CONST', function () {
					//	win.CONST.Token = win.CONST.Token || 'Patched By Jixun ^^';
					//});
									
					// 金山快盘免登录下载解析
					$('#jQrcodeDownload')
						.attr ('class', 'imitate-btn f16 btn-blue l')
						.text('免登录下载');
					$('#jQrcodebox').html ('免登录下载已开始，请等待下载提示...');
					$('#qrcode').remove();
					$('<div>').attr('id', 'qrcode').appendTo (body);
					win.encodeURIComponent_e = win.encodeURIComponent;
					win.encodeURIComponent = function (a1) {
						if (a1.toString().indexOf('/getdl?') >= 0) {
							l.href = a1.toString();
							$('.ui-dialog-title').text('Patched By Jixun');
							return false;
						}
						return win.encodeURIComponent_e (a1);
					};
					break;
					
				case 'howfile.com':
					forceHide ('#floatdiv div');
					injStyle ('#floatdiv {top: 150px; z-index: 99999; display: block !important;}');
					$('iframe,script,.row1_right').remove();
					
					break;
					
				case '79pan.com':
					chkDU();
					$('iframe, #code_box, #down_box2').remove();
					$('#down_box').show();
					break;
					
				case "87pan.com":
					chkDU();
					$('script,.view-gg,#view-gg').remove();
					break;
					
				case "azpan.com":
					chkDU();
					document.onkeydown = eFunc;
					$('script, iframe').remove();
					forceHide ('a[id*="Union"]');
					break;
					
				case "dd.ma":
					var aLink = $('#btn_open a.link1').attr('href');
					
					if (!aLink)
						break;
					l.href = aLink;
					break;
					
				case '9pan.net':
					l.href = '/down-' + l.pathname.match(/\d+/) + '.html';
					break;
					
				case 'xddisk.com':
				case 'nyhx.com':
					chkDU();
					document.body.oncontextmenu = null;
					forceHide('#dl_tips,.adv_box,marquee');
					forceShow('#dl_addr');
					break;
					
				case '9ku.com':
					forceHide ('#LR2,#LR3,#seegc,.dongDown');
					jPlayerPatcher (function (media) {
						$('.ringDown').html($('<a>').attr('href', media.mp3 || media.m4a)
							.text('下载: ' + $('#play_musicname').text()));
					});
					break;
					
				case '565656.com':
					// Let's monkey patch jPlayer xD
					jPlayerPatcher (function (media) {
						$('.play-info-otheropt > a:last').attr('href', media.mp3 || media.m4a)
							.find('span').text('下载: ' + media.songname + ' - ' + media.singername);
					});
					break;
					
				case 'djye.com':
					$('#djInfo').bind('DOMSubtreeModified', function () {
						var a = $('a[href^="/down.html"]').attr('href', win.firstplay);
						a.attr('title', '下载: ' + $('#play_musicname').text()).css({
							'background': 'url(/images/mp3_down.gif)',
							'padding': '3px 0 5px 9px'
						}).find('img').remove();
						a.clone().css({
							'background-position': '-184px',
							'padding': '3px 0 5px 34px'
						}).insertAfter(a);
						log($('a[title^="下载:"]'));
					});
					break;
					
				case 'djcc.com':
					var a = $('#formusicbox'),
						b = a.clone().insertAfter(a);
					a.parent().animate({
						'height': '+=27'
					}, 1000);
					b.removeAttr('onclick').text('下载该曲').css({
						'background-color': 'lightgrey'
					});
					$('.playbox .playstate').bind('DOMSubtreeModified', function () {
						var song = win.jwplayer(win._$[16]).getPlaylistItem();
						b.attr('title', '下载: ' + song.title).attr('href', song.file);
					});
					
					// Ad.Kill
					$('.left').animate({
						'width': '0'
					}, 1000, function () {
						$(this).remove();
					});
					$('.left').animate({
						'width': '0'
					}, 1000, function () {
						$(this).remove();
					});
					$('.center').css({
						'margin-top': '12px',
						'margin-left': '240px'
					});
					$('.p3').css('background', 'none');
					$('.right').animate({
						'width': '0',
						'left': '310'
					}, 1000, function () {
						$(this).remove();
					});
					$('[class*="banner"]').remove();
					$('#playlistads').remove();
					break;
				
				// 短链接
				case 'ref.so':
					safeJump($('#btn_open a').attr('href'));
					break;
					
				case 'upan.so':
					var upselector = 'img[src*="liulan.jpg"]';
					waitUnTil(function () {
						return $(upselector).length;
					}, function () {
						safeJump($(upselector).parent().attr('href'));
					});
					
					break;
					
				case 'dc2.us':
				case 't00y.com':
					var selector = '#skip_button, #downloadlist a';
					waitUnTil(function () {
						return $(selector).length;
					}, function () {
						$('iframe, embed, object').remove();
						forceHideFrames();
						clearCookie();
						if (!safeJump($(selector).attr('href')) && win.jumpToURL)
							win.jumpToURL();
					});
					break;
					
				default:
					// log ('该域名未获得匹配，请联系作者修正该问题！');
					// Do nothing.
			}
		}, 1);
	});
	
	
	
	document.addEventListener('readystatechange', function () {
		
		console.log('readystatechange: ' + document.readyState);
		
		if (document.readyState != 'complete')
			return;
		
		log('网页已完整加载。');
		switch (dhost) {
			case "87pan.com":
			case "bpan.net":
				$('script,.view-gg,#view-gg').remove();
				break;
				
			case 'duole.com':
				var a = $('#player_right .last'),
					b = a.clone();
				
				$('#player_right').animate({
					'width': '+=32'
				}, 500);
				$('a.music_info').css({
					'cursor': 'text'
				}).bind('DOMAttrModified', function () {
					if (this.hasAttribute('href'))
						this.removeAttribute('href');
				}).removeAttr('href');
				b.insertBefore(a.prev()).removeClass('last').css({
					'width': '0',
					'display': 'inline',
					'background-position': '-150px -104px'
				}).css(makeRotateCss(90)).animate({
					'width': '+=32'
				}, 500).attr('target', '_blank');
				
				var oldPlayNew = win.duolePlayer.playNew, rollid;
				win.duolePlayer.playNew = function (t, n) {
					b.attr({
						href: t,
						title: '单击下载: ' + this.curMusic.song_name
					});

					win.remind.resolve({
						type: rollid = rollid ? 0 : 8,
						uid: 0,
						id: 0,
						param: {
						},
						msg: this.curMusic.song_name + ' [' + this.curMusic.album_name + '] - ' + 
							 this.curMusic.singer_name + '.mp3'
					});

					return oldPlayNew(t, n);
				};
				break;
			case '1ting.com':
				log('1ting 解析启动 :: ' + '等待播放器加载');
				
				waitUnTil('yiting', function () {
					log('1ting 解析启动 :: ' + '播放器加载完毕，开始函数绑定…');
					var getCurrentSongLink = function () {
						return win.yiting.player.entity.Source;
					};
					
					// 防止下方函数绑定失效
					win.$YV.down = function () {
						l.href = getCurrentSongLink();
					};
					
					win.yiting.player.hook('play', function () {
						$('.songact a.down').attr('href', getCurrentSongLink())
						.removeAttr('onclick').css('border', '1px lightgrey dashed');
					});
					// 启动时强制刷新下载地址
					win.yiting.player.hook('play');
					log('1ting 解析启动 :: ' + '绑定完毕，单击原始下载按钮即可下载。');
					
					
				});
				break;
				
			case "ctdisk.com":
			case "pipipan.com":
			case "400gb.com":
			case "bego.cc":
				log('开始执行 城通 旗下网盘系列简化验证码。');
				
				setTimeout (function () {
					// Replace AD with our dummy element.
					$('#ct_baidu_left_12,#ct_baidu_125_12').remove();
					$('<div>').hide().appendTo(d.body)
						.append($('<div>').attr('id', 'ct_baidu_left_12').append($('<iframe>').attr('height', 600)))
						.append($('<div>').attr('id', 'ct_baidu_125_12').append($('<iframe>').attr('height', 125)));

					forceHide ('.kk_xshow,div.span6:first-child');
					$('.captcha').hide('slow');
					$('.captcha_right').css('float', 'left');
					
					$('#vfcode:first').parent()
					.append(createNumPad(4, $('#randcode')[0], function () {
						$('[name="user_form"]').submit();
						return true;
					}));
					log('Finish 城通 旗下网盘系列简化验证码。');
				}, 10);
				
				break;
			case "xiami.com":
				win.player_download = function (sId) {
					// 读取原始歌曲地址
					var SongUrl = $($.ajax({
						type: 'GET',
						url: '/song/playlist/id/' + sId.songId + '/object_name/default/object_id/0',
						cache: true,
						/* 从缓存读，反正如果没记录可以跑到服务器找 */
						async: false
					}).responseText).find('location').html();
					log('虾米解析 :: 歌曲ID [ ' + sId + ' ] :: 解密地址 :: ' + SongUrl);
					// 开始解密...
					SongUrl = (function (sLocation) {
						var num = Number(sLocation.charAt(0)),
							inp = sLocation.substr(1),
							iLe = inp.length % num,
							a = 0,
							ret = '',
							arr = [];
						for (var i = 0; i < num; i++) {
							arr[i] = (iLe > i ? 1 : 0) + (inp.length - iLe) / num;
						}
						for (var z = 0; z < arr[1]; z++) {
							a = 0;
							for (var j = 0; j < num; j++) {
								ret += inp.charAt(a + z);
								a += arr[j];
							}
						}
						return unescape(ret.substr(0, inp.length)).replace(/\^/g, '0').replace(/\+/g, ' ');
					})(SongUrl);
					log('虾米解析 :: 歌曲ID [ ' + sId + ' ] :: 开启窗口 :: ' + SongUrl);
					// 开启窗口...
					win.open(SongUrl);
				};
				break;
				
			case "dbank.com":
			case "vmall.com":
				win.adSend = eFunc;
				
				var eI = function (aList, t, fCallback) {
					var fId = false,
						ret = {};
					console.log('Process: ', aList);
					for (var i = 0; i < aList.length; i++) {
						console.log('Check the aList[' + i + '] :: ', aList[i]);
						ret = fCallback(aList[i], t);
						if (ret.ret) {
							console.log('URL GET :: ' + aList[i].downloadurl);
							fId = aList[i].downloadurl;
							break;
						} else if (aList[i].childList) {
							console.log('NEXT TRY: aList[' + i + '] :: ' + aList[i].childList);
							fId = eI(aList[i].childList, t, fCallback);
							if (fId) {
								return fId;
							}
						}
							}
					return fId;
				};
				
				// 下载解析
				var iNv = setInterval(function () {
					if (!win.dbank.securelink.downloadfile) {
						return;
					} // 等待初始化
					clearInterval(iNv);
					log('dBank 解析 :: 文件列表加载完毕。');
					win.dbank.securelink.setStat = win.dbank.hsdownload.checkResourceSelected = eFunc; // dBank 特殊解析
					win.dbank.securelink.downloadfile = function (ahref) {
						var fList = win.globallinkdata.data.resource.files,
							fId = eI(fList, ahref.id, function (l, t) {
								return ((l.id == t) ? {
									ret: 1
								} : {});
							});
						
						if (!fId) {
							prompt('无法解析其真实地址，可能因为网站改版导致脚本失效..\n\n请提交问题和发生错误的地址到下列地址:', bugRepUrl);
							return;
						}
						var rA = win.dbank.crt.decrypt(fId, this.encrykey);
						log('dBank 解析 :: ' + rA);
						win.open(rA, 'CUWCL4C ' + sVer + fId);
					};
					
					// 判断是否提示需要 VIP 帐号转存
					if (!$('#hsdownload').length) {
						eI(win.globallinkdata.data.resource.files, 0, function (l) {
							$('a#' + l.id).click(function (e) {
								win.dbank.securelink.downloadfile(this);
								e.preventDefault();
							});
						});
					} else {
						// 高速下载按钮拦截
						ubA($('#hsdownload')[0]);
						$('#hsdownload').click(function () {
							$('#down_filelist .list-select input[type="checkbox"]').each(function () {
								if ($(this).prop('checked')) {
									win.dbank.securelink.downloadfile($(this).parent().parent().find('span.list-tit a[id]')[0]);
								}
							});
						});
						log('dBank 解析 :: 解析函数已绑定');
					}
				}, 100);
				break;
				
			case "5sing.com":
				// 播放列表的下载按钮。
				$('a[href*="Down.aspx?sid="]')
				.each(function (i) {
					$(this).attr({
						'href': win.wsplayer.playList[i].mp3,
						'title': '下载 ' + win.wsplayer.playList[i].songname,
						'target': '_blank'
					});
				});
				break;
				
			case 'douban.fm':
				// 参考代码 豆藤, UsoId: 49911
				var $a = $('<a>').css({
					'background': '#9DD6C5',
					'padding': '3px 5px',
					'color': 'white'
				}).text('下载').hover(function () {
					$(this).css({
						'margin-left': '5px',
						'padding-left': '10px',
						'background': '#BAE2D6'
					});
				}, function () {
					$(this).css({
						'margin-left': '0',
						'padding-left': '5px',
						'background': '#9DD6C5'
					});
				}).css(makeDelayCss())
				.attr('target', '_blank');
				var $div = $('<div>').css({
					'float': 'right',
					'margin-top': '-230px',
					'margin-right': '-32px',
					'font-weight': 'bold',
					'font-family': '微软雅黑'
				}).append($a).insertAfter('.player-wrap');
				
				log('等待豆瓣电台加载…');
				
				waitUnTil('extStatusHandler', function () {
					log('豆瓣电台加载完毕! 开始绑定函数…');
					var oldExtStatusHandler = win.extStatusHandler;
					win.extStatusHandler = function (p) {
						var a = JSON.parse(p);
						if ('start' == a.type && a.song) {
							$a.attr('href', a.song.url)
							.attr('title', '右键另存下载: ' + a.song.title);
							
							log(a.song.title + ' :: ' + a.song.url);
						}
						return oldExtStatusHandler(p);
					};
					log('函数绑定完毕, Enjoy~');
					
				});
				break;
		}
	}, false);
})();
/* 
*  简单成就下载 by Yulei 本脚本只作学习研究参考用，版权所有 不得滥用、它用，后果自负
*  
*  Chrome 兼容 + 加强 by jixun66
*	 个人修正内容请参考:
*		http://userscripts.org/scripts/show/157621#full_description
* 
*/