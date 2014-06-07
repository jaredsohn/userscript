// ==UserScript==
// @name           Another YouTube Link Title
// @description    Adds video titles, shows previews and embeds on click. Also supported: Vimeo, LiveLeak
// @author         Swing
// ==/UserScript==

var sites = {
	'yt':{
		patterns:["youtube.com/watch", "youtu.be/", "youtube.com/v/", "youtube.com/user/"],
		parse:function(url) { return /(v[=\/]|#p\/[a-z]\/.+\/|youtu\.be\/)([a-z0-9_-]+)(.*[#&\?]t=([0-9ms]+))?/i.exec(url) ? {vid:RegExp.$2, t:RegExp.$4} : null; },
		sizes:[[640,390],[853,510]],
		embed:function(vid, t) { return ce('iframe', {src:'https://www.youtube.com/embed/' + vid + '?autoplay=1&rel=1' + (t ? '#t=' + t : '')}); },
		preview:function(vid) { return 'https://img.youtube.com/vi/' + vid + '/0.jpg'; },
		icon:'data:image/gif;base64,R0lGODlhEAAQAMQAAGaJybqSR/////8jEgAAAO4cAP9VT/8jE9j8/u8dAP+6uv/R0vXmqqLF40RmrP8iEv+Zmvbmqp1wE//Z2dWvbv/Oz39KDP+ysv+bm//w79j7/e+p/+8cAPbnq9avbv/a2SH5BAAAAAAALAAAAAAQABAAAAVyoEBZgtMIaKqixEasMOoRZ0AAwvuqDIFEOoRu1fsFJcJVh6AR2HAUgiNGVU0GgwN2yx08PoPU9iDojstctDlsEDwEbYFioMgstnABuR2GoO5YeWxlAn5YWmwKKAYVAhcDGAKABQUJlJeVlhwJYWNdiIEhADs=',
		request:function(vid, f) {
			requestJSON('https://gdata.youtube.com/feeds/api/videos/' + vid + '?alt=json&fields=title/text(),yt:noembed,app:control/yt:state/@reasonCode', function(code, obj, txt) {
				if(code == 404 && txt.indexOf('Video not found') != -1) {
					delay(f, 0, {title:'Video not found', status:4});
				} else if(code == 403 && txt.indexOf('Private video') != -1) {
					delay(f, 0, {title:'Private video', status:3});
				} else if(code == 200 && obj) {
					var entry = obj.entry;
					var title = entry.title.$t;
					var status;
					if(entry.app$control && entry.app$control.yt$state && entry.app$control.yt$state.reasonCode != 'limitedSyndication') {
						status = 3;
					} else if(typeof entry.yt$noembed == 'object') {
						status = 5;
					}
					delay(f, 0, {title:title, status:status});
				} else {
					delay(f, 0);
				}
			});
		}
	},
	'vm':{
		patterns:["vimeo.com/"],
		parse:function(url) { return /vimeo\.com\/(m\/)?([0-9]+)/i.exec(url) ? {vid:RegExp.$2} : null; },
		sizes:[[640,360],[853, 480]],
		embed:function(vid, t) { return ce('iframe', {src:'https://player.vimeo.com/video/' + vid + '?title=1&portrait=1&byline=1&color=aa0000&autoplay=1'}); },
		icon:'data:image/gif;base64,R0lGODlhEAAQAMQfAAuUuQynzzu83u/09Ryy2Su320rC4IbW6mKOngqHq5GvuoO3xhVbc0m92zV7keDo60R8j8Hc5KHEzwuawGSluaTg8Ah1lfD5/BmPsJPI13fR6LLd6f///wuavg2t1gAAACH5BAEAAB8ALAAAAAAQABAAAAVu4NeNZFmKgqeurCqMbbzCbrEWh0ao9MFdNgNnWOF1CJUhR+PZDIYRY2MRGWYIFsVQYgRYHNBAc4gwqiaPoUfIkQDMKsnwkB5YZp0VRTmEsGgeGHwIb3grAVoDCAktgB4WEAyMjY4AYpQiJpojHyEAOw==',
		request:function(vid, f) {
			requestJSON('https://vimeo.com/api/oembed.json?url=http://vimeo.com/' + vid, function(code, obj) {
				if(code == 404) {
					delay(f, 0, {title:'Video not found', status:4});
				} else if(code == 200 && obj) {
					delay(f, 0, {title:obj.title ? obj.title : 'Unknown video', preview:obj.thumbnail_url});
				} else {
					delay(f, 0);
				}
			});
		}
	},
	'll': {
		patterns:["liveleak.com/view"],
		parse: function(url) { return /view.+i=([0-9a-z_]+)/i.exec(url) ? {vid:RegExp.$1} : null; },
		sizes:[[625,352],[852,480]],
		embed:function(vid) { return ce('iframe', {src:'http://www.liveleak.com/e/' + vid + '?autostart=true'}); },
		icon: 'data:image/gif;base64,R0lGODlhEAAQAIAAAPz8/JcAACH5BAAAAAAALAAAAAAQABAAAAIrjI+pB+1gWoLhRcqurDhqumXcFnoj2FXfNa1ce7IISqb0DcJPPi+f4wsWAAA7',
		request:function(vid, f) {
			requestText('http://www.liveleak.com/view?i=' + vid, [/Item not found!/i, /<title>LiveLeak\.com - (.+?)<\/title>/i, /"og:image" content="(.+?)"/], function(code, m) {
				var notfound = m[0], title = m[1], preview = m[2];
				if(notfound) {
					delay(f, 0, {title:'Video not found', status:4});
				} else {
					delay(f, 0, {title:title ? title[1] : 'Unknown video', preview:preview ? preview[1].replace('_thumb_', '_sf_') : null});
				}
			});
		}
	},
	'nv': {
		patterns:["nicovideo.jp/watch/"],
		parse:function(url) { return /watch\/([a-z0-9]+)/i.exec(url) ? {vid:RegExp.$1} : null; },
		icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAL5JREFUeNqUUtENAiEMpeaW6BxNWEiNbqFjaIw7GMcgkrgFU0ilHB5oqofvq0ffK6/HA76j+QeD4VLRUpT+HOQjHYJ+Duyx9DKJVrl9kjatay3INOAbFnYD2mTqMXwagiRwSNveNfwhDOYhlXNulm2tTeTFKOiFCLgZMIvY3PDDVZ0V+yzVWWIp6iN1h+rSE1XRxBSN+N2AtnR5h65flAXAV3lm2qPfBUnLGDuu4SlheRGAL/jGmHLaKhs8BRgA37xOoiJFHvwAAAAASUVORK5CYII=',
		request:function(vid, f) {
			requestText('http://ext.nicovideo.jp/api/getthumbinfo/' + vid, [/NOT_FOUND|DELETED/, /<title>(.+?)</i, /<thumbnail_url>(.+?)</i, /<embeddable>1/i, /<view_counter>(\d+)/i], function(code, m) {
				var notfound = m[0], title = m[1], preview = m[2], embed = m[3];
				if(notfound) {
					delay(f, 0, {title:'Video not found', status:4});
				} else {
					delay(f, 0, {title:title ? title[1] : 'Unknown video', preview:preview ? preview[1] : null, status:5});
				}
			});
		}
	}
};

function onLoad() {
	var q = 'a[href*="http://t.co/"]';
	for(var sid in sites) {
		q += sites[sid].patterns.reduce(function(prev, cur) { return  prev + ',a[href*="' + cur +'"]'; }, '');
	}
	sites.query = q;
	processLinks(document.body);
	var MutationObserver;
	if(MutationObserver = window.WebKitMutationObserver || window.MozMutationObserver || window.MutationObserver) {
		new MutationObserver(onMutations).observe(document.body, {childList: true, subtree: true});
	} else {
		document.body.addEventListener('DOMNodeInserted', onNodeInserted, false);
	}
	window.addEventListener('beforeunload', onUnload, false);
	GM_registerMenuCommand('Set up YouTube Link Title', setup);
}

function onUnload() {
	window.removeEventListener('beforeunload', onUnload, false);
	document.removeEventListener('DOMNodeInserted', onNodeInserted, false);
	if(insertVideoInfo.styleAdded) {
		var links = document.querySelectorAll('a.YTLT-link');
		for(var i = links.length, a; i-- && (a = links[i]);) {
			a.removeEventListener('mouseover', onLinkMouseOver, false);
			a.removeEventListener('click', onLinkClick, false);
		}
		links = null;
		cache.save();
	}
	cache = sites = null;
	delete fetchVideoInfo.pending;
}

function onNodeInserted(e) {
	var t = e.target;
	if(t.nodeType != 1 || !t.hasChildNodes()) return;
	delay(processLinks, 200, t);
}

function onMutations(muts) {
	for(var i = muts.length, mut; i-- && (mut = muts[i]);) {
		for(var j = mut.addedNodes.length, node; j-- && (node = mut.addedNodes[j]);) {
			if(node.nodeType != 1 || !node.hasChildNodes()) return;
			delay(processLinks, 200, node);
		}
	}
}

function processLinks(node) {
	var i = 0, list = node.querySelectorAll(sites.query);
	if(list.length < 1) return;
	function processChunk() {
		var a, linkInfo, vidInfo, numProcessed = 0;
		while(a = list[i++]) {
			if(!(linkInfo = parseLinkInfo(a))) continue;
			if(vidInfo = cache.get(linkInfo.sid, linkInfo.vid)) {
				insertVideoInfo(a, linkInfo, vidInfo);
			} else {
				fetchVideoInfo(a, linkInfo);
			}
			numProcessed++;
			if(numProcessed == 15) return delay(processChunk, 100);
		}
		list = null;
	}
	node = null;
	processChunk();
}

function parseLinkInfo(a) {
	var url = decodeURIComponent(a.href.indexOf('http://t.co/') != -1 ? a.getAttribute('data-expanded-url') : a.href);
	var test = function(pattern) { return url.indexOf(pattern) != -1; };
	for(var sid in sites) {
		if(typeof sites[sid] != 'object' || !sites[sid].patterns.some(test)) continue;
		var info = sites[sid].parse(url);
		if(info) return {sid:sid,vid:info.vid,t:info.t};
	}
	return null;
}

function fetchVideoInfo(a, linkInfo) {
	if(typeof fetchVideoInfo.pending != 'object') fetchVideoInfo.pending = {};
	var id = linkInfo.sid + linkInfo.vid;
	if(typeof fetchVideoInfo.pending[id] != 'object') {
		fetchVideoInfo.pending[id] = [a];
		var f = function(vidInfo) {
			if(vidInfo) {
				cache.set(linkInfo.sid, linkInfo.vid, vidInfo);
				for(var i = fetchVideoInfo.pending[id].length; i--;) {
					insertVideoInfo(fetchVideoInfo.pending[id][i], linkInfo, vidInfo);
				}
			}
			delete fetchVideoInfo.pending[id];
		};
		sites[linkInfo.sid].request(linkInfo.vid, f);
	} else {
		fetchVideoInfo.pending[id].push(a);
	}
	a = null;
}

function requestJSON(url, f) {
	GM_xmlhttpRequest({
		method:	'GET',
		url:	url,
		onload:	function(req) {
			var obj;
			try {
				obj = JSON.parse(req.responseText);
			} catch(ex) {
				GM_log('JSON data from ' + url + ' could not be parsed: ' + ex + '\nHTTP: ' + req.status + '\nResponse: ' + req.responseText);
			}
			delay(f, 0, req.status, obj, req.responseText);
		},
		onerror: function() {
			GM_log('Request to ' + url + ' failed.');
		}
	});
}

function requestText(url, re, f) {
	GM_xmlhttpRequest({
		method:	'GET',
		url:	url,
		onload:	function(req) {
			var m = [], txt = req.responseText;
			for(var i = 0, len = re.length; i < len; i++) {
				m.push(re[i].exec(txt));
			}
			delay(f, 0, req.status, m);
		},
		onerror: function() {
			GM_log('Request to ' + url + ' failed.');
		}
	});
}

function insertVideoInfo(a, linkInfo, vidInfo) {
	if(!insertVideoInfo.styleAdded) {
		GM_addStyle([
			'#YTLT-preview { position:fixed;z-index:8888;max-height:300px;border:1px solid black;background-color:white; }',
			'a.YTLT-na { text-decoration: line-through!important; }',
			'a.YTLT-text { font-weight:bold!important;font-style:italic!important; }',
			'img.YTLT-icon { height:16px!important;width:16px!important;position:relative!important;bottom:-2px!important;display:inline!important;float:none!important;margin:0 2px!important;border:0!important; }'
		].join('\n'));
		insertVideoInfo.styleAdded = true;
	}
	a.className += ' YTLT-link';
	if(a.textContent.match(/https?:\/\//i)) {
		a.className += ' YTLT-text';
		while(a.hasChildNodes()) a.removeChild(a.firstChild);
		a.appendChild(buildIcon(linkInfo.sid, vidInfo.status));
		a.appendChild(document.createTextNode(vidInfo.title));
	} else {
		a.title = vidInfo.title;
		if(a.hasChildNodes() && a.innerHTML.indexOf('<img') == -1) {
			a.insertBefore(buildIcon(linkInfo.sid, vidInfo.status), a.firstChild);
		}
	}
	if(vidInfo.status == 3 || vidInfo.status == 4) a.className += ' YTLT-na';
	if(previews) {
		a.addEventListener('mouseover', onLinkMouseOver, false);
		new Image().src = getPreviewUrl(vidInfo, linkInfo);
	}
	if(embed_mode != 'off' && vidInfo.status != 5) {
		a.addEventListener('click', onLinkClick, false);
	}
}

function onKeyDown(e) {
	if(e.keyCode == 27) {
		removePlayer();
	}
}

function onLinkClick(e) {
	if(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey || e.button != 0) return;
	e.preventDefault();
	startVideo(this);
}

function onLinkMouseOver(e) {
	var img = ce('img', {id:'YTLT-preview'});
	var linkInfo = parseLinkInfo(this);
	var vidInfo = cache.get(linkInfo.sid, linkInfo.vid);
	img.src = getPreviewUrl(vidInfo, linkInfo);
	var w = window.innerWidth, h = window.innerHeight;
	var r = this.getBoundingClientRect();
	if(r.left > w/2) {
		img.style.right = w - r.right + 'px';
	} else {
		img.style.left = r.left + 'px';
	}
	if(r.top > h/2) {
		img.style.bottom = h - r.top + 30 + 'px';
	} else {
		img.style.top = r.bottom + 30 + 'px';
	}
	document.body.appendChild(img);
	this.addEventListener('mouseout', onLinkMouseOut, false);
	this.addEventListener('click', onLinkMouseOut, false);
}

function onLinkMouseOut(e) {
	this.removeEventListener('mouseout', onLinkMouseOut, false);
	this.removeEventListener('click', onLinkMouseOut, false);
	rm('YTLT-preview');
}

function startVideo(link) {
	var linkInfo = parseLinkInfo(link);
	if(embed_mode == 'inline') {
		var embed = buildEmbed(linkInfo, GM_getValue('big'));
		link.parentNode.replaceChild(embed, link);
		delay(window.scrollTo, 0, 0, window.scrollY + embed.getBoundingClientRect().top - window.innerHeight/2 + embed.offsetHeight/2);
	} else if(embed_mode == 'window') {
		var embed = buildEmbed(linkInfo, GM_getValue('big'));
		var w = parseInt(embed.style.width), h = parseInt(embed.style.height);
		embed.style.width = '100%';
		embed.style.height = '100%';
		var div = ce('div');
		div.appendChild(embed);
		var features = 'left='+(window.screen.width/2-w/2)+',top='+(window.screen.height/2-h/2)+',width='+w+',height='+h+',status=no,scrollbars=no,location=no,menubar=no,toolbar=no,personalbar=no,dependent=no';
		window.open('data:text/html,<html><title>Video Player</title><body style="padding:0;margin:0;overflow:hidden;background:black">' + encodeURIComponent(div.innerHTML) + '</body></html>', 'YouTube Link Title', features);
		div.removeChild(embed);
	} else if(embed_mode == 'player') {
		removePlayer();
		insertPlayer(linkInfo);
	}
}

function insertPlayer(linkInfo) {
	if(!insertPlayer.styleAdded) {
		GM_addStyle([
			'#YTLT-bg { position:fixed;z-index:9999;top:0;right:0;bottom:0;left:0;background-color:black;opacity:0.9; }',
			'#YTLT-player { display:block;position:fixed;z-index:10000;background-color:black;border:2px solid black; }',
			'#YTLT-player-titlebar { line-height:17px;padding:0;background:#232323;background:-moz-linear-gradient(top, #141414, #232323);background:-webkit-gradient(linear, left top, left bottom, from(#141414), to(#232323));border-bottom:2px solid black;text-align:'+(GM_getValue('reverse_buttons')?'left':'right')+'; }',
			'#YTLT-player-darken { padding:0px 11px 3px 11px; }',
			'#YTLT-player-resize { padding:1px 11px 2px 11px; }',
			'#YTLT-player-close { padding:0px 28px 3px 28px; }',
			'#YTLT-player .YTLT-embed { border:0; }',
			'#YTLT-player .YTLT-player-titlebar-button { vertical-align:top;display:inline-block;margin:0;font-weight:bold;font-size:14px;text-decoration:none;border-'+(GM_getValue('reverse_buttons')?'right':'left')+':1px solid black;color:#6e6e6e;-moz-user-select:none;-webkit-user-select:none;-o-user-select:none;text-decoration:none;cursor:pointer;font-family:"segoe ui",verdana,sans-serif; }',
			'#YTLT-player .YTLT-player-titlebar-button:hover { color:#c6c6c6; }',
			'.YTLT-embed { background-color:black;border:2px solid black;margin:0;padding:0; }',
			'#YTLT-player.YTLT-player-moving { opacity:0.8;cursor:move;border:2px solid white; }',
			'#YTLT-player.YTLT-player-moving .YTLT-embed { visibility:hidden; }',
			'.YTLT-noselect { -moz-user-select:none;-webkit-user-select:none;-o-user-select:none; } '
		].join('\n'));
		insertPlayer.styleAdded = true;
	}
	var big = GM_getValue('big');
	var embed = buildEmbed(linkInfo, big);
	var player = ce('div', {id:'YTLT-player'});
	var titlebar = ce('div', {id:'YTLT-player-titlebar',mousedown:onTitlebarMouseDown});
	var onDarken = function(e) { if(document.getElementById('YTLT-bg')) { rm('YTLT-bg'); GM_setValue('darken', false); } else { document.body.appendChild(ce('div', {id:'YTLT-bg'})); GM_setValue('darken', true); } };
	var onResize = function(e) { e.preventDefault(); GM_deleteValue('x'); GM_deleteValue('y'); GM_setValue('big', !big); removePlayer(); insertPlayer(linkInfo); };
	var onClose = function(e) { e.preventDefault(); removePlayer(); };
	var buttons = [
		ce('a', {id:'YTLT-player-darken',className:'YTLT-player-titlebar-button',innerHTML:'&#9788;',click:onDarken}),
		ce('a', {id:'YTLT-player-resize',className:'YTLT-player-titlebar-button',innerHTML:big?'&#65293;':'&#65291;',click:onResize}),
		ce('a', {id:'YTLT-player-close',className:'YTLT-player-titlebar-button',innerHTML:'X',click:onClose})
	];
	if(GM_getValue('reverse_buttons')) buttons.reverse();
	for(var i = 0; i < buttons.length; i++) {
		titlebar.appendChild(buttons[i]);
	}
	player.appendChild(titlebar);
	player.appendChild(embed);
	document.body.appendChild(player);
	var w = player.offsetWidth, h = player.offsetHeight;
	var x = parseFloat(GM_getValue('x')), y = parseFloat(GM_getValue('y'));
	var isPosValid = x > -w/2 && x < window.innerWidth - w/2 && y > -5 && y < window.innerHeight - h/2;
	player.style.left = (isPosValid ? x : window.innerWidth/2 - w/2) + 'px';
	player.style.top  = (isPosValid ? y : window.innerHeight/2 - h/2) + 'px';
	if(GM_getValue('darken')) document.body.appendChild(ce('div', {id:'YTLT-bg'}));
	document.addEventListener('keydown', onKeyDown, false);
	player = embed = titlebar = onDarken = onResize = onClose = buttons = null;
}

function removePlayer() {
	rm('YTLT-bg');
	rm('YTLT-player');
	document.removeEventListener('keydown', onKeyDown, true);
}

function onTitlebarMouseDown(e) {
	var t = e.target;
	if(t.id != 'YTLT-player-titlebar') return;
	t.parentNode.className = 'YTLT-player-moving';
	var r = t.getBoundingClientRect();
	t.dx = e.clientX - r.left;
	t.dy = e.clientY - r.top;
	document.body.className += ' YTLT-noselect';
	window.addEventListener('mousemove', onTitlebarMouseMove, false);
	window.addEventListener('mouseup', onTitlebarMouseUp, false);
}

function onTitlebarMouseMove(e) {
	var titlebar = document.getElementById('YTLT-player-titlebar');
	titlebar.parentNode.style.left = (e.clientX - titlebar.dx - 2) + 'px';
	titlebar.parentNode.style.top  = (e.clientY - titlebar.dy - 2) + 'px';
}

function onTitlebarMouseUp(e) {
	var titlebar = document.getElementById('YTLT-player-titlebar');
	titlebar.parentNode.className = '';
	titlebar.dx = null;
	titlebar.dy = null;
	window.removeEventListener('mousemove', onTitlebarMouseMove, false);
	window.removeEventListener('mouseup', onTitlebarMouseUp, false);
	document.body.className = document.body.className.replace('YTLT-noselect', '');
	GM_setValue('x', titlebar.parentNode.style.left);
	GM_setValue('y', titlebar.parentNode.style.top);
}

function buildEmbed(linkInfo, big) {
	var site = sites[linkInfo.sid];
	var embed = site.embed(linkInfo.vid, linkInfo.t);
	embed.className += 'YTLT-embed';
	var w = big ? site.sizes[1][0] : site.sizes[0][0];
	var h = big ? site.sizes[1][1] : site.sizes[0][1];
	embed.style.width = w + 'px';
	embed.style.height = h + 'px';
	return embed;
}

function buildIcon(sid, status) {
	var img = ce('img', {className:'YTLT-icon'});
	if(embed_mode != 'off' && status == 5) {
		img.addEventListener('load', grayscale, false);
	}
	img.src = sites[sid].icon;
	return img;
}

function setup() {
    rm('YTLT-setup');
    GM_addStyle([
        '#YTLT-setup { position:fixed;z-index:10001;top:40px;right:40px;padding:20px 30px;background-color:white;width:auto;border:1px solid black }',
        '#YTLT-setup * { color:black;text-align:left;line-height:normal;font-size:12px }',
        '#YTLT-setup div { text-align:center;font-weight:bold;font-size:14px }',
        '#YTLT-setup ul { margin:15px 0 15px 0;padding:0;list-style:none }',
        '#YTLT-setup li { margin:0;padding:3px 0 3px 0;vertical-align:middle }'
    ].join('\n'));
	document.body.appendChild(ce('div', {id:'YTLT-setup',innerHTML:'<div>YouTube Link Title</div><ul><li>Embedding: <select id="YTLT-setup-embed_mode"><option value="off">off</option><option value="inline">inline</option><option value="player">in-page popup</option><option value="window">popup window</option></select></li><li><input type="checkbox" id="YTLT-setup-big"> 480p instead of 360p</li><li><input type="checkbox" id="YTLT-setup-reverse_buttons"> Reverse buttons</li><li><input type="checkbox" id="YTLT-setup-previews"> Show previews on hover</li></ul><div><button id="YTLT-setup-button">Save settings</button></div>'}));
	document.getElementById('YTLT-setup-button').addEventListener('click', function() {
		GM_setValue('previews', !!document.getElementById('YTLT-setup-previews').checked);
		var sel = document.getElementById('YTLT-setup-embed_mode');
		GM_setValue('embed_mode', sel.options[sel.selectedIndex].value);
		GM_setValue('big', !!document.getElementById('YTLT-setup-big').checked);
		GM_setValue('reverse_buttons', !!document.getElementById('YTLT-setup-reverse_buttons').checked);
		this.disabled = true;
		this.innerHTML = 'Reloading...';
		window.location.reload();
	}, false);
	var onChange = function() {
		var val = this.options[this.selectedIndex].value;
		document.getElementById('YTLT-setup-reverse_buttons').parentNode.style.display = val == 'player' ? '' : 'none';
		document.getElementById('YTLT-setup-big').parentNode.style.display = val == 'inline' || val == 'window' ? '' : 'none';
	};
	document.getElementById('YTLT-setup-previews').checked = previews;
	var sel = document.getElementById('YTLT-setup-embed_mode');
	sel.addEventListener('change', onChange, false);
	for(var i = sel.options.length; i--;) {
		if(sel.options[i].value == embed_mode) sel.selectedIndex = i;
	}
	onChange.apply(sel);
	sel = onChange = null;
	document.getElementById('YTLT-setup-big').checked = GM_getValue('big');
	document.getElementById('YTLT-setup-reverse_buttons').checked = GM_getValue('reverse_buttons');
}

function getPreviewUrl(vidInfo, linkInfo) {
	if(vidInfo.preview) {
		 return vidInfo.preview;
	} else if(sites[linkInfo.sid].preview) {
		return sites[linkInfo.sid].preview(linkInfo.vid);
	}
}

function grayscale(e) {
	var img = e.target;
	img.removeEventListener('load', grayscale, false);
	var w = img.width, h = img.height;
	var c = ce('canvas', {width:w,height:h});
	var cx = c.getContext('2d');
	cx.drawImage(img, 0, 0);
	var d = cx.getImageData(0,0, w, h);
	for(i = 0, dw = d.width; i < dw; i++) {
		for(j = 0, dh = d.height; j < dh; j++) {
			var x = (i+j*dw)*4;
			var r = d.data[x];
			var g = d.data[x+1];
			var b = d.data[x+2];
			var avg = (r+g+b)/3;
			d.data[x]   = avg;
			d.data[x+1] = avg;
			d.data[x+2] = avg;
		}
	}
	cx.putImageData(d, 0, 0);
	img.src = c.toDataURL()
}

function ce(name, props) {
	var n = document.createElement(name);
	if(props) {
		for(p in props) {
			if(p == 'click' || p == 'mousedown' || p == 'mousedown') {
				n.addEventListener(p, props[p], false);
			} else {
				n[p] = props[p];
			}
		}
	}
	return n;
}

function rm(node) {
	if(typeof node == 'string') node = document.getElementById(node);
	if(node) {
		node.parentNode.removeChild(node);
	}
}

function delay(f, t) {
	var args = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null;
	window.setTimeout(function() { f.apply(null, args); }, t);
}

function Cache() {


	this.get = function(sid, vid) {
		if(obj == null) this.load();
		var data = obj[sid + vid];
		if(!data) return null;
		data = data.split('\t');
		return {title:data[0],status:data[1],preview:data[2]};
	}

	this.set = function(sid, vid, info) {
		if(!info) return;
		if(obj == null) this.load();
		obj[sid + vid] = [info.title,info.status,info.preview].join('\t').trim();
		if(!dirty) dirty = true;
	}

	this.save = function() {
		if(dirty) {
			try {
				var overflow = Object.keys(obj).length - 350;
				if(overflow > 0) {
					remove_properties(obj, overflow + 20);
				}
				GM_setValue('cache', JSON.stringify(obj));
			} catch(ex) { GM_log('Error while saving cache: ' + ex); }
		}
		obj = null;
		dirty = false;
	}

	this.load = function() {
		try { obj = JSON.parse(GM_getValue('cache')); } catch(ex) { }
		if(obj == null || typeof(obj) != 'object') obj = {};
	}

	function remove_properties(o, num) {
		var i = 0, f = Object.prototype.hasOwnProperty;
		for(var p in o) {
			if(f.call(o, p)) {
				delete o[p];
				if(++i == num) return;
			}
		}
	}

	var obj = null;
	var dirty  = false;

}

var previews = GM_getValue('previews', true);
var embed_mode = GM_getValue('embed_mode', 'player');
var cache = new Cache();
delay(onLoad, 200);