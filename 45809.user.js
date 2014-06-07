// ==UserScript==
// @name           Psychic TinyURL
// @namespace      http://www.chimericdream.com
// @description    Credit for this script goes to setomits (http://userscripts.org/scripts/show/40582); I simply modified the code to show the new URL as a title attribute instead of replacing the link.  Many URL shortening services also offer statistics, and this helps users of those services without impacting the reliability of their analytics.
// @include        http://twitter.com/*
// @include        http://search.twitter.com/*
// @include        http://identi.ca/*
// @include        http://userscripts.org/scripts/show/40582
// @exclude        http://0rz.tw/*
// @exclude        http://2tu.us/*
// @exclude        http://3.ly/*
// @exclude        http://55c.cc/*
// @exclude        http://6url.com/*
// @exclude        http://alturl.com/*
// @exclude        http://arm.in/*
// @exclude        http://aus.ly/*
// @exclude        http://awe.sm/*
// @exclude        http://b23.ru/*
// @exclude        http://bacn.me/*
// @exclude        http://bit.ly/*
// @exclude        http://bitly.com/*
// @exclude        http://bloat.me/*
// @exclude        http://br.st/*
// @exclude        http://budurl.com/*
// @exclude        http://buttn.me/*
// @exclude        http://chilp.it/*
// @exclude        http://cli.gs/*
// @exclude        http://cuthut.com/*
// @exclude        http://devnull.at/*
// @exclude        http://digg.com/*
// @exclude        http://doiop.com/*
// @exclude        http://dz.ly/*
// @exclude        http://elfurl.com/*
// @exclude        http://fat.ly/*
// @exclude        http://ff.im/*
// @exclude        http://fff.to/*
// @exclude        http://fur.ly/*
// @exclude        http://fwd4.me/*
// @exclude        http://gol.ly/*
// @exclude        http://good.ly/*
// @exclude        http://href.in/*
// @exclude        http://hub.tm/*
// @exclude        http://hurl.me/*
// @exclude        http://i5.be/*
// @exclude        http://icanhaz.com/*
// @exclude        http://idek.net/*
// @exclude        http://is.gd/*
// @exclude        http://kissa.be/*
// @exclude        http://kl.am/*
// @exclude        http://korta.nu/*
// @exclude        http://l.pr/*
// @exclude        http://lin.cr/*
// @exclude        http://linkbee.com/*
// @exclude        http://liurl.cn/*
// @exclude        http://ln-s.net/*
// @exclude        http://lnk.by/*
// @exclude        http://lnk.in/*
// @exclude        http://m2lb.info/*
// @exclude        http://merky.de/*
// @exclude        http://migre.me/*
// @exclude        http://minify.me/*
// @exclude        http://minurl.fr/*
// @exclude        http://minurl.org/*
// @exclude        http://moourl.com/*
// @exclude        http://myurl.in/*
// @exclude        http://ninjalink.com/*
// @exclude        http://no1.in/*
// @exclude        http://nsfw.in/*
// @exclude        http://ow.ly/*
// @exclude        http://p.ly/*
// @exclude        http://p.zurl.ws/*
// @exclude        http://ping.fm/*
// @exclude        http://piurl.com/*
// @exclude        http://pnt.me/*
// @exclude        http://ponyurl.com/*
// @exclude        http://qurlyq.com/*
// @exclude        http://r.im/*
// @exclude        http://reallytinyurl.com/*
// @exclude        http://retwt.me/*
// @exclude        http://ri.ms/*
// @exclude        http://rt.nu/*
// @exclude        http://rubyurl.com/*
// @exclude        http://sexyurl.to/*
// @exclude        http://short.ie/*
// @exclude        http://short.to/*
// @exclude        http://shorterlink.devnull.at/*
// @exclude        http://shorturl.com/*
// @exclude        http://simurl.com/*
// @exclude        http://slnk.me/*
// @exclude        http://smallr.com/*
// @exclude        http://sn.im/*
// @exclude        http://snipr.com/*
// @exclude        http://snipurl.com/*
// @exclude        http://snurl.com/*
// @exclude        http://su.ly/*
// @exclude        http://su.pr/*
// @exclude        http://thecow.me/*
// @exclude        http://tighturl.com/*
// @exclude        http://tcrn.ch/*
// @exclude        http://tiny.cc/*
// @exclude        http://tinyftw.com/*
// @exclude        http://tinyurl.com/*
// @exclude        http://to.ly/*
// @exclude        http://togoto.us/*
// @exclude        http://tr.im/*
// @exclude        http://tra.kz/*
// @exclude        http://traceurl.com/*
// @exclude        http://turls.me/*
// @exclude        http://tweetburner.com/*
// @exclude        http://twurl.nl/*
// @exclude        http://u.mavrev.com/*
// @exclude        http://u.nu/*
// @exclude        http://unhub.com/*
// @exclude        http://ur1.ca/*
// @exclude        http://url.az/*
// @exclude        http://url.ie/*
// @exclude        http://urlcut.com/*
// @exclude        http://urlenco.de/*
// @exclude        http://viigo.im/*
// @exclude        http://w3t.org/*
// @exclude        http://wurl.ws/*
// @exclude        http://wva.gd/*
// @exclude        http://www.cloakreferer.com/*
// @exclude        http://www.dwarfurl.com/*
// @exclude        http://www.mylnk.us/*
// @exclude        http://www.x.se/*
// @exclude        http://xr.com/*
// @exclude        http://xrl.us/*
// @exclude        http://yatuc.com/*
// @exclude        http://yep.it/*
// @exclude        http://z.pe/*
// @exclude        http://zurl.ws/*
// @exclude        http://zz.gd/*
// ==/UserScript==

