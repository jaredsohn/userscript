// ==UserScript==
// @name           TinyURL Decoder
// @namespace      http://matatabi.homeip.net
// @description    decode shortened URLs to original ones
// @include        http://*
// @exclude        http://0rz.tw/*
// @exclude        http://2tu.us/*
// @exclude        http://alturl.com/*
// @exclude        http://arm.in/*
// @exclude        http://awe.sm/*
// @exclude        http://b23.ru/*
// @exclude        http://bacn.me/*
// @exclude        http://bit.ly/*
// @exclude        http://bitly.com/*
// @exclude        http://budurl.com/*
// @exclude        http://chilp.it/*
// @exclude        http://cli.gs/*
// @exclude        http://doiop.com/*
// @exclude        http://elfurl.com/*
// @exclude        http://fat.ly/*
// @exclude        http://ff.im/*
// @exclude        http://fur.ly/*
// @exclude        http://fwd4.me/*
// @exclude        http://goo.gl/*
// @exclude        http://good.ly/*
// @exclude        http://hub.tm/*
// @exclude        http://icanhaz.com/*
// @exclude        http://idek.net/*
// @exclude        http://is.gd/*
// @exclude        http://kl.am/*
// @exclude        http://korta.nu/*
// @exclude        http://linkbee.com/*
// @exclude        http://ln-s.net/*
// @exclude        http://lnk.by/*
// @exclude        http://lnk.in/*
// @exclude        http://m2lb.info/*
// @exclude        http://merky.de/*
// @exclude        http://migre.me/*
// @exclude        http://minurl.org/*
// @exclude        http://moourl.com/*
// @exclude        http://nsfw.in/*
// @exclude        http://oneclip.jp/*
// @exclude        http://ow.ly/*
// @exclude        http://p.ly/*
// @exclude        http://ping.fm/*
// @exclude        http://ponyurl.com/*
// @exclude        http://r.im/*
// @exclude        http://reallytinyurl.com/*
// @exclude        http://retwt.me/*
// @exclude        http://sexyurl.to/*
// @exclude        http://short.to/*
// @exclude        http://shorturl.com/*
// @exclude        http://simurl.com/*
// @exclude        http://slnk.me/*
// @exclude        http://sn.im/*
// @exclude        http://snipr.com/*
// @exclude        http://snipurl.com/*
// @exclude        http://snurl.com/*
// @exclude        http://su.pr/*
// @exclude        http://thecow.me/*
// @exclude        http://tighturl.com/*
// @exclude        http://tcrn.ch/*
// @exclude        http://tiny.cc/*
// @exclude        http://tinyurl.com/*
// @exclude        http://to.ly/*
// @exclude        http://togoto.us/*
// @exclude        http://tr.im/*
// @exclude        http://tra.kz/*
// @exclude        http://traceurl.com/*
// @exclude        http://tweetburner.com/*
// @exclude        http://twurl.nl/*
// @exclude        http://u.nu/*
// @exclude        http://unhub.com/*
// @exclude        http://ur1.ca/*
// @exclude        http://url.az/*
// @exclude        http://url.ie/*
// @exclude        http://urlcut.com/*
// @exclude        http://urlenco.de/*
// @exclude        http://viigo.im/*
// @exclude        http://wurl.ws/*
// @exclude        http://www.x.se/*
// @exclude        http://xr.com/*
// @exclude        http://xrl.us/*
// @exclude        http://yatuc.com/*
// @exclude        http://yep.it/*
// ==/UserScript==

