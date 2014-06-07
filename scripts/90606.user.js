// ==UserScript==
// @name          ByPassCensorship
// @description    Redirects Censored Pages To A Proxy Server. The warning text on the blocked page must be included in the script.
// @include        http://*
// @include        https://*
// @exclude        http://userscripts.org/*
// ==/UserScript==

/*
-------------------------------------------------
Title:			ByPass Censorship
-------------------------------------------------
Author:		yasakresim
-------------------------------------------------
DateFormat:		DD/MM/YYYY
-------------------------------------------------
Version Date:	16/11/2010
-------------------------------------------------
Version:		1.0
-------------------------------------------------
 INSPIRED BY:
"Redirector and word blocker" BY JARBLE: http://userscripts.org/scripts/show/84016 
"RandomProxy" BY RASG:  http://userscripts.org/scripts/show/77042 
-------------------------------------------------
Thank you folks. This is all I can do. I am indeed a beginner, and this is my first GM script.
I hope someone will take this script far better. Just get the idea.
-------------------------------------------------
*/

/* PROXY LIST */
var matriz =	[
				'https://gaopiproxy.appspot.com/',
				'https://so-proxy.appspot.com/',
				'http://ipgoto.appspot.com/',
				'https://mirrornt.appspot.com/',
				'https://mirrorrr.appspot.com/',
				'https://sivanproxy.appspot.com/',
				'https://proxybay.appspot.com/' 
				];
var proxy = matriz[Math.floor(Math.random() * matriz.length)];
var block = 0;

/* WORD LIST */
//the text that displays when a site is blocked by censorship
//edit this list. add as many as you wish, one per array.
wordBlock("konumundaki sunucu");
wordBlock("server not found");
wordBlock("this site is blocked");
wordBlock("sample blocked text 4");
wordBlock("sample blocked text 5");

function wordBlock(word){
if(document.body.innerHTML.indexOf(word) != -1){
block++;
}
}
		
if (block > 0) {
	window.location.replace(location.href.replace(location.protocol + '//', proxy));
	for (var i=0,link; (link=document.links[i]); i++) {
		if (link.href.indexOf(proxy) < 0) {
			link.href = link.href.replace(link.href.substring(0,7), proxy);
		}
	}
}