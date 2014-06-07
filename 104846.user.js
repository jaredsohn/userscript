// ==UserScript==
// @name           Gmail Font Changer
// @namespace      http://skoshy.com
// @description    Change Gmail's UI Font
// @include        http*://mail.google.com/*
// @version        2013.03.13.13.49
// ==/UserScript==

var font = new Array();
font['mono'] = 'Droid Sans Mono';

// CHANGE THIS - This is where you define the font you want to use! Make sure the name is the name of the font and the url points to a valid font css file
font['name'] = 'Source Sans Pro';
font['url'] = 'http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700,400italic,700italic';

var frame;

var count;
var interval = setInterval(addFont, 1000);

function addFont() {
	if (document.getElementsByClassName('cP')[0]) {
		frame = 'canvas';
		clearInterval(interval);
		addFontLink();
		addGmailStyle();
	}
	if (document.getElementById('loading')) {
		frame = 'outside';
		clearInterval(interval);
		addFontLink();
		addGmailStyle();
	}
	count++;
	if (count > 10) {
		clearInterval(interval);
	}
}

function addFontLink() {
	// First, make sure the protocols match
    var gmailProtocol = window.location.protocol;
    
    if (gmailProtocol == 'https:' && font['url'].indexOf('http://') == 0)
    	font['url'] = font['url'].replace('http://', 'https://');
    else if (gmailProtocol == 'http:' && font['url'].indexOf('https://') == 0)
    	font['url'] = font['url'].replace('https://', 'http://');
    
    var node = document.createElement('link');
	node.href = font['url'];
	node.rel = 'stylesheet';
	node.type = 'text/css';
	document.getElementsByTagName('head')[0].appendChild(node);
}

function addGmailStyle() {
	GM_addStyle('#gb, .VP5otc-Sqv85e, .VP5otc-tOAp0c, .VP5otc-ynQFL, .VP5otc-MdoD9, .J-Zh-I, .FJ, .FQ, body, td, input, textarea, select, .Kj-JD-K7, .Kj-JD-Jz, .Kj-JD-Jl, .Kj-JD-Jl button, .PBRhee, .VTiQkd, .EeNUsc, .AX, .AR, .E .J-M-JJ, .py, .w6, .w9, .w7, .w8, .ah, div.wa, .yS, .pN, .eHIyEf, .JA-Kn-Jr-Kw-Jn, .LM, .BXFJCd, .QLQBrd, .om .Pf-K-I, .UC9RM .J-KU-Jg, .tq, .m8, .ha, .Am, .Lf .Ld, .Lf .Lx, .Lf .Ly, .fX .J-JN-I, .Ma, .Mc, .Mb, .L9, .vCA6Cf, .j7eh4b, .DT, .Dw, .EW, .Ej, .Dw .J-M, .Eu .J-M, .bd, .RG, .Rh, .rRieTd, .hJxxNd, .RN, .VFHDMe, .M4, .RS, .d8, .R5, .RQ, .eq, .Nl .J-M-JJ, .pwZiAd-kgDTEf, .yo { font-family: "'+font['name']+'",arial,sans-serif; } .GcwpPb-txTtjf, .p6, .Y4, .ar, .hU, .hV, .d0, .MI3LG, .sS .tb, .s3, .Mh { font-family: "'+font['name']+'",verdana,arial,sans-serif; } .U5 { font-family: "'+font['name']+'",arial,sans-serif ! important; } span.wh { font-family: "'+font['mono']+'",courier new; } .om .Pf-kwDuUb .Jd-SUR3Rd, .om .Pf-kwDuUb .LSmFke, .om .Pf-hqkNDb, .om .Pf-D9F5jb .J-K-I-Jz, .om .EEBHBc-h9d3hd, .om .EEBHBc-H-Kv .J-K-I-Jz { font-family: sans-serif; } .m2, .os { font-family: monospace; } .gu { font-family: Courier New,courier,monospace; } .Mr8HO, .KA-k77Iif-Jw .J-K-I, .KA-v6WJk-JQ, .KA-Jd-SUR3Rd, .KA-ubqdZc-J7, .KA-DyVDA-INgbqf, .EEBHBc-h9d3hd, .Pf-K-I, .Pf-kwDuUb .XJ5RCc-Jd, .Pf-kwDuUb .LSmFke, .Pf-hqkNDb, .Pf-D9F5jb .J-K-I-Jz, .KA-k77Iif-Jw .J-DrZ0pc-J8-J9, .KA-k77Iif-Jw .J-INgbqf, .KA-k77Iif-Jw .J-INgbqf-I, .KA-k77Iif-Jw .J-INgbqf-M-I, .xJzy8c-ge6pde .xJzy8c-ge6pde-uDEFge { font-family: arial,sans-serif; }');
}