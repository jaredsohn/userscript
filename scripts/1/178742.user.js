// ==UserScript==
// @name        ETI Twitch.tv Signature
// @description inserts your last loaded twitch.tv page's info into your signature.
// @include     http://www.twitch.tv/*
// @include     http://*.endoftheinter.net/postmsg.php*
// @include     https://*.endoftheinter.net/postmsg.php*
// @include     http://endoftheinter.net/postmsg.php*
// @include     https://endoftheinter.net/postmsg.php*
// @include     http://*.endoftheinter.net/postmsg.php
// @include     https://*.endoftheinter.net/postmsg.php
// @include     http://boards.endoftheinter.net/showmessages.php*
// @include     https://boards.endoftheinter.net/showmessages.php*
// @include     http://endoftheinter.net/inboxthread.php*
// @include     http://www.endoftheinter.net/inboxthread.php*
// @include     http://endoftheinter.net/inboxthread.php*
// @include     http://www.endoftheinter.net/inboxthread.php*
// @include     https://endoftheinter.net/inboxthread.php*
// @include     https://www.endoftheinter.net/inboxthread.php*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

var twitchBase = "http://www.twitch.tv/";
var twitchUser;
var twitchGame;
var twitchTitle;

//eti stuff stolen from headbanger's last.fm sig script. thanks dude. http://xatal.com/scripts/lastfm.user.js
function replaceNP() {
	var txtarea = document.getElementsByTagName('textarea')[0];
	var newHTML = txtarea.value.replace('[URL]', twitchBase + twitchUser ).replace('[GAME]', twitchGame).replace('[TITLE]', twitchTitle).replace('[USER]', twitchUser);
	txtarea.value = newHTML;
}


if($(location).attr("host") === "www.twitch.tv"){
	var title = $("span.js-title").text();
	var game = $("a.js-game").text();
	var user = $("a.channel_name").text();
	//idk theres like an iframe on twitch or something that runs the script, also if you go to a non-channel twitch page i guess.
	if (title !== "") GM_setValue("twitchTitle", title);
	if (game !== "") GM_setValue("twitchGame", game);
	if (user !== "") GM_setValue("twitchUser", user);
}else{
	twitchUser  = GM_getValue("twitchUser");
	twitchGame  = GM_getValue("twitchGame");
	twitchTitle = GM_getValue("twitchTitle");
	replaceNP();
}