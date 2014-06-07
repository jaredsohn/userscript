// ==UserScript==
// @name        Bilibili Dark tech
// @namespace   FireAway - Jixun
// @version     1.1
// @description B站黑科技
// @include     http://www.bilibili.tv/*
// @updateURL   http://userscripts.org/scripts/source/167432.meta.js
// @downloadURL http://userscripts.org/scripts/source/167432.user.js
// @copyright   FireAway~ / Jixun Modified
// @run-at      document-start
// ==/UserScript==

// Init.
var win;

if (typeof(unsafeWindow) == 'undefined')
	win = window
else
	win = unsafeWindow

function showMsg (msg) {
	console.warn (msg);
}

var nEle = function (tagName, attr, innerHTML, appendTo) {
	var ele = document.createElement (tagName);
	if (attr) {
		for (x in attr)
			ele.setAttribute (x, attr[x]);
	}
	if (innerHTML)
		ele.innerHTML = innerHTML;
	if (appendTo)
		appendTo.appendChild (ele);
	return ele;
};

HTMLElement.prototype.replaceWith = function (newElement) {
	var oldElement = this.parentNode;
	oldElement.insertBefore (newElement, this);
	oldElement.removeChild (this);
};
HTMLElement.prototype.hide = function () {
	this.style.opacity = '0';
};
HTMLElement.prototype.show = function () {
	this.style.opacity = '100';
};

var list = nEle ('select', {
	type: 'select',
	id:   'list'
}), sLoading = '比利海灵顿祈祷中……';
nEle ('option', {value: sLoading}, sLoading, list);

function fetchCid (avNum, fCallback, iPg, wParam) {
	//视频信息请求接口以及AJAX访问
	GM_xmlhttpRequest( {
		method : 'GET',
		url : 'http://api.bilibili.tv/view?type=json&id=' + avNum + '&page=' + (iPg||1),
		onload : function(response) {
			// showMsg ('数据读取失败，请刷新后重试<br />如果多次刷新后无效可能因为：<br />1. 服务器宕机<br />2. 服务器关闭了数据获取方式'), 
			try {
				var cid = JSON.parse (response.responseText).cid;
			} catch (e) {
				var cid = !1;
				// Failed to read data, fall to alternative.
				// return getCid( avNum );
			}
			fCallback (cid, avNum, wParam);
		}
	});
}

function getInfo(u) {
	//判断是否为视频播放地址
	var a = location.pathname.match (/\/av(\d+)(?:\/index_(\d+))?/);
	if (a) {
		var currentCid = (win.flashvars||{}).cid
			|| parseInt((document.body.innerHTML.match (/cid:(\s+|)['"](\s+|)(\d+)/)||[,,,0])[3]);
		
		// If is on the video page
		var avNum = parseInt (a[1]),
			pgNum = parseInt (a[2]);
		
		// DEBUG
		// return getCid (avNum);
		
		if (!currentCid) {
			fetchCid (avNum, function (iCid) {
				if (!iCid) {
					showMsg ('数据读取失败，请刷新后重试<br />如果多次刷新后无效可能因为：<br />1. 服务器宕机<br />2. 服务器关闭了数据获取方式');
					return getCid (avNum);
				}
				replaceBiliPlayer (iCid);
			}, pgNum);
		} else {
			console.log ('Read cid from current page: ', currentCid);
			replaceBiliPlayer (currentCid);
		}
		
	}
}

//播放器替换
function replaceBiliPlayer(iCid) {
	var ePlayer = document.querySelector('#bofqi');
	if (!ePlayer)
		return;
	
	var sPath = 'cid=' + iCid;
	var Burl = 'https://secure.bilibili.tv/secure,' + sPath;
	var button = nEle ('input',{
		type: 'button',
		value: '黑科技'
	});
	
	var eBiliPlayer = nEle ('embed', {
		'type': 'application/x-shockwave-flash',
		'width': 950,
		'height': 500,
		'quality': 'high',
		'allowfullscreen': true,
		'allowscriptaccess': 'always',
		'src': 'https://static-s.bilibili.tv/play.swf',
		'flashvars': sPath
	});
	button.addEventListener('click', function () {
		var bili_hkj = nEle ('iframe', {
			height: 484,
			width: 950,
			src: Burl,
			border: 0,
			scrolling: 'no',
			frameborder: 'no',
			framespacing: 0,
		});
		eBiliPlayer.replaceWith (bili_hkj);
		eBiliPlayer = bili_hkj;
		// player.appendChild(button);
	}, false);
	
	ePlayer.parentNode.insertBefore(button, ePlayer);
	
	if(/iqiyi|sohu/i.test (ePlayer.innerHTML))
		ePlayer.replaceWith (eBiliPlayer);
};

function getCid(avId) {
	var ePlayer = document.querySelector('#bofqi');

	//以下是海贼王专用更换CID按钮以及提示信息
	list.addEventListener ('click', function () {
		var newCid = parseInt (this.options[this.selectedIndex].value);
		if (!newCid)
			return showMsg ('Invalid CID!!');
		replaceBiliPlayer (newCid);
	}, false);
	
	var p = ePlayer.parentNode;
	p.insertBefore (list, ePlayer);
	p.insertBefore (nEle ('div', 0, '跟随王的选择！El Psy Congroo！如果没有王的选择……那么请等待下个版本吧！'), ePlayer);
	
	//获取视频信息 (CID范围 预计V3.0改进)
    // Not accurate.
	// Stage 1: get the id before
	var lastCid = 0;
	var checkIfReady = function (avNum, iNewCid) {
		// Stage 2: list all possible ID.
		if (!lastCid)
			return (lastCid = iNewCid);
		for (var i=Math.min (lastCid, iNewCid)+1; i<Math.max (lastCid, iNewCid)-1; i++)
			list.add(new Option(i, i));
		list.options[0].innerHTML += ' :: 真♂王♀的选择！和我签订契约吧！';
	};

	var processThis = function (bSuccess, avNum, wParam) {
		// console.log ('processThis', arguments);
		if (!bSuccess)
			return fetchCid (avNum + wParam, processThis, 1, wParam);
		checkIfReady (avNum, bSuccess);
	};
	fetchCid (avId-1, processThis, 1, -1);
	fetchCid (avId+1, processThis, 1,  1);
}

addEventListener ('DOMContentLoaded', function () {
	getInfo(0);
}, false);