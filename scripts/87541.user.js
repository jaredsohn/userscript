// ==UserScript==
// @name           Steam Forums Reply Status
// @namespace      http://userscripts.org/scripts/show/87541
// @description    Steam Forums Reply Status
// @include        http://forums.steampowered.com/forums/*
// @date           2010-10-06
// @creator        mkey
// ==/UserScript==

	var d=document, byId=d.getElementById, create=d.createElement, byClass=d.getElementsByClassName, byTag=d.getElementsByTagName;
	
(function(){
	if (d.URL.indexOf('showthread')>0 || d.URL.indexOf('newreply')>0) Thread();
	else if (d.URL.indexOf('forumdisplay')>0) Board();
})()

function Thread(){
	var btn= byId('qr_submit');
	if (!btn){
		var btn= byId('vB_Editor_001_save');
		if (!btn) return;
	}
	btn.addEventListener('click', function(e){
		var a= d.URL;
		var i= a.indexOf('t=');
		if (i>0){
			i+=2;
			var j= a.indexOf("&", i);
			if (j>0) a= a.substring(i, j);
			else a= a.substring(i);
		} else {
			a= byTag("form")[2].getAttribute("action").split("t=");
			a= a[a.length-1];
		}
		GM_setValue(a, 1);
		GM_log('You have posted in thread: '+a);
	}, false);
}

function Board(){
	var td= byId("threadbits_forum_14");
	if (!td){
		td= byId("threadslist");
		if (!td) return;
	}
	td= td.getElementsByClassName("alt1");
	var k= td.length;
	if (k<3) return;
	var a, i, j, k;
	for (i= k%3; i<td.length; i+=3){
		a= td[i+1].getElementsByTagName("a");
		if (a.length>0){
			a= a[0].href.split('t=');
			a= a[a.length-1];
			if (GM_getValue(a, 0)){
				GM_log('Posts detected in thread: '+a);
				td[i+1].setAttribute("style", "background-color:#393939;");
			}			
		}
	}
}

