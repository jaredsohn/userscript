// ==UserScript==
// @name           youkuhelper
// @namespace      ronmi@rmi.twbbs.org
// @include        http://v.youku.com/v_show/id*
// @include        http://v.youku.com/v_playlist/f*
// @version        0.2
// ==/UserScript==

var YoukuHelper = 
{
	scriptbase:'http://ronmi.kilu.de/',
	playerurl:'http://ronmi.kilu.de/player.swf',
	getPlaylistURL:function()
	{
		var seg=this.getSegs();
		var url = this.scriptbase;
		url += String(seg.length) + '/';
		url += String(this.sid) + '/';
		url += String(this.fileid) + '/';
		url += String(this.key) + '/pl.xml';
		return url;
	},
	getPlayerFLVURL:function(s)
	{
		var seg=this.getSegs();
		var url = this.scriptbase;
		url += String(seg.length) + '/';
		url += String(this.sid) + '/';
		url += String(this.fileid) + '/';
		url += String(this.key) + '/';
		url += String(s)+'.flv';
		return url;
	},
	mkInfoURL: function(vid)
	{
		return 'http://v.youku.com/player/getPlayList/VideoIDS/' + String(vid);
	},
	mkFlvPath: function(seg, type)
	{
		var n = this.toHex(seg);
		while (n.length < 2) 
			n = '0' + n;
		return 'http://f.youku.com/player/getFlvPath/sid/' + this.sid + '_' + n + '/st/' + type + '/fileid/' + this.fileid.substr(0, 8) + n + this.fileid.substr(10) + '?K=' + this.key;
	},
	gmxml: function(u, c)
	{
		return GM_xmlhttpRequest({
			method: 'GET',
			url: u,
			onload: c,
			header: {
				'Cookie': document.cookie
			}
		});
	},
	sid: null,
	vid: 0,
	fileid: null,
	info: null,
	dlLayer: null,
	key: null,
	getFileIDMixString: function()
	{
		var seed = this.info.data[0].seed;
		var mixed = '';
		var source = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/\\:._-1234567890";
		var i, index, len = source.length;
		var c;
		for (i = 0; i < len; ++i) 
		{
			seed = (seed * 211 + 30031) % 65536;
			index = Math.floor(seed / 65536.0 * source.length);
			c = source.charAt(index);
			mixed = mixed + c;
			source = source.replace(c, "");
		}
		return mixed;
	},
	getFileID: function()
	{
		var mixed = this.getFileIDMixString();
		var ids = this.info.data[0].fileid.split('*');
		var realId = "";
		var i, idx;
		for (i = 0; i < ids.length - 1; ++i) 
		{
			idx = parseInt(ids[i]);
			realId += mixed.charAt(idx);
		}
		return realId;
	},
	getSegs: function()
	{
		return this.info.data[0].segs[this.info.data[0].streamtypes[0]]
	},
	player: null,
	preloader: null,
	updatePlayer: function()
	{
		var o = document.getElementById(this.dlLayer);
		if(this.scriptbase.substr(0,7)!='http://')
		{
			o.innerHTML += '<br />playlist script not detected, keep youku player.';
			return;
		}
		
		var seg = this.getSegs();
	
		var files = [];
		var i, duration = 0;
		for (i = 0; i < seg.length; i++) 
			files[i] = this.getPlayerFLVURL(i);
		
		// compute duration
		for (i = 0; i < seg.length; i++) 
			duration += parseInt(seg[i].seconds);
		
		var d = document.getElementById('player');
		var tmp = '<embed src="'+this.playerurl+'" ';
		tmp += 'width="100%" height="100%" ';
		tmp += 'allowfullscreen="true" ';
		tmp += 'allowscriptaccess="always" ';
		tmp += 'flashvars="id=ykplayer&duration=' + String(duration) + '&controlbar=bottom&autostart=true&icon=false&repeat=list';		
		tmp += '&file=' + this.getPlaylistURL();
		tmp += '" id="ykplayer" name="ykplayer"></embed>';
		d.innerHTML = tmp;
		
		var tmp2 = '<div>Preloader: <br /><embed src="'+this.playerurl+'" ';
		tmp2 += 'width="200" height="200" ';
		tmp2 += 'allowfullscreen="false" ';
		tmp2 += 'allowscriptaccess="always" ';
		tmp2 += 'flashvars="displayclick=none&resizing=false&stretching=none&item=1&id=preloader&duration=' + String(duration) + '&controlbar=none&autostart=false&icon=false&repeat=list';		
		tmp2 += '&file=' + this.getPlaylistURL();
		tmp2 += '" id="preloader" name="preloader"></embed></div>';
		document.body.innerHTML += tmp2;
		// add dl info
		o.innerHTML += '<br />Playlist: [<a href="'+this.getPlaylistURL()+'">XSPF(totem)</a>]';
		
		// init preload script
		var ps = "var loaded=0,bytestoload=" + this.getSegs()[0].size + ";";
		ps += "function stateCHG(o){if(o.loaded>=o.total){var p=document.getElementById('preloader');var s=p.getConfig().state; if(s=='PLAYING')return;p.sendEvent('PLAY','true');p.sendEvent('MUTE','true');}}";
		ps += "\nfunction playerReady(o){if(o.id=='ykplayer'){document.getElementById('ykplayer').addModelListener('LOADED', 'stateCHG');}}";
		var e = document.createElement('script');
		e.setAttribute('type', 'text/javascript');
		e.innerHTML = ps;
		document.getElementsByTagName('head')[0].appendChild(e);
	},
	putDLInfo: function()
	{
		// put info to page
		var l = document.getElementById(this.dlLayer);
		var i;
		var seg = this.getSegs();
		
		l.innerHTML = 'Direct Link: ';
		for (i = 0; i < seg.length;) 
		{
			l.innerHTML += '[<a href="' + this.mkFlvPath(i, this.info.data[0].streamtypes[0]) + '"><span style="font-weight:bold;">Part ' + String(++i) + '</span></a>]';
		}
		
		this.updatePlayer();
		
		// init toggle button
		this.initDLButton();
		
	},
	initDLButton: function()
	{
		var d = unsafeWindow.document.getElementById('download');
		if (d == null) 
		{
			window.setTimeout(YoukuHelper.initDLButton, 500);
			return;
		}
		//d.setAttribute('href', 'javascript:void;');
		d.setAttribute('layerid', YoukuHelper.dlLayer);
		//d.addEventListener('click', function()
		d.onclick = function()
		{
			var o = document.getElementById('download');
			var id = o.getAttribute('layerid');
			var e = document.getElementById(id);
			var x1 = o.offsetLeft;
			var x2 = o.offsetWidth;
			var y = o.offsetHeight + o.offsetTop;
			
			e.style.top = String(y + 3) + 'px';
			e.style.left = String(x1) + 'px';
			if (e.style.display == 'none') 
			{
				e.style.display = 'block';
				if (e.offsetWidth > 400) 
					e.style.width = '400px';
			}
			else 
				e.style.display = 'none';
			
			return false;
		};
		//}, false);
		d.textContent = 'Info';
		
	},
	toHex: function(t)
	{
		var _arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
		var ret = new String();
		if (t < 0) 
		{
			_arr = ['f', 'e', 'd', 'c', 'b', 'a', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0'];
			t ^= 0xffffffff;
		}
		while (t > 0) 
		{
			ret = _arr[(t % 16)] + ret;
			t /= 16;
			t = Math.floor(t);
		}
		return ret;
	},
	infoHandler: function(r)
	{
		var o;
		eval('o=' + r.responseText);
		this.info = o;
		
		// compute key
		var appendkey;
		eval('appendkey=0x' + this.info.data[0].key1);
		appendkey ^= 0xA55AA5A5;
		this.key = this.info.data[0].key2 + this.toHex(appendkey);
		
		// parse fileid
		this.fileid = this.getFileID();
		
		// put dl info to page
		this.putDLInfo();
	},
	infoHandlerWrapper: function(r)
	{
		YoukuHelper.infoHandler(r);
	},
	layersInit: function()
	{
		var e;
		
		// download info layer
		e = document.createElement('div');
		e.setAttribute('id', this.dlLayer);
		e.setAttribute('style', 'display:none;position:absolute;border:1px solid red;padding:5px;background-color:#ffffff;');
		document.body.appendChild(e);
		
	},
	init: function()
	{
		this.vid = unsafeWindow.videoId;
		var url = this.mkInfoURL(this.vid);
		
		// generate sid
		this.sid = String(Date.parse(new Date())) +
		String(1000 + Math.floor(Math.random() * 999)) +
		String(1000 + Math.floor(Math.random() * 9000));
		
		// generate random layer name
		this.dlLayer = 'dlLayer' + String(Math.floor(Math.random() * 54321 + 12345));
		
		// init info layers
		this.layersInit();
		
		// fetch info
		this.gmxml(url, this.infoHandlerWrapper);
		
	},
	wrapper: function()
	{
		if (document.getElementById('download')) 
		{
			window.clearInterval(YoukuHelper.hand);
			YoukuHelper.init();
		}
	},
	hand: -1
};

YoukuHelper.hand = window.setInterval(YoukuHelper.wrapper, 500);
