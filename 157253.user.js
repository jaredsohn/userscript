// ==UserScript==
// @name        Facebook Zoom Plus!
// @description Muestra las imagenes en tamaño real, al pasar el mouse sobre ellas y utiliza siempre el protocolo de seguridad https mientras naveguemos en Facebook.
// @icon        http://juampimix.zzl.org/Imagenes/FacebookZoomPlusIcon.png
// @namespace   Juampi_Mix
// @url         http://userscripts.org/users/JuampiMix
// @include     http*://*.facebook.com/*
// @version     1.00
// @require     http://userscripts.org/scripts/source/60663.user.js
// @history     1.00 Inicio del codigo.

// ==/UserScript==

function $(q, root, single) {
    if (root && typeof root == 'string') { root = $(root, null, true); }
    root = root || document;
    if (q[0]=='#') { return root.getElementById(q.substr(1)); }
    else if (q[0]=='/' || (q[0]=='.' && q[1]=='/')) {
        if (single) { return document.evaluate(q, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }
        return document.evaluate(q, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }
    else if (q[0]=='.') { return root.getElementsByClassName(q.substr(1)); }
    return root.getElementsByTagName(q);
}

function fnEnableFacebookHttps() {
    var url = window.location.href;
    if(url.indexOf("http://www.facebook.com")==0 ||
        url.indexOf("http://apps.facebook.com")==0) {
        window.location.replace(location.href.replace(url.substring(0,7), "https://"));
    }
}

function fnEnableHttpsLinks() {
    var url = window.location.href;
    if(url.indexOf("https://")==0) {
        for(var i=0,link; (link=document.links[i]); i++) {
            if(link.href.indexOf("http://")==0)
            link.href = link.href.replace(link.href.substring(0,7), "https://");
        }
    }
}

function fnEnableHttpsFacebookLinks(){
    var links = $("//a[contains(@href,'facebook.com')]");
    for (var i=0; i<links.snapshotLength; i++) {
        links.snapshotItem(i).href = links.snapshotItem(i).href.replace(/^http:\/\/([^\.]*\.)?facebook\.com\/l\.php\?u\=http\%([^\.]*\.)/,'https://$1facebook.com/l.php?u=https%$2');
        links.snapshotItem(i).href = links.snapshotItem(i).href.replace(/^http:\/\/([^\.]*\.)?facebook\.com\//,'https://$1facebook.com/');
    }
}


document.addEventListener(
  'load',
  function() {
    fnEnableFacebookHttps(),
    fnEnableHttpsFacebookLinks(),
    setTimeout(function() { fnEnableHttpsFacebookLinks() }, 1000);
  },
  true
);




var JuampiMix_d = document, JuampiMix_cur = {}, JuampiMix_hosts;

var cfg = {
	delay: GM_getValue('delay', 400),
	thumbsonly: GM_getValue('thumbsonly', true),
	context: GM_getValue('context', true),
	greedy: GM_getValue('greedy', false),
	img: GM_getValue('img', true),
	css: GM_getValue('css', ''),
	JuampiMix_hosts: GM_getValue('JuampiMix_hosts', '')
};

function JuampiMix_url_param(url,param){return unescape(JuampiMix_match(url,new RegExp(param+'=([^&]+)','i'))); }
function JuampiMix_match(str,regex,func){if(typeof str!="string"){return null;}var m=str.match(regex);if(m&&m.length){if(typeof func=="function"){for (var i=regex.global?0:1;i<m.length;i++){func(m[i]);}return m;}else{return m.length>1?m[regex.global?0:1]:null;}}return null;}


function loadHosts() {
	JuampiMix_hosts = [
		{r:/500px\.com\/photo\//, q:'#mainphoto'},
		{r:/abload\.de\/image/, q:'#image'},
		{r:/depic\.me\//, q:'#pic'},
		{r:/deviantart\.com\/art\//, q:['#gmi-ResViewSizer_img', 'img.smshadow']},
		{r:/fastpic\.ru\/view\//, q:'#image'},
		{r:/fbcdn\.net\/(safe_image|www\/app_full_proxy)/, html:true, 
			s:function(m, node) 
			{ 
				
				if(node.innerHTML.indexOf("safe_image.php")!=-1)
				{
					 
					var matches = node.innerHTML.match(/safe_image.php([^"'].*?)["']/ig); 				
					if(!matches || matches.length < 1)
						return '';
					var first_match = matches[0].replace(/".*/ig,"");
					var url = JuampiMix_url_param(first_match,"url");
					
					return url;
				}
				else if (node.innerHTML.indexOf("app_full_proxy.php")!=-1)
				{
					var matches = node.innerHTML.match(/app_full_proxy.php([^"'].*?)["']/ig);
					if(!matches || matches.length < 1)
						return '';
					var first_match = matches[0].replace(/".*/ig,"");
					var src = JuampiMix_url_param(first_match,"src");
					
					return src;
				}
			}  
		},
		{r:/fbcdn\.net\/.+\.jpg($|\?)/, xhr:true},
		
		{r:/(\/\/(fbcdn-[\w\.-]+akamaihd|[\w\.\-]+?fbcdn)\.net\/[\w\/\.\-]+?)_[a-z]\.jpg/, html:true, 
		s:function(m, node) 
			{ 
 
				return 'http:' + m[1].replace(/\/[spc][\d\.x]+/g, '') + '_n.jpg'; }
			},
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
		{r:/(http:\/\/[a-z]+\.media-imdb\.com\/images\/.+?\.jpg)/, html:true, s:function(m, node) { return m[1].replace(/V1\.?_.+?\./g, cfg.greedy?'':'V1._SY700_SX0_.'); }},
		{r:/imgbox\.com\/([a-z0-9]+)$/i, q:'#img', xhr:true},
		{r:/(imgchili|hoooster)\.com\/show/, q:'#show_image', xhr:true},
		{r:/imgdepot\.org\/show\/(.+\.jpg)/, s:'http://imgdepot.org/images/$1', xhr:true},
		{r:/imgtheif\.com\/image\//, q:'a > img[src*="/pictures/"]'},
		{r:/imgur\.com\/(gallery\/|r\/[a-z]+\/|[a-z0-9]+#)?([a-z0-9]{5,}[^\.]*$)/i, s:'http://i.imgur.com/$2.jpg'},
		{r:/instagr\.am\/p\/([a-z0-9_-]+)/i, s:'http://instagr.am/p/$1/media/?size=l'},
		{r:/itmages\.ru\/image\/view\//, q:'#image'},
		{r:/galleryhosted\.com\/[0-9A-Z]+\/(.+)/, s:'http://www.galleryhosted.com/media/images/original/$1'},
		{r:/(\/\/[a-z0-9]+\.googleusercontent\.com\/.+?)["'\)]/i, html:true, s:function(m, node) { if(node.outerHTML.match(/favicons\?|\b(Ol Rf Ep|Ol Zb ag|Zb HPb|Zb Gtb|Rf Pg)\b/)) return ''; return 'https:' + m[1].replace(/\/(s\d{2,}[ck-]*?|w\d+-h\d+(-p)?)\//g, cfg.greedy?'/s0/':'/s1000/'); }},
		{r:/googleusercontent\.com\/gadgets\/proxy.+?(http.+?)&/, html:true, s:function(m, node) { return decodeURIComponent(m[1]); }},
		{r:/hostingkartinok\.com\/show-image\.php.*/, q:'.image img'},
		{r:/kinopoisk\.ru\/picture\/.*/, q:'#image'},
		{r:/lazygirls\.info\/.+_.+?\/.+?(\?id=\d+)?$/, q:'img.photo'},
		{r:/ld-host\.de\/show/, q:'#image'},
		{r:/listal\.com\/(view)?image\/([0-9]+)/, s:'http://www.listal.com/image/$2/0full.jpg', html:true},
		{r:/lostpic\.net\/\?photo/, q:'.casem img'},
		{r:/memegenerator\.net\/instance\/([0-9]+)/, s:'http://images.memegenerator.net/instances/500x/$1.jpg'},
		{r:/palmebi\.com\/(img|image)\/.+?(v|file)=(.+?\.jpg)/, s:'http://palmebi.com/$1/images/$3'},
		{r:/(photos\.modelmayhem\.com\/photos\/[0-9a-z\/]+)_m\.jpg/, html:true, s:'http://$1.jpg'},
		{r:/(photos\.modelmayhem\.com\/avatars\/[0-9a-z\/]+)_t\.jpg/, html:true, s:'http://$1_m.jpg'},
		{r:/(min\.us|minus\.com)\/l([a-z0-9]+)$/i, s:'http://i.min.us/i$2.jpg'},
		{r:/mlnus\.com\/.+(gif|jpg|png)$/, q:'img'},
		{r:/myphoto\.to\/view\/(.+)/, s:'http://img.myphoto.to/$1'},
		{r:/(panoramio\.com\/.*?photo(\/|_id=)|google\.com\/mw-panoramio\/photos\/[a-z]+\/)(\d+)/, html:true, s:'http://static.panoramio.com/photos/original/$3.jpg'},
		{r:/(\d+\.photobucket\.com\/.+\/)(\?[a-z=&]+=)?(.+\.(jpe?g|png|gif))/, s:'http://i$1$3', xhr:window.location.hostname.indexOf('photobucket.com') == -1},
		{r:/(photosex\.biz|posteram\.ru)\/.+?id=/i, q:'img[src*="/pic_b/"]', xhr:true},
		{r:/(pic4all\.eu|piggy-farm\.com)\/(images\/|view\.php\?filename=)(.+)/, s:'http://$1/images/$3'},
		{r:/piccy\.info\/view3\/(.*)\//, s:'http://piccy.info/view3/$1/orig/', q:'#mainim'},
		{r:/(badimg\.com|fotoshare\.org|image\.imagepremium\.com|myadultimage\.com|picszone\.net|r70\.info|rupix\.org)\/viewer\.php\?file=(.+)/, s:'http://$1/images/$2', xhr:true},
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
		{r:/(upload\.wikimedia\.org\/wikipedia\/[a-z]+\/)thumb(\/[a-z0-9]+\/[a-z0-9]+\/.+?\.(jpe?g|gif|png|svg))/i, html:true, s:'http://$1$2'},
		{r:/winimg\.com\/view/, q:'#image_container img'},
		{r:/yfrog\.com\/(z\/)?[a-z0-9]+$/i, q:'#main_image, #the-image img'},
		{r:/\/\/[^\?:]+\.(jpe?g|gif|png|svg)($|\?)/i}
	];
	if(cfg.JuampiMix_hosts) {
		cfg.JuampiMix_hosts.split(/,?[\r\n\t]+/).forEach(function(s) {
			if(!s) return;
			try {
				var h = JSON.parse(s);
				if(!h || !h.r) throw 'property r missing';
				h.r = new RegExp(h.r, 'i');
				if(h.s && h.s.indexOf('return ') > -1) h.s = new Function('m', 'node', h.q);
				if(h.q && h.q.indexOf('return ') > -1) h.q = new Function('text', h.q);
				JuampiMix_hosts.splice(0, 0, h);
			} catch(ex) {
				GM_log('Invalid host: ' + s + '\nReason: ' + ex);
			}
		});
	}
}

function onMouseOver(e) 
{	
	var JuampiMix_ScriptEnable = GM_getValue("JuampiMix_ScriptEnable",true);
	if(!JuampiMix_ScriptEnable)
		return;

	if ( location.href.indexOf("facebook.com/photo.php") != -1 ) 
		return;
		
	if(typeof e == 'object') 
	{

		if( !e.shiftKey && 
			!JuampiMix_cur.zoom && 
			!(window.getSelection(0).toString() && typeof JuampiMix_d.activeElement.selectionStart == 'undefined') && 
			activate(e.target)) 
		{
			JuampiMix_cur.cx = e.clientX;
			JuampiMix_cur.cy = e.clientY;
			JuampiMix_cur.timeout = window.setTimeout(onMouseOver, cfg.delay);
		}
		return;
	}
	setStatus(JuampiMix_cur.xhr ? 'xhr' : 'loading');
	placeStatus();
	if(JuampiMix_cur.q) {
		downloadPage(rel2abs(JuampiMix_cur.url, window.location.href), JuampiMix_cur.q, JuampiMix_cur.xhr);
	} else {
		if(JuampiMix_cur.xhr) {
			downloadImage(JuampiMix_cur.url, JuampiMix_cur.url);
		} else {
			setPreview(JuampiMix_cur.url);
			checkProgress(true);
		}
	}
	JuampiMix_addFooterBanner();
}

function onMouseMove(e) {
	if(e.shiftKey) return;
	JuampiMix_cur.cx = e.clientX;
	JuampiMix_cur.cy = e.clientY;
	var r = JuampiMix_cur.rect;
	if(r)
	{
		if(!JuampiMix_cur.zoom && (JuampiMix_cur.cx > r.right + 1 || JuampiMix_cur.cx < r.left - 1 || JuampiMix_cur.cy > r.bottom + 1 || JuampiMix_cur.cy < r.top - 1)) 
			return deactivate();
	}
	placeStatus();
	if(JuampiMix_cur.zoom) 
		placePreview();
}

function onMouseDown(e) {
	if(e.which != 3 && !e.shiftKey) deactivate(true);
}

function onMouseOut(e) {
	if(!e.relatedTarget) deactivate();
}

function onMouseScroll(e) {
	if(JuampiMix_cur.zoom) {
		e.preventDefault();
		JuampiMix_cur.scale = JuampiMix_cur.scale * ((e.detail || -e.wheelDelta) > 0 ? 0.5 : 2);
		if(JuampiMix_cur.scale < JuampiMix_cur.minScale) return deactivate(true);
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
				JuampiMix_d.body.removeEventListener('mouseover', onMouseOver, false);
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
	var info = parseLink(node) || parseImage(node);

	if(!info.url || info.url == JuampiMix_cur.url || hasAcceptableSize(node, info.url)) 
		return false;
	deactivate();
	JuampiMix_cur = info;
	var largest = node, nodes = node.querySelectorAll('*');
	for(var i = nodes.length, n; i-- && (n = nodes[i]);) {
		if(!largest || n.clientHeight > largest.clientHeight)
			largest = n;
	}
	var quirks = JuampiMix_d.compatMode == 'BackCompat';
	JuampiMix_cur.node = node;
	JuampiMix_cur.rect = largest.getBoundingClientRect();
	JuampiMix_cur.cw = quirks ? JuampiMix_d.body.clientWidth  : JuampiMix_d.documentElement.clientWidth;
	JuampiMix_cur.ch = quirks ? JuampiMix_d.body.clientHeight : JuampiMix_d.documentElement.clientHeight;
	JuampiMix_d.addEventListener('mousemove', onMouseMove, false);
	JuampiMix_d.addEventListener('mousedown', onMouseDown, false);
	JuampiMix_d.addEventListener('contextmenu', onContext, false);
	JuampiMix_d.addEventListener('keyup', onKeyUp, false);
	JuampiMix_d.addEventListener('DOMMouseScroll', onMouseScroll, false);
	JuampiMix_d.addEventListener('mousewheel', onMouseScroll, false);
	JuampiMix_d.addEventListener('mouseout', onMouseOut, false);
	return true;
}

function deactivate(wait) {
	window.clearTimeout(JuampiMix_cur.timeout);
	if(JuampiMix_cur.req && typeof JuampiMix_cur.req.abort == 'function') JuampiMix_cur.req.abort();
	if(JuampiMix_cur.node) JuampiMix_cur.node.style.cursor = '';
	JuampiMix_cur = {};
	JuampiMix_d.removeEventListener('mousemove', onMouseMove, false);
	JuampiMix_d.removeEventListener('mousedown', onMouseDown, false);
	JuampiMix_d.removeEventListener('contextmenu', onContext, false);
	JuampiMix_d.removeEventListener('keyup', onKeyUp, false);
	JuampiMix_d.removeEventListener('DOMMouseScroll', onMouseScroll, false);
	JuampiMix_d.removeEventListener('mousewheel', onMouseScroll, false);
	JuampiMix_d.removeEventListener('mouseout', onMouseOut, false);
	setStatus(false);
	setPreview(false);
	if(wait) {
		JuampiMix_d.body.removeEventListener('mouseover', onMouseOver, false);
		window.setTimeout(function() { JuampiMix_d.body.addEventListener('mouseover', onMouseOver, false); }, 200);
	}
}

function parseLink(node) {
	if(node.parentNode.tagName == 'A') node = node.parentNode; else if(node.parentNode.parentNode.tagName == 'A') node = node.parentNode.parentNode;
	if(!(node.tagName == 'IMG' || node.tagName == 'A' && (!cfg.thumbsonly || node.querySelector('img, i') || hasBg(node) || hasBg(node.parentNode) || hasBg(node.firstElementChild)))) return false;
	var urls = parseUrls(decodeURIComponent(node.href));
	var html = node.outerHTML;
	if(!JuampiMix_hosts) loadHosts();
	for(var i = 0, len = JuampiMix_hosts.length, h, m; i < len && (h = JuampiMix_hosts[i]); i++) {
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
	JuampiMix_cur.req = GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		ignoreCache: true,
		onload: function(req) {
			try {
				delete JuampiMix_cur.req;
				var iurl = parseHtml(req.responseText, q, url);
				if(!iurl) throw 'Image URL not found in node: ' + q;
				if(hasAcceptableSize(JuampiMix_cur.node, iurl)) {
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
	JuampiMix_cur.req = GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		overrideMimeType:'text/plain; charset=x-user-defined',
		headers: {'Accept':'image/png,image/*;q=0.8,*/*;q=0.5','Referer':referer},
		onload: function(req) {
			try {
				delete JuampiMix_cur.req;
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
	if(typeof q == 'function') return q(html);
	var doc, node, path;
	html = html.replace(/\s+href\s*=\s*/g, ' data-href=');
	try {
		doc = GM_safeHTMLParser(html);
	} catch(ex) {
		doc = JuampiMix_d.implementation.createHTMLDocument('MPIV');
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
			JuampiMix_cur.node.style.cursor = 'all-scroll';
		}
	}
}

function placePreview() 
{
	var img = getPreview();
	if(!img) 
		return;
		
	if(typeof JuampiMix_cur.pw == 'undefined') {
		var s = window.getComputedStyle(img);
		JuampiMix_cur.pw = parseInt(s.getPropertyValue('padding-right'), 10) + parseInt(s.getPropertyValue('padding-left'), 10);
		JuampiMix_cur.bw = parseInt(s.getPropertyValue('border-right-width'), 10) + parseInt(s.getPropertyValue('border-left-width'), 10);
		JuampiMix_cur.ph = parseInt(s.getPropertyValue('padding-top'), 10) + parseInt(s.getPropertyValue('padding-bottom'), 10);
		JuampiMix_cur.bh = parseInt(s.getPropertyValue('border-top-width'), 10) + parseInt(s.getPropertyValue('border-bottom-width'), 10);
		JuampiMix_cur.mh = parseInt(s.getPropertyValue('margin-top'), 10) + parseInt(s.getPropertyValue('margin-bottom'), 10);
		JuampiMix_cur.mw = parseInt(s.getPropertyValue('margin-right'), 10) + parseInt(s.getPropertyValue('margin-left'), 10);
	}
	var cw = JuampiMix_cur.cw, ch = JuampiMix_cur.ch;

	if(JuampiMix_cur.zoom) 
	{
		var cx = JuampiMix_cur.cx, cy = JuampiMix_cur.cy, w = JuampiMix_cur.scale*img.naturalWidth, h = JuampiMix_cur.scale*img.naturalHeight, nw = w + JuampiMix_cur.pw + JuampiMix_cur.bw, nh = h + JuampiMix_cur.ph + JuampiMix_cur.bh;
		img.style.maxWidth  = 'none';
		img.style.maxHeight = 'none';
		img.style.width  = w + 'px';
		img.style.height = h + 'px';
		img.style.left = (cw > nw ? cw/2 - nw/2 : -1 * Math.min(1, Math.max(0, 5/3*(cx/cw-0.2))) * (nw - cw)) - JuampiMix_cur.mw/2 + 'px';
		img.style.top  = (ch > nh ? ch/2 - nh/2 : -1 * Math.min(1, Math.max(0, 5/3*(cy/ch-0.2))) * (nh - ch)) - JuampiMix_cur.mw/2 + 'px';
	} 
	else 
	{
		var r = JuampiMix_cur.rect, rx = (r.left + r.right) / 2, ry = (r.top + r.bottom) / 2;
		img.style.maxWidth  = cw - JuampiMix_cur.pw - JuampiMix_cur.bw - JuampiMix_cur.mw + 'px';
		img.style.maxHeight = ch - JuampiMix_cur.ph - JuampiMix_cur.bh - JuampiMix_cur.mh + 'px';				
	
		var nnn = JuampiMix_cur.node.naturalHeight, ccc = JuampiMix_cur.node.clientHeight;
		if( JuampiMix_cur.url.indexOf("ytimg.com") != -1 ) 
		{
			JuampiMix_cur.scale = JuampiMix_cur.minScale = img.naturalWidth > img.clientWidth || img.naturalHeight > img.clientHeight ? 1 : 2;
			var ww = JuampiMix_cur.scale*img.naturalWidth, hh = JuampiMix_cur.scale*img.naturalHeight;
			img.style.width  = ww + 'px';
			img.style.height = hh + 'px';
		}

		else
		{
			img.style.width  = 'auto';
			img.style.height = 'auto';
		}
		var w = img.clientWidth, h = img.clientHeight;
		var x = Math.min(cw - w - JuampiMix_cur.bw - JuampiMix_cur.mw, Math.max(0, r.left + (w && rx > cw/2 ? -w -20 : r.width  + 20)));
		var y = Math.min(ch - h - JuampiMix_cur.bh - JuampiMix_cur.mh, Math.max(0, r.top  + (h && ry > ch/2 ? -h -20 : r.height + 20)));
		if(h < ch - 80 && (x > r.right || x + w < r.left)) {
			y = Math.min(Math.max(ry - h/2, 40), ch - h - 40);
		} else if(w < cw - 80 && (y > r.bottom || y + h < r.right)) {
			x = Math.min(Math.max(rx - w/2, 40), cw - w - 40);
		}
		img.style.right = '0px'; 
		img.style.top  = '0px';
	}
}

function placeStatus() {
	var img = getStatus();
	if(img) {
		img.style.left = JuampiMix_cur.cx + 30 + 'px';
		img.style.top  = JuampiMix_cur.cy + 30 + 'px';
	}
}

function toggleZoom() {
	var img = getPreview();
	if(!img || !img.naturalHeight) return;
	img.style.cursor = '';
	JuampiMix_cur.node.style.cursor = '';
	JuampiMix_cur.zoom = !JuampiMix_cur.zoom;
	JuampiMix_cur.scale = JuampiMix_cur.minScale = img.naturalWidth > img.clientWidth || img.naturalHeight > img.clientHeight ? 1 : 2;
	placePreview();
	return JuampiMix_cur.zoom;
}

function showError(o) {
	setStatus('error');
	if(!o.responseText && !o.target) GM_log(o);
}

function getStatus() 
{	
	return JuampiMix_d.getElementById('mpiv-status');
}

function setStatus(status) {
	var img = getStatus();
	if(!img && !status) return;
	if(!img) {
		img = JuampiMix_d.createElement('img');
		img.id = 'mpiv-status';
		img.style.cssText = 'display:none;border:1px solid black;background-color:white;position:fixed;z-index:300000;margin:0';
		JuampiMix_d.body.appendChild(img);
	}
	if(status) {
		var srcs = {
			loading:'http://juampimix.zzl.org/Imagenes/Cargando.gif',
			xhr:'http://juampimix.zzl.org/Imagenes/Cargando.gif',
			error:'http://juampimix.zzl.org/Imagenes/Error.png'
		};
		img.src = srcs[status];
		img.setAttribute('status', status);
		img.style.display = '';
	} else {
		img.parentNode.removeChild(img);
	}
}

function getPreview() 
{	
	return JuampiMix_d.getElementById('mpiv-preview');
}

function setPreview(src) {
	var img = getPreview();
	if(!img && !src) return;
	if(!img) {
		img = JuampiMix_d.createElement('img');
		img.id = 'mpiv-preview';
		img.style.cssText = 'display:none;border:1px solid #CCCCCC;background-color:white;position:fixed;z-index:300000;margin:0;cursor:default;' + cfg.css;
		img.addEventListener('error', showError, false);
		JuampiMix_d.body.appendChild(img);
	}
	if(src) {
		img.src = src;
		img.style.display = 'none';
	} else {
		JuampiMix_cur.zoom = false;
		img.removeEventListener('error', showError, false);
		img.parentNode.removeChild(img);
		if(JuampiMix_cur.node) JuampiMix_cur.node.style.cursor = '';
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

function hasAcceptableSize(node, url) 
{
	if(!(node.tagName == 'IMG' || (node = node.querySelector('img')))) return false;
	var n = node.naturalHeight, c = node.clientHeight;
	if(location.href.indexOf("facebook.com") != -1)
		return false;
	else
		return node.src == url && (c >= n || !cfg.img && n > c);	
}

function setup() {
	if( JuampiMix_d.getElementById('mpiv-setup') )
		return;
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
	var div = JuampiMix_d.createElement('div');
	div.id = 'mpiv-setup';
	JuampiMix_d.body.appendChild(div);
	div.innerHTML = '<div>Mouseover Popup Image Viewer</div><ul><li>Popup delay: <input id="mpiv-setup-delay" type="text"/> ms</li><li><input type="checkbox" id="mpiv-setup-thumbsonly"> Allow popup over text-only links (e.g. headlines)</li><li><input type="checkbox" id="mpiv-setup-img"> Allow popup over images that have been scaled down in HTML</li><li><input type="checkbox" id="mpiv-setup-greedy"> Prefer medium-sized images (IMDb, Google user content)</li><li><input type="checkbox" id="mpiv-setup-context"> Use right mouse button to activate zoom (in addition to shift)<p>To open context menu: Right-click before popup is shown or hold down shift while right-clicking.</p></li><li>Custom CSS for preview image (units in px):<textarea id="mpiv-setup-css" spellcheck="false"></textarea></li><li>Write own host rules using regular expressions and CSS selectors:<p>Format: {"r":"urlpattern", "s":"urlsubstitution", "q":"selector", "xhr":true, "html":true}<br>One rule per line. No trailing commas. Escape backslashes. Omit unneeded properties.</p><textarea id="mpiv-setup-hosts" spellcheck="false"></textarea></li></ul><div><button id="mpiv-setup-ok">Save settings</button><button id="mpiv-setup-cancel">Cancel</button></div>';
	div = null;
	var close = function() 
	{ 		
		var div = JuampiMix_d.getElementById('mpiv-setup');
		div.parentNode.removeChild(div); 
	};


	JuampiMix_d.getElementById('mpiv-setup-ok').addEventListener('click', function() {
		var delay = parseInt(JuampiMix_d.getElementById('mpiv-setup-delay').value, 10);		
		if(!isNaN(delay) && delay >= 0) GM_setValue('delay', cfg.delay = delay);
		GM_setValue('thumbsonly', cfg.thumbsonly = !JuampiMix_d.getElementById('mpiv-setup-thumbsonly').checked);
		GM_setValue('greedy', cfg.greedy = !JuampiMix_d.getElementById('mpiv-setup-greedy').checked);
		GM_setValue('img', cfg.img = !!JuampiMix_d.getElementById('mpiv-setup-img').checked);
		GM_setValue('context', cfg.context = !!JuampiMix_d.getElementById('mpiv-setup-context').checked);
		GM_setValue('css', cfg.css = JuampiMix_d.getElementById('mpiv-setup-css').value.trim());
		GM_setValue('JuampiMix_hosts', cfg.JuampiMix_hosts = JuampiMix_d.getElementById('mpiv-setup-hosts').value.trim());
		loadHosts();
		close();
	}, false);
	JuampiMix_d.getElementById('mpiv-setup-cancel').addEventListener('click', close, false);
	JuampiMix_d.getElementById('mpiv-setup-delay').value = cfg.delay;
	JuampiMix_d.getElementById('mpiv-setup-thumbsonly').checked = !cfg.thumbsonly;
	JuampiMix_d.getElementById('mpiv-setup-greedy').checked = !cfg.greedy;
	JuampiMix_d.getElementById('mpiv-setup-img').checked = cfg.img;
	JuampiMix_d.getElementById('mpiv-setup-context').checked = cfg.context;
	JuampiMix_d.getElementById('mpiv-setup-css').value = cfg.css;
	JuampiMix_d.getElementById('mpiv-setup-hosts').value = cfg.JuampiMix_hosts;
}
JuampiMix_d.body.addEventListener('mouseover', onMouseOver, false);

function JuampiMix_toggleScript()
{		
	var JuampiMix_ScriptEnable = GM_getValue("JuampiMix_ScriptEnable",true);
	JuampiMix_ScriptEnable = !JuampiMix_ScriptEnable;
	GM_setValue("JuampiMix_ScriptEnable",JuampiMix_ScriptEnable);
	window.location.reload();
}

ScriptUpdater.check(157253, '1.00');
;ScriptUpdater.forceNotice(157253, '1.00');
;ScriptUpdater.forceCheck(157253, '1.00');
;function handleReturnedVersion(v) {
}
;ScriptUpdater.check(157253, "1.00", handleReturnedVersion);