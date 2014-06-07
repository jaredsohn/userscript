// ==UserScript==
// @name           Pupup Zoom Viewer by LonDo Stupid Defacer
// @description    Pupup Zoom Viewer
// @version	   Trial
// @copyright	   @2012 LonDo Stupid Defacer
// @author         LonDo Stupid Defacer
// @homepage       http://userscripts.org/scripts/show/139258
// @icon	   https://lh4.googleusercontent.com/-2A1Jpr4-1qM/TxPUbMq8IQI/AAAAAAAAAIU/_50N6LEgkxE/h120/FB.png
// @updateURL      https://userscripts.org/scripts/source/109262.meta.js
// @include        http*
// @exclude        http*depic.me/*
// @exclude        http*imagebam.com/image/*
// @exclude        http*imagevenue.com/*
// @exclude        http*sharenxs.com/*
// @exclude        http*upix.me/*
// @exclude        http*winimg.com/*
// ==/UserScript==

'use strict';

var d = document, $ = function(id) { return d.getElementById(id); }, cur = {}, hosts;

var cfg = {
	delay: GM_getValue('delay', 500),
	thumbsonly: GM_getValue('thumbsonly', true),
	context: GM_getValue('context', true),
	greedy: GM_getValue('greedy', false),
	css: GM_getValue('css', ''),
	hosts: GM_getValue('hosts', '')
};

