// ==UserScript==
// @id             org.userscripts.users.kuehlschrank.AlldebridDownloadHelper
// @name           Debrid Download Helper
// @version        2013.11.5
// @author         kuehlschrank
// @description    Downloads files, copies URLs and queues magnet links. Supported: AllDebrid, RealDebrid, SimplyDebrid, Unrestrict.li, DebridItalia
// @include        http*
// @updateURL      https://userscripts.org/scripts/source/128136.meta.js
// @downloadURL    https://userscripts.org/scripts/source/128136.user.js
// ==/UserScript==

'use strict';

var re = RegExp('\\b(' + [
	'2shared\\.com\\/file',
	'asfile\\.com/file',
	'bayfiles\\.com/file',
	'bitshare\\.com/(file|\\?f)',
	'cloudzer\\.net/file',
	'crocko\\.com/[a-z0-9]+',
	'extabit\\.com/file',
	'depfile\\.com/[a-z0-9]+',
	'dizzcloud\\.com/dl',
	'extmatrix\\.com/files',
	'filecloud\\.io\\/',
	'filefactory\\.com/file',
	'filepost\\.com/file',
	'filerio\\.in/[a-z0-9]+',
	'filesmonster\\.(biz|com)/download',
	'fp\\.io/[a-z0-9]+',
	'freakshare\\.com/file',
	'gigapeta\\.com/dl/',
	'hipfile.com/.+/.+html',
	'hitfile.net/.+/.+html',
	'hotfile\\.com/dl',
	'jumbofiles\\.com/[a-z0-9]+',
	'(keep2s(hare)?|k2s)\\.cc/file/',
	'letitbit\\.net/download',
	'linksafe\\.me/d',
	'luckyshare\\.net/[0-9]+',
	'lumfile\\.com/.+/',
	'mediafire\\.com/?',
	'mediafire\\.com/download',
	'megashares\\.com/\\??d',
	'netload\\.in/datei',
	'putlocker\\.com/file/',
	'rapidgator\\.net/file',
	'sendspace\\.com/file',
	'ryushare\\.com/.+/',
	'share-online\\.biz/dl/',
	'shareflare.net/download/',
	'sockshare\\.com/file',
	'turbobit\\.net/.+html',
	'ul\\.to/',
	'unibytes\\.com/[a-z0-9]+',
	'uploaded\\.(to|net)/file',
	'uploading\\.com/',
	'uptobox\\.com/[a-z0-9]+',
	'vip-file\\.com/download',
	'zippyshare\\.com/'
	].join('|') + ')', 'i');

function main() {
	if(re.test(location.href)) {
		window.setTimeout(insertBar, 1000);
	} else if(location.hash.indexOf('#magnet') == 0) {
		document.body.querySelector('input[name="magnet"]').value = decodeURIComponent(location.hash.substr(1));
		location.hash = '';
	} else {
		insertIcons(document.body);
		var M = window.MutationObserver || window.WebKitMutationObserver;
		new M(onMutations).observe(document.body, {childList:true, subtree:true, attributes:true, attributeFilter:['href']});
	}
}

function onMutations(muts) {
	for(var i = muts.length, mut; i-- && (mut = muts[i]);) {
		if(mut.type == 'attributes') {
			insertIcons(mut.target);
		} else {
			for(var j = mut.addedNodes.length, node; j-- && (node = mut.addedNodes[j]);) {
				if(node.nodeType == 1) insertIcons(node);
			}
		}
	}
}

function insertIcons(parent) {
	var list = parent.tagName == 'A' ? [parent] : parent.querySelectorAll(location.pathname.indexOf('/folder/') > -1 ? 'a[href]' : 'a[href^="http"]');
	for(var i = list.length, a; i-- && (a = list[i]);) {
		if(!re.test(a.href) || a.href.indexOf('folder') > -1) continue;
		var ns = a.nextElementSibling;
		if(ns && ns.classList.contains('adh-link')) continue;
		insertIcon(a, onWebClick, 'Ctrl-click or middle-click: copy URL, Alt-click: switch service');
		var tc = a.textContent;
		if(a.href.indexOf(tc) > -1 || /^\s*download/i.test(tc) || re.test(tc)) {
			var p = a.search.length > 1 ? a.search.substr(1) : a.pathname;
			var h = a.hostname;
			var fp = p.substr(p.lastIndexOf('/') + 1).replace('.html', '');
			if(fp) {
				a.textContent = fp + ' @ ' + h.substr(0, h.lastIndexOf('.')).replace('www.', '');
				a.title = tc;
			}
		}
	}
	list = parent.querySelectorAll('a[href^="magnet:"]');
	for(var i = list.length, a; i-- && (a = list[i]);) {
		insertIcon(a, onMagnetClick, 'Alt-click: switch service');
	}
}

