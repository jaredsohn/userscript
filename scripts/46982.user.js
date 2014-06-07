// ==UserScript==
// @name           TinyURL Decoder
// @namespace      http://matatabi.homeip.net
// @authur	   Master Xyz...	
// @description    decode shortened URLs to original ones
// @include        *
// @exclude        http://0rz.tw/*
// @exclude        http://6url.com/*
// @exclude        http://alturl.com/*
// @exclude        http://arm.in/*
// @exclude        http://b23.ru/*
// @exclude        http://bacn.me/*
// @exclude        http://bit.ly/*
// @exclude        http://bitly.com/*
// @exclude        http://bloat.me/*
// @exclude        http://budurl.com/*
// @exclude        http://burnurl.com/*
// @exclude        http://chilp.it/*
// @exclude        http://cli.gs/*
// @exclude        http://digg.com/*
// @exclude        http://doiop.com/*
// @exclude        http://elfurl.com/*
// @exclude        http://ff.im/*
// @exclude        http://fff.to/*
// @exclude        http://gol.ly/*
// @exclude        http://href.in/*
// @exclude        http://hub.tm/*
// @exclude        http://hurl.me/*
// @exclude        http://i5.be/*
// @exclude        http://icanhaz.com/*
// @exclude        http://idek.net/*
// @exclude        http://is.gd/*
// @exclude        http://kl.am/*
// @exclude        http://korta.nu/*
// @exclude        http://lin.cr/*
// @exclude        http://ln-s.net/*
// @exclude        http://lnkd.in/*
// @exclude        http://lnk.in/*
// @exclude        http://m2lb.info/*
// @exclude        http://merky.de/*
// @exclude        http://migre.me/*
// @exclude        http://minurl.fr/*
// @exclude        http://minify.me/*
// @exclude        http://moourl.com/*
// @exclude        http://myurl.in/*
// @exclude        http://ninjalink.com/*
// @exclude        http://nsfw.in/*
// @exclude        http://ow.ly/*
// @exclude        http://p.zurl.ws/*
// @exclude        http://peaurl.com/*
// @exclude        http://ping.fm/*
// @exclude        http://piurl.com/*
// @exclude        http://pnt.me/*
// @exclude        http://ponyurl.com/*
// @exclude        http://poprl.com/*
// @exclude        http://qurlyq.com/*
// @exclude        http://reallytinyurl.com/*
// @exclude        http://rubyurl.com/*
// @exclude        http://shorturl.com/*
// @exclude        http://short.ie/*
// @exclude        http://short.la/*
// @exclude        http://short.to/*
// @exclude        http://shuurl.com/*
// @exclude        http://simurl.com/*
// @exclude        http://slnk.me/*
// @exclude        http://smallr.com/*
// @exclude        http://snipr.com/*
// @exclude        http://snipurl.com/*
// @exclude        http://snurl.com/*
// @exclude        http://so-smart.be/*
// @exclude        http://tighturl.com/*
// @exclude        http://tiny.cc/*
// @exclude        http://tinyurl.com/*
// @exclude        http://togotor.us/*
// @exclude        http://to.ly/*
// @exclude        http://tr.im/*
// @exclude        http://tra.kz/*
// @exclude        http://traceurl.com/*
// @exclude        http://tweetburner.com/*
// @exclude        http://twurl.nl/*
// @exclude        http://u.mavrev.com/*
// @exclude        http://ur1.ca/*
// @exclude        http://url.az/*
// @exclude        http://url.ie/*
// @exclude        http://url.so-smart.be/*
// @exclude        http://urlcut.com/*
// @exclude        http://urlenco.de/*
// @exclude        http://viigo.im/*
// @exclude        http://w3t.org/*
// @exclude        http://wurl.ws/*
// @exclude        http://www.cloakreferer.com/*
// @exclude        http://www.dwarfurl.com/*
// @exclude        http://xii.li/*
// @exclude        http://xrl.us/*
// @exclude        http://yatuc.com/*
// @exclude        http://yep.it/*
// @exclude        http://zurl.ws/*
// @exclude        http://zz.gd/*
// ==/UserScript==

