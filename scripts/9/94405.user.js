// ==UserScript==
// @name           WMT Updater
// @namespace      http://runedev.info/
// @description    Fixes & Updates For WatchMovies-Tonight
// @version        1.5
// @author         IceXaos
// @include        http*watchmovies-tonight.com/*
// ==/UserScript==


// AUTO-LOGIN
var user = "USERNAME";	// DON'T REMOVE QUOTATION MARKS
var pass = "PASSWORD";	// DON'T REMOVE QUOTATION MARKS

var username = window.document.getElementById("username");
var password = window.document.getElementById("password");
var login = window.document.getElementById("login_form");

if (login != undefined && username != undefined && password != undefined && user != "USERNAME" && pass != "PASSWORD")
{
	username.value = user;
	password.value = pass;
	login.getElementsByTagName("input")[2].click();
}
else if (login != undefined && username != undefined && password != undefined)
{
	user = prompt("Enter your username.");
	pass = prompt("Enter your password.");
	alert("You can preset these in the script source to auto-login.");

	username.value = user;
	password.value = pass;
	login.getElementsByTagName("input")[2].click();
}


// NEVER LOG OUT
var timeout = 45;	// MINUTES TO REFRESH (DEFAULT 45 / MAX 59)
setTimeout("window.location.reload(true)", timeout * 60 * 1000);


// RESIZE OPTION MENU TEXT IN MOVIE PAGE TO 12PX
var save;
var leftColumn = window.document.getElementById("left_colm");

if (leftColumn != undefined)
{
	save = leftColumn.innerHTML;
	leftColumn.innerHTML = '<style type="text/css">#submit_btn, #watchlist_btn, #favorites_btn, #req_links_btn, .addthis_button, #sendmsg_btn, #adduser_btn, #blockuser_btn, #reportuser_btn, #rateuser_btn { font-size: 12px ! important; }</style>' + save;
}


// CHATBOX
var chat = window.document.getElementById("chatbox");
var chatInput = window.document.getElementById("chatmessage");

if (chatInput != undefined)
{
	chatInput.setAttribute("autocomplete", "off");	// AUTOCOMPLETE OFF
	chatInput.focus();				// FOCUS MOUSE ON TEXT INPUT
}

if (chat != undefined)
{
	chat.getElementsByTagName("h1")[0].innerHTML += ' <a href="javascript:var auto_refresh = setInterval(function (){var rand = new Date().getTime();$(\'#livechat_inc\').load(\'../includes/chatbox.php?randnum=\' + rand );}, 1000);" style="text-decoration: none; float: right; font-size: 11px;" onClick="this.style.display = \'none\'" id="insta">Make Instant</a>';	// INSTANT REFRESH
}


// Change Name Colors
var x;
var tags = window.document.getElementsByTagName("a");

for (x in tags)
{
	if (tags[x] != undefined && tags[x].innerHTML == "IceXaos" || tags[x].innerHTML == "IceXaos:")
	{
		tags[x].style.color = "#660000";
	}
	else if (tags[x] != undefined && tags[x].innerHTML == "Captain" || tags[x].innerHTML == "Captain:")
	{
		tags[x].style.color = "#FF33FF";
	}
	else if (tags[x] != undefined && tags[x].innerHTML == "moolet" || tags[x].innerHTML == "moolet:")
	{
		tags[x].style.color = "#814687";
	}
	else if (tags[x] != undefined && tags[x].innerHTML == "Love Deluxe" || tags[x].innerHTML == "Love Deluxe:")
	{
		tags[x].style.color = "#DE7700";
	}
	else if (tags[x] != undefined && tags[x].innerHTML == "aXXo" || tags[x].innerHTML == "aXXo:")
	{
		tags[x].style.color = "#997500";
	}
	else if (tags[x] != undefined && tags[x].innerHTML == "Pirategirl" || tags[x].innerHTML == "Pirategirl:")
	{
		tags[x].style.color = "#FF0099";
	}
	else if (tags[x] != undefined && tags[x].innerHTML == "lcknolte1" || tags[x].innerHTML == "lcknolte1:")
	{
		tags[x].style.color = "#008569";
	}
	else if (tags[x] != undefined && tags[x].innerHTML == "clap" || tags[x].innerHTML == "clap:")
	{
		tags[x].style.color = "#006600";
	}
}


// ALLOW QUOTING IN FORUMS
var x;
var quote;
var post;
var postbox = window.document.getElementById("threadreply");
var actions = window.document.getElementsByClassName("post_actions");

for (x in actions)
{
	if (actions[x] != undefined && postbox != undefined)
	{
		quote = actions[x].getElementsByTagName("a")[1];
		user = quote.parentNode.parentNode.parentNode.getElementsByClassName("forum_username")[0].getElementsByTagName("a")[0].innerHTML;
		post = quote.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("pre")[x].innerHTML;
		post = post.replace(/\n/gi, "[br]");
		post = post.replace(/<b>/gi, "[b]");
		post = post.replace(/<\/b>/gi, "[/b]");
		post = post.replace(/<i>/gi, "[i]");
		post = post.replace(/<\/i>/gi, "[i]");
		post = post.replace(/<u>/gi, "[u]");
		post = post.replace(/<\/u>/gi, "[/u]");
		post = post.replace(/\&amp\;/gi, "&");
		post = post.replace(/<(.*)>/gi, "");
		post = post.replace(/\:\D/gi, "[img]http://www.watchmovies-tonight.com/images/smileys/biggrin.gif[/img]");
		//post = post.replace(/\:\S/gi, "[img]http://www.watchmovies-tonight.com/images/smileys/confused.gif[/img]");
		post = post.replace(/\8\D/gi, "[img]http://www.watchmovies-tonight.com/images/smileys/cool.gif[/img]");
		post = post.replace(/\O\_\O/gi, "[img]http://www.watchmovies-tonight.com/images/smileys/eek.gif[/img]");
		post = post.replace(/\>\:\)/gi, "[img]http://www.watchmovies-tonight.com/images/smileys/twisted.gif[/img]");
		post = post.replace(/lol/gi, "[img]http://www.watchmovies-tonight.com/images/smileys/lol.gif[/img]");
		post = post.replace(/\>\:\(/gi, "[img]http://www.watchmovies-tonight.com/images/smileys/mad.gif[/img]");
		post = post.replace(/\:\|/gi, "[img]http://www.watchmovies-tonight.com/images/smileys/neutral.gif[/img]");
		post = post.replace(/\:\P/gi, "[img]http://www.watchmovies-tonight.com/images/smileys/razz.gif[/img]");
		post = post.replace(/\^\_\^/gi, "[img]http://www.watchmovies-tonight.com/images/smileys/rollseyes.gif[/img]");
		post = post.replace(/\:\(/gi, "[img]http://www.watchmovies-tonight.com/images/smileys/sad.gif[/img]");
		post = post.replace(/\:\O/gi, "[img]http://www.watchmovies-tonight.com/images/smileys/surprised.gif[/img]");
		post = post.replace(/\;\)/gi, "[img]http://www.watchmovies-tonight.com/images/smileys/wink.gif[/img]");
		post = post.replace(/[^\w\s0-9\[\]\(\)\!\&\@\#\$\%\^\*\+\-\_\=\.\,\\\/\:]/gi, "");
		post = '[quote=' + user + ']' + post + '[/quote]';
		quote.href = "javascript:#";
		quote.setAttribute('onClick', 'window.document.getElementById("threadreply").innerHTML += "' + post + '"; window.document.getElementById("threadreply").focus();');
	}
}
