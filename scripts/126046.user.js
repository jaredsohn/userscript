// ==UserScript==
// @name           Boards.ie - Quick Spam Reporting
// @namespace      http://userscripts.org/users/436255
// @description    Easily post to spammer notification thread in Feedback
// @version        1.3
// @icon           http://s3.amazonaws.com/uso_ss/icon/125952/large.png
// @include        http://www.boards.ie/vbulletin/showthread.php*
// @include        https://www.boards.ie/vbulletin/showthread.php*
// @include     http://www.boards.ie/ttfthread/*
// @include     https://www.boards.ie/ttfthread/*
// @include        http://www.boards.ie/vbulletin/newreply.php?do=newreply&t=2056955066&customspam*
// @include        https://www.boards.ie/vbulletin/newreply.php?do=newreply&t=2056955066&customspam*
// ==/UserScript==

// v1.1 - auto-populate reply box with link, allow setting of follow option
// v1.2 - add username to reply box
// v1.2.1 - new spammer thread in feedback
// v1.3 - updated to work with Talk to Forums

var NOFOLLOW = "9999";
var NOEMAIL = "0";
var INSTANT = "1";
var DAILY = "2";
var WEEKLY = "3";

var USEMYCHOICE = true;
var MYCHOICE = NOFOLLOW;

function getParameterByName(name)
{
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.search);
	if(results == null)
		return "";
	else
		return decodeURIComponent(results[1].replace(/\+/g, " "));
}
var loc = window.location.toString();
if(loc.indexOf("showthread.php") != -1)
{
	var users = document.getElementsByClassName("bigusername");
	for(var i = 0; i < users.length; i++)
	{
		var tr1 = users[i].parentNode.parentNode.parentNode;
		var tr2 = tr1.nextSibling;
		while(tr2 && tr2.nodeType == 3) // skips text nodes (e.g. whitespace)
	        tr2 = tr2.nextSibling;
		var td = tr2.firstChild;
		while(td && td.nodeType == 3) // skips text nodes (e.g. whitespace)
	        td = td.nextSibling;
		var link = document.createElement("a");
		link.href = "http://www.boards.ie/vbulletin/newreply.php?do=newreply&t=2056955066&customspamname=" + users[i].innerHTML + "&customspamlink=" + users[i].href;
		link.innerHTML = "Spammer";
		td.appendChild(link);
	}
}
else if(loc.indexOf("ttfthread") != -1)
{
	var users = document.getElementsByClassName("postbit-userinfo");
	for(var i = 0; i < users.length; i++)
	{
		var username = users[i].getElementsByClassName("userinfo-username-title")[0].firstChild.textContent;
		var userid = users[i].getElementsByClassName("userinfo-username-title")[0].firstChild.href;
		var link = document.createElement("a");
		link.href = "http://www.boards.ie/vbulletin/newreply.php?do=newreply&t=2056955066&customspamname=" + username + "&customspamlink=" + userid;
		link.innerHTML = "Report Spammer";
		
		var div = document.createElement("div");
		div.className = "userinfo-row";
		div.appendChild(link);
		users[i].appendChild(div);
	}
}
else
{
	if(USEMYCHOICE)
		document.getElementsByName("emailupdate")[0].value = MYCHOICE;
	document.getElementById("vB_Editor_001_textarea").value = getParameterByName("customspamlink") + "\n" + getParameterByName("customspamname");
	document.getElementById("vB_Editor_001_textarea").focus();
}