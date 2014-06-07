// ==UserScript==
// @name           RlsLog Reader
// @namespace      #aVg
// @description    For readers of Releaselog. For now, just removes malicious / bad DOM + fixes images and removes tracking.
// @include        http://www.rlslog.net/*
// @version        0.1.4
// ==/UserScript==
function $(A) {return document.getElementById(A)}
function remove(A) {if(A)A.parentNode.removeChild(A);return remove;}
function loop(A, B, C) {
	A = document.evaluate("." + A, C || document.body, null, 6, null);
	var I = A.snapshotLength;
	while(--I >= 0) B.apply(A.snapshotItem(I));
}
var cont = $("content"), imgW = cont.offsetWidth;
var loc = location.pathname.substring(1);
if (loc=="" || /^page\/(\d+)/.test(loc)) {
	document.title = RegExp.$1  ? "Page " + RegExp.$1 : "Home";
	loop("//img", function() {
		this.addEventListener("load", function() {
			if(this.naturalWidth != this.width) {
				if(this.naturalWidth > imgW) this.width = imgW;
				else this.removeAttribute("width");
			}
			this.removeAttribute("height");
		}, false);
	});
	loop("//p/img/..", function() {
		this.firstChild.addEventListener("load", function() {
			if(this.clientWidth == 0) remove(this.parentNode);
		}, false);
	});
	for(var i = cont.childNodes.length - 1; i>=0; --i) {
		var ch = cont.childNodes[i];
		if(ch.nodeName=="SPAN" || (ch.nodeName=="DIV" && ch.className!="entry")) remove(ch);
	}
} else {
	document.title = document.title.substring(26);
	remove($("keywordsblock"));
	GM_addStyle("#comment {background:none!important}");
	$("author").value = "Userscripts.org";
	$("email").value = "uso.script@gmail.com";
}