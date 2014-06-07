// ==UserScript==
// @name          LOR message filter
// @description   Filter annoyng messages by USERNICK
// @exclude http://*linux.org.ru/forum/*/
// @exclude http://*linux.org.ru/news/*/
// @exclude http://*linux.org.ru/gallery/*/
// @exclude http://*linux.org.ru/polls/*/
// @include http://*linux.org.ru/forum/*/*
// @include http://*linux.org.ru/news/*/*
// @include http://*linux.org.ru/gallery/*/*
// @include http://*linux.org.ru/polls/*/* 
// ==/UserScript==
//
// License: GPL
// Author:  sdio ( http://www.linux.org.ru/whois.jsp?nick=sdio )
// Version: 0.6

// ignored users
var ignored = 'Ty3uK,Screwdriver,catap';

// Hash of Blacklist users (global variable)
var BlackList = new Array;

var ign = new Array;
ign = ignored.split(',');
for (var i=0; i<ign.length; i++){
	var nick = ign[i];
	BlackList[nick] = 1;
}

var jq;
if (typeof(GM_log) == 'function') {
    // For FF, Mozilla (with greasemonkey sandbox)
    jq = unsafeWindow.$;
} else {
	jq = $;
}

jq("article.msg").each(function() {
	var nick = 'anonymous';
	var msg = jq(this);
	var a_nick = jq("div.sign a", msg);
	if (a_nick.html()) {
		nick = a_nick.text();
	}
	if (BlackList[nick]) {
		msg.hide();
	} else {
               jq("div.title", this).append('[<a href="http://www.linux.org.ru/show-replies.jsp?output=rss&nick=' + nick + '" >' + nick + ' events</a>]');
    }

 }
);
