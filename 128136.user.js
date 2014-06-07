// ==UserScript==
// @id             org.userscripts.users.kuehlschrank.AlldebridDownloadHelper
// @name           Debrid Download Helper
// @version        2014.4.26
// @author         kuehlschrank
// @description    Downloads files, copies URLs and queues magnet links.
// @include        http*
// @updateURL      https://userscripts.org/scripts/source/128136.meta.js
// @downloadURL    https://userscripts.org/scripts/source/128136.user.js
// ==/UserScript==

'use strict';

var re = RegExp('\\b(' + [
	'1fichier\\.com/',
	'2shared\\.com\\/file',
	'asfile\\.com/file',
	'bayfiles\\.net/file',
	'bitshare\\.com/(file|\\?f)',
	'crocko\\.com/[a-z0-9]+',
	'depfile\\.com/[a-z0-9]+',
	'dizzcloud\\.com/dl',
	'extmatrix\\.com/files',
	'filecloud\\.io\\/',
	'filefactory\\.com/file',
	'fileparadox.\\in/[a-z0-9]+/',
	'filepost\\.com/file',
	'filerio\\.in/[a-z0-9]+',
	'filesmonster\\.(biz|com)/download',
	'firedrive\\.com/file',
	'fp\\.io/[a-z0-9]+',
	'freakshare\\.com/file',
	'gigapeta\\.com/dl/',
	'hipfile.com/.+/.+html',
	'hitfile.net/.+/.+html',
	'jumbofiles\\.com/[a-z0-9]+',
	'(keep2s(hare)?|k2s)\\.cc/file/',
	'letitbit\\.net/download',
	'linksafe\\.me/d',
	'mediafire\\.com/?',
	'mediafire\\.com/download',
	'megashares\\.com/\\??d',
	'netload\\.in/datei',
	'oboom\\.com/.+\\.',
	'(rapidgator\\.net|rg\\.to)/file',
	'sendspace\\.com/file',
	'share-online\\.biz/dl/',
	'shareflare.net/download/',
	'sockshare\\.com/file',
	'terafile.co/[^\\.]+(/|$)',
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
		document.body.querySelector('input[name="magnet"], input[name="url"]').value = decodeURIComponent(location.hash.substr(1));
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
		if(!re.test(a.href) || /\b(folder|ref)\b/.test(a.href)) continue;
		if(!insertIcon(a, onWebClick, 'Ctrl-click or middle-click: copy URL, Alt-click: switch service')) continue;
		var tc = a.textContent;
		if(tc && (a.href.indexOf(tc) > -1 || /^\s*download/i.test(tc) || re.test(tc))) {
			var p = (a.search.length > 1 ? a.search.substr(1) : a.pathname).replace(/(\.html|\/)$/, '');
			var h = a.hostname;
			var fp = p.substr(p.lastIndexOf('/') + 1);
			if(fp) {
				a.textContent = fp + ' @ ' + h.substr(0, h.lastIndexOf('.')).replace('www.', '');
				a.title = tc;
			}
		}
	}
	list = parent.tagName == 'A' && parent.href.indexOf('magnet:') === 0 ? [parent] : parent.querySelectorAll('a[href^="magnet:"]');
	for(var i = list.length, a; i-- && (a = list[i]);) {
		insertIcon(a, onMagnetClick, 'Alt-click: switch service');
	}
}