(function(d){
    function reset_cache() {
	var _cache = {};
	GM_setValue('cache', _cache.toSource());
	cache = _cache;
	show_cache();
    }
    GM_registerMenuCommand("Reset cache of TinyURL Decoder", reset_cache);

    function show_cache() {
	var _counter = 0;
	GM_log('==== Cached URLs are shown below: ====');
	for (key in cache) {
	    GM_log(key + ' --> ' + cache[key]);
	    _counter++;
	}
	GM_log('====  These ' + _counter + ' URLs are cached. ====');
    }
    GM_registerMenuCommand("Show cache of TinyURL Decoder", show_cache);

    function keep_text() {
	GM_setValue('keep_text', true);
    }
    GM_registerMenuCommand("Keep anchor text original", keep_text);

    function replace_text() {
	GM_setValue('keep_text', false);
    }
    GM_registerMenuCommand("Replace anchor text to decoded(default)", replace_text);

    function init_cache() {
	var _cache = GM_getValue('cache');
	if (typeof(_cache) === 'undefined')
	    _cache = {};
	else {
	    _cache = eval(_cache);
	    
	    var _counter = 0;
	    for (c in _cache) _counter++;
	    
	    var maxlength = GM_getValue('maxlength'); 
	    if (typeof(maxlength) === 'undefined') {
		maxlength = 100;
		GM_setValue('maxlength', maxlength);
	    }
	    
	    var oversize =  _counter - maxlength;
	    if (oversize > 0) {
		var __cache = {};
		for (key in _cache)
		    if (oversize > 0)
			oversize--;
		    else
			__cache[key] = _cache[key];
		_cache = __cache;
	    }
	}
	return _cache;
    }

    var cache = init_cache();
    var services = {
	'0rz.tw': true, '2tu.us': true,	'6url.com': true,
	'a2a.me': true, 'alturl.com': true, 'arm.in': true, 'awe.sm': true,
	'b23.ru': true, 'bacn.me': true, 'bit.ly': true, 'bitly.com': true,
	'budurl.com': true,
	'chilp.it': true, 'cli.gs': true,
	'dld.bz': true, 'doiop.com': true,
	'fat.ly': true, 'ff.im': true, 'fur.ly': true,
	'fwd4.me': true,
	'gog.is': true, 'goo.gl': true, 'good.ly': true,
	'htn.to': true, 'htxt.it': true, 'hub.tm': true,
	'icanhaz.com': true, 'idek.net': true, 'is.gd': true,
	'j.mp': true,
	'kl.am': true, 'korta.nu': true,
	'linkbee.com': true, 'lnk.by': true, 'lnk.in': true,
	'ln-s.net': true,
	'm2lb.info': true, 'merky.de': true, 'migre.me': true,
	'minurl.org': true, 'moourl.com': true,
	'nsfw.in': true,
	'oneclip.jp': true, 'ow.ly': true,
	'p.ly': true, 'ping.fm': true,
	'ponyurl.com': true, 'post.ly': true,
	'r.im': true, 'reallytinyurl.com': true, 'retwt.me': true,
	'sexyurl.to': true, 'shar.es': true, 'shorturl.com': true,
	'simurl.com': true,
	'sinaurl.cn': true, 'slnk.me': true, 'snurl.com': true,
	'sn.im': true, 'snipr.com': true,
	'snipurl.com': true, 'su.pr': true,
	't.co': true, 'tcrn.ch': true, 'tighturl.com': true,
	'tinyurl.com': true, 'thecow.me': true,
	'tiny.cc': true, 'togoto.us': true, 'to.ly': true, 'traceurl.com': true,
	'tra.kz': true,	'tr.im': true, 'twurl.nl': true,
	'u.nu': true, 'unhub.com': true, 'ur1.ca': true, 'urlcut.com': true,
	'urlenco.de': true, 'url.az': true, 'url.ie': true,
	'viigo.im': true,
	'webtooljungle.com': true, 'wp.me': true, 'wurl.ws': true, 'www.x.se': true,
	'xrl.us': true, 'xr.com': true,
	'yatuc.com': true, 'yep.it': true
    };

    function request_for(a) {
	if (a.hostname in {'bit.ly': true, 'j.mp': true} &&
	    a.pathname.lastIndexOf('/') === 0)
	    return 'http://api.bit.ly/expand?version=2.0.1&format=xml' +
	    '&login=tinyurldecoder&apiKey=R_42e55650000a21fa8cf2caa2778b5aaf' +
	    '&shortUrl=' + a.href;
	else if (a.hostname === 'chilp.it')
	    return 'http://p.chilp.it/api.php' + a.search;
	else if (a.hostname === 'cli.gs' && a.pathname.indexOf('/api') !== 0)
	    return 'http://cli.gs/api/v1/cligs/expand?clig=' + a.href;
	else if (a.hostname === 'dld.bz' &&
		 a.pathname.length > 1 && a.pathname.indexOf('/api') !== 0)
	    return 'http://dld.bz/api/expand?format=xml&url=' + a.href;
	else if (a.hostname === 'good.ly' && a.pathname.indexOf('/-') === 0)
	    return null;
	else if (a.hostname === 'idek.net' && a.search.indexOf('?idek-api') !== 0)
	    return a.href + '?idek-api=true';
	else if (a.hostname === 'migre.me' && a.pathname.indexOf('/api') !== 0)
	    return 'http://migre.me/api_redirect2.xml?url=' + a.href;
	else if (a.hostname === 'p.ly' && a.pathname.indexOf('/api') !== 0)
	    return 'http://p.ly/api/expand?code=' + a.pathname.substr(1);
	else if (a.hostname === 'post.ly')
	    return 'http://posterous.com/api/getpost?id=' + a.pathname.substr(1);
	else if (a.hostname === 'r.im' && a.pathname.indexOf('/api') !== 0)
	    return 'http://r.im/api/index.cfm?short_url=' + a.href;
	else if (a.hostname === 'su.pr' && a.pathname.indexOf('/api') !== 0)
	    return 'http://su.pr/api/expand?shortUrl=' + a.href;
	else if (a.hostname === 'u.nu' && a.href.indexOf('?') > 0)
	    return 'http://u.nu' + a.pathname;
	else
	    return a.href;
    }

    function extract_from_response(resp) {
	var pat = null;
	var a = document.createElement('a');

	a.href = resp.finalUrl;

	if (a.hostname === '0rz.tw')
	    pat = '<input\\s+type="text"\\s+class="url"\\s+id="original_url"\\s+value="(.*?)"/>';
	else if (a.hostname === '6url.com')
	    pat = '<title>Redirects\\s+to\\s+(.*?)</title>';
	else if (a.hostname === 'arm.in')
	    pat = 'noresize><frame\\s+src="(.*?)"\\s+name="ContentWindow"';
	else if (a.href.indexOf('http://api.bit.ly/expand') === 0)
	    pat = '<longUrl>(.*?)</longUrl>';
	else if (a.hostname === 'cuthut.com')
	    pat = '<a\\s+href="(.*?)"\\s+id="url">';
	else if (a.hostname === 'dld.bz' && a.pathname === '/api/expand')
	    pat = '<long_url>(.*?)</long_url>';
	else if (a.hostname === 'lnk.by')
	    pat = '<meta\\s+HTTP-EQUIV="REFRESH"\\s+content="0; url=(.*?)">'
	else if (a.hostname === 'lnk.in')
	    pat = "redirect\\('(.*?)'\\)";
	else if (a.hostname === 'm2lb.info')
	    pat = '<meta\\s+http-equiv="REFRESH"\\s+content="10;url=(.*?)">';
	else if (a.href.indexOf('http://migre.me/api_redirect2.xml') === 0)
	    pat = '<url><\\!\\[CDATA\\[(.*?)\\]\\]></url>';
	else if (a.hostname === 'minurl.org')
	    pat = 'getTwitterSearchResults\\("(.*?)"\\);';
	else if (a.hostname === 'webtooljungle.com')
	    pat = 'window.location.href=\\("(.*?)"\\);';
	else if (a.hostname === 'nsfw.in')
	    pat = 'id="link-go"\\s+class="span-6\\s+last">\\s+<a\\s+href="(.*?)"';
	else if (a.hostname === 'oneclip.jp')
	    pat = '<link\\s+rel="canonical"\\s+href="(.*?)"\\s+/>';
	else if (a.hostname === 'ow.ly')
	    pat = '<iframe\\s+frameborder="0"\\s+src="(.*?)"\\s+noresize="noresize"\\s+name="hootFrame"\\s+id="hootFrame"\\s+>';
	else if (a.hostname === 'p.ly')
	    pat = '<success>(.*?)</success>';
	else if (a.hostname === 'shar.es')
	    pat = 'content="0; URL=(.*?)"';
	else if (a.hostname === 'url.az')
	    pat = '<a\\s+href="(.*?)"\\s+id="close">';
	else if (a.hostname === 'posterous.com')
	    pat = '<link>(.*?)</link>';
	else if (a.hostname === 'sexyurl.to')
	    pat = "window.location='(.*?)';";
	else if (a.hostname === 'www.shortener.net')
	    pat = 'window.location="(.*?)";';
	else if (a.hostname === 'simurl.com')
	    pat = 'content="0;\\s+URL=(.*?)"';
	else if (a.hostname === 'su.pr')
	    pat = '"longUrl":(.*?)}';
	else if (a.href.indexOf('http://tinyurl.com/preview.php') === 0)
	    pat = 'id="redirecturl"\\s+href="(.*?)"';
	else if (a.hostname === 'thecow.me')
	    pat = 'id="glu"\\s+src="(.*?)"';
	else if (a.hostname === 'unhub.com')
	    pat = '<link\\s+href="(.*?)"\\s+rel="canonical"/>'
	else if (a.hostname === 'viigo.im')
	    pat = '<a\\s+href="(.*?)"\\s+title="Close">';
	else if (a.hostname === 'xr.com')
	    pat = '<a\\s+href="(.*?)"\\s+target=parent>';
	else if (a.href.indexOf('http://cli.gs/api/v1/cligs/expand') === 0 ||
		 (a.hostname === 'idek.net' && a.search === '?idek-api=true') ||
		 a.href.indexOf('http://p.chilp.it/api.php') === 0 ||
		 a.href.indexOf('http://r.im/api/index.cfm?short_url=') === 0)
	    return resp.responseText.replace(/[\n\r]/g, '');

	if (pat) 
	    try {
		theUrl = resp.responseText.match(pat, 'i')[1];
		if (a.hostname === 'su.pr')
		    theUrl = eval(theUrl);
	    } catch (err) {
		theUrl = null;
	    }
	else
	    theUrl = resp.finalUrl;
	
	return theUrl;
    }

    var working = {};
    function decode_shortened_url(_node) {
	if (cache[_node.href]) {
	    if (GM_getValue('keep_text') === true) {
		_node.title = 'leads to ' + cache[_node.href];
	    } else {
		_node.title = 'was ' + _node.href;
		_node.innerHTML = cache[_node.href];
	    }
	    _node.href = cache[_node.href];
	} else {
	    if (working[_node.href])
		return;
	    else
		working[_node.href] = true;

	    var _url = request_for(_node);
	    if (_url)
		GM_xmlhttpRequest({
		    method: "GET",
		    url: _url,
		    onload: function(resp) {
			finalUrl = extract_from_response(resp);
			if (finalUrl) {
			    cache[_node.href] = finalUrl.replace(/\\|\\/, '').replace('&amp;', '&');
			    working[_node.href] = false;
			}
		    },
		    onerror: function(resp) {
			GM_log('Oops! Access error to ' + _node.href);
		    }
		});
	}
    }

    function main() {
	var counter = 0;
	var anchors = d.getElementsByTagName('a');
	var anchors_length = anchors.length;
	for (var i=0; i<anchors_length; i++) {
	    if (anchors[i].pathname.length === 1 && anchors[i].search.length < 2)
		continue;
	    else if (anchors[i].hostname in services) {
		decode_shortened_url(anchors[i]);
		counter++;
	    }
	}
	GM_setValue('cache', cache.toSource());

	if (counter === 0) {
	    setTimeout(main, 60000);
	    working = {};
	} else {
	    setTimeout(main, 10000 / counter);
	}
    }

    main();
}(document));