(function(d){
    function reset_cache() {
	var c = {};
	GM_setValue('cache', c.toSource());
    }

    function show_cache() {
	var cache = init_cache();
	var count = 0;
	GM_log('==== Cached URLs are shown below: ====');
	for (key in cache) {
	    GM_log(key + ' --> ' + cache[key]);
	    count++;
	}
	GM_log('====  These ' + count + ' URLs are cached. ====');
    }

    function init_cache() {
	var _cache = GM_getValue('cache');
	if (typeof _cache == 'undefined')
	    _cache = {};
	else {
	    _cache = eval(_cache);
	    
	    var count = 0;
	    for (c in _cache) count++;
	    
	    var maxlength = GM_getValue('maxlength'); 
	    if (typeof maxlength == 'undefined') {
		maxlength = 100;
		GM_setValue('maxlength', maxlength);
	    }
	    
	    var oversize =  count - maxlength;
	    if (oversize > 0)
		for (key in _cache) {
		    delete _cache[key];
		    oversize--;
		    if (oversize == 0)
			break;
		}
	}
	return _cache;
    }

    var cache = init_cache();
    var services = {
	'6url.com': true, '0rz.tw': true,
	'alturl.com': true, 'arm.in': true,
	'b23.ru': true, 'bacn.me': true, 'bit.ly': true, 'bitly.com': true,
	'bloat.me': true, 'budurl.com': true, 'burnurl.com': true,
	'chilp.it': true, 'cli.gs': true,
	'digg.com': true, 'doiop.com': true, 'dwarfurl.com': true,
	'elfurl.com': true,
	'ff.im': true, 'fff.to': true,
	'gol.ly': true,
	'href.in': true, 'htxt.it': true, 'hub.tm': true, 'hurl.me': true,
	'i5.be': true, 'icanhaz.com': true, 'idek.net': true,
	'is.gd': true,
	'kl.am': true, 'korta.nu': true,
	'lin.cr': true, 'lnkd.in': true, 'lnk.in': true, 'ln-s.net': true,
	'm2lb.info': true, 'merky.de': true, 'migre.me': true,
	'minify.me': true, 'minurl.fr': true, 'moourl.com': true,
	'moveto.ws': true, 'myurl.in': true,
	'ninjalink.com': true, 'nsfw.in': true,
	'ow.ly': true,
	'peaurl.com': true,'ping.fm': true, 'piurl.com': true,
	'pnt.me': true, 'poprl.com': true, 'ponyurl.com': true,
	'p.zurl.ws': true,
	'qurlyq.com': true,
	'reallytinyurl.com': true, 'rubyurl.com': true,
	'shorturl.com': true, 'short.ie': true, 'short.la': true,
	'short.to': true, 'shuurl.com': true, 'simurl.com': true,
	'slnk.me': true, 'snurl.com': true, 'smallr.com': true,
	'snipr.com': true, 'snipurl.com': true, 'so-smart.be': true,
	'tighturl.com': true, 'tinyurl.com': true, 'tiny.cc': true,
	'togoto.us': true, 'to.ly': true, 'traceurl.com': true,
	'tra.kz': true, 'tr.im': true, 'twurl.nl': true,
	'ur1.ca': true,	'urlcut.com': true, 'urlenco.de': true, 'url.az': true,
	'url.ie': true, 'u.mavrev.com': true,
	'viigo.im': true,
	'w3t.org': true, 'wurl.ws': true, 'www.cloakreferer.com': true,
	'xii.li': true, 'xrl.us': true,
	'yatuc.com': true, 'yep.it': true,
	'zurl.ws': true, 'zz.gd': true
    };

    function request_for(a) {
	if (a.hostname in {'bit.ly': true, 'bitly.com': true} &&
	    a.pathname.length > 1 && a.search.length == 0)
	    return 'http://api.bit.ly/expand?version=2.0.1&format=xml' +
	    '&login=tinyurldecoder&apiKey=R_42e55650000a21fa8cf2caa2778b5aaf' +
	    '&shortUrl=' + a.href;
	else if (a.hostname == 'chilp.it' &&
		 a.pathname.length == 1 && a.search.length > 1)
	    return 'http://p.chilp.it/api.php' + a.search;
	else if (a.hostname == 'cli.gs' &&
		 a.pathname.length > 1 && a.search.length == 0)
	    return 'http://cli.gs/api/v1/cligs/expand?clig=' + a.href;
	else if (a.hostname == 'digg.com' && a.search.length > 0)
	    return null;
	else if (a.hostname == 'idek.net' &&
		 a.pathname.length > 1 && a.search.length == 0)
	    return a.href + '?idek-api=true';
	else if (a.hostname == 'migre.me' &&
		 a.pathname.length > 1 && a.search.length == 0)
	    return 'http://migre.me/api_redirect.xml?url=' + a.href;
	else if (a.hostname == 'poprl.com' &&
		 a.pathname.indexOf('/api') == -1 && a.pathname.length > 1)
	    return 'http://poprl.com/api/lookup/alias' + a.pathname;
	else if (a.hostname == 'togoto.us' &&
		 a.pathname.length > 1 && a.search.length == 0)
	    return 'http://togoto.us/l-api.php?t=' + a.pathname.substr(1);
	else if (a.hostname == 'tr.im' &&
		 a.pathname.length > 1 && a.search.length == 0)
	    return 'http://api.tr.im/api/trim_destination.xml' +
	    '?trimpath=' + a.pathname.substr(1);
	else if (a.hostname == 'urlenco.de' &&
		 a.pathname.length > 1 && a.search.length == 0)
	    return 'http://urlenco.de/PostJSON.aspx?decode=' + a.href;
	else if (a.hostname == 'zz.gd' &&
		 a.pathname.length > 1 && a.search.length == 0)
	    return 'http://zz.gd/api-decrypt.php?url=' + a.href;
	else
	    return a.href;
    }

    function extract_from_response(resp) {
	var pat = null;
	var a = document.createElement('a');
	a.href = resp.finalUrl;

	if (a.hostname == '6url.com')
	    pat = '<title>Redirects\\s+to\\s+(.*?)</title>';
	else if (a.hostname == 'arm.in')
	    pat = 'noresize><frame\\s+src="(.*?)"\\s+name="ContentWindow"';
	else if (a.href.indexOf('http://api.bit.ly/expand') == 0)
	    pat = '<longUrl>(.*?)</longUrl>';
	else if (a.href.indexOf('http://api.tr.im/api/trim_destination.xml') == 0)
	    pat = '<destination>(.*?)</destination>';
	else if (a.hostname == 'burnurl.com')
	    pat = '<link\\s+rel="canonical"\\s+href="(.*?)"\\s*/>';
	else if (a.hostname == 'digg.com')
	    pat = 'id="diggiFrame"\\s+name="diggiFrame"\\s+noresize="noresize"\\s+src="(.*?)"';
	else if (a.hostname == 'gol.ly' && a.pathname == '/tinyurl.php')
	    pat = '<iframe\\s+id="tree"\\s+name="tree"\\s+src="(.*?)"';
	else if (a.hostname == 'lin.cr')
	    pat = 'content="0;url=(.*?)"';
	else if (a.hostname == 'lnk.in')
	    pat = "redirect\\('(.*?)'\\)";
	else if (a.hostname == 'm2lb.info')
	    pat = '<meta\\s+http-equiv="REFRESH"\\s+content="10;url=(.*?)">';
	else if (a.href.indexOf('http://migre.me/api_redirect.xml') == 0)
	    pat = '<url>(.*?)</url>';
	else if (a.hostname == 'myurl.in')
	    pat = 'window.location.href=\\("(.*?)"\\);';
	else if (a.hostname == 'nsfw.in')
	    pat = 'name="query"\\s+value="(.*?)"';
	else if (a.hostname == 'ow.ly')
	    pat = 'Click\\s+<a\\s+href="(.*?)">here</a>';
	else if (a.hostname == 'p.zurl.ws')
	    pat = '<blockquote><strong>(.*?)</strong></blockquote>';
	else if (a.hostname == 'qurlyq.com')
	    pat = 'redirect\\(\\\'(.*?)\\\'\\);';
	else if (a.hostname == 'shuurl.com')
	    pat = "directed\\s+to:\\s+<a\\s+href='(.*?)'>";
	else if (a.hostname == 'simurl.com')
	    pat = 'content="0;\\s+URL=(.*?)"';
	else if (a.href.indexOf('http://tinyurl.com/preview.php') == 0)
	    pat = 'id="redirecturl"\\s+href="(.*?)"';
	else if (a.href.indexOf('http://urlenco.de/PostJSON.aspx') == 0)
	    pat = '"url"\\s+:\\s+"(.*?)"';
	else if (a.hostname == 'viigo.im')
	    pat = '<a\\s+href="(.*?)"\\s+title="Close">';
	else if (a.hostname == 'w3t.org')
	    pat = "window.location='(.*?)'";
	else if (a.href.indexOf('http://cli.gs/api/v1/cligs/expand') == 0 ||
		 (a.hostname == 'idek.net' && a.search == '?idek-api=true') ||
		 a.href.indexOf('http://poprl.com/api/lookup/alias') == 0 ||
		 a.href.indexOf('http://p.chilp.it/api.php') == 0 ||
		 a.href.indexOf('http://togoto.us/l-api.php') == 0 ||
		 a.href.indexOf('http://zz.gd/api-decrypt.php') == 0)
	    return resp.responseText;

	if (pat) 
	    try {
		theUrl = resp.responseText.match(pat, 'i')[1];
	    } catch (err) {
		theUrl = resp.finalUrl;
	    }
	else
	    theUrl = resp.finalUrl;
	
	return theUrl;
    }

    function decode_shortened_url(_node) {
	if (cache[_node.href]) {
	    _node.innerHTML = cache[_node.href];
	    _node.href = cache[_node.href];
	} else {
	    var _url = request_for(_node);
	    if (_url)
		GM_xmlhttpRequest({
		    method: "GET",
		    url: _url,
		    onload: function(resp) {
			finalUrl = extract_from_response(resp);
			cache[_node.href] = finalUrl;
			_node.innerHTML = finalUrl;
			_node.href = finalUrl;
			GM_setValue('cache', cache.toSource());
		    },
		    onerror: function(resp) {
			GM_log('Oops! Access error to ' + _node.href);
		    }
		});
	}
    }

    function main() {
	var anchors = d.getElementsByTagName('a');
	var anchors_length = anchors.length;
	for (var i=0; i<anchors_length; i++) {
	    if (anchors[i].hostname in services)
		decode_shortened_url(anchors[i]);
	}
	setTimeout(main, 10000);
    }

    GM_registerMenuCommand("Show cache data", show_cache);
    GM_registerMenuCommand("Reset cache data", reset_cache);

    setTimeout(main, 100);
}(document));

