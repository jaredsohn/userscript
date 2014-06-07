// ==UserScript==
// @name bypass age verification (youtube.com)
// @namespace http://mauke.dyndns.org/stuff/greasemonkey/www.youtube.com/
// @author mauke
// @license Public Domain
// @include http://youtube.com/verify_age?*
// @include http://www.youtube.com/verify_age?*
// @include https://youtube.com/verify_age?*
// @include https://www.youtube.com/verify_age?*
// ==/UserScript==

if (!document.getElementById('verify')) {
	// we've probably already rewritten this page
	//GM_log('no "verify"');
	return;
}

var m = /[?&;]next_url=([^&;]+)/.exec(window.location.search);
if (!m) {
	GM_log('no next_url');
	return;
}

var url = decodeURIComponent(m[1]);
if (!/^https?:/.test(url)) {
	GM_log('invalid protocol');
	return;
}

if (!/^https?:\/\/www\.youtube\.com\/watch\?/.test(url)) {
	GM_log('unknown target; redirecting ...');
	window.location.href = url;
	return;
}

GM_xmlhttpRequest({
	method: 'GET',
	url: url,
	headers: {
		'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
	},
	onload: function (r) {
		if (!r.responseText) {
			GM_log('GET ' + url + ' - ' + r.status + ' ' + r.statusText + ' - no content');
			return;
		}
		document.open();
		document.write(r.responseText);
		document.close();
	},
});