function insertIcon(a, f, title) {
	if(!insertIcon.styled) {
		updateStyle();
		insertIcon.styled = true;
		GM_registerMenuCommand('Switch debrid service', switchServ);
	}
	var icon = document.createElement('a');
	icon.className = 'adh-link adh-ready' + (f == onMagnetClick ? ' adh-magnet' : '');
	icon.title = title;
	icon.addEventListener('mousedown', f, false);
	icon.addEventListener('click', drop, false);
	a.parentNode.insertBefore(icon, a.nextSibling);
}

function updateStyle() {
	var style = document.getElementById('adh-style'), inserted;
	if(!style) {
		style = document.createElement('style');
		style.id = 'adh-style';
		style.type = 'text/css';
		document.head.appendChild(style);
		inserted = true;
	}
	var s = serv();
	style.textContent = '\
		#adh-bar { position:fixed;z-index:2147483647;top:-1px;left:350px;right:350px;padding:0;height:20px;border-radius:0 0 5px 5px;background-color:white;border:1px solid gray;margin:0;text-align:center;font-weight:bold;font-family:sans-serif;color:black;font-size:14px;line-height:18px;text-shadow:none; }\
		#adh-bar > a:first-of-type { display:none; }\
		a.adh-link { display:inline-block!important; width:12px!important; height:12px!important; position:relative!important; bottom:-2px!important; margin:0 0 0 4px!important; border:1px solid gray!important; padding:0!important; box-shadow:none!important; border-radius:0!important; opacity:0.6; cursor:pointer; }\
		a.adh-link:hover { opacity:1; }\
		a.adh-ready { background: url(' + s.icon + ') no-repeat !important; }\
		a.adh-busy { background: url(data:image/gif;base64,R0lGODlhDAAMAKIGAIForORZKAgSEz9PUFDH4AOeyf///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJFAAGACwAAAAADAAMAAADK2g6rFbQseFgkU3ZCqfjhfc9XWYQaCqsQZuqrPsSq9AGmwLsoLMDPR1PkQAAIfkECRQABgAsAAAAAAwADAAAAyhoutX7qhX4JGsj68Cl3h32DVxAnEK6AOxJpMLaoqrCAq4F5c5+6o8EACH5BAkUAAYALAAAAAAMAAwAAAMqWGqsxcZB2VZ9kI0dOvjQNnTBB4Sc9wmsmDGs4L7xnBF4Thm5bvE9wi4BACH5BAkUAAYALAAAAAAMAAwAAAMrWGrc+qU5GKV5Io8NesvCNnTAp3EeIzZB26xMG7wb61pErj+Nvi8MX+6RAAAh+QQJFAAGACwAAAAADAAMAAADKlhqrMXGQdlWfZCNHTr40DZ0wQeEnPcJrJgxrOC+8ZwReE4ZuW7xPcIuAQAh+QQFFAAGACwAAAAADAAMAAADKGi61fuqFfgkayPrwKXeHfYNXECcQroA7EmkwtqiqsICrgXlzn7qjwQAOw==) no-repeat white !important; }\
		a.adh-download { background: url(data:image/gif;base64,R0lGODlhDAAMALMKAHi2EqnbOnqzKFmbHYS7J3CrJFmOGWafHZLELaLVL////wAAAAAAAAAAAAAAAAAAACH5BAEAAAoALAAAAAAMAAwAAAQ7UElDq7zKpJ0MlkMiAMnwKSFBlGe6mtIhH4mazDKXIIh+KIUdb5goXAqBYc+IQfKKJ4UgERBEJQIrJgIAOw==) no-repeat white !important; }\
		a.adh-magnet { ' + (s.magnet || !inserted ? '' : 'display:none!important;') + ' }\
		a.adh-error { background:url(data:image/gif;base64,R0lGODlhDAAMAIAAAP///8wzACH5BAAAAAAALAAAAAAMAAwAAAIRjI+pGwBsHGwPSlvnvIzrfxQAOw==) no-repeat !important; }';
}

