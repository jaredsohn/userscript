// ==UserScript==
// @name           Rapidshare Download Delay Bypass
// @namespace      http://www.digivill.net/~joykillr
// @description    Script for bypassing rapidshare countdown.  Now requires javascript enabled, at least for the final download page.
// @include        http://*.rapidshare.com/*
// @include        http://rapidshare.com/*
// @include        http://*.rapidshare.de/*
// @include        http://rapidshare.de/*
// ==/UserScript==
// v 2.6 - 20081003

var getIt, DLbox;
function insertBox(passData) {
	DLbox = document.createElement("div");
	DLbox.innerHTML = passData;
	document.getElementById("inhaltbox").insertBefore(DLbox, document.getElementById("inhaltbox").firstChild);
	
	GM_addStyle("#dl,#premiumtable2{display:none!important;}");
}

function xpath(doc, xpath) {
	return doc.evaluate(xpath, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
	
if (document.getElementById("dl")) {
	var screlms = document.getElementsByTagName("script");
	for (screx=0;screx<screlms.length;screx++) {
		if (screlms[screx].textContent.indexOf('form name="dlf"')!=-1){
			getIt = screlms[screx].textContent.toString();
			break;
			}
		}
	if (getIt.indexOf("unescape('")!=-1) {
		getIt = getIt.split("unescape('")[1].split("')")[0];
		getIt = unescape(getIt);
	} else {
		getIt = getIt.split('var tt = \'')[1].split('\<\/form>\';')[0];getIt = getIt + "\<\/form\>";
		getIt = getIt.replace(/\'\s*\+\s*\'/gim,'');
	}
	if (getIt!=null&&getIt!="") {insertBox(getIt);}
}