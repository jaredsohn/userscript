// ==UserScript==
// @id             org.userscripts.users.kuehlschrank.MouseoverPopupImageViewer
// @name           38chan Image Hovering Previewer
// @description    Adds floating full-size previews to thumbnails.
// @author         kuehlschrank
// @include        http://*.38chan.net/*
// ==/UserScript==

var hosts = [
	{r:/500px\.com\/photo\//, q:'#mainphoto'},
	{r:/depic\.me\//, q:'#pic'},
	{r:/deviantart\.com\/art\//, q:'#gmi-ResViewSizer_img'},
	{r:/fastpic\.ru\/view\//, q:'#image'},
	{r:/fbcdn\.net\/.+\.jpg($|\?)/, xhr:true},
	{r:/flickr\.com\/photos\/([0-9]+@N[0-9]+|[a-z0-9-_]+)\/([0-9]+)/, s:'http://www.flickr.com/photos/$1/$2/sizes/l/', q:'#allsizes-photo > img'},
	{r:/hotimg\.com\/image\/([a-z0-9]+)/i, s:'http://www.hotimg.com/direct/$1'},
	{r:/imagearn\.com\/image/, q:'#img', xhr:true},
	{r:/imagefap\.com\/(image|photo)/, q:'#gallery + noscript'},
	{r:/imagebam\.com\/image\//, q:'img[id]', xhr:true},
	{r:/imagehaven\.net\/img\.php/, q:'#image'},
	{r:/imagehyper\.com\/img\.php/, q:'img[src*="imagehyper.com/img"]', xhr:true},
	{r:/imagerise\.com\/show/, q:'#img_obj', xhr:true},
	{r:/imageshack\.us\/(i|photo)\//, q:'#main_image'},
	{r:/imageshost\.ru\/photo\//i, q:'#bphoto'},
	{r:/imagetwist\.com\/[a-z0-9]+\/?(.+\.html)?/, q:'img.pic', xhr:true},
	{r:/imageupper\.com\/i\//, q:'#img', xhr:true},
	{r:/imagepix\.org\/image\/(.+)\.html$/, s:'http://imagepix.org/full/$1.jpg', xhr:true},
	{r:/imageporter\.com\/i\//, xhr:true},
	{r:/imagevenue\.com\/img\.php/, q:'#thepic'},
	{r:/imagewaste\.com\/pictures\/(.+)/, s:'http://www.imagewaste.com/pictures/big/$1', xhr:true},
	{r:/imagezilla\.net\/show\/(.+\.jpg)$/, s:'http://imagezilla.net/images/$1', xhr:true},
	{r:/imgchili\.com\/show\//, q:'#show_image', xhr:true},
	{r:/imgdepot\.org\/show\/(.+\.jpg)/, s:'http://imgdepot.org/images/$1', xhr:true},
	{r:/imgtheif\.com\/image\//, q:'a > img[src*="/pictures/"]'},
	{r:/imgur\.com\/(gallery\/|[a-z0-9]+#)?([a-z0-9]{5,}[^\.]*$)/i, s:'http://i.imgur.com/$2.jpg'},
	{r:/listal\.com\/viewimage\/([0-9]+)/, s:'http://www.listal.com/viewimage/$1h', q:'center img'},
	{r:/memegenerator\.net\/instance\/([0-9]+)/, s:'http://images.memegenerator.net/instances/500x/$1.jpg'},
	{r:/(min\.us|minus\.com)\/l([a-z0-9]+)$/i, s:'http://i.min.us/i$2.jpg'},
	{r:/myphoto\.to\/view\/(.+)/, s:'http://img.myphoto.to/$1'},
	{r:/photosex\.biz\/.+?id=([a-z0-9]+)/i, s:'http://img.photosex.biz/pic_b/$1.jpg', xhr:true},
	{r:/(pic4all\.eu\/|^)(images\/|view\.php\?filename=)(.+)/, s:'http://www.pic4all.eu/images/$3'},
	{r:/(picszone\.net|myadultimage\.com)\/viewer\.php\?file=(.+)/, s:'http://$1/images/$2', xhr:true},
	{r:/picturescream\.com\/\?v=/, q:'#imagen img'},
	{r:/pimpandhost\.com\/(image|guest)\//, q:'#image'},
	{r:/pixhost\.org\/show\//, q:'#show_image', xhr:true},
	{r:/pixroute\.com\/.+\.html$/, q:'img[id]', xhr:true},
	{r:/postimage\.org\/image\//, q:'center  img'},
	{r:/(qkme\.me|quickmeme\.com\/meme)\/([a-z0-9]+)/i, s:'http://i.qkme.me/$2.jpg'},
	{r:/radikal\.ru\/.+\.html$/, q:'div > div > img'},
	{r:/r70\.info\/viewer\.php\?file=(.+)/, s:'http://r70.info/images/$1'},
	{r:/sharenxs\.com\/view\//, q:'#img1'},
	{r:/image\.skins\.be\/[0-9]+\//, q:'#wallpaper_image'},
	{r:/stooorage\.com\/show\//, q:'#page_body img', xhr:true},
	{r:/turboimagehost\.com\/p\//, q:'#imageid', xhr:true},
	{r:/twitpic\.com\/[a-z0-9]+$/i, q:'#photo-display', xhr:true},
	{r:/uppix\.net\/([0-9a-z\/]+)\.html$/i, s:'http://uppix.net/$1.jpg'},
	{r:/wikipedia\.org\/(wiki\/.+:|w\/.+title=).+\.(jpe?g|gif|png|svg)/i, q:'#file img'},
	{r:/yfrog\.com\/(z\/)?[a-z0-9]+$/i, q:'#main_image, #the-image img'},
	{r:/^[^\?]+\.(jpe?g|gif|png)($|\?)/i}
];

function prepareLinks(parent) {
	var list = document.evaluate('.//a[img or */img]', parent, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = list.snapshotLength; i--;) {
		prepareLink(list.snapshotItem(i));
	}
}

function prepareLink(a) {
	a.addEventListener('mouseover', onMouseOver, false);
}

function activateLink(a) {
	return hosts.some(function(host) {
		deactivateLink();
		var m = host.r.exec(a.href);
		if(!m || host.r.test(window.location.href)) return false;
		var url = host.hasOwnProperty('s') ? replace(host.s, m) : a.href;
		var pos = url.lastIndexOf('http:');
		cur = {
			link: a,
			url: pos > 0 ? url.substr(pos) : url,
			q: host.q,
			xhr: host.xhr,
			rect: a.querySelector('img').getBoundingClientRect(),
			cw: Math.min(window.innerWidth,  document.documentElement.clientWidth)  - 2,
			ch: Math.min(window.innerHeight, document.documentElement.clientHeight) - 2,
			t: Date.now()
		}
		document.addEventListener('mousemove', onMouseMove, false);
		document.addEventListener('mousedown', onMouseDown, false);
		document.addEventListener('contextmenu', onContext, false);
		document.addEventListener('keyup', onKeyUp, false);
		document.addEventListener('DOMMouseScroll', deactivateLink, false);
		document.addEventListener('mousewheel', deactivateLink, false);
		document.addEventListener('mouseout', onMouseOut, false);
		return true;
	});
}

function deactivateLink(e) {
	window.clearTimeout(cur.timeout);
	if(cur.req && typeof cur.req.stop == 'function') cur.req.stop();
	cur = {};
	document.removeEventListener('mousemove', onMouseMove, false);
	document.removeEventListener('mousedown', onMouseDown, false);
	document.removeEventListener('contextmenu', onContext, false);
	document.removeEventListener('keyup', onKeyUp, false);
	document.removeEventListener('DOMMouseScroll', deactivateLink, false);
	document.removeEventListener('mousewheel', deactivateLink, false);
	document.removeEventListener('mouseout', onMouseOut, false);
	setStatus(false);
	setPreview(false);
}

function onMouseOver(e) {
	if(e !== false) {
		if(!e.shiftKey && this != cur.link && !cur.full && activateLink(this)) {
			cur.timeout = window.setTimeout(onMouseOver, 350, false);
			cur.cx = e.clientX;
			cur.cy = e.clientY;
		}
		return;
	}
	setStatus(cur.xhr ? 'xhr' : 'loading');
	placeStatus();
	if(cur.q) {
		downloadPage(rel2abs(cur.url, window.location.href), cur.q, cur.xhr, cur.t);
	} else {
		if(cur.xhr) {
			downloadImage(cur.url, cur.url, cur.t);
		} else {
			setPreview(cur.url);
			checkProgress(true);
		}
	}
}

function onMouseMove(e) {
	var r = cur.rect;
	if(!cur.full && (e.clientX > r.right || e.clientX < r.left || e.clientY > r.bottom || e.clientY < r.top)) {
		deactivateLink();
		return;
	}
	cur.cx = e.clientX;
	cur.cy = e.clientY;
	placeStatus();
	placePreview();
}

function onMouseDown(e) {
	if(e.which != 3) setPreview(false);
}

function onMouseOut(e) {
	if(!e.relatedTarget) deactivateLink();
}

function onKeyUp(e) {
	if(e.keyCode != 16 || !toggleFull()) setPreview(false);
}

function onContext(e) {
	if(toggleFull())
		e.preventDefault();
	else
		setPreview(false);
}

function onNodeInserted(e) {
	var t = e.target;
	switch(t.tagName) {
		case 'TABLE':
		case 'DIV':
			prepareLinks(t);
			break;
		case 'A':
			if(!t.firstChild) break;
			if(t.firstChild.tagName == 'IMG' || t.firstChild.firstChild && t.firstChild.firstChild.tagName == 'IMG')
				prepareLink(t);
			break;
		case 'IMG':
			if(t.parentNode.tagName == 'A')
				prepareLink(t.parentNode);
			else if(t.parentNode.parentNode && t.parentNode.parentNode.tagName == 'A')
				prepareLink(t.parentNode.parentNode);
			break;
	}
}

function downloadPage(url, q, xhr, t) {
	cur.req = GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		ignoreCache: true,
		onload: function(req) {
			try {
				var node = GM_safeHTMLParser(req.responseText).querySelector(q);
				if(!node) throw 'No results for "' + q + '" at ' + url;
				var src = node.getAttribute('src');
				var iurl = rel2abs(node.tagName.toUpperCase() == 'IMG' ? src : node.innerHTML.match(/http:\/\/[.\/a-z0-9_+%-]+\.(jpe?g|gif|png)/i)[0], url);
				if(!iurl) throw 'Image URL not found';
				if(cur.t != t) return;
				if(xhr) {
					downloadImage(iurl, url, t);
				} else {
					setPreview(iurl);
					checkProgress(true);
				}
			} catch(ex) {
				showError(ex, t);
			}
		}
	});
}

function downloadImage(url, referer, t) {
	cur.req = GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		overrideMimeType:'text/plain; charset=x-user-defined',
		headers: {'Accept':'image/png,image/*;q=0.8,*/*;q=0.5','Referer':referer},
		onload: function(req) {
			try {
				if(cur.t != t) return;
				var data = '';
				for(var i = 0, len = req.responseText.length; i < len; i++) {
					data += String.fromCharCode(req.responseText.charCodeAt(i) & 0xff);
				}
				setPreview('data:;base64,' + window.btoa(data));
				checkProgress(true);
			} catch(ex) {
				showError(ex, t);
			}
		}
	});
}

function checkProgress(start) {
	if(start === true) {
		window.clearInterval(checkProgress.interval);
		checkProgress.interval = window.setInterval(checkProgress, 100);
		return;
	}
	var img = getPreview();
	if(!img) {
		window.clearInterval(checkProgress.interval);
		return;
	}
	if(img.naturalHeight) {
		setStatus(false);
		window.clearInterval(checkProgress.interval);
		img.style.display = '';
		placePreview();
	}
}

function placePreview() {
	var img = getPreview();
	if(!img) return;
	var cx = cur.cx, cy = cur.cy;
	var cw = cur.cw, ch = cur.ch;
	if(cur.full) {
		img.style.maxWidth = null;
		img.style.maxHeight = null;
		img.style.left = (cw > img.naturalWidth  ? cw/2 - img.naturalWidth/2  : -1 * Math.min(1, Math.max(0, 5/3*(cx/cw-0.2))) * (img.naturalWidth - cw)) + 'px';
		img.style.top  = (ch > img.naturalHeight ? ch/2 - img.naturalHeight/2 : -1 * Math.min(1, Math.max(0, 5/3*(cy/ch-0.2))) * (img.naturalHeight - ch)) + 'px';
	} else {
		img.style.maxWidth  = cw + 'px';
		img.style.maxHeight = ch + 'px';
		var w = img.clientWidth;
		var h = img.clientHeight;
		img.style.left = Math.min(cw - w, Math.max(0, cx + (w && cx > cw/2 ? -w -2 : 2))) + 'px';
		img.style.top  = Math.min(ch - h, Math.max(0, cy + (h && cy > ch/2 ? -h -2 : 2))) + 'px';
	}
}

function placeStatus() {
	var img = getStatus();
	if(img) {
		img.style.left = cur.cx + 30 + 'px';
		img.style.top  = cur.cy + 50 + 'px';
	}
}

function toggleFull() {
	var img = getPreview();
	if(!img || !img.naturalHeight)
		return;
	cur.full = !cur.full && (img.naturalWidth > cur.cw || img.naturalHeight > cur.ch);
	onMouseMove({clientX:cur.cx,clientY:cur.cy});
	return cur.full;
}

function showError(ex, t) {
	if(t && t != cur.t) return;
	setStatus('error');
	GM_log(ex);
}

function getStatus() {
	return document.getElementById('mpiv-status');
}

function setStatus(status) {
	var img = getStatus();
	if(!img && !status) return;
	if(!img) {
		img = document.createElement('img');
		img.id = 'mpiv-status';
		img.style.cssText = 'display:none;border:1px solid black;background-color:white;position:fixed;z-index:10000;margin:0';
		document.body.appendChild(img);
	}
	if(status) {
		var srcs = {
			loading:'data:image/gif;base64,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',
			xhr:'data:image/gif;base64,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',
			error:'data:image/gif;base64,R0lGODlhKAAoAOYAANssLOyZmZkDA/oBAbUBAeVqavO2ttgZGffX1/xra+kAAMwzM7apqcYZGdZqavWiov3//+d5efh7e7sjI/hdXfrq6twBAdtAQPf+/qmmpsGcnMSzs65VVeywsOxTU/WLi3onJ9BdXYQtLfWUlHk0NOBGRuY6OpyWlssBAeuMjMC7u++lpe5KSuJbW/H29vTLy/TExOZNTdjLy8EAAOQrK/Cqqr65uc0PD6oTE6grK+xCQuSEhLIZGd08PKAVFbMREZIoKOMzM6KTk8whIfrDw4Q1NW41NawBAX1hYaQNDe3y8rSWlsm0tPf5+cUrK/r8/P719Y1oaJk5Oa1/f99LS+ozM94ICMCZmfn8/NQ1Nfv///JOTs0uLrF8fLwWFq0fH/75+ZV9fek9PeqHh6lhYbOamtE6OqEbG7ANDevv74h0dNk2NtQAANa7u8MhIaEAAPf//62CgrCFhc2vr81UVOhiYt5TU+7BwcIJCc0ICMtISItcXO83N8e/v+OgoP///yH5BAAAAAAALAAAAAAoACgAAAf/gH+Cg4SFhoeIiYqLjItKLo2GaZCRWAxRUX2RgnBXHBxzjVgnIHl4IgyRGF0/fDQ/V4sQJyJWAwp5qIxwrGIlHjqwEIhNJyQWAwYrVjeow4hYXTxVay8rOsFXz4TFJLYjgikWzQzbhBhTPEFcd2BgAVsswoQQDCDII00ICFA740DlCq3CQWNIByj7KoygsOVHG0JpkOQZMKLCCxgwXlSIwOYGQEJw0gFw46cCxowIRiSowgHLICVR8AyQgMCATZsIHKA4AHAYljhfAHgJUPOmgTsfEtAg43KQCiMTE9ypsYJqDSIOZvBkoEVO0B87iKyoWrVDBApicMgo9CQD1AF1/zoEmDvXQAgCB6TsyTEETQQDdOeuKEDBBA4m5gRBcDvRQ4AUYyKneECHwJAvQ5I4eBBZcoo6WwxvSEyI8YAYKSKoVv1BT5LMIT6sVr3DTmgfG2RlIJFHwYUIBYIHl2BGAB0JwoXrYWECd6PFJG4oWFOghXXrdezUuX7dzIUgziNBv2EBgB0q6NF7SE8lRowFPcCP3iQogwjyQ0r02M+/v5M18tE3SD1FNIBCA0EAoOCCCrrBRRY5MCFgIWoAcQBeB2So4QEN8KBDElNMOIgWQliIwgwEpHjEimj8wAMPXPTwhQakMfJEiQdYMAOKR7whwI9J4MDDBBNkkRaN9GEhhP8IOZ7I4xs+ChDkkBM4cYEOaCApihAgWKEAG04S0GOUUxLphBMlYKmlIk+Q4qUFYO4oJpQ+llnlAmYAk2WNg7TZ5QAWwBlmj17QgIYAQpqJ5wUesLAnIn7aokCgcaL4xg1D+ADAD0lQ6cSiJVDgqAZaGFLMnwpMKuiOR2AqRRg5CIWDot6VEEMCo5ZKiD3I3KJqnARgKoIKWpRxRhBuDPlprTF4kMAWaDw0SEQT+frriVYMIYINihkbhBN3MusBBRLw0dJLSMhkLaUoZFsEtwMu4cM6E4DaLLlLPTGgDUaomyqlVrhRhAqGaLHEGSZk4YS4CaS1FiFtGXGDr4Fa0cBbu4gY7IMYPSxwga0JiFajWxNPqkADJBCcCARL4OCLGaE2l1siJA8wgBcpM2JwEjqM25yEi+zmBQ85N7JzFTScATQjfagRxsORaMEEGWRA3YgL+k7YRBMidp1IIAA7'
		};
		img.src = srcs[status];
		img.style.display = '';
	} else {
		img.parentNode.removeChild(img);
	}
}

function getPreview() {
	return document.getElementById('mpiv-preview');
}

function setPreview(src) {
	var img = getPreview();
	if(!img && !src) return;
	if(!img) {
		img = document.createElement('img');
		img.id = 'mpiv-preview';
		img.style.cssText = 'display:none;border:0px solid black;background-color:white;position:fixed;z-index:10000;margin:0;cursor:default';
		img.addEventListener('error', showError, false);
		document.body.appendChild(img);
	}
	if(src) {
		img.src = src;
		img.style.display = 'none';
	} else {
		cur.full = false;
		img.removeEventListener('error', showError, false);
		img.parentNode.removeChild(img);
	}
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

if(typeof GM_safeHTMLParser != 'function' && typeof document.implementation != 'undefined') {
	function GM_safeHTMLParser(s) {
		var d = document.implementation.createHTMLDocument('MPIV');
		d.documentElement.innerHTML = s;
		return d;
	}
}

var cur = {};
prepareLinks(document);
document.addEventListener('DOMNodeInserted', onNodeInserted, false);