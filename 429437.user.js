// ==UserScript==
// @name       Twitch2Gimlao Link
// @namespace  
// @homepage     http://userscripts.org/scripts/show/429437
// @updateURL    http://userscripts.org/scripts/show/429437.meta.js
// @downloadURL  http://userscripts.org/scripts/show/429437.user.js
// @version    0.1
// @description  This script add a link in twitch (profile or stream) to stream in gimlao's tool
// @include    /^http://(\w+\.)?twitch\.tv/\w+(/profile(/.*)?)?$/
// @exclude    /^http://((blog\.)|(help\.))twitch\.tv(/.*)?$/
// @exclude    /^http://(\w+\.)?twitch\.tv/(b|p|search|directory|inbox|outbox|message|subscriptions|settings|logout|users|products|broadcast|jobs)/?$/
// @run-at document-end
// @copyright  2014+, Arch-kain
// ==/UserScript==


console.log("-- start twitch2gimlao --");


// match1: channelName | match2: profile
var matches = location.pathname.match("/([^/]*)(?:/(profile))?/?");
var isProfilePage = true;

// profile page	: if "profile" find
if (matches[2] != null)
	console.log("profile page");

// stream page	
else
{
	console.log("stream page");
	isProfilePage = false;
}


var channelName = matches[1];
console.log("channelName : "+ channelName);

// create elements
var divGimlao = document.createElement("div");
divGimlao.id = "CS_externalLinks_gimlao";
divGimlao.style.position = "absolute";
divGimlao.style.zIndex = "2";
divGimlao.style.background = "#8458D6";
divGimlao.style.border = "solid #fff";
divGimlao.style.padding = "2px 4px";
divGimlao.style.boxShadow = "0 0 0 1px rgba(0, 0, 0, 0.25)"

var lkGimlao = document.createElement("a");
lkGimlao.style.color = "#FFF";
lkGimlao.innerText = "open in Gimlao (live only)";
lkGimlao.href = "http://gimlao.free.fr/twitch/?live1=" + channelName;

divGimlao.appendChild(lkGimlao);


if (isProfilePage)
{
	divGimlao.style.top = "31px";
	divGimlao.style.left = "124px";
	
	var channelLink = document.getElementsByClassName("channel-link")[0];
	channelLink.parentNode.insertBefore(divGimlao, channelLink);
}
else
{
	var broadcast = document.getElementById("broadcast-meta");
	broadcast.style.height = "102px";
	
	var channel = document.getElementsByClassName("channel")[0];
	channel.style.bottom = "32px";
	
	divGimlao.style.bottom = "0px";
	divGimlao.style.left = "1px";
	
	var streamInfo = document.getElementsByClassName("info")[0];
	streamInfo.parentNode.insertBefore(divGimlao, streamInfo);
}
