// ==UserScript==
// @name           ExpandMyURL
// @namespace      http://www.expandmyurl.com
// @description    Expand shortened URLs via ExpandMyURL.com
// @include        http://twitter.com/*
// @include        http://search.twitter.com/*
// @exclude        http://bit.ly
// @exclude        http://tinyurl.com
// @exclude        http://digg.com
// @exclude        http://tr.im
// @exclude        http://is.gd
// @exclude        http://307.to
// @exclude        http://adjix.com
// @exclude        http://b23.ru
// @exclude        http://bacn.me
// @exclude        http://bloat.me
// @exclude        http://budurl.com
// @exclude        http://chilp.it
// @exclude        http://cli.gs
// @exclude        http://clipurl.us
// @exclude        http://dwarfurl.com
// @exclude        http://ff.im
// @exclude        http://fff.to
// @exclude        http://href.in
// @exclude        http://idek.net
// @exclude        http://korta.nu
// @exclude        http://lin.cr
// @exclude        http://ln-s.net
// @exclude        http://loopt.us
// @exclude        http://merky.de
// @exclude        http://moourl.com
// @exclude        http://nanourl.se
// @exclude        http://notlong.com
// @exclude        http://ow.ly
// @exclude        http://peaurl.com
// @exclude        http://ping.fm
// @exclude        http://piurl.com
// @exclude        http://pnt.me
// @exclude        http://poprl.com
// @exclude        http://qlnk.net
// @exclude        http://reallytinyurl.com
// @exclude        http://rubyurl.com
// @exclude        http://short.ie
// @exclude        http://short.to
// @exclude        http://smallr.com
// @exclude        http://sn.vc
// @exclude        http://snipr.com
// @exclude        http://snipurl.com
// @exclude        http://path.to
// @exclude        http://snurl.com
// @exclude        http://tiny.cc
// @exclude        http://togoto.us
// @exclude        http://tra.kz
// @exclude        http://twurl.cc
// @exclude        http://twurl.nl
// @exclude        http://u.mavrev.com
// @exclude        http://ur1.ca
// @exclude        http://url.az
// @exclude        http://url.ie
// @exclude        http://urlx.ie
// @exclude        http://w34.us
// @exclude        http://xrl.us
// @exclude        http://yep.it
// @exclude        http://zi.ma
// @exclude        http://zurl.ws
// ==/UserScript==

var services = {
	'bit.ly': true,
	'tinyurl.com': true,
	'digg.com': true,
	'tr.im': true,
	'is.gd': true,
	'307.to': true,
	'adjix.com': true,
	'b23.ru': true,
	'bacn.me': true,
	'bloat.me': true,
	'budurl.com': true,
	'chilp.it': true,
	'cli.gs': true,
	'clipurl.us': true,
	'dwarfurl.com': true,
	'ff.im': true,
	'fff.to': true,
	'href.in': true,
	'idek.net': true,
	'korta.nu': true,
	'lin.cr': true,
	'ln-s.net': true,
	'loopt.us': true,
	'merky.de': true,
	'moourl.com': true,
	'nanourl.se': true,
	'notlong.com': true,
	'ow.ly': true,
	'peaurl.com': true,
	'ping.fm': true,
	'piurl.com': true,
	'pnt.me': true,
	'poprl.com': true,
	'qlnk.net': true,
	'reallytinyurl.com': true,
	'rubyurl.com': true,
	'short.ie': true,
	'short.to': true,
	'smallr.com': true,
	'sn.vc': true,
	'snipr.com': true,
	'snipurl.com': true,
	'path.to': true,
	'snurl.com': true,
	'tiny.cc': true,
	'togoto.us': true,
	'tra.kz': true,
	'twurl.cc': true,
	'twurl.nl': true,
	'u.mavrev.com': true,
	'ur1.ca': true,
	'url.az': true,
	'url.ie': true,
	'urlx.ie': true,
	'w34.us': true,
	'xrl.us': true,
	'yep.it': true,
	'zi.ma': true,
	'zurl.ws': true
}

function expand() {
	var links = document.evaluate("//a[@href]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < links.snapshotLength; i++) {
		var a = links.snapshotItem(i);
		if (a.hostname in services)
			a.href = 'http://www.expandmyurl.com/?small_url=' + a.href;
	}

	setTimeout(expand, 10000);
}

expand();