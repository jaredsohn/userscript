// ==UserScript==
// @name           YYG Chat
// @description    Embeds the unofficial YYG IRC chat on YoYoGames.
// @author         T-Dub
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
		userName = "Guest%3F%3F";
	}
	var chatCode = '<iframe id="chatFrame" src="http://widget.mibbit.com/?channel=%23yyg-chat&server=irc.slashnet.org&noServerTab=true&nick=' + userName + '&customprompt=Welcome%20to%20the%20Unofficial%20YYGF%20Chatroom&PromptBackground=%23141414&PromptColor=%23A9E071" frameborder="0" scrolling="false" width="500px" height="500px"></iframe>';
	document.getElementsByClassName("col-box-max")[0].innerHTML = '<div class="col-box-max-top"><h1 id="heading-forums">Chatroom<span></span></h1></div><div class="forum-body"><center>' + chatCode + '<br/><div id="pmChatBox"></div><a href="http://widget.mibbit.com/?channel=%23yyg-chat&server=irc.slashnet.org&noServerTab=true&nick=' + userName + '">[Click Here for Full Screen Chat]</a></center></div>';
}