// ==UserScript==
// @name           Uploaded.to Download Linker
// @namespace      http://www.digivill.net/~joykillr
// @description    Gives a download link on Uploaded.to download page.  Bypasses the coutdown timer delay.  No third-party sites used and does not need javascript.
// @include        http://*.uploaded.to/*
// @include        http://uploaded.to/*
// ==/UserScript==

//v 0.2

function addDLLink(lnlnl) {
	var lnnl = document.createElement("div");
	//nn.setAttribute("id","vid_dl_link");
	lnnl.innerHTML = '\<a\ href\=\"'+lnlnl+'\"\ style=\"z-index:10000 !important; height: auto !important; font-size:14px!important; color:black!important; text-align:center!important; margin-left:auto!important; margin-right:auto!important; \"\>Direct\ Download\ Link\ \<\/a\>';
	lnnl.setAttribute("style", "font-size:14px!important;dispay:block!important;visibility:visible!important;height:16px!important;min-width:160px!important;color:white!important;background-color:yellow!important;width:100%!important;margin-left:auto!important;margin-right:auto!important;text-align:center!important;");
	document.body.insertBefore(lnnl,document.body.firstChild);
}

if (window.content.location.href.match(/\?id\=\w{1,9}/i)) {
	var hid = document.getElementsByTagName("form");
	for (var b=0; b<hid.length; b++) {
		if ((hid[b].getAttribute("name"))&&(hid[b].getAttribute("name").match(/download_form/))) {
			if (hid[b].getAttribute("action")) {addDLLink(hid[b].getAttribute("action"))}
		}
	}
}