function loadHosts() {
	hosts = [
		{r:/500px\.com\/photo\//, q:'#mainphoto'},
		{r:/abload\.de\/image/, q:'#image'},
		{r:/depic\.me\//, q:'#pic'},
		{r:/deviantart\.com\/art\//, q:['#gmi-ResViewSizer_img', 'img.smshadow']},
		{r:/fastpic\.ru\/view\//, q:'#image'},
		{r:/fbcdn\.net\/(safe_image|www\/app_full_proxy)/, html:true, s:function() { return false; } },
		{r:/fbcdn\.net\/.+\.jpg($|\?)/, xhr:true},
		{r:/(\/\/(fbcdn-[\w\.-]+akamaihd|[\w\.\-]+?fbcdn)\.net\/[\w\/\.\-]+?)_[a-z]\.jpg/, html:true, s:function(m, node) { if(node.outerHTML.indexOf('hovercard') > -1) return false; return 'http:' + m[1].replace(/\/[spc][\d\.x]+/g, '') + '_n.jpg'; }},
		{r:/facebook\.com\/photo/, q:'#fbPhotoImage'},
		{r:/firepic\.org\/\?v=/, q:'.view img[src*="firepic.org"]'},
		{r:/flickr\.com\/photos\/([0-9]+@N[0-9]+|[a-z0-9_\-]+)\/([0-9]+)/, s:'http://www.flickr.com/photos/$1/$2/sizes/l/', q:'#allsizes-photo > img'},
		{r:/hotimg\.com\/image\/([a-z0-9]+)/i, s:'http://www.hotimg.com/direct/$1'},
		{r:/imagearn\.com\/image/, q:'#img', xhr:true},
		{r:/imagefap\.com\/(image|photo)/, q:'#gallery + noscript'},
		{r:/imagebam\.com\/image\//, q:'img[id]'},
		{r:/(imageban\.(ru|net)|imagerise\.com|imgnova\.com|cweb-pix\.com|sluhost\.com(\/1)?)\/show/, q:'#img_obj', xhr:true},
		{r:/imagebunk\.com\/image/, q:'#img_obj', xhr:true},
		{r:/imagehaven\.net\/img\.php/, q:'#image'},
		{r:/imagehyper\.com\/img\.php/, q:'img[src*="imagehyper.com/img"]', xhr:true},
		{r:/(imagekitty\.com|xoze\.in|imgbuck\.com)\/.+\/.+\.html/, q:'img.pic'},
		{r:/imageshack\.us\/((i|f|photo)\/|my\.php)/, q:['div.codes > div + div', '#main_image, #fullimg']},
		{r:/imageshost\.ru\/photo\//i, q:'#bphoto'},
		{r:/image(team|nice)\.org\/img/, q:'img[alt="image"]'},
		{r:/imagetwist\.com\/[a-z0-9]+\/?(.+\.html)?/, q:'img.pic', xhr:true},
		{r:/imageupper\.com\/i\//, q:'#img', xhr:true},
		{r:/imagepix\.org\/image\/(.+)\.html$/, s:'http://imagepix.org/full/$1.jpg', xhr:true},
		{r:/imageporter\.com\/i\//, xhr:true},
		{r:/imagevenue\.com\/img\.php/, q:'#thepic'},
		{r:/imagewaste\.com\/pictures\/(.+)/, s:'http://www.imagewaste.com/pictures/big/$1', xhr:true},
		{r:/imagezilla\.net\/show\//, q:'#photo', xhr:true},
		{r:/(http:\/\/[a-z]+\.media-imdb\.com\/images\/.+?\.jpg)/, html:true, s:function(m) { return m[1].replace(/V1\.?_.+?\./g, cfg.greedy?'':'V1._SY700_SX0_.'); }},
		{r:/imgbox\.com\/([a-z0-9]+)$/i, q:'#img', xhr:true},
		{r:/(imgchili|hoooster)\.com\/show/, q:'#show_image', xhr:true},
		{r:/imgdepot\.org\/show\/(.+\.jpg)/, s:'http://imgdepot.org/images/$1', xhr:true},
		{r:/imgtheif\.com\/image\//, q:'a > img[src*="/pictures/"]'},
		{r:/imgur\.com\/(gallery\/|r\/[a-z]+\/|[a-z0-9]+#)?([a-z0-9]{5,}[^\.]*$)/i, s:'http://i.imgur.com/$2.jpg'},
		{r:/instagr\.am\/p\/([a-z0-9_-]+)/i, s:'http://instagr.am/p/$1/media/?size=l'},
		{r:/itmages\.ru\/image\/view\//, q:'#image'},
		{r:/galleryhosted\.com\/[0-9A-Z]+\/(.+)/, s:'http://www.galleryhosted.com/media/images/original/$1'},
		{r:/(\/\/[a-z0-9]+\.googleusercontent\.com\/.+?)["'\)]/i, html:true, s:function(m, node) { if(node.outerHTML.match(/favicons\?|\b(Ol Rf Ep|Ol Zb ag)\b/)) return false; return 'https:' + m[1].replace(/\/(s\d{2,}[ck-]*?|w\d+-h\d+(-p)?)\//g, cfg.greedy?'/s0/':'/s1000/'); }},
		{r:/googleusercontent\.com\/gadgets\/proxy.+?(http.+?)&/, html:true, s:function(m) { return decodeURIComponent(m[1]); }},
		{r:/hostingkartinok\.com\/show-image\.php.*/, q:'.image img'},
		{r:/kinopoisk\.ru\/picture\/.*/, q:'#image'},
		{r:/lazygirls\.info\/.+_[^\?]+(\?id=\d+)?$/, q:'img.photo'},
		{r:/ld-host\.de\/show/, q:'#image'},
		{r:/listal\.com\/viewimage\/([0-9]+)/, s:'http://www.listal.com/viewimage/$1h', q:'center img'},
		{r:/lostpic\.net\/\?photo/, q:'.casem img'},
		{r:/memegenerator\.net\/instance\/([0-9]+)/, s:'http://images.memegenerator.net/instances/500x/$1.jpg'},
		{r:/(photos\.modelmayhem\.com\/photos\/[0-9a-z\/]+)_m\.jpg/, html:true, s:'http://$1.jpg'},
		{r:/(photos\.modelmayhem\.com\/avatars\/[0-9a-z\/]+)_t\.jpg/, html:true, s:'http://$1_m.jpg'},
		{r:/(min\.us|minus\.com)\/l([a-z0-9]+)$/i, s:'http://i.min.us/i$2.jpg'},
		{r:/mlnus\.com\/.+(gif|jpg|png)$/, q:'img'},
		{r:/myphoto\.to\/view\/(.+)/, s:'http://img.myphoto.to/$1'},
		{r:/(panoramio\.com\/.*?photo(\/|_id=)|google\.com\/mw-panoramio\/photos\/[a-z]+\/)(\d+)/, html:true, s:'http://static.panoramio.com/photos/original/$3.jpg'},
		{r:/(photosex\.biz|posteram\.ru)\/.+?id=/i, q:'img[src*="/pic_b/"]', xhr:true},
		{r:/(pic4all\.eu|piggy-farm\.com)\/(images\/|view\.php\?filename=)(.+)/, s:'http://$1/images/$3'},
		{r:/piccy\.info\/view3\/(.*)\//, s:'http://piccy.info/view3/$1/orig/', q:'#mainim'},
		{r:/(badimg\.com|fotoshare\.org|image\.imagepremium\.com|myadultimage\.com|picszone\.net|r70\.info|rupix\.org)\/viewer\.php\?file=(.+)/, s:'http://$1/images/$2', xhr:true},
		{r:/picshd\.com\/([a-z0-9]+)$/i, s:'http://i.picshd.com/$1.jpg'},
		{r:/picsee\.net\/([\d\-]+)\/(.+?)\.html/,s:'http://picsee.net/upload/$1/$2'},
		{r:/picturescream\.com\/\?v=/, q:'#imagen img'},
		{r:/pimpandhost\.com\/(image|guest)\//, q:'#image'},
		{r:/pixhost\.org\/show\//, q:'#show_image', xhr:true},
		{r:/pixhub\.eu\/images/, q:'.image-show img', xhr:true},
		{r:/pixroute\.com\/.+\.html$/, q:'img[id]', xhr:true},
		{r:/postimage\.org\/image\//, q:'center img'},
		{r:/(qkme\.me|quickmeme\.com\/meme)\/([a-z0-9]+)/i, s:'http://i.qkme.me/$2.jpg'},
		{r:/radikal\.ru\/.+\.html$/, q:'div > div > img'},
		{r:/screenlist\.ru\/details/, q:'#picture'},
		{r:/sharenxs\.com\/view\//, q:'#img1', xhr:true},
		{r:/skrinshot\.ru\/view\.php\?img=(\d+)/, s:'http://skrinshot.ru/files/$1.jpg'},
		{r:/image\.skins\.be\/[0-9]+\//, q:'#wallpaper_image'},
		{r:/stooorage\.com\/show\//, q:'#page_body div div img', xhr:true},
		{r:/swagirl\.com\/host\/view/, q:'img.img_full_screen'},
		{r:/turboimagehost\.com\/p\//, q:'#imageid', xhr:true},
		{r:/twitpic\.com(\/show\/[a-z]+)?\/([a-z0-9]+)($|#)/i, s:'http://twitpic.com/show/large/$2'},
		{r:/twitter\.com\/.+\/status\/.+\/photo\//, q:'img.large'},
		{r:/(upix\.me\/files\/.+\/)#(.+)/, s:'http://$1$2'},
		{r:/uppix\.net\/([0-9a-z\/]+)\.html$/i, s:'http://uppix.net/$1.jpg'},
		{r:/(upload\.wikimedia\.org\/wikipedia\/[a-z]+\/)thumb(\/[a-z0-9]+\/[a-z0-9]+\/.+?\.(jpe?g|gif|png|svg))/i, html:true, s:'http://$1$2'},
		{r:/winimg\.com\/view/, q:'#image_container img'},
		{r:/yfrog\.com\/(z\/)?[a-z0-9]+$/i, q:'#main_image, #the-image img'},
		{r:/\/\/[^\?:]+\.(jpe?g|gif|png|svg)($|\?)/i}
	];
	if(cfg.hosts) {
		cfg.hosts.split(/,?[\r\n\t]+/).forEach(function(s) {
			if(!s) return;
			try {
				var h = JSON.parse(s);
				if(!h || !h.r) throw 'property r missing';
				h.r = new RegExp(h.r, 'i');
				hosts.splice(0, 0, h);
			} catch(ex) {
				GM_log('Invalid host: ' + s + '\nReason: ' + ex);
			}
		});
	}
}

function onMouseOver(e) {
	if(typeof e == 'object') {
		if(!d.mozFullScreen && !d.webkitIsFullScreen && !e.shiftKey && !cur.zoom && !(window.getSelection(0).toString() && typeof d.activeElement.selectionStart == 'undefined') && activate(e.target)) {
			cur.timeout = window.setTimeout(onMouseOver, cfg.delay);
			cur.cx = e.clientX;
			cur.cy = e.clientY;
		}
		return;
	}
	setStatus(cur.xhr ? 'xhr' : 'loading');
	placeStatus();
	if(cur.q) {
		downloadPage(rel2abs(cur.url, window.location.href), cur.q, cur.xhr);
	} else {
		if(cur.xhr) {
			downloadImage(cur.url, cur.url);
		} else {
			setPreview(cur.url);
			checkProgress(true);
		}
	}
}

function onMouseMove(e) {
	if(e.shiftKey) return;
	cur.cx = e.clientX;
	cur.cy = e.clientY;
	var r = cur.rect;
	if(!cur.zoom && (cur.cx > r.right + 1 || cur.cx < r.left - 1 || cur.cy > r.bottom + 1 || cur.cy < r.top - 1)) return deactivate();
	placeStatus();
	placePreview();
}

function onMouseDown(e) {
	if(e.which != 3) setPreview(false);
}

function onMouseOut(e) {
	if(!e.relatedTarget) deactivate();
}

function onMouseScroll(e) {
	if(cur.zoom) {
		e.preventDefault();
		cur.scale = cur.scale * ((e.detail || -e.wheelDelta) > 0 ? 0.5 : 2);
		if(cur.scale < cur.minScale) return setPreview(false);
		placePreview();
	} else {
		deactivate();
	}
}

function onKeyUp(e) {
	switch(e.keyCode) {
		case 16:
			toggleZoom();
			break;
		case 27:
			document.body.removeEventListener('mouseover', onMouseOver, false);
			deactivate();
			break;
		case 84:
			GM_openInTab(getPreview().src);
			break;
		default:
			deactivate();
	}
}

function onContext(e) {
	if(cfg.context && !e.shiftKey && getPreview() && !getStatus() && toggleZoom()) {
		e.preventDefault();
	} else {
		deactivate();
	}
}

function activate(node) {
	if(node.id == 'mpiv-preview') return false;
	var info = parseLink(node) || parseImage(node);
	if(!info.url || info.url == cur.url || hasFullImage(node, info.url)) return false;
	deactivate();
	cur = info;
	var largest = node, nodes = node.querySelectorAll('*');
	for(var i = nodes.length, n; i-- && (n = nodes[i]);) {
		if(!largest || n.clientHeight > largest.clientHeight)
			largest = n;
	}
	var quirks = d.compatMode && d.compatMode == 'BackCompat';
	cur.node = node;
	cur.rect = largest.getBoundingClientRect();
	cur.cw = quirks ? d.body.clientWidth  : d.documentElement.clientWidth;
	cur.ch = quirks ? d.body.clientHeight : d.documentElement.clientHeight;
	d.addEventListener('mousemove', onMouseMove, false);
	d.addEventListener('mousedown', onMouseDown, false);
	d.addEventListener('contextmenu', onContext, false);
	d.addEventListener('keyup', onKeyUp, false);
	d.addEventListener('DOMMouseScroll', onMouseScroll, false);
	d.addEventListener('mousewheel', onMouseScroll, false);
	d.addEventListener('mouseout', onMouseOut, false);
	return true;
}

function deactivate() {
	window.clearTimeout(cur.timeout);
	if(cur.req && typeof cur.req.abort == 'function') cur.req.abort();
	if(cur.node) cur.node.style.cursor = '';
	cur = {};
	d.removeEventListener('mousemove', onMouseMove, false);
	d.removeEventListener('mousedown', onMouseDown, false);
	d.removeEventListener('contextmenu', onContext, false);
	d.removeEventListener('keyup', onKeyUp, false);
	d.removeEventListener('DOMMouseScroll', onMouseScroll, false);
	d.removeEventListener('mousewheel', onMouseScroll, false);
	d.removeEventListener('mouseout', onMouseOut, false);
	setStatus(false);
	setPreview(false);
}

function parseLink(node) {
	if(node.parentNode.tagName == 'A') node = node.parentNode; else if(node.parentNode.parentNode.tagName == 'A') node = node.parentNode.parentNode;
	if(!(node.tagName == 'IMG' || node.tagName == 'A' && (!cfg.thumbsonly || node.querySelector('img, i') || hasBg(node) || hasBg(node.parentNode) || hasBg(node.firstElementChild)))) return false;
	var urls = parseUrls(decodeURIComponent(node.href));
	var html = node.outerHTML;
	if(!hosts) loadHosts();
	for(var i = 0, len = hosts.length, h, m; i < len && (h = hosts[i]); i++) {
		if(!(m = h.html ? h.r.exec(html) : arrayMatch(urls, h.r))) continue;
		return {
			url: h.s ? (typeof h.s == 'function' ? h.s(m, node) : replace(h.s, m)) : m.input,
			q: h.q,
			xhr: h.xhr
		};
	}
	return false;
}

function parseImage(node) {
	if((node.tagName == 'IMG' || node.tagName == 'A' && (node = node.querySelector('img')))) {
		return {
			url: node.src
		};
	}
	return false;
}

function downloadPage(url, q, xhr) {
	cur.req = GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		ignoreCache: true,
		onload: function(req) {
			try {
				delete cur.req;
				var iurl = parseHtml(req.responseText, q, url);
				if(!iurl) throw 'Image URL not found in node: ' + q;
				if(xhr) {
					downloadImage(iurl, url);
				} else {
					setPreview(iurl);
					checkProgress(true);
				}
			} catch(ex) {
				showError(ex);
			}
		},
		onerror:showError
	});
}

function downloadImage(url, referer) {
	cur.req = GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		overrideMimeType:'text/plain; charset=x-user-defined',
		headers: {'Accept':'image/png,image/*;q=0.8,*/*;q=0.5','Referer':referer},
		onload: function(req) {
			try {
				delete cur.req;
				var txt = req.responseText;
				var ui8 = new Uint8Array(txt.length);
				for(var i = txt.length; i--;) {
					ui8[i] = txt.charCodeAt(i);
				}
				var b = new (window.MozBlobBuilder || window.WebKitBlobBuilder)();
				b.append(ui8.buffer);
                setPreview((window.URL || window.webkitURL).createObjectURL(b.getBlob()));
				checkProgress(true);
			} catch(ex) {
				showError(ex);
			}
		},
		onerror:showError
	});
}

function parseHtml(html, q, url) {
	var doc, node, path;
	html = html.replace(/\s+href\s*=\s*/g, ' data-href=');
	try {
		doc = GM_safeHTMLParser(html);
	} catch(ex) {
		doc = d.implementation.createHTMLDocument('MPIV');
		doc.documentElement.innerHTML = html;
	}
	if(typeof q == 'string') {
		node = doc.querySelector(q);
	} else {
		for(var i = 0, len = q.length; i < len; i++) {
			if(node = doc.querySelector(q[i])) break;
		}
	}
	if(!node) throw 'Node not found: ' + q;
	switch(node.tagName.toUpperCase()) {
		case 'IMG':
			path = node.getAttribute('src').trim();
			break;
		case 'A':
			path = node.getAttribute('data-href').trim();
			break;
		default:
			path = node.outerHTML.match(/https?:\/\/[.\/a-z0-9_+%-]+\.(jpe?g|gif|png|svg)/i)[0];
	}
	return rel2abs(path, html.match(/<base[^>]+href=["']([^>]+)["']/i) ? RegExp.$1 : url);
}

function checkProgress(start) {
	if(start === true) {
		window.clearInterval(checkProgress.interval);
		checkProgress.interval = window.setInterval(checkProgress, 150);
		return;
	}
	var img = getPreview();
	if(!img) return window.clearInterval(checkProgress.interval);
	if(img.naturalHeight) {
		setStatus(false);
		window.clearInterval(checkProgress.interval);
		img.style.display = '';
		placePreview();
		if(img.naturalWidth > img.clientWidth || img.naturalHeight > img.clientHeight) {
			img.style.cursor = 'all-scroll';
			cur.node.style.cursor = 'all-scroll';
		}
	}
}

function placePreview() {
	var img = getPreview();
	if(!img) return;
	if(typeof cur.pw == 'undefined') {
		var s = window.getComputedStyle(img);
		cur.pw = parseInt(s.getPropertyValue('padding-right'), 10) + parseInt(s.getPropertyValue('padding-left'), 10);
		cur.bw = parseInt(s.getPropertyValue('border-right-width'), 10) + parseInt(s.getPropertyValue('border-left-width'), 10);
		cur.ph = parseInt(s.getPropertyValue('padding-top'), 10) + parseInt(s.getPropertyValue('padding-bottom'), 10);
		cur.bh = parseInt(s.getPropertyValue('border-top-width'), 10) + parseInt(s.getPropertyValue('border-bottom-width'), 10);
		cur.mh = parseInt(s.getPropertyValue('margin-top'), 10) + parseInt(s.getPropertyValue('margin-bottom'), 10);
		cur.mw = parseInt(s.getPropertyValue('margin-right'), 10) + parseInt(s.getPropertyValue('margin-left'), 10);
	}
	var cx = cur.cx, cy = cur.cy;
	var cw = cur.cw, ch = cur.ch;
	var w, h;
	if(cur.zoom) {
		img.style.maxWidth = 'none';
		img.style.maxHeight = 'none';
		w = cur.scale*img.naturalWidth
		h = cur.scale*img.naturalHeight;
		img.style.width = w + 'px';
		img.style.height = h + 'px';
		var nw = w + cur.pw + cur.bw;
		var nh = h + cur.ph + cur.bh;
		img.style.left = (cw > nw ? cw/2 - nw/2 : -1 * Math.min(1, Math.max(0, 5/3*(cx/cw-0.2))) * (nw - cw)) - cur.mw/2 + 'px';
		img.style.top  = (ch > nh ? ch/2 - nh/2 : -1 * Math.min(1, Math.max(0, 5/3*(cy/ch-0.2))) * (nh - ch)) - cur.mw/2 + 'px';
	} else {
		img.style.maxWidth  = cw - cur.pw - cur.bw - cur.mw + 'px';
		img.style.maxHeight = ch - cur.ph - cur.bh - cur.mh + 'px';
		img.style.width = 'auto';
		img.style.height = 'auto';
		w = img.clientWidth;
		h = img.clientHeight;
		img.style.left = Math.min(cw - w - cur.bw - cur.mw, Math.max(0, cx + (w && cx > cw/2 ? -w -30 : 30))) + 'px';
		img.style.top  = Math.min(ch - h - cur.bh - cur.mh, Math.max(0, cy + (h && cy > ch/2 ? -h -30 : 30))) + 'px';
	}
}

function placeStatus() {
	var img = getStatus();
	if(img) {
		img.style.left = cur.cx + 30 + 'px';
		img.style.top  = cur.cy + 30 + 'px';
	}
}

function toggleZoom() {
	var img = getPreview();
	if(!img || !img.naturalHeight) return;
	img.style.cursor = '';
	if(cur.node) cur.node.style.cursor = '';
	cur.zoom = !cur.zoom;
	cur.scale = cur.minScale = img.naturalWidth > img.clientWidth || img.naturalHeight > img.clientHeight ? 1 : 2;
	placePreview();
	return cur.zoom;
}

function showError(o) {
	setStatus('error');
	if(!o.responseText && !o.target) GM_log(o);
}

function getStatus() {
	return $('mpiv-status');
}

function setStatus(status) {
	var img = getStatus();
	if(!img && !status) return;
	if(!img) {
		img = d.createElement('img');
		img.id = 'mpiv-status';
		img.style.cssText = 'display:none;border:1px solid black;background-color:white;position:fixed;z-index:10000;margin:0';
		d.body.appendChild(img);
	}
	if(status) {
		var srcs = {
			loading:'data:image/gif;base64,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',
			xhr:'data:image/gif;base64,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',
			error:'data:image/gif;base64,R0lGODlhKAAoAOYAANssLOyZmZkDA/oBAbUBAeVqavO2ttgZGffX1/xra+kAAMwzM7apqcYZGdZqavWiov3//+d5efh7e7sjI/hdXfrq6twBAdtAQPf+/qmmpsGcnMSzs65VVeywsOxTU/WLi3onJ9BdXYQtLfWUlHk0NOBGRuY6OpyWlssBAeuMjMC7u++lpe5KSuJbW/H29vTLy/TExOZNTdjLy8EAAOQrK/Cqqr65uc0PD6oTE6grK+xCQuSEhLIZGd08PKAVFbMREZIoKOMzM6KTk8whIfrDw4Q1NW41NawBAX1hYaQNDe3y8rSWlsm0tPf5+cUrK/r8/P719Y1oaJk5Oa1/f99LS+ozM94ICMCZmfn8/NQ1Nfv///JOTs0uLrF8fLwWFq0fH/75+ZV9fek9PeqHh6lhYbOamtE6OqEbG7ANDevv74h0dNk2NtQAANa7u8MhIaEAAPf//62CgrCFhc2vr81UVOhiYt5TU+7BwcIJCc0ICMtISItcXO83N8e/v+OgoP///yH5BAAAAAAALAAAAAAoACgAAAf/gH+Cg4SFhoeIiYqLjItKLo2GaZCRWAxRUX2RgnBXHBxzjVgnIHl4IgyRGF0/fDQ/V4sQJyJWAwp5qIxwrGIlHjqwEIhNJyQWAwYrVjeow4hYXTxVay8rOsFXz4TFJLYjgikWzQzbhBhTPEFcd2BgAVsswoQQDCDII00ICFA740DlCq3CQWNIByj7KoygsOVHG0JpkOQZMKLCCxgwXlSIwOYGQEJw0gFw46cCxowIRiSowgHLICVR8AyQgMCATZsIHKA4AHAYljhfAHgJUPOmgTsfEtAg43KQCiMTE9ypsYJqDSIOZvBkoEVO0B87iKyoWrVDBApicMgo9CQD1AF1/zoEmDvXQAgCB6TsyTEETQQDdOeuKEDBBA4m5gRBcDvRQ4AUYyKneECHwJAvQ5I4eBBZcoo6WwxvSEyI8YAYKSKoVv1BT5LMIT6sVr3DTmgfG2RlIJFHwYUIBYIHl2BGAB0JwoXrYWECd6PFJG4oWFOghXXrdezUuX7dzIUgziNBv2EBgB0q6NF7SE8lRowFPcCP3iQogwjyQ0r02M+/v5M18tE3SD1FNIBCA0EAoOCCCrrBRRY5MCFgIWoAcQBeB2So4QEN8KBDElNMOIgWQliIwgwEpHjEimj8wAMPXPTwhQakMfJEiQdYMAOKR7whwI9J4MDDBBNkkRaN9GEhhP8IOZ7I4xs+ChDkkBM4cYEOaCApihAgWKEAG04S0GOUUxLphBMlYKmlIk+Q4qUFYO4oJpQ+llnlAmYAk2WNg7TZ5QAWwBlmj17QgIYAQpqJ5wUesLAnIn7aokCgcaL4xg1D+ADAD0lQ6cSiJVDgqAZaGFLMnwpMKuiOR2AqRRg5CIWDot6VEEMCo5ZKiD3I3KJqnARgKoIKWpRxRhBuDPlprTF4kMAWaDw0SEQT+frriVYMIYINihkbhBN3MusBBRLw0dJLSMhkLaUoZFsEtwMu4cM6E4DaLLlLPTGgDUaomyqlVrhRhAqGaLHEGSZk4YS4CaS1FiFtGXGDr4Fa0cBbu4gY7IMYPSxwga0JiFajWxNPqkADJBCcCARL4OCLGaE2l1siJA8wgBcpM2JwEjqM25yEi+zmBQ85N7JzFTScATQjfagRxsORaMEEGWRA3YgL+k7YRBMidp1IIAA7'
		};
		img.src = srcs[status];
		img.setAttribute('status', status);
		img.style.display = '';
	} else {
		img.parentNode.removeChild(img);
	}
}

function getPreview() {
	return $('mpiv-preview');
}

function setPreview(src) {
	var img = getPreview();
	if(!img && !src) return;
	if(!img) {
		img = d.createElement('img');
		img.id = 'mpiv-preview';
		img.style.cssText = 'display:none;border:1px solid black;background-color:white;position:fixed;z-index:10000;margin:0;cursor:default;' + cfg.css;
		img.addEventListener('error', showError, false);
		d.body.appendChild(img);
	}
	if(src) {
		img.src = src;
		img.style.display = 'none';
	} else {
		cur.zoom = false;
		img.removeEventListener('error', showError, false);
		img.parentNode.removeChild(img);
		if(cur.node) cur.node.style.cursor = '';
	}
}

function parseUrls(url) {
	var end  = url.length - 1;
	var urls = [];
	if(url.charAt(end) == '#') return urls;
	while(true) {
		var pos = url.lastIndexOf('http', end);
		if(pos == 0 && urls.length == 0) {
			urls.push(url);
			break;
		}
		if(pos == -1) break;
		if(/https?:\/\/[^&]+/.exec(url.substring(pos, end + 1))) {
			urls.push(RegExp.lastMatch);
		}
		if(pos == 0) break;
		end = pos - 1;
	}
	return urls;
}

function arrayMatch(a, re) {
	for(var i = a.length; i--;) {
		var m = re.exec(a[i]);
		if(m) return m;
	}
	return false;
}

function rel2abs(rel, abs) {
	if(rel.indexOf('//') == 0) rel = 'http:' + rel;
	var re = /^([a-z]+:)?\/\//;
	if(re.test(rel))  return rel;
	if(!re.exec(abs)) return false;
	if(rel[0] == '/') return abs.substr(0, abs.indexOf('/', RegExp.lastMatch.length)) + rel;
	return abs.substr(0, abs.lastIndexOf('/')) + '/' + rel;
}

function replace(s, m) {
	for(var i = m.length; i--;) {
		s = s.replace('$'+i, m[i]);
	}
	return s;
}

function hasBg(node) {
	if(!node) return false;
	return window.getComputedStyle(node).getPropertyValue('background-image') != 'none';
}

function hasFullImage(node, url) {
	if(!(node.tagName == 'IMG' || (node = node.querySelector('img')))) return false;
	return node.src == url && node.clientHeight >= node.naturalHeight;
}

function setup() {
	if($('mpiv-setup')) return;
	GM_addStyle('\
		#mpiv-setup { position:fixed;z-index:10001;top:40px;right:40px;padding:20px 30px;background:white;width:550px;border:1px solid black; }\
		#mpiv-setup * { color:black;text-align:left;line-height:normal;font-size:12px;font-family:sans-serif; }\
		#mpiv-setup a { color:black;text-decoration:underline; }\
		#mpiv-setup div { text-align:center;font-weight:bold;font-size:14px; }\
		#mpiv-setup ul { margin:15px 0 15px 0;padding:0;list-style:none;background:white;border:0; }\
		#mpiv-setup input { border:1px solid gray;padding:1px;position:relative;bottom:-2px; }\
		#mpiv-setup-context:not(:checked) + p { display:none; }\
		#mpiv-setup input[type=text] { width:50px; }\
		#mpiv-setup li { margin:0;padding:6px 0;vertical-align:middle;background:white;border:0 }\
		#mpiv-setup p { background:white;color:gray;padding:2px 0; margin:0; }\
		#mpiv-setup textarea { height:100px;width:100%;font-size:11px;font-family:monospace;border:1px solid gray;padding:1px; }\
		#mpiv-setup #mpiv-setup-css { height:30px; }\
		#mpiv-setup button { width:150px;margin:0 10px;text-align:center; }\
	');
	var div = d.createElement('div');
	div.id = 'mpiv-setup';
	d.body.appendChild(div);
	div.innerHTML = '<div>Mouseover Popup Image Viewer</div><ul><li>Popup delay: <input id="mpiv-setup-delay" type="text"/> ms</li><li><input type="checkbox" id="mpiv-setup-thumbsonly"> Allow popup over text-only links (e.g. headlines)</li><li><input type="checkbox" id="mpiv-setup-greedy"> Prefer medium-sized images (IMDb, Google user content)</li><li><input type="checkbox" id="mpiv-setup-context"> Use right mouse button to activate zoom (in addition to shift)<p>To open context menu: Right-click before popup is shown or hold down shift while right-clicking.</p></li><li>Custom CSS for preview image (units in px):<textarea id="mpiv-setup-css" spellcheck="false"></textarea></li><li>Write own host rules using regular expressions and CSS selectors:<p>Format: {"r":"urlpattern", "s":"urlsubstitution", "q":"selector", "xhr":true, "html":true}<br>One rule per line. No trailing commas. Escape backslashes. Omit unneeded properties.</p><textarea id="mpiv-setup-hosts" spellcheck="false"></textarea></li></ul><div><button id="mpiv-setup-ok">Save settings</button><button id="mpiv-setup-cancel">Cancel</button></div>';
	div = null;
	var close = function() { var div = $('mpiv-setup'); div.parentNode.removeChild(div); };
	$('mpiv-setup-ok').addEventListener('click', function() {
		var delay = parseInt($('mpiv-setup-delay').value, 10);
		if(!isNaN(delay) && delay >= 0) GM_setValue('delay', cfg.delay = delay);
		GM_setValue('thumbsonly', cfg.thumbsonly = !$('mpiv-setup-thumbsonly').checked);
		GM_setValue('greedy', cfg.greedy = !$('mpiv-setup-greedy').checked);
		GM_setValue('context', cfg.context = !!$('mpiv-setup-context').checked);
		GM_setValue('css', cfg.css = $('mpiv-setup-css').value.trim());
		GM_setValue('hosts', cfg.hosts = $('mpiv-setup-hosts').value.trim());
		loadHosts();
		close();
	}, false);
	$('mpiv-setup-cancel').addEventListener('click', close, false);
	$('mpiv-setup-delay').value = cfg.delay;
	$('mpiv-setup-thumbsonly').checked = !cfg.thumbsonly;
	$('mpiv-setup-greedy').checked = !cfg.greedy;
	$('mpiv-setup-context').checked = cfg.context;
	$('mpiv-setup-css').value = cfg.css;
	$('mpiv-setup-hosts').value = cfg.hosts;
}

document.body.addEventListener('mouseover', onMouseOver, false);
GM_registerMenuCommand('Set up Mouseover Popup Image Viewer', setup);