function insertIcon(a, f, title) {
	var ns = a.nextElementSibling;
	if(a.classList.contains('adh-link') || ns && ns.classList.contains('adh-link')) return;
	if(!insertIcon.styled) {
		updateStyle();
		insertIcon.styled = true;
		GM_registerMenuCommand('Switch debrid service', switchServ);
		GM_registerMenuCommand('Set custom torrent converter', setMagnet);
	}
	var icon = document.createElement('a');
	icon.className = 'adh-link adh-ready' + (f == onMagnetClick ? ' adh-magnet' : '');
	icon.title = title;
	icon.addEventListener('mousedown', f, false);
	icon.addEventListener('click', drop, false);
	a.parentNode.insertBefore(icon, a.nextSibling);
	return true;
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
		a.adh-magnet { ' + (s.magnet || GM_getValue('magnet') || !inserted ? '' : 'display:none!important;') + ' }\
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
		this.title = '';
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
	var urls = (GM_getValue('magnet') || serv().magnet || '').split('|'), param = encodeURIComponent(this.previousSibling.href);
	for(var i = urls.length, url; i-- && (url = urls[i].trim());) {
		GM_openInTab(url.indexOf('%s') > -1 ? url.replace('%s', param) : url + '#' + param);
	}
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
	if(typeof req.pending == 'undefined') req.pending = 0;
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
				icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAY1BMVEX5xDs3Kw0SDgQaFQYTDwQWEgUdFwb3wjr5wzoPDAMpHwlUQhMVEAX2wTrvvTiMbiHysSpaRhWxiyo9MA4yJwyUdCPquDiigCbDmS7mtTfjsjaidx0HBQLRpDK2jyuviilmUBie8orCAAAAb0lEQVQI1y3LVxIDIQwDUAOuLN6eXu9/ypjJ/umNJFBxFb1ixicAuIv4gswWWcFhxcKcO1zHLaeBWszU4ZLt9MUOkXPKaRyQOmCKAg7cdkz3f6M6WanbXrkF5loomxXGwMPasr4/iQJzJXrFNRnDD21hBL9x1rxrAAAAAElFTkSuQmCC',
				magnet:'http://www.alldebrid.com/torrent/',
				api:function(s) { return 'http://www.alldebrid.com/service.php?link=' + encodeURIComponent(s) + ' &nb=0&json=true&pw='; },
				ref:'http://www.alldebrid.com/service/',
				parse:function(text) { var o = JSON.parse(text); return {url:o.link,size:o.filesize,error:o.error}; }
			},
			{
				name:'RealDebrid',
				icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAABEVBMVEUlJSUiISIaGhonJycdHR0pKipCQUJDQ0MzMzIBAgE6OTkwMDFubWknKCgxNTEpLCwqKSZKSkoUExoLJBI/Pz+GhX49PTu8u65nZmJ2dXDv7dionopraV8nLzImKiscKB4fHyYgMSYgMC4mJzMlLTkKCgwTIxczOywPDyMQHSQgJjs8OURUVE90gnPe3th+fnYmJClZWVfd2sq7t6iBgHj69+POzsyGknx4eHDX1cyQj4bb2tHCvreBfYLf3dR3d4Dr6dnJx7j19OzHxLZeXlz6+fBud28fHw+enYWioJLVzrmclX6lopLW09C9taTn5t+LhnklJRW0s5rX1L9ARk6urY40JRvRy7xZRDS+sqM3NjUYasLVAAAAlklEQVQI1xXBBRaCQAAFwA+C7BK2knZ3d3d33/8iPmfg9vnswr8guEGgKDyReCcviQgsOuUqRLkhSwTabFofWdZZbakidMNFT+b+QNmaH9pyfvx+drcr3fYgT+zD98t80nXfD71ZoYP7xdh0SwSBAjz58WPVLqY5MEmO8WRyWa835QDDciwXiSdi0TBAbIBLUUJBJ+/4AVyyEd2aDSSWAAAAAElFTkSuQmCC',
				magnet:'http://www.real-debrid.com/torrents',
				api:function(s) { return 'https://www.real-debrid.com/ajax/unrestrict.php?link=' + encodeURIComponent(s) + '&password=&remote=0&time=' + Date.now(); },
				ref:'https://www.real-debrid.com/downloader',
				parse:function(text) { var o = JSON.parse(text); return {url:o.generated_links?o.generated_links[0][2]:null,size:o.file_size_bytes,error:o.message}; }
			},
			{
				name:'SimplyDebrid',
				icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAABC1BMVEUIZJQKZ5gAChIDKDoBIzYAJz8BFyEBDRQCHi0HWYQGUXcBQ2fI1dwJX4wFW4gALEQHRGSes70AAQrAzNMESWweR13T3eFDSk7E0dcABhjCx8olUmoAO14WZY8AR3LB2eUCFR4IVXwHY5MAX5AIU3oHUHcGTHAANFMDLEIPO1QVTWoAEBwAGSkbcZ0idJ4/XW4sNjuJprQVKDIfTmXw8vIxQkkhOkcZMj4WIScALENGcYgLOlJUd4jEy87I0tfJ0da4wMUhQFC3u77CztMsY4FGX21tf4hCiaykyNqAm6hzlqkjZYciV3N5nKxJgZ5SfJMAOGqdu8w4eJoYWHmKudFIjK6Wt8i0zNfu9fq8LLcgAAAAkUlEQVQI1yXHRRaCABQAwE+qgHSn3d3d3a33P4k8nd0AizzXJYgBABIG5+F5m2L8n9PHvdyckI+Nwv31vu5dikpSiRTY8nnHLGyapmUerCN/UHsSo1dzaehvGX1QVxVLELKQ4bocoYwIgpiXAccwDJ+OcdyQlhD0FVpD0VhN2hAhSTJfa5jmrIlC4KeiaR0R/QKsjRG4/u59hgAAAABJRU5ErkJggg==',
				api:function(s) { return 'http://simply-debrid.com/inc/name.php?i=' + encodeURIComponent(btoa(s.replace('//ul.to/', '//uploaded.net/file/').replace('//rg.to/', '//rapidgator.net/file/'))); },
				ref:'http://simply-debrid.com/generate',
				parse:function(text) { var m = /href="(.+?)"/.exec(text); var url = m ? m[1] : null; return {url:url,size:0,error:url?null:text}; }

			},
			{
				name:'Unrestrict.li',
				icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAA2FBMVEX////Fs7v39fWnj6jz8/KITInp5eT49vfw7+75+feIZoilRLSvUbz48fi0UcPu4PCvSr/e3N1+SX3Ox8yAL4jJvMRyKXaTSZm+oLisjK++sb2VaZSIXIv6+vqUZZnY1NegbaN8RXyic56IX4d3NHmLY4ft7OyTOZ+COYb+/v7j3d7HpsK2orijYKyaQKqfe6Hp6OiiaKm3obimcqrAgcPGoMKylrP49vC5l7iuT7vCtcKkaaqvmqqpR7jIwcmbZZ2igaeMOpaYgJbMtb/NycuBTX++pLGCNoidN7oCAAAAgklEQVQI1y3NRRICMQBE0U4mybgL7jC4uzvc/0ZQqXmr36uG1LdtFZnBynGstS5bTMaL0dxc/tdFqdbFDJh2Y5Av5zUw4qe9JkjyDlJAM7RGgE/yeoQAjE67hWcUs9MWKPOoBHG/UvismFPyFLidj4dwYxbkq77be541rACS6rpUxg9qFwtCkU0n0wAAAABJRU5ErkJggg==',
				api:function(s) { return 'http://unrestrict.li/unrestrict.php'; },
				post:'link=%s&domain=long',
				ref:'http://unrestrict.li/download',
				parse:function(text) { var o = JSON.parse(text), p; for(p in o) break; var error = o[p].invalid; if(error) return {error:error}; if(p.indexOf('://') < 0) { o = o[p]; for(p in o[p]) break; } return {url:p,size:o[p].size}; }

			},
			{
				name:'DebridItalia',
				icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAulBMVEUxNDstMDYqLTRLTVInKzMuMTcsLzQwMzkuMjgyNTxHSU2SkpNBREoyNjsdISgoKzBzdHUlKS/MzMuoqawaHiZ9fX9GR0o/QUY2Oj+2trecnqGYmJpQUlh0dXgjJizAwcGLjY/ExMQ7PkOAgYTT09RDRkzR0dGdnZy4uLmvra7p6ehwcHFvcHC6urtOT1Kjo6Py8vFWWV+trq9naGloaWlbXmHMzc54eXzJycjHx8eDhYnY2NhiZWiWlpYnta2nAAAAi0lEQVQI1wXBBQKCMAAF0C8MNlaU0o2A3a33P5fvQZq8GGzLoVQplN/x/fJs5jAGyLD9hcHN1XNtYNZPVbcUcd+UEdAIizzy6HJamzA+ky9H4Z7bBcMQBvcsuGpztXXxHOs69VRVpDsbCTd5ZzAd7z0ftk8IoUaSbY4coBbAiBT54gDqUAaHQllU/QHUAAuK7if0AwAAAABJRU5ErkJggg==',
				api:function(s) { return 'http://www.debriditalia.com/api.php?generate=&link=' + escape(s); },
				ref:'http://www.debriditalia.com/downloader.php',
				parse:function(text) { var m = /http[^"><]+/.exec(text); return {url:m ? m[0] : null,size:0,error: m ? null : text}; }
			},
			{
				name:'Rock3tvid',
				icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAjVBMVEX////idGv21NHjenLVOCz31tPXPjP//fz88fD99vbxu7fQIBP65OLYQjjaTUP//v/miYLur6r0ycX65uX98/P++PjgaWD53tznjYXdXVTcWU/LCADqmJPbUUfxvrrTKx/54d/NFQfzw8DNEALrop3ywb332NX++vr10M799PP439376+rqnJbTMSTYST7wvP4bAAAAd0lEQVQI1zXHVxKCMAAA0U0IKRCqSAexd+9/PJ1x2K99/DPRKFm/PFiDJHMGfAPME7bu8kJmUOoEJ46D8hVhHwswhRrxMlDxGWBz5RLofV5ht3ZhEVq3FlT6ujf1e+ojoE3DR5rM3RAAOP/ZSW5x4gCe4geik+MLytMG05p3l1cAAAAASUVORK5CYII=',
				api:function(s) { return 'http://api.rock3tvid.com/'; },
				post:'url=%s&format=mp4',
				ref:'http://www.rock3tvid.com/',
				parse:function(text) { var o = JSON.parse(text); return {url:'http://www.rock3tvid.com/download?id=' + o.file + '&service=' + o.format,size:0,error:null}; }
			},
			{
				name:'Debrid Turkey',
				icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAABF1BMVEX/9PEp0/oAyfy21+w3o+L59fIAsfEAcdT/+fIBgNo3kNr39/Oh4vNj2Pb48/G25vIAid96ze4Amug/1PhOmdtPvewCxfl0tuUuzvf+9/LC6fNrr+ICddXz9fMsmN///PSdzeoKwvYApOwAj+IIhdskhdcWgtgUkd6l3O9Kn98AYs5ipt9VquKq0etR2fgnwPNO0fZbzvJH2fho3PYAwfnj7fEayfgXufIjyvdl2/cd0PqC2PI7sOcAuPUMh9u65fELkt7c9fVeuukKx/nW7PE7xPJKwu8DjN1qquBxye2/2Ox5tOMAedfQ8vZywOld1faV2vHq8PFv3fdHs+gAufVx1vSXyelizvEwj9pzw+t0ze/r7/F5yOu5KPJdAAAAmklEQVQI1xXMRQKCABAAwAVEwEYapLG7u7u7/f871ONcBlbCbnk4ytfX03jDehMKu/eni2VTCiwojp7yiHn/aBFg51tyMkZFVccIYAdDqc+jjETeCPBQHa5eQ8zZ2XmA5x/4cl3LdjCIxhO028eIwRGFAeHS8XwBKZHVnvCDCsVGyw+qloSUywvtCloGKRODtIEHZH8zGMCzyhcGhRPpk09EFgAAAABJRU5ErkJggg==',
				api:function(s) { return 'http://www.debridturkey.com/getlink.php'; },
				post:'link=%s&pass=undefined',
				ref:'http://www.debridturkey.com/index.php',
				parse:function(text) { var m = /href=['"](http.+?)['"]/.exec(text); var url = m ? m[1] : null, error = null; if(!url) { var tmp = document.createElement('span'); tmp.innerHTML = text; error = tmp.textContent.replace(/\s{2,}|Sorun bildirin/gi, ' '); } return {url:url,size:0,error:error}; }

			},
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

function setMagnet() {
	var url = window.prompt('Enter URL which should handle magnet links, e.g. http://bytebx.com/add?url=%s.\nOmit %s to enable form autofill. Use | to separate multiple URLs. Leave blank to restore defaults.', GM_getValue('magnet', ''));
	if(typeof url == 'string') {
		GM_setValue('magnet', url.trim());
	}
}

window.setTimeout(main, 100);
