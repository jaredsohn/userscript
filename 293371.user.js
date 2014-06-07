// ==UserScript==
// @name           Tusfiles Auto Downloader Dvayshare
// @description    Simply uncheck "use our download manager" and submit download button automatically from tusfiles.net
// @namespace      http://dvayshare.blogspot.com/
// @author         dvayshare
// @version        3.0.0
// @date           27-01-2014
// @include        http://www.tusfiles.net/*
// @include        http://tusfiles.net/*
// ==/UserScript==

var f=document.getElementsByTagName('form');
if(f[0].quick != null) {
	//uncheck "use out download manager
	f[0].quick.checked = false;

	//submit/click download button
	var d=document.getElementById('btn_download');
	if(d != null) d.click();
}