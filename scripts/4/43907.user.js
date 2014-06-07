// ==UserScript==

// @name           KangdmViewer

// @namespace      ronmi@rmi.twbbs.org

// @description    更方便的觀看線上漫畫

// @include        http://www.kangdm.com/comic/*

// @version        0.15

// ==/UserScript==


var RonmiViewer = 

{

	'evaluateXPath': function(aNode, aExpr)

	{

		var xpe = new XPathEvaluator();

		var nsResolver = xpe.createNSResolver(aNode.ownerDocument == null ? aNode.documentElement : aNode.ownerDocument.documentElement);

		var result = xpe.evaluate(aExpr, aNode, nsResolver, 0, null);

		var found = [];

		var res;

		while (res = result.iterateNext()) 

			found.push(res);

		return found;

	},

	'config': null,

	'vols': new Array(), // 存放每一集的連結
	'preferCacheSize': 10,

	'fetchVols': function()

	{

		RonmiViewer.config.fetchVols();

	},

	'pix': new Array(), // 暫時儲存圖片的url

	'curID': -1, // 正在取得第幾集的url

	'curStatus': 2, // 目前狀況 0:正在抓 2:done 1:wait retry

	'getAsync': function(url, callback, refer)

	{
		var h;
		if (refer != null) h={'User-Agent': navigator.userAgent, 'Referer': refer};
		else h={'User-Agent': navigator.userAgent};
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			headers: h,
			onload: function(z){ z.url=url; callback(z); },
			onerror: function(z){ RonmiViewer.getAsync(url, callback, refer);}
		});

	},

	'xmlhttp': function(url)

	{
		var r = RonmiViewer.curURL;

		if (r == null) 

			r = location.href;

		RonmiViewer.getAsync(url, function(resp)

		{

			if (typeof resp!='undefined') 

			{

				RonmiViewer.doneFetchNextURL(resp);

			}

		}, r);

	},

	'iframe': null,

	'curURL': null,

	'beginFetchNextURL': function(url)

	{

		RonmiViewer.xmlhttp(url);

		RonmiViewer.curURL = url;

		RonmiViewer.dataLayer.innerHTML = 'Fetching ' + RonmiViewer.vols[RonmiViewer.curID][1];

	},

	'beginFetchPixURL': function(num)

	{

		if (RonmiViewer.curStatus == 0) 

			return;

		if (num < RonmiViewer.curID) 

			return;

		RonmiViewer.curStatus = 0;

		var url = RonmiViewer.config.convertURL(RonmiViewer.vols[num][0]);

		RonmiViewer.curID = num;

		RonmiViewer.beginFetchNextURL(url);

		RonmiViewer.dataLayer.innerHTML = 'Fetching ' + RonmiViewer.vols[RonmiViewer.curID][1] + ' (1)';

	},

	'bug': false,
	'fetchURLCache': null,

	'doneFetchNextURL': function(r)

	{
		RonmiViewer.fetchURLCache = r;
		var resp=r.responseText

		if (RonmiViewer.bug) 

			return;

		if (resp != null && r.status == 200) 

		{

			if (RonmiViewer.vols[RonmiViewer.curID][2] == 0) 

			{

				RonmiViewer.config.getTotalPage(r);

			}
			else RonmiViewer.totalPageReady(RonmiViewer.vols[RonmiViewer.curID][2]);
		}

		else 

		{

			window.setTimeout(function()

			{

				RonmiViewer.beginFetchNextURL(RonmiViewer.curURL);

			}, 500);

			RonmiViewer.dataLayer.textContent = 'Fetch failed. Waiting refetch.';

		}

	},
	'totalPageReady': function(tpage)
	{
		var r=RonmiViewer.fetchURLCache;
		RonmiViewer.vols[RonmiViewer.curID][2] = tpage;
		RonmiViewer.config.getCurPage(r);
	},
	'curPageReady': function(cPage)
	{
		var r=RonmiViewer.fetchURLCache;

		var tPage = RonmiViewer.vols[RonmiViewer.curID][2];

		

		

		// 取得圖片的url

		var picurl = RonmiViewer.config.fetchPicURL(r);

		if (picurl == null) 

		{ // 找不到url，看看有沒有特殊取得url的函式

			if (typeof(RonmiViewer.config.specialFetchPicURL) == 'function') 

			{

				picurl = RonmiViewer.config.specialFetchPicURL(r);

			}

			else 

			{

				alert('cannot fetch url, please report this problem');

				RonmiViewer.bug = true;

				return;

			}

		}

		RonmiViewer.pix.push([picurl, RonmiViewer.vols[RonmiViewer.curID][1]]);

		

		// 到底了沒？

		if (tPage == cPage) 

		{ // 已到底，設定一下狀態

			RonmiViewer.curStatus = 2;

			RonmiViewer.dataLayer.textContent = RonmiViewer.vols[RonmiViewer.curID][1] + ' Loaded';

			RonmiViewer.show();

		}

		else 

		{ // 未到底，取得下一頁url

			RonmiViewer.curStatus = 1;

			RonmiViewer.beginFetchNextURL(RonmiViewer.config.fetchNextPageURL(r));

			RonmiViewer.dataLayer.innerHTML = 'Fetching ' + RonmiViewer.vols[RonmiViewer.curID][1] + ' (' + String(cPage + 1) + '/' + tPage + ')';

		}

		RonmiViewer.prefetch();

	},

	'picLayer': null,

	'dataLayer': null, // 用來顯示資訊的圖層

	'prefetchCount': 10,

	'curPix': 0, // 顯示到第幾張

	'curFetch': 1, // 預讀到第幾張

	'infoLayer': null,

	'curimgLayer': null,

	'hotkeyEnabled': false,

	'hotCharCode': -1,

	'hotKeyCode': -1,

	'hotAlt': false,

	'hotCtrl': false,

	'hotShift': false,

	'hotMeta': false,

	'keyLayer': null,

	'setKeyEvent': function(e)

	{

		RonmiViewer.hotCharCode = e.charCode;

		RonmiViewer.hotKeyCode = e.keyCode;

		RonmiViewer.hotAlt = e.altKey;

		RonmiViewer.hotCtrl = e.ctrlKey;

		RonmiViewer.hotShift = e.shiftKey;

		RonmiViewer.hotMeta = e.metaKey;

		window.removeEventListener('keypress', RonmiViewer.setKeyEvent, false);

		window.addEventListener('keypress', RonmiViewer.keyEventHandler, false);

		RonmiViewer.hotkeyEnabled = true;

		RonmiViewer.keyLayer.innerHTML = 'Hotkey enabled.';

	},

	'keyEventHandler': function(e)

	{

		if (RonmiViewer.hotCharCode == e.charCode &&

		RonmiViewer.hotKeyCode == e.keyCode &&

		RonmiViewer.hotAlt == e.altKey &&

		RonmiViewer.hotCtrl == e.ctrlKey &&

		RonmiViewer.hotShift == e.shiftKey &&

		RonmiViewer.hotMeta == e.metaKey) 

		{

			RonmiViewer.next();

		}

	},

	'toggleKey': function()

	{

		if (RonmiViewer.hotkeyEnabled == true) 

		{

			RonmiViewer.hotkeyEnabled = false;

			window.removeEventListener('keypress', RonmiViewer.setKeyEvent, false);

			window.removeEventListener('keypress', RonmiViewer.keyEventHandler, false);

			RonmiViewer.keyLayer.innerHTML = 'Hotkey disabled.';

		}

		else 

		{

			window.addEventListener('keypress', RonmiViewer.setKeyEvent, false);

			RonmiViewer.keyLayer.innerHTML = 'Hotkey capturing.';

		}

	},

	'debugLayerEventHandler': function(e)

	{

		if (e.charCode == 109 && e.ctrlKey == true) 

			RonmiViewer.toggleDebug();

	},

	'debugLayer': null,

	'updateDebug': function()

	{

		var str;

		str = 'last vol: ' + RonmiViewer.vols[RonmiViewer.vols.length - 1][1] + '<br />';

		str += 'current col: ' + RonmiViewer.vols[RonmiViewer.curID][1] + '<br />';

		

		RonmiViewer.debugLayer.innerHTML = str;

		

		RonmiViewer.curimgLayer.textContent = '[' + RonmiViewer.pix[RonmiViewer.curPix][0] + ']';

		RonmiViewer.infoLayer.innerHTML = '[' + String(RonmiViewer.curPix + 1) + '/' + String(RonmiViewer.pix.length) + ' Pages]';

	},

	'toggleDebug': function()

	{

		var d = RonmiViewer.controlPanel;

		if (d.style.display == 'none') 

		{

			unsafeWindow.jQuery(d).slideDown();

			var w = d.offsetWidth;

			var h = d.offsetHeight;

			var x = window.innerWidth;

			var y = window.innerHeight;

			d.style.top = String((y - h) / 2) + 'px';

			d.style.left = String((x - w) / 2) + 'px';

			RonmiViewer.updateDebug();

		}

		else 

		{

			unsafeWindow.jQuery(d).slideUp();

		}

	},

	'controlPanel': null,

	'screenInit': function()

	{

		// 清除畫面

		document.body.innerHTML = '<table width="100%"><tr><td><div id="picLayer"></div></td></tr></table>' +

		'<div id="controlPanel" style="position:absolute;background-color:white;border:1px solid red;display:none;z-index:1000;padding:5px;">' +

		'<span id="prevlink" onmouseover="this.style.cursor=\'pointer\';" onmouseout="this.style.cursor=\'\';" style="color:red;">Previous Pic</span> | <span id="showlink" onmouseover="this.style.cursor=\'pointer\';" onmouseout="this.style.cursor=\'\';" style="color:red;">Show</span> | <span id="nextlink" onmouseover="this.style.cursor=\'pointer\';" onmouseout="this.style.cursor=\'\';" style="color:red;">Next Pic</span><br />' +

		'<span id="key" onmouseover="this.style.cursor=\'pointer\';" onmouseout="this.style.cursor=\'\';">Hotkey disabled.</span> | <span id="info"></span> | <span id="dataLayer">Prefetch ' +

		String(RonmiViewer.prefetchCount) +

		' pix</span><br />' +

		'<span id="ifr">Progress </span><br />' +

		'<label><input id="autoResize" type="checkbox" checked="true" />Auto resize picture to window size</label>' +

		'<div id="curimg"></div>' +

		'<div id="debug" /><span id="resizeCtrl">Resize this panel to standard size</span></div>';

		//  onclick="RonmiViewer.show();"
		
		document.getElementById('autoResize').addEventListener('click', function(){ RonmiViewer.show(); }, false);

		

		RonmiViewer.dataLayer = document.getElementById('dataLayer');

		RonmiViewer.picLayer = document.getElementById('picLayer');

		RonmiViewer.picLayer.inndeHTML = '';

		RonmiViewer.iframe = document.getElementById('ifr');

		RonmiViewer.infoLayer = document.getElementById('info');

		RonmiViewer.curimgLayer = document.getElementById('curimg');

		RonmiViewer.keyLayer = document.getElementById('key');

		RonmiViewer.keyLayer.addEventListener('click', function()

		{

			RonmiViewer.toggleKey();

		}, false);

		RonmiViewer.debugLayer = document.getElementById('debug');

		RonmiViewer.controlPanel = document.getElementById('controlPanel');

		unsafeWindow.jQuery(RonmiViewer.controlPanel).draggable();

		window.addEventListener('keypress', RonmiViewer.debugLayerEventHandler, false);

		window.addEventListener('resize', RonmiViewer.resizeHandler, false);

		document.getElementById('prevlink').addEventListener('click', function()

		{

			RonmiViewer.prev();

		}, false);

		document.getElementById('showlink').addEventListener('click', function()

		{

			RonmiViewer.show();

		}, false);

		document.getElementById('nextlink').addEventListener('click', function()

		{

			RonmiViewer.next();

		}, false);

		document.getElementById('resizeCtrl').addEventListener('click', function()

		{

			RonmiViewer.controlPanel.style.width = null;

			RonmiViewer.controlPanel.style.height = null;

		}, false);

	},

	'picimg': null,

	'start': function(url)

	{

		var asc = document.getElementById('asc').checked;

		if (asc == false) 

		{

			RonmiViewer.vols.reverse();

		}

		

		// 先找到是哪一集

		var id = unescape(url);

		var i, j;

		for (i = 0; i < RonmiViewer.vols.length; i++) 

			if (RonmiViewer.vols[i][0] == id) 

				break;

		RonmiViewer.curPix = 0;

		RonmiViewer.curFetch = 1;

		

		var tmp = String(document.getElementById('ppp').value).match(/\d+/);

		if (tmp == null) 

			tmp = 10;

		else 

			tmp = parseInt(tmp);

		if (tmp > 30) 

			tmp = 30;

		RonmiViewer.prefetchCount = tmp;
		GM_setValue('preferCacheSize', tmp);

		

		// site script hook

		if (typeof(RonmiViewer.config.onstart) == 'function') 

			RonmiViewer.config.onstart(i);

		

		// 清除畫面

		RonmiViewer.screenInit();

		RonmiViewer.beginFetchPixURL(i);

		

	},

	'resizeHandler': function(e)

	{

		if (document.getElementById('autoResize').checked == true) 

		{

			var w = window.innerWidth - 10;

			var h = window.innerHeight - 10;

			var img = unsafeWindow.jQuery('#picLayer img');

			if (img.length < 1) 

				return;

			var iw = img.width();

			var ih = img.height();

			if (iw < w && ih < h) 

				return;

			var x = w / iw;

			var y = h / ih;

			if (x > y) 

			{

				img.width(iw * y);

				img.height(h);

			}

			else 

			{

				img.width(w);

				img.height(ih * x);

			}

		}

	},

	'show': function()

	{

		RonmiViewer.prefetching = false;

		RonmiViewer.updateDebug();

		unsafeWindow.jQuery(RonmiViewer.picLayer).empty();

		if (typeof(RonmiViewer.config.specialShowPic) == 'function')
			RonmiViewer.picLayer.appendChild(RonmiViewer.config.specialShowPic(RonmiViewer.pix[RonmiViewer.curPix][0]));
		else
		{
			var e=document.createElement('img');
			e.setAttribute('alt', 'Loading...');
			e.setAttribute('border', '1');
			e.setAttribute('src', RonmiViewer.pix[RonmiViewer.curPix][0]);
			RonmiViewer.picLayer.appendChild(e);
			e.addEventListener('load', function(){ RonmiViewer.resizeHandler(null); }, false);
			e.addEventListener('click', function(){ RonmiViewer.next(); }, false);

		}

		RonmiViewer.resizeHandler(null);

	},

	'prefetching': false,

	'prefetch': function()

	{

		if (RonmiViewer.prefetching) 

		{

			RonmiViewer.show();

			return;

		}

		RonmiViewer.prefetching = true;

		// 清理多餘的prefetch

		var img, i;

		img = RonmiViewer.iframe.getElementsByTagName('img');

		for (i = RonmiViewer.prefetchCount; i < img.length; i++) 

			RonmiViewer.iframe.removeChild(img[i - RonmiViewer.prefetchCount]);

		// 移除重複的prefetch

		img = RonmiViewer.iframe.getElementsByTagName('img');

		for (i = 0; i < img.length; i++) 

		{

			if (decodeURI(img[i].src) == RonmiViewer.pix[RonmiViewer.curPix][0]) 

				RonmiViewer.iframe.removeChild(img[i]);

		}

		

		while (RonmiViewer.iframe.getElementsByTagName('img').length < RonmiViewer.prefetchCount) 

		{

			if (RonmiViewer.curFetch >= RonmiViewer.pix.length) 

			{

				if (RonmiViewer.curStatus != 2) 

				{

					RonmiViewer.prefetching = false;

					RonmiViewer.show();

					return;

				}

				if (RonmiViewer.curID < (RonmiViewer.vols.length - 1)) 

				{

					var tid = RonmiViewer.curID;

					RonmiViewer.beginFetchPixURL(RonmiViewer.curID + 1);

					if (typeof(RonmiViewer.config.onPrefetchNextVol) == 'function') 

					{

						RonmiViewer.config.onPrefetchNextVol(tid + 1);

					}

				}

				RonmiViewer.show();

				return;

			}

			img = document.createElement('img');

			img.src = RonmiViewer.pix[RonmiViewer.curFetch][0];

			img.setAttribute('width', '24');

			img.setAttribute('height', '24');

			img.setAttribute('border', '1');

			img.setAttribute('style', 'padding-right:3px;border:1px solid black;');

			img.setAttribute('alt', 'Wait');

			img.setAttribute('onload', "this.style.border='1px solid red';");

			RonmiViewer.iframe.appendChild(img);

			RonmiViewer.curFetch++;

		}

		RonmiViewer.prefetching = false;

		RonmiViewer.show();

	},

	'prev': function()

	{

		if (RonmiViewer.curPix < 1) 

		{

			alert('no more pix');

			return;

		}

		RonmiViewer.curPix--;

		RonmiViewer.show();

		window.scroll(0, 0);

	},

	'next': function()

	{

		RonmiViewer.curPix++;

		if (RonmiViewer.curPix >= RonmiViewer.pix.length) 

		{

			alert('no more pix');

			return;

		}

		RonmiViewer.prefetch();

		window.scroll(0, 30);

	},

	'init': function(c)

	{

		RonmiViewer.config = c;

		unsafeWindow.addEventListener('load', function(){RonmiViewer.inject();}, false);
		RonmiViewer.preferCacheSize = GM_getValue('preferCacheSize', 10);

	},

	'setupLink': function(e)

	{

		RonmiViewer.vols.push([e.href, e.textContent, 0]);

		e.addEventListener('click', function(e)

		{

			RonmiViewer.start(escape(this.href));

			return false;

		}, false);

		e.setAttribute('onclick', 'return false');

	},

	'injectScript': function(url)

	{

		var e;

		e = document.createElement('script');

		e.setAttribute('type', 'text/javascript');

		e.setAttribute('src', url);

		e.setAttribute('id', 'RonmiViewer');

		document.getElementsByTagName('head')[0].appendChild(e);

	},

	'inject': function()

	{

	

		if (typeof(RonmiViewer.config.checkValid) == 'function') 

		{

			if (!RonmiViewer.config.checkValid()) 

				return;

		}

		

		if (typeof(unsafeWindow.jQuery) == 'undefined') 

		{

			RonmiViewer.injectScript('http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js');

			RonmiViewer.injectScript('http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.0/jquery-ui.min.js');

		}

		

		RonmiViewer.fetchVols();

		var e = document.createElement('div');

		e.setAttribute('style', 'position:fixed;top:0px;left:0px;background-color:red;padding:5px;color:#ffffff;');

		if (RonmiViewer.config.asc) 

			e.innerHTML = 'Prefetch <input value="'+String(RonmiViewer.preferCacheSize)+'" size="4" maxlength="2" id="ppp" /> pix (Max 30) | <label><input type="checkbox" id="asc" checked="true" />Ascendant(first at top)</label>';

		else 

			e.innerHTML = 'Prefetch <input value="'+String(RonmiViewer.preferCacheSize)+'" size="4" maxlength="2" id="ppp" /> pix (Max 30) | <label><input type="checkbox" id="asc" />Ascendant(first at top)</label>';

		document.body.appendChild(e);

		document.title = '[Viewer Script Ready] ' + document.title;

		e = document.getElementsByTagName('script');

		for (var i = 0; i < e.length; i++) 

		{

			if (e[i].getAttribute('id') != 'RonmiViewer') 

				e[i].parentNode.removeChild(e[i])

		}

		

	}

};

