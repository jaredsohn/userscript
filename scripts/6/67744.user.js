// ==UserScript==
// @name           Linkification
// @namespace      http://userscripts.org/users/splurov/
// @include        *
// ==/UserScript==

(function(){

// (c) http://data.iana.org/TLD/tlds-alpha-by-domain.txt
var domains = ['ac', 'ad', 'ae', 'aero', 'af', 'ag', 'ai', 'al', 'am', 'an', 'ao', 'aq', 'ar', 'arpa', 'as', 'asia', 'at', 'au', 'aw', 'ax', 'az', 'ba', 'bb', 'bd', 'be', 'bf', 'bg', 'bh', 'bi', 'biz', 'bj', 'bm', 'bn', 'bo', 'br', 'bs', 'bt', 'bv', 'bw', 'by', 'bz', 'ca', 'cat', 'cc', 'cd', 'cf', 'cg', 'ch', 'ci', 'ck', 'cl', 'cm', 'cn', 'co', 'com', 'coop', 'cr', 'cu', 'cv', 'cx', 'cy', 'cz', 'de', 'dj', 'dk', 'dm', 'do', 'dz', 'ec', 'edu', 'ee', 'eg', 'er', 'es', 'et', 'eu', 'fi', 'fj', 'fk', 'fm', 'fo', 'fr', 'ga', 'gb', 'gd', 'ge', 'gf', 'gg', 'gh', 'gi', 'gl', 'gm', 'gn', 'gov', 'gp', 'gq', 'gr', 'gs', 'gt', 'gu', 'gw', 'gy', 'hk', 'hm', 'hn', 'hr', 'ht', 'hu', 'id', 'ie', 'il', 'im', 'in', 'info', 'int', 'io', 'iq', 'ir', 'is', 'it', 'je', 'jm', 'jo', 'jobs', 'jp', 'ke', 'kg', 'kh', 'ki', 'km', 'kn', 'kp', 'kr', 'kw', 'ky', 'kz', 'la', 'lb', 'lc', 'li', 'lk', 'lr', 'ls', 'lt', 'lu', 'lv', 'ly', 'ma', 'mc', 'md', 'me', 'mg', 'mh', 'mil', 'mk', 'ml', 'mm', 'mn', 'mo', 'mobi', 'mp', 'mq', 'mr', 'ms', 'mt', 'mu', 'museum', 'mv', 'mw', 'mx', 'my', 'mz', 'na', 'name', 'nc', 'ne', 'net', 'nf', 'ng', 'ni', 'nl', 'no', 'np', 'nr', 'nu', 'nz', 'om', 'org', 'pa', 'pe', 'pf', 'pg', 'ph', 'pk', 'pl', 'pm', 'pn', 'pr', 'pro', 'ps', 'pt', 'pw', 'py', 'qa', 're', 'ro', 'rs', 'ru', 'rw', 'sa', 'sb', 'sc', 'sd', 'se', 'sg', 'sh', 'si', 'sj', 'sk', 'sl', 'sm', 'sn', 'so', 'sr', 'st', 'su', 'sv', 'sy', 'sz', 'tc', 'td', 'tel', 'tf', 'tg', 'th', 'tj', 'tk', 'tl', 'tm', 'tn', 'to', 'tp', 'tr', 'travel', 'tt', 'tv', 'tw', 'tz', 'ua', 'ug', 'uk', 'us', 'uy', 'uz', 'va', 'vc', 've', 'vg', 'vi', 'vn', 'vu', 'wf', 'ws', 'ye', 'yt', 'yu', 'za', 'zm', 'zw'];

// (c) http://yellow5.us/firefox/linkification/
var tagsForSkip = ['a', 'applet', 'area', 'embed', 'frame', 'frameset', 'head', 'iframe', 'img', 'map', 'meta', 'noscript', 'object', 'option', 'param', 'script', 'select', 'style', 'textarea', 'title'];

var inArray = function(value, items) {
	for (var i = 0; items[i] && value != items[i]; i++);
	return value == items[i];
}

var urlsRegExp = /(^|[\s()\[\]_:~+@*"'>])((?:https?|ftp|irc):\/\/)?([-a-z\d;:&=+$,%_.!~*'()]+@)?((?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:(www|irc|ftp)\.)?(?:(?:[a-z\d]|[a-z\d][a-z\d-]*[a-z\d])\.)+([a-z]{2,6}))(:\d+)?(\/(?:[-\w.!~*'()%:@&=+$,;\/]*[\w~*%@&=+$\/])?(?:\?(?:[-\w;\/?:@&=+$,.!~*'()%\[\]|]*[\w\/@&=+$~*%])?)?(?:#(?:[-\w;\/?:@&=+$,.!~*'()%]*[\w\/@&=+$~*%])?)?|\b)/i

var linksCounter = 0;

var current = document.body;
while (current) {
	if (current.nodeName == '#text' && (match = current.nodeValue.match(urlsRegExp)) && inArray(match[6], domains)) {
		var url;
		if (match[3] && ! match[2] && ! match[5] && ! match[8] && (match[3].indexOf(':') == -1 || match[3].indexOf('mailto:') == 0)) {
			url = (match[3].indexOf('mailto:') == -1 ? 'mailto:' : '')
					+ match[3]
					+ match[4];
		}
		else {
			url = (match[2] ? match[2] : (! match[5] || match[5] == 'www' ? 'http' : match[5]) + '://')
					+ (match[3] ? match[3] : '')
					+ match[4]
					+ (match[7] ? match[7] : '')
					+ (match[8] ? match[8] : '');
		}
		if (url) {
			var range = document.createRange();
			range.setStart(current, match.index + match[1].length);
			range.setEnd(current, match.index + match[0].length);
			var a = document.createElement('a');
			a.setAttribute('href', url);
			a.setAttribute('class', 'linkified');
			a.appendChild(range.extractContents());
			range.insertNode(a);
			range.detach();
			linksCounter++;
		}
	}
	if (current.tagName && !inArray(current.tagName.toLowerCase(), tagsForSkip) && current.firstChild) {
		current = current.firstChild;
	}
	else if (current.nextSibling) {
		current = current.nextSibling;
	}
	else {
		do {
			current = current.parentNode;
		} while (!current.nextSibling && current.parentNode);
		current = current.nextSibling;
	}
}

if (linksCounter > 0) {
	var style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode('a.linkified:before {content: "~"; color: #e00;}'));
	document.getElementsByTagName('head')[0].appendChild(style);
}

})();