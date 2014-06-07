// ==UserScript==
// @name          OneClickHoster Bypass
// @namespace     http://tamcore.eu
// @description   Bypass the Waiting time. More coming soon.
// @include       http://*myfilez.info/*
// @include       http://*load.to/*
// @include       http://*netload.in/*
// @include       http://*depositfiles.com/*
// @include       http://*4shared.com/*
// ==/UserScript==

switch (parent.location.hostname) {
	case "myfilez.info":location.href = "javascript:DLIT();"; break;
	case "www.myfilez.info":location.href = "javascript:DLIT();"; break;
	case "load.to":location.href = "javascript:var nCountDown = 0;"; break;
	case "www.load.to":location.href = "javascript:var nCountDown = 0;"; break;
	case "netload.in":location.href = "javascript:change();"; break;
	case "www.netload.in":location.href = "javascript:change();"; break;
	case "depositfiles.com":location.href = "javascript:show_url(0);"; break;
	case "www.depositfiles.com":location.href = "javascript:show_url(0);"; break;
	case "4shared.com":location.href = "javascript:var c = 0;"; break;
	case "www.4shared.com":location.href = "javascript:var c = 0;"; break;
}