(function()
{
	RonmiViewer.init(
	{
		'req': null,
		'_getCurPage': function(r)

		{
			var resp=r.responseText;
			var url = r.url;
			var cp=1;
			if (url.indexOf('?') > 0) 
				cp=parseInt(url.substr(url.indexOf('?') + 1));
			return cp;
		},
		'getCurPage': function(r)
		{
			RonmiViewer.curPageReady(RonmiViewer.config._getCurPage(r));
		},
		'fetchImageHost': function(total)
		{
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://www.kangdm.com/images/Vol.js',
				headers: {
					'Referer': RonmiViewer.vols[RonmiViewer.curID][0],
					'User-Agent': navigator.userAgent
				},
				overrideMimeType: 'text/plain;charset=gb2312',
				onload: function(z)
				{
					var t=z.responseText;
					t=t.substr(0, t.indexOf('function')-1);
					t='var c=function(){'+t+' ;RonmiViewer.vols[RonmiViewer.curID][5] = url; }; c();';
					eval(t);
					RonmiViewer.totalPageReady(total);
				}
			});
		},
		'getTotalPage': function(r)

		{
			if (RonmiViewer.vols[RonmiViewer.curID][2] == 0) 
			{
				GM_xmlhttpRequest({
					method: 'GET',
					url: RonmiViewer.vols[RonmiViewer.curID][0] + 'index.js',
					headers: {
						'Referer': RonmiViewer.vols[RonmiViewer.curID][0],
						'User-Agent': navigator.userAgent
					},
					overrideMimeType: 'text/plain;charset=gb2312',
					onload: function(z)
					{
						var t=z.responseText;
						t=t.replace(/<iframe.*<\/iframe>/, '');
						eval(t);
						RonmiViewer.vols[RonmiViewer.curID][2] = total;
						RonmiViewer.vols[RonmiViewer.curID][3] = volpic;
						RonmiViewer.vols[RonmiViewer.curID][4] = tpf + 1;
						RonmiViewer.vols[RonmiViewer.curID][5] = 'http://kyo.kyodm.com/comic_img/';
						RonmiViewer.config.fetchImageHost(total);
					}
				});
			}
			else RonmiViewer.totalPageReady(RonmiViewer.vols[RonmiViewer.curID][2]);
		},
		'fetchVols': function()
		{
			var url = location.href;
			var a = document.getElementById('main').getElementsByTagName('a');
			var i;
			for (i = 0; i < a.length; i++) 
			{
				if (a[i].href.indexOf(url) != -1 && a[i].href.indexOf('#') == -1) 
				{
					RonmiViewer.setupLink(a[i]);
				}
			}
			
			// init total page cache
			for (i = 0; i < RonmiViewer.vols.length; i++) 
			{
				RonmiViewer.vols[i][2] = 0;
			}
		},
		'convertURL': function(url)
		{
			return url;
		},
		'fetchPicURL': function(r)
		{
			var resp=r.responseText;
			var volpic = RonmiViewer.vols[RonmiViewer.curID][3];
			var tpf = RonmiViewer.vols[RonmiViewer.curID][4];
			//var url = (['http://jtr85tet.kyodm.com/comic_img/', 'http://jtr85tet.kyodm.com/comic_img/', 'http://kdfkdfkf.kyodm.com/comic_img/', 'http://kdfkdfkf.kyodm.com/comic_img/'])[parseInt(Math.random() * 4)];
			var url=RonmiViewer.vols[RonmiViewer.curID][5];
			var cp = String(RonmiViewer.config._getCurPage(r));
			while (cp.length < tpf) 
			{
				cp = '0' + cp;
			}
			return url + volpic + cp + '.jpg';
		},
		'fetchNextPageURL': function(r)
		{
			var resp=r.responseText;
			var cp = RonmiViewer.config._getCurPage(r);
			cp++;
			cp = String(cp);
			return RonmiViewer.vols[RonmiViewer.curID][0] + '?' + cp;
		},
		'onPrefetchNextVol': function(next_vol_id)
		{
			var req;
			req=RonmiViewer.getSync2(
				RonmiViewer.vols[next_vol_id][0] + 'index.js',
				RonmiViewer.vols[next_vol_id][0],
				'text/plain;charset=gb2312'
			);
			var t=req.responseText;
			t=t.replace(/<iframe.*<\/iframe>/, '');
			eval(t);
			RonmiViewer.vols[next_vol_id][2] = total;
			RonmiViewer.vols[next_vol_id][3] = volpic;
			RonmiViewer.vols[next_vol_id][4] = tpf + 1;
		},
		'asc': false
	});
})()