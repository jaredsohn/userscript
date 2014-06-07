// ==UserScript==
// @name           YYG Chat 2
// @description    Embeds the unofficial YYG IRC chat on YoYoGames.
// @author         T-Dub and Snacob
// @include        http://forums.yoyogames.com*
// @include	   http://www.forums.yoyogames.com*
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version        2.0
// ==/UserScript==

var userName = document.getElementsByTagName("a")[7].innerHTML;
if (userName != "Register") {
	setInterval(getPms,"1000");
}
function getPms() {
	$('#email_count').load('/ #email_count');
}

document.getElementsByClassName("left")[0].innerHTML = '<li><a href="http://www.yoyogames.com">Home</a></li><li><a href="/">Forums</a></li><li><a href="http://wiki.yoyogames.com/" onclick="window.open(this.href);return false;">Wiki</a></li><li class="last"><a href="/?a=chat">Chatroom</a></li>';
if (window.location == "http://forums.yoyogames.com/?a=chat" || window.location == "http://www.forums.yoyogames.com/?a=chat") {
	var userName = document.getElementsByTagName("a")[7].innerHTML;
	if (userName == "Register") {
		window.location="http://www.yoyogames.com/login"
	}
	else
	{
	window.location="http://yygfc.110mb.com/?"+userName
	}
}
