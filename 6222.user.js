// ==UserScript==
// @name Show Competitors
// @description Displays a list of related websites (competitors) based del.icio.us "related pages"
// @include http://*
// ==/UserScript==

// author: Piotr Zielinski
// www: http://www.cl.cam.ac.uk/~pz215/
// licence: GPL

// MD5 stuff (stolen from another greasemonkey script, don't remember the name)
function hex_md5(s) {
	return binl2hex(core_md5(str2binl(s), s.length * 8));
}
function core_md5(x, len) {
	x[len >> 5] |= 0x80 << ((len) % 32);
	x[(((len + 64) >>>9) << 4) + 14] = len;
	var a = 1732584193;
	var b = -271733879;
	var c = -1732584194;
	var d = 271733878;
	for (var i = 0; i < x.length; i += 16) {
		var olda = a;
		var oldb = b;
		var oldc = c;
		var oldd = d;
		a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
		d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
		c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
		b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
		a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
		d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
		c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
		b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
		a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
		d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
		c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
		b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
		a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
		d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
		c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
		b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
		a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
		d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
		c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
		b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
		a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
		d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
		c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
		b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
		a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
		d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
		c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
		b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
		a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
		d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
		c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
		b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
		a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
		d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
		c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
		b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
		a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
		d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
		c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
		b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
		a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
		d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
		c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
		b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
		a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
		d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
		c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
		b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
		a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
		d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
		c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
		b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
		a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
		d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
		c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
		b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
		a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
		d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
		c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
		b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
		a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
		d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
		c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
		b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
		a = safe_add(a, olda);
		b = safe_add(b, oldb);
		c = safe_add(c, oldc);
		d = safe_add(d, oldd);
	}
	return Array(a, b, c, d);
}
function md5_cmn(q, a, b, x, s, t) {
	return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function md5_ff(a, b, c, d, x, s, t) {
	return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t) {
	return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t) {
	return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t) {
	return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}
function safe_add(x, y) {
	var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	return (msw << 16) | (lsw & 0xFFFF);
}
function bit_rol(num, cnt) {
	return (num << cnt) | (num >>>(32 - cnt));
}
function str2binl(str) {
	var bin = Array();
	var mask = (1 << 8) - 1;
	for (var i = 0; i < str.length * 8; i += 8) {
		bin[i >> 5] |= (str.charCodeAt(i / 8) & mask) << (i % 32);
	}
	return bin;
}
function binl2hex(binarray) {
	var hex_tab = '0123456789abcdef';
	var str = '';
	for (var i = 0; i < binarray.length * 4; i++) {
		str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
	}
	return str;
}
// end MD5 stuff
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function prepare() {
    var site = document.URL.match(new RegExp("(https?://[A-Za-z0-9.]+/).*"))[1];
    var body = document.getElementsByTagName("body")[0];
    var head = document.getElementsByTagName("head")[0];

    var node = document.createElement('div');
    node.innerHTML = "<a id='competitor-header'>C</a>" +
	"<div id='competitor-rest'><ol id='competitor-list'></ol>" +
	"<a id='competitor-refresh'>refresh</a> " +
	"<a href='http://del.icio.us/url/check?url=" + site + 
	"'>del.icio.us</a> " +
	"<a href='http://labs.google.com/sets?hl=en&q1=" + site +
	"'>google sets</a> " +
	"<a href='http://www.google.com/search?hl=en&lr=&q=related%3A" + site +
	"'>google related</a> " +
	"</div>";

    addGlobalStyle("div.competitor a { color: #00f; cursor: pointer; text-decoration: underline; } ");
    addGlobalStyle("div.competitor { font: 11px sans; } ");
		   

    body.insertBefore(node, body.firstChild);

    var header = document.getElementById("competitor-header");
    var rest = document.getElementById("competitor-rest");
    var list = document.getElementById("competitor-list");
    var fetch = document.getElementById("competitor-refresh");

    node.className = "competitor";  
    node.style.display = "block";
    node.style.backgroundColor = "#ddf";
    node.style.border = "1px solid #000";
    node.style.position = 'absolute';
    node.style.top = '0px';
    node.style.right = '0px';
    node.style.padding = "1ex";
    node.style.margin = "0ex";
    node.style.zIndex = '200';

    header.style.display = "block";
    header.style.cursor = 'pointer';
    header.style.padding = "0ex";
    header.style.textAlign = "center";
    header.style.margin = "0ex";
    header.addEventListener("click", showcompetitorlist, false);

    rest.style.display = "none";

    list.style.display = "block";
    list.style.backgroundColor = "#eef";
    list.style.border = "1px solid #000";
    list.style.padding = "1ex 4ex 1ex";
    list.style.margin = "1ex 0ex 1ex 0ex";

    fetch.addEventListener("click", fetchcompetitorlist, false);

    var relatedhtml = GM_getValue(site, null);

    if (relatedhtml) 
	applylist(site, relatedhtml);
}

function applylist(site, relatedhtml) {
    var header = document.getElementById("competitor-header");
    var list = document.getElementById("competitor-list");

    list.innerHTML = relatedhtml;
    GM_setValue(site, relatedhtml);
}

function showcompetitorlist(event) {
    var header = document.getElementById("competitor-header");
    var list = document.getElementById("competitor-list");
    var rest = document.getElementById("competitor-rest");

    rest.style.display = "block";
    header.innerHTML = "hide competitors / related sites";
    header.removeEventListener("click", showcompetitorlist, false);
    header.addEventListener("click", hidecompetitorlist, false);
}

function hidecompetitorlist(event) {
    var header = document.getElementById("competitor-header");
    var list = document.getElementById("competitor-list");
    var rest = document.getElementById("competitor-rest");

    rest.style.display = "none";
    header.innerHTML = "show competitors / related sites";
    header.removeEventListener("click", hidecompetitorlist, false);
    header.addEventListener("click", showcompetitorlist, false);
}

function fetchcompetitorlist(event) {
    var site = document.URL.match(new RegExp("(https?://[A-Za-z0-9.]+/).*"))[1];
    var fetch = document.getElementById("competitor-refresh");
    fetch.innerHTML = "refreshing the list ...";
    fetch.style.textDecoration = "none";
    fetch.removeEventListener("click", fetchcompetitorlist, false);
	
//     GM_log("fetching " + site);
    GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://del.icio.us/url/' + hex_md5(site) + "?related",
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	    'Accept': 'application/atom+xml,application/xml,text/xml',
	},

	onload: function(responseDetails) {
	    var doc = document.createElement('div');
	    doc.innerHTML = responseDetails.responseText;

	    var related = doc.getElementsByTagName("ol")[0];
	    applylist(site, related.innerHTML);

	    fetch.addEventListener("click", fetchcompetitorlist, false);
	    fetch.innerHTML = "refresh";
	    fetch.style.textDecoration = "underline";
	}
	});
}

prepare();


