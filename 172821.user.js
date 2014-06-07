// ==UserScript==
// @name           Download Youtube Videos
// @namespace      download@youtube.com
// @description    Downloads youtube videos
// @grant          none
// @include        http://youtube.com/watch?v=*
// @include        http://*.youtube.com/watch?v=*
// @include        http://youtube.com/user/*
// @include        http://*.youtube.com/user/*
// @include        https://youtube.com/watch?v=*
// @include        https://*.youtube.com/watch?v=*
// @include        https://youtube.com/user/*
// @include        https://*.youtube.com/user/*
// ==/UserScript==

var SELECT_ID = 'dl-yt-vids-select-7194114873';
var doc = top.document;
function $a(a) {
	return doc.getElementById(a);
}
function $c(a) {
	return doc.createElement(a);
}

var formats = {
	//6: '480 FLV',
	//13: {text: '3GP (No Sound)', mime: 'video/3gpp'},
	//17: {text: '3GP (Sound)', mime: 'video/3gpp'},
	//36: '320x240 3GP'{text: '320x240 FLV', mime: ''},
	
	5: {text: '320x240 FLV', mime: 'video/x-flv'},
	34: {text: '640x360 FLV', mime: 'video/x-flv'},
	35: {text: '854x480 FLV', mime: 'video/x-flv'},
	
	18: {text: '640x360 MP4', mime: 'video/mp4'},
	22: {text: '1280x720 MP4', mime: 'video/mp4'},
	37: {text: '1920x1080 MP4', mime: 'video/mp4'},
	
	43: {text: '640x360 WebM', mime: 'video/webm'},
	44: {text: '854x480 WebM', mime: 'video/webm'},
	45: {text: '1280x720 WebM', mime: 'video/webm'},
	46: {text: '1920x1080 WebM', mime: 'video/webm'}
};

var firstTry = Date.now();
function tryStart() {
	if($a(SELECT_ID) != null) return;
	if($a('watch7-headline')) {
		videoPageInit();
	} else if(Date.now() - firstTry < 10000) {
		setTimeout(tryStart, 245);
	}
}
addEventListener('load', tryStart, false);

function splitBy(str, sep) {
	return str.split(sep).map(function(v) {
		var pos = v.indexOf('=');
		return [decodeURIComponent(v.substr(0, pos)), decodeURIComponent(v.substr(pos + 1))];
	});
}

function vals(v) {
	return v[1];
}

function parseURL(url, sep) {
	var r = {};
	url = splitBy(url, sep || '&').forEach(function(v) {
		r[v[0]] = v[1];
	});
	return r;
}

function stringifyURL(url) {
	var r = [];
	for(var p in url) {
		r.push(encodeURIComponent(p) + '=' + encodeURIComponent(url[p]));
	}
	return r.join('&');
}

function normalizeURL(url) {
	var pos = url.indexOf('?') + 1;
	var path = url.substr(0, pos);
	url = parseURL(url.substr(pos));
	return path + stringifyURL(url);
}

function videoPageInit() {
	var script = doc.querySelectorAll('#player script')[1].textContent;
	var match = script.match('(".+?");');
	if(match != null) {
		script = JSON.parse([1].trim());
		script = script.match('flashvars="(.+)"')[1].replace(/&amp;/g, '&');
		script = parseURL(script);
	} else script = unsafeWindow.ytplayer.config.args;
	var types = script.fmt_list.split(',');
	var urls = script.url_encoded_fmt_stream_map.split(',').map(function(v) {
		v = parseURL(v);
		var url = decodeURIComponent(v.url);
		if(v.sig) url += '&signature=' + v.sig;
		return url;
	});
	
	var fmts = {};
	types.forEach(function(type, i) {
		var code = parseInt(type.split('/')[0]);
		var format = formats[code] || {text: type, mime: null};
		fmts[format.text] = {
			url: normalizeURL(urls[i]),
			text: format.text,
			mime: format.mime
		};
	});
	
	addDownloader($a('watch7-headline') || $a('playnav-curvideo-info-line'), fmts);
}

function addDownloader(el, fmts) {
	if(!el) return;
	
	var sel = $c('select');
	sel.id = SELECT_ID;
	for(var key in fmts) {
		var t = $c('option');
		t.value = key;
		t.innerHTML = key;
		sel.appendChild(t);
	}
	el.appendChild(sel);
	
	var a = $c('a');
	a.textContent = 'Download';
	a.style.textDecoration = 'none';
	a.style.fontSize = '11pt';
	a.style.color = '#000';
	a.style.marginLeft = '2px';
	//a.classList.add('yt-uix-button');
	el.appendChild(a);
	
	sel.addEventListener('change', changeURL, false);
	changeURL();
	
	function changeURL() {
		var fmt = fmts[sel.value];
		a.setAttribute('href', fmt.url);
		a.setAttribute('download', $a('watch-headline-title').textContent.trim());
		if(fmts[fmt.mime] != null) a.setAttribute('type', fmt.mime);
	}
}