(function(d){
    function reset_cache() {
        var _cache = {};
        GM_setValue('cache', _cache.toSource());
        cache = _cache;
        show_cache();
    }
    GM_registerMenuCommand("Reset cache of Psychic TinyURL", reset_cache);

    function show_cache() {
        var _counter = 0;
        GM_log('==== Cached URLs are shown below: ====');
        for (key in cache) {
            GM_log(key + ' --> ' + cache[key]);
            _counter++;
        }
        GM_log('====  These ' + _counter + ' URLs are cached. ====');
    }
    GM_registerMenuCommand("Show cache of Psychic TinyURL", show_cache);

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
        '0rz.tw': true,
        '2big.at': true,
        '2tu.us': true,
        '3.ly': true,
        '55c.cc': true,
        '6url.com': true,
        'a2a.me': true,
        'alturl.com': true,
        'arm.in': true,
        'aus.ly': true,
        'awe.sm': true,
        'b23.ru': true,
        'bacn.me': true,
        'bit.ly': true,
        'bitly.com': true,
        'bloat.me': true,
        'br.st': true,
        'budurl.com': true,
        'buttn.me': true,
        'chilp.it': true,
        'cli.gs': true,
        'cuthut.com': true,
        'devnull.at': true,
        'digg.com': true,
        'doiop.com': true,
        'dwarfurl.com': true,
        'dz.ly': true,
        'fat.ly': true,
        'ff.im': true,
        'fff.to': true,
        'fur.ly': true,
        'fwd4.me': true,
        'gog.is': true,
        'good.ly': true,
        'gol.ly': true,
        'href.in': true,
        'htxt.it': true,
        'hub.tm': true,
        'hurl.me': true,
        'i5.be': true,
        'icanhaz.com': true,
        'idek.net': true,
        'is.gd': true,
        'j.mp': true,
        'kissa.be': true,
        'kl.am': true,
        'korta.nu': true,
        'linkbee.com': true,
        'link.gs': true,
        'lin.cr': true,
        'liurl.cn': true,
        'lnk.by': true,
        'lnk.in': true,
        'ln-s.net': true,
        'l.pr': true,
        'm2lb.info': true,
        'merky.de': true,
        'migre.me': true,
        'minify.me': true,
        'minurl.fr': true,
        'minurl.org': true,
        'moourl.com': true,
        'moveto.ws': true,
        'myurl.in': true,
        'ninjalink.com': true,
        'nsfw.in': true,
        'no1.in': true,
        'oneclip.jp': true,
        'ow.ly': true,
        'p.ly': true,
        'ping.fm': true,
        'piurl.com': true,
        'pnt.me': true,
        'ponyurl.com': true,
        'p.zurl.ws': true,
        'qurlyq.com': true,
        'r.im': true,
        'reallytinyurl.com': true,
        'retwt.me': true,
        'ri.ms': true,
        'rt.nu': true,
        'rubyurl.com': true,
        'sexyurl.to': true,
        'shorturl.com': true,
        'short.ie': true,
        'short.to': true,
        'simurl.com': true,
        'sinaurl.cn': true,
        'slnk.me': true,
        'snurl.com': true,
        'smallr.com': true,
        'sn.im': true,
        'snipr.com': true,
        'snipurl.com': true,
        'su.ly': true,
        'su.pr': true,
        'tcrn.ch': true,
        'tighturl.com': true,
        'tinyftw.com': true,
        'tinyurl.com': true,
        'thecow.me': true,
        'tiny.cc': true,
        'togoto.us': true,
        'to.ly': true,
        'traceurl.com': true,
        'tra.kz': true,
        'tr.im': true,
        'turls.me': true,
        'twurl.nl': true,
        'u.nu': true,
        'unhub.com': true,
        'ur1.ca': true,
        'urlcut.com': true,
        'urlenco.de': true,
        'url.az': true,
        'url.ie': true,
        'u.mavrev.com': true,
        'viigo.im': true,
        'w3t.org': true,
        'wp.me': true,
        'wurl.ws': true,
        'wva.gd': true,
        'www.cloakreferer.com': true,
        'www.mylnk.us': true,
        'www.x.se': true,
        'xrl.us': true,
        'xr.com': true,
        'yatuc.com': true,
        'yep.it': true,
        'z.pe': true,
        'zurl.ws': true,
        'zz.gd': true
    };

    function request_for(a) {
        if (a.hostname in {
            'bit.ly': true,
            'bitly.com': true,
            'j.mp': true
        } &&
        a.pathname.lastIndexOf('/') === 0)
            return 'http://api.bit.ly/expand?version=2.0.1&format=xml' +
            '&login=tinyurldecoder&apiKey=R_42e55650000a21fa8cf2caa2778b5aaf' +
            '&shortUrl=' + a.href;
        else if (a.hostname === 'chilp.it')
            return 'http://p.chilp.it/api.php' + a.search;
        else if (a.hostname === 'devnull.at' && a.search.length > 0)
            return 'http://shorterlink.devnull.at/' + a.search;
        else if (a.hostname === 'digg.com' && a.search.length > 0)
            return null;
        else if (a.hostname === 'good.ly' && a.pathname.indexOf('/-') === 0)
            return null;
        else if (a.hostname === 'idek.net' && a.search.indexOf('?idek-api') !== 0)
            return a.href + '?idek-api=true';
        else if (a.hostname === 'kissa.be' && a.pathname.indexOf('/api') !== 0)
            return 'http://kissa.be/api/expander' + a.pathname;
        else if (a.hostname === 'migre.me' && a.pathname.indexOf('/api') !== 0)
            return 'http://migre.me/api_redirect.xml?url=' + a.href;
        else if (a.hostname === 'p.ly' && a.pathname.indexOf('/api') !== 0)
            return 'http://p.ly/api/expand?code=' + a.pathname.substr(1);
        else if (a.hostname === 'retwt.me')
            return 'http://api.retwt.me/expand?shortUrl=' + a.href;
        else if (a.hostname === 'r.im' && a.pathname.indexOf('/api') !== 0)
            return 'http://r.im/api/index.cfm?short_url=' + a.href;
        else if (a.hostname === 'su.pr' && a.pathname.indexOf('/api') !== 0)
            return 'http://su.pr/api/expand?shortUrl=' + a.href;
        else if (a.hostname === 'togoto.us' && a.pathname.indexOf('l-api') !== 0)
            return 'http://togoto.us/l-api.php?t=' + a.pathname.substr(1);
        else if (a.hostname === 'tr.im')
            return 'http://api.tr.im/v1/expand?shortUrl=' + a.pathname.substr(1);
        else if (a.hostname === 'u.mavrev.com' &&
            a.pathname.lastIndexOf('/') === 0 &&
            a.pathname.indexOf('/api') !== 0)
            return 'http://u.mavrev.com/api.php?short=' + a.href;
        else if (a.hostname === 'u.nu' && a.href.indexOf('?') > 0)
            return 'http://u.nu' + a.pathname;
        else if (a.hostname === 'urlenco.de' &&
            a.pathname.indexOf('PostJSON') !== 0)
            return 'http://urlenco.de/PostJSON.aspx?decode=' + a.href;
        else if (a.hostname === 'zz.gd' && a.pathname.indexOf('/api') !== 0)
            return 'http://zz.gd/api-decrypt.php?url=' + a.href;
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
        else if (a.hostname === 'api.retwt.me')
            pat = '<longUrl>(.*?)</longUrl>';
        else if (a.hostname === 'arm.in')
            pat = 'noresize><frame\\s+src="(.*?)"\\s+name="ContentWindow"';
        else if (a.href.indexOf('http://api.bit.ly/expand') === 0)
            pat = '<longUrl>(.*?)</longUrl>';
        else if (a.href.indexOf('http://api.tr.im/v1/expand') === 0)
            pat = '{"longUrl":"(.*?)"}';
        else if (a.hostname === 'cuthut.com')
            pat = '<a\\s+href="(.*?)"\\s+id="url">';
        else if (a.hostname === 'shorterlink.devnull.at')
            pat = '<META\\s+HTTP-EQUIV="Refresh"\\s+CONTENT="5;\\s+URL=(.*?)"\\s+/>';
        else if (a.hostname === 'digg.com')
            pat = 'id="diggiFrame"\\s+name="diggiFrame"\\s+noresize="noresize"\\s+src="(.*?)"';
        else if (a.hostname === 'dz.ly')
            pat = '<frame\\s+src="(.*?)"\\s+noresize="noresize"\\s+></iframe>';
        else if (a.hostname === 'gol.ly' && a.pathname === '/tinyurl.php')
            pat = '<iframe\\s+id="tree"\\s+name="tree"\\s+src="(.*?)"';
        else if (a.hostname === 'link.gs')
            pat = '<frame\\s+src="(.*?)"\\s+name="Body">'
        else if (a.hostname === 'lin.cr')
            pat = 'content="0;url=(.*?)"';
        else if (a.hostname === 'lnk.by')
            pat = '<meta\\s+HTTP-EQUIV="REFRESH"\\s+content="0; url=(.*?)">'
        else if (a.hostname === 'lnk.in')
            pat = "redirect\\('(.*?)'\\)";
        else if (a.hostname === 'm2lb.info')
            pat = '<meta\\s+http-equiv="REFRESH"\\s+content="10;url=(.*?)">';
        else if (a.href.indexOf('http://migre.me/api_redirect.xml') === 0)
            pat = '<url>(.*?)</url>';
        else if (a.hostname === 'minurl.org')
            pat = 'getTwitterSearchResults\\("(.*?)"\\);';
        else if (a.hostname === 'myurl.in')
            pat = 'window.location.href=\\("(.*?)"\\);';
        else if (a.hostname === 'nsfw.in')
            pat = 'name="query"\\s+value="(.*?)"';
        else if (a.hostname === 'oneclip.jp')
            pat = '<link\\s+rel="canonical"\\s+href="(.*)"\\s+/>';
        else if (a.hostname === 'ow.ly')
            pat = '<iframe\\s+frameborder="0"\\s+src="(.*?)"\\s+noresize="noresize"\\s+name="hootFrame"\\s+id="hootFrame"\\s+>';
        else if (a.hostname === 'p.ly')
            pat = '<success>(.*?)</success>';
        else if (a.hostname === 'p.zurl.ws')
            pat = '<blockquote><strong>(.*?)</strong></blockquote>';
        else if (a.hostname === 'qurlyq.com')
            pat = 'redirect\\(\\\'(.*?)\\\'\\);';
        else if (a.hostname === 'rt.nu')
            pat = '<meta http-equiv="refresh" content="0;url=(.*?)">';
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
        else if (a.hostname === 'unhub.com')
            pat = '<link\\s+href="(.*?)"\\s+rel="canonical"/>'
        else if (a.href.indexOf('http://urlenco.de/PostJSON.aspx') === 0)
            pat = '"url"\\s+:\\s+"(.*?)"';
        else if (a.hostname === 'viigo.im')
            pat = '<a\\s+href="(.*?)"\\s+title="Close">';
        else if (a.hostname === 'w3t.org')
            pat = '<iframe\\s+id="frame"\\s+src="(.*?)"\\s+width="100%"\\s+frameborder="0"\\s+marginheight="0"\\s+marginwidth="0">';
        else if (a.hostname === 'wva.gd')
            pat = "window.location='(.*?)'";
        else if (a.hostname === 'xr.com')
            pat = '<a\\s+href="(.*?)"\\s+target=parent>';
        else if ((a.hostname === 'idek.net' && a.search === '?idek-api=true') ||
            a.href.indexOf('http://kissa.be/api/expander/') === 0 ||
            a.href.indexOf('http://p.chilp.it/api.php') === 0 ||
            a.href.indexOf('http://r.im/api/index.cfm?short_url=') === 0 ||
            a.href.indexOf('http://togoto.us/l-api.php') === 0 ||
            a.href.indexOf('http://u.mavrev.com/api.php?short=') === 0 ||
            a.href.indexOf('http://zz.gd/api-decrypt.php') === 0)
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
        if (_node.title === 'undefined') {
            _node.title = '';
        }
        var rTitles = new Array(
            ' (' + cache[_node.href] + ')',
            ' (undefined)',
            '(' + cache[_node.href] + ')',
            '(undefined)',
            cache[_node.href]
            );
        for (var j = 0; j < rTitles.length; j++) {
            if (_node.title.search(rTitles[j]) != -1) {
                _node.title = _node.title.replace(rTitles[j], '');
            }
        }
        var linkTitle = _node.title;
        if (cache[_node.href]) {
            if (_node.title != '') {
                _node.title = linkTitle + ' (' + cache[_node.href] + ')';
            } else {
                _node.title = cache[_node.href];
            }
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
                            if (_node.title != '') {
                                _node.title = linkTitle + ' (' + cache[_node.href] + ')';
                            } else {
                                _node.title = cache[_node.href];
                            }
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