function insertBar() {
	updateStyle();
	var bar = document.createElement('div');
	bar.id = 'adh-bar';
	bar.textContent = 'Download Helper: ';
	var a = document.createElement('a');
	a.href = location.href;
	bar.appendChild(a);
	document.body.appendChild(bar);
	insertIcons(a);
}

function drop(e) {
	e.stopPropagation();
	e.preventDefault();
}

function onWebClick(e) {
	if(e.which > 2) return;
	drop(e);
	var sel = window.getSelection();
	if(e.altKey) {
		switchServ();
		this.classList.remove('adh-error');
		this.classList.add('adh-ready');
		a.title = '';
	} else if(sel.rangeCount && sel.getRangeAt(0).toString()) {
		var list = document.body.querySelectorAll('a.adh-link:not(.adh-download)');
		for(var i = list.length, a; i-- && (a = list[i]);) {
			if(sel.containsNode(a.previousSibling, true)) unlock(a, false, true);
		}
	} else if(e.which == 2) {
		unlock(this, false, true);
	} else {
		unlock(this, !e.ctrlKey, e.ctrlKey);
	}
}

function onMagnetClick(e) {
	e.stopPropagation();
	if(e.which != 1) return;
	if(e.altKey) return switchServ();
	if(serv().magnet) GM_openInTab(serv().magnet + '#' + encodeURIComponent(this.previousSibling.href));
}

function unlock(a, start, copy) {
	a.className = 'adh-link adh-busy';
	if(copy && !req.pending) unlock.links = [];
	req(a.previousSibling.href, function(data) {
		if(data.error) {
			a.className = 'adh-link adh-error';
			a.title = data.error;
		} else {
			a.className = 'adh-link adh-download';
			a.href = data.url;
			a.removeEventListener('mousedown', onWebClick, false);
			a.removeEventListener('click', drop, false);
			a.title = data.size ? Math.round(parseInt(data.size)/1048576, 10) + ' MB' : '';
			a.rel = 'noreferrer';
			if(copy) unlock.links.push(data.url);
			if(start) location.href = data.url;
		}
		if(!req.pending && unlock.links && unlock.links.length) {
			var data = unlock.links.join('\n');
			if(typeof GM_setClipboard == 'function')
				GM_setClipboard(data);
			else
				window.alert(data);
		}
	});
}

function req(url, f) {
	var s = serv();
	if(!'pending' in req) req.pending = 0;
	req.pending++;
	GM_xmlhttpRequest({
		method: s.post ? 'POST' : 'GET',
		url: s.api(url),
		data: s.post ? s.post.replace('%s', encodeURIComponent(url)) : null,
		headers: {'Referer':s.ref,'Content-Type':s.post?'application/x-www-form-urlencoded; charset=UTF-8':''},
		onload:	 function(r) {
			req.pending--;
			try {
				f(s.parse(r.responseText));
			} catch(ex) {
				f({error:'Response: ' + r.responseText});
			}
		},
		onerror: function() {
			req.pending--;
			f({error:'HTTP error'});
		}
	});
}

function serv(change) {
	if(!serv.servs) {
		serv.servs = [
			{
				name:'AllDebrid',
				icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAxlBMVEX5xDsUDwUWEgX4wzv2wjr3wjoQDAQTDwQSDgQaFQYRDQT5wzocFgexiyo5LQ03Kw31wTo2Kg0dFwcVEAUVEQVXRBXDmS4fGQf2wTpAMw/vvDmigCZQPxNmUBiWdiT3wjvquDj3wzruvDhWRBSPcCKRcyJVQxTmtTcxJgwHBQLjsjbwvTlUQhT5wjmJbCAbFgYrIgo7Lg40KQwkHAnxsCopIAkeGAeidx0PDANdSRa2jyuviikYEwbysSssIQnRpDINCgMfFgMLOjofAAAAgElEQVR4XiXJUxIDQQAFwDfGGrFt28n9L5VJ5bOrwToxE16RaDIBwLkQvKD8VAJlBo6AmFKqXbCYVSs2qtMMAOOoadlsqNxBtNqRTro9Qn9A38oBhn+MxiqczuY/eIulXK03252fOewPhlopzVE5nM75JbjekjsBHk9KXwDC9wdfSksJ0hZ2CesAAAAASUVORK5CYII=',
				magnet:'http://www.alldebrid.com/torrent/',
				api:function(s) { return 'http://www.alldebrid.com/service.php?link=' + encodeURIComponent(s) + ' &nb=0&json=true&pw='; },
				ref:'http://www.alldebrid.com/service/',
				parse:function(text) { var o = JSON.parse(text); return {url:o.link,size:o.filesize,error:o.error}; }
			},
			{
				name:'RealDebrid',
				icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAcpJREFUeNoAvAFD/gFISEj39/cBAQEBAQECAgL///8BAQH///8BAQEBAQEAAAAICAgE6+vr8vLzAgICAAAAAgICCQkI//8A+Pn4AgECAAD/BQUFCgoKBAsLCisrKRoaFAYGBtvb4czNzxUTEj49OBISDuzs8cTFyPj5+gNJSEWSko0TEQoYFRFVVVXo6OIbGRV5enoHCQM6OkE+Oy/DxMoEDg4M+fjrYmFu1tjavLWkPDQq9vj1vryzW15uGBkZxcGxTExEAvHx8wwNGZyckNXT0AH9/7Onqzk5Ow8RCCUlFezr68XGyAoJCAIICAbx8Ol8e42rqrITGRnb4efU0NL6+vTe4OsbGws5Oj/29fgCCAgJDw4K4+Xmf4OB8fP7o6+k4ujuQUFKm5iFuLa9AwQHr7C0AwIBArm7wefo6QICBdHQ3O7x/7/I0tfd3AAIAsbPz4qLh+rp7wEiIiLo6OoUFBIFBAXy8fn6/AcRFxjw9+n7B/EAAPoI/wgdEhoBISEh+vr6AgIC/v/+AgACAgMJBwgN/wYG+wP1AAH4/Pf4CQAGATIyMvX19f///wAAAAQEAf7+Af8AAf8CAgEFBwD/+gH+/QsJCAIMADU2v2RKa0cuAAAAAElFTkSuQmCC',
				magnet:'http://www.real-debrid.com/torrents',
				api:function(s) { return 'https://www.real-debrid.com/ajax/unrestrict.php?link=' + encodeURIComponent(s) + '&password=&remote=0&time=' + Date.now(); },
				ref:'https://www.real-debrid.com/downloader',
				parse:function(text) { var o = JSON.parse(text); return {url:o.generated_links?o.generated_links[0][2]:null,size:o.file_size_bytes,error:o.message}; }
			},
			{
				name:'SimplyDebrid',
				icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAbxJREFUeNokUc9LVFEUPue+K29mdLQZM39AoCiWMgs34iiBUSKuoggLWrQIBRVc1GJELYRyoRgounDhvsZ/IAkKBUEI2ohNWCqljk40Mum8N9N7990f3lEOHM738XH4vnOQPJkqKQt11FcwIX+ns39O80IpQhCULkBCwbVoOOiP3Y+21V7VVPJfbmR5/Shj+YsoIIBShQ5IW2uCfbeawg/GIZuL3m4RVrbIzUtGsCACZRjg5gy7qrk8VDZ4r/1ue+Tj12+HyRRFiZyBx0AwFJ50tChU/2nzZ+7sjHts/HHXl8RO6teBUkIyh7uOFB7xHNpQWdrb0zkXX6kuv/K0u62m1JxfiBX7fYzzjcTu2/cf0icZmjo+MhVfmxvhnL9Ziv/Y26sMBXuGJgIBX+xZ73T/w+fTi2hE7gggcJEXGKutux6feRl9NKBTGYCr7xZezS5R1OYNihdxBfc0RD1yRxPiIAlSmkRR6dhgGEopLGzygP33mAO7CTADw2Mv8ra9tbVJwbG0CCRIfRmX2Zl05EbD+sZnSUjeskZfT6a2vyMGw4jk8gnaGUHSdLOx+loFFzyxvfN3fx9M37kAAwB+J9VeekM5fQAAAABJRU5ErkJggg==',
				api:function(s) { return 'http://simply-debrid.com/inc/name.php?i=' + encodeURIComponent(btoa(s.replace('//ul.to/', '//uploaded.net/file/'))); },
				ref:'http://simply-debrid.com/generate',
				parse:function(text) { var m = /href="(.+?)"/.exec(text); var url = m ? m[1] : null; return {url:url,size:0,error:url?null:text}; }

			},
			{
				name:'Unrestrict.li',
				icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAZRJREFUeNpi/P//PwMSAHJ/fvnJ+I+RgY2BnZMdIsiCrOLJvft3lzz9dP4fMxPzT6bvEj7sJpEmrGycjHCTXj17sjH6OKcCk4gjz39GhjfHPrLc5mXQ/xLU5gtSdPLQqQcXHry58oGHg8utwomZmVlMXByobUHNoi/7/lk0qjK7GtnsqT325eWnn59/uFY4KigrMjD8PbX7yF9mBn1H3UPLD/759ZOJien/h8/vfjB+/c7wRUxKDGgANw+/no3R6u41TMzMv3i+3bn6gOnHx+8MjAw+NT5SppL3b9yBuI+PX+jv/39zSmb8fv+XS5yTiU+Qj59d6OfXn5GF0Y+uPPz5/SNEHdM3lr9vGDl+8vFy8TK+evpoUegWfm326ImRnJyc9+/eExUXO73v1NUZd4RdeCWEhSzDbEC+W9y0gv2Y4G+lT3I+ErzCvI/PPfm04T+H21/vLA8OTg6gqSBFP3/+ODj/4NcdzIy/Wf4z/Gdi/S8ezmocYsHKygqxGhGYv75///LqJ+N/Rk4RVg4eLuSYAAgwAHoTrM3FQ0nAAAAAAElFTkSuQmCC',
				api:function(s) { return 'http://unrestrict.li/unrestrict.php'; },
				post:'link=%s&domain=long',
				ref:'http://unrestrict.li/download',
				parse:function(text) { var o = JSON.parse(text), p; for(p in o) break; var error = o[p].invalid; if(error) return {error:error}; if(p.indexOf('://') < 0) { o = o[p]; for(p in o[p]) break; } return {url:p,size:o[p].size}; }

			},
			{
				name:'DebridItalia',
				icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAa1JREFUeNoUUd9LFFEUvr/m7u60Kqy6q2yrIEq9iAvrkmK1Zm8hSI9CRWX1XwlBhKlFQm/1oIivahqtEkTCTqGyOtvO3NmZe+/c8XjOy+Gcw/ed7zv4wcNHtp1RWtoZ2/PF2dkpJtRiljEGoYRQkiDEJivlpZfPoigKgoAQvLb+6eu3Ta0xZSw22uiYQvB0tlS6ybm1/PZdLtdbuz/TbJ7//nPitv4LP5BKUUJoV09vvr9fyvD9ylr96NfjhXnP8xqNv1DMzd4bKhXDQBCATWfSYdi5YdsXzcswkpynU5xPTIy/fvXi7tQdzjmTkZRS9eW6O2FYLJYsywLUhvNvdX2jkM/vHxw0nFM2OFgYGx0ZHRmuViuztZqSnfrRcdCJfN/zfb/dbkcyYtVK+fatMbfVerP0XAjxYfXj7t4hYzTFU+BCghIGsbW98/3wByhQSgWBcN02NKWSrutejynUinlCNC9dShlKMMYGALTWAwOFp08W4Xbw9mf9mHGLW4TFiWGUIoxjHccm7s5mhfA/b3xxHAfU4XJlmhIaX9MbIMUIwxLBkEgrRQiDN1wJMACyCdUafbVdewAAAABJRU5ErkJggg==',
				api:function(s) { return 'http://www.debriditalia.com/api.php?generate=&link=' + escape(s); },
				ref:'http://www.debriditalia.com/downloader.php',
				parse:function(text) { var m = /http[^"><]+/.exec(text); return {url:m ? m[0] : null,size:0,error: m ? null : text}; }

			}
		];
		serv.idx = Math.min(parseInt(GM_getValue('service', 0), 10), serv.servs.length - 1);
	}
	if(change) {
		serv.idx = ++serv.idx >= serv.servs.length ? 0 : serv.idx;
		GM_setValue('service', serv.idx);
		updateStyle();
	}
	return serv.servs[serv.idx];
}

function switchServ() {
	serv(true);
}

window.setTimeout(main, 100);