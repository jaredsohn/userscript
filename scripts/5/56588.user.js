// ==UserScript==
// @name          OneClickHoster Bypass
// @namespace     http://novusec.com
// @description   Bypass the Waiting time.
// @include       http://uploaded.to/*
// @include       http://*.egoshare.com/*
// @include       http://*.megaupload.com/*
// @include       http://*.depositfiles.com/*
// @include       http://www.badongo.com
// ==/UserScript==

var host = parent.location.hostname; 
switch (host) {
	case "uploaded.to": location.href = "javascript:document.download_form.submit();"; break;
	case "www.egoshare.com": location.href = "javascript:var timeout='0';"; break;
	case "egoshare.com": location.href = "javascript:var timeout='0';"; break;
	case "www.megaupload.com":location.href = "javascript:count=1; countdown();"; break;
	case "megaupload.com":location.href = "javascript:count=1; countdown();"; break;
	case "www.depositfiles.com":location.href = "javascript:show_url(0);"; break;
	case "depositfiles.com":location.href = "javascript:show_url(0);"; break;
	case "www.badongo.com":location.href = "javascript:checkDownload();"; break;
}