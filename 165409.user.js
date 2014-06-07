// ==UserScript==
// @name       Bilibili视频修正
// @namespace  FireAway-剑仙乘仙剑
// @version    1.9.2微修版
// @description  恢复我大B站的播放器(黑科技按钮用于-打开新页面观看)
// @include      http://www.bilibili.tv/video/av*
// @updateURL		http://userscripts.org/scripts/source/165424.meta.js
// @downloadURL		http://userscripts.org/scripts/source/165424.user.js
// @copyright  FireAway~
// @run-at document-start
// ==/UserScript==
var bilibili = document.createElement("embed");
var player;

var button = document.createElement('button');
var darkTech = document.createElement('button');
button.appendChild(document.createTextNode('打开cid页面！'));
darkTech.appendChild(document.createTextNode('去掉按钮'));

var a = /\/video\/av(\d+)(?:\/index_(\d+))?/.exec(location.pathname);
var url = 'http://api.bilibili.tv/view?type=json&id=' + a[1] + '&page=' + (a[2] || 1);
var path;

var _ua = navigator.userAgent.toLowerCase();

var isChrome = false;
var isSougou = false;
var isFireFox = false;
var isSafari = false;
var isMaxthon = false;
var isOpera = false;

var invocation = null;

//alert(_ua);
if (_ua.indexOf("metasr") > -1) {
	isSougou = true;
} else if (_ua.indexOf("firefox") > -1) {
	isFireFox = true;
} else if (_ua.indexOf("safari") >-1 & _ua.indexOf("chrome") == -1 & _ua.indexOf("maxthon") == -1) {
	isSafari = true;
} else if(_ua.indexOf("opera")>-1){
isOpera = true;
}

function addFunction(cid) {
	url = 'https://secure.bilibili.tv/secure,cid=' + cid;
	var src = 'http://keyfunc.github.io/rtm_iqiyi/assets/js/rtm_iqiyi.min.js';
	button.addEventListener('click', function () {
		window.open(url)
	}, false);
	darkTech.addEventListener('click', function () {
		(function (r) { !! r ? !0 : (function (d) {
				s = d.createElement('script');
				s.setAttribute('src', src);
				d.getElementsByTagName('head')[0].appendChild(s);
			})(document)
		})(window.rtm_iqiyi);
	}, false);
};

function getInfo(url) {
	if (isFireFox | isSafari | isOpera) {

		GM_xmlhttpRequest({
			method: "GET",
			url: url,
			headers: {
				"User-Agent": "Mozilla/5.0",
				"Cache-Control": "max-age=0",
				"Origin": "http://www.bilibili.tv",
				"Cookie": document.cookies
			},
			onload: function (response) {
				var cid = /cid":(\d+),"/g.exec(response.responseText)[1];
				path = "cid=" + cid;
				//alert(path);
				addFunction(cid);
				replace();
			}
		});
	} else {
		if (window.XMLHttpRequest) { // code for all new browsers
			invocation = new XMLHttpRequest();
		} else if (window.ActiveXObject) { // code for IE5 and IE6
			invocation = new ActiveXObject("Microsoft.XMLHTTP");
		}
		if (invocation) {
			invocation.open('GET', url, true);
			invocation.onreadystatechange = state_Change;
			invocation.withCredentials = "true";
			invocation.send();
		} else {
			alert("黑科技在你的浏览器上面无法使用~换~吧~");
		}
	}
};

function state_Change() {
	if (invocation.readyState == 4) { // 4 = "loaded"
		if (invocation.status == 200) { // 200 = OK
			if (invocation.responseText.indexOf("cid") > -1) {
				var cid = JSON.parse(invocation.responseText).cid;
				path = "cid=" + cid;
				addFunction(cid);
				if (isSougou) {
					replace();
				}
			} else {
				alert("啊咧~黑科技似乎失效了哟……等我更新吧！");
			}
		} else {
			alert("啊咧~如果不是网速的问题……那么就是说明黑科技失效了哟……等我更新吧！另外可以换别的浏览器（Chrome）试试看~");
		}
	}
};

function replace() {
	player = document.getElementById('bofqi');
	bilibili.type = "application/x-shockwave-flash";
	bilibili.width = 950;
	bilibili.height = 482;
	bilibili.src = "https://static-s.bilibili.tv/play.swf";
	bilibili.setAttribute("flashvars", path);
	bilibili.setAttribute("quality", "high");
	bilibili.setAttribute("allowfullscreen", "true");
	bilibili.setAttribute("allowscriptaccess", "always");
	bilibili.setAttribute("rel", "noreferrer");
	player.innerHTML = bilibili.outerHTML;
	var isSu = player.innerHTML == bilibili.outerHTML;
	// 请对着发弹幕的地方按Ctrl+V+Enter
	if (!isSu) {
		player.innerHTML = "啊哦~黑科技可能失效了哟~试试右边两个补救措施吧！联系作者请到weibo.com/fireaway私信即可~";
	}
	player.appendChild(button);
	player.appendChild(darkTech);
};
if (!isSougou & !isFireFox) {
	document.addEventListener('DOMContentLoaded', replace, false);
}
window.onload = getInfo(url);
// SouGou metasr
// Chrome chrome safari
// Firefox firefox
// 360Chrome safari
// 360se safari
// Maxton maxthon chrome safari
// Safari safari