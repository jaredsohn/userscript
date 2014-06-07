// ==UserScript==
// @name         	Live Post Preview
// @description		Automatically renders the post as you type it
// @version	 		2
// @include			http*://*.bungie.net*createpost.aspx*
// @author	  		dazarobbo
// @contributor                 robby118 (I didn't really do anything)
// @copyright		2011, dazarobbo
// @license 		(CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==
var inputBoxElemStr = "ctl00_mainContent_postForm_skin_body";
var inputBox = document.getElementById(inputBoxElemStr);
var outputBox;
var checkTimeout = 3000;

function getCookie(name) {
	var results = document.cookie.match(name + '=(.*?)(;|$)');
	if (results)
		return (unescape(results[1]));
	else
		return null;
}

function getHTML(url) {
	xmlhttp=null;
	if (window.XMLHttpRequest)
	{
		xmlhttp=new XMLHttpRequest();
	}
	else if (window.ActiveXObject)
	{
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if (xmlhttp != null)
	{
		xmlhttp.open("GET", url, false);
		xmlhttp.send(null);
		return xmlhttp.responseText;
	}
}

String.prototype.toSafeHTML = function(){
	var str = this;
	str = str.replace(/&/g, "&amp;");
	str = str.replace(/"/g, "&quot;");
	str = str.replace(/</g, "&lt;");
	str = str.replace(/>/g, "&gt;");
	str = str.replace(/'/g, "&apos;");
	return str;
}

window.setInterval(function(){
	addEventListenerToInputBox();
}, checkTimeout);

function addOutputBoxToPage(){
	outputBox = document.createElement("div");
	outputBox.style.wordWrap = "break-word";
	outputBox.style.minHeight = "110px";
	outputBox.className = "formgroup1";
	document.getElementsByClassName("list-c").item(1).insertBefore(outputBox, document.getElementById("ctl00_mainContent_postForm_skin_bodyPanel"));
}

function addCSSToHead(){
	var style = document.createElement("style");
	style.type = "text/css";
	style.innerHTML = "span.IBBquotedtable{background-color:#161617;border:1px inset #414547;display:block;margin-bottom:5px;margin-top:5px;padding:2px 2px 2px 4px;}<br />";
	document.getElementsByTagName("head")[0].appendChild(style);
}

function addEventListenerToInputBox(){
	document.getElementById(inputBoxElemStr).removeEventListener("keyup", realTimeUpdate, false);
	inputBox = document.getElementById(inputBoxElemStr);
	inputBox.addEventListener("keyup", realTimeUpdate, false)
}

function regexLoop(str, regex, replaceStr){
	while(regex.test(str)){
		str = str.replace(regex, replaceStr);
	}
	return str;
}

function parseText(str){
	str = str.toSafeHTML();
	str = regexLoop(str, /\[b\]((\s|\S)*?)\[\/b\]/i, '<b>$1</b>');
	str = regexLoop(str, /\[i\]((\s|\S)*?)\[\/i\]/i, '<i>$1</i>');
	str = regexLoop(str, /\[u\]((\s|\S)*?)\[\/u\]/i, '<u>$1</u>');
	str = regexLoop(str, /\[quote\]((\s|\S)*?)\[\/quote\]/i, '<span class="IBBquotedtable">$1</span>');
	str = regexLoop(str, /\[url\]((?:http:\/\/|\/)(\s|\S)*?)\[\/url\]/i, '<a href="$1">$1</a>');
	str = regexLoop(str, /\[url=(http:\/\/(?:\s|\S)*?|\/(?:\s|\S)*?)\]((?:\s|\S)*?)\[\/url\]/i, '<a href="$1">$2</a>');
	str = regexLoop(str, /\[img\]((\s|\S)*?)\[\/img\]/i, '<img src="$1" />');
	str = str.replace(/\n/g, "<br />");
	return str;
}

function retrieveTitle()
{
		var doc = document.implementation.createDocument("", "", null), html = document.createElement("html");
		html.innerHTML = getHTML('http://www.bungie.net/Account/Profile.aspx');
		doc.appendChild(html);
		var title = doc.getElementById("ctl00_mainContent_header_forumPopover").getElementsByTagName('li').item(1).textContent;
		return title;
}

function addPrettiness()
{
	var avatarSrc = document.getElementsByClassName("imgAvatar").item(0).getElementsByTagName("img").item(0).src, username = getCookie("BungieDisplayName"), memberTitle = retrieveTitle(), memberTitleBarColor, memberTitleBarBorder;
	if (memberTitle.match(/Heroic/gi))
	{
		memberTitleBarColor = "#323A3D";
		memberTitleBarBorder = "0px";
	}	
	else if (memberTitle.match(/Legendary/gi))
	{	
		memberTitleBarColor = "#4C4C4C";
		memberTitleBarBorder = "0px";
	}
	else if (memberTitle.match(/Mythic/gi))
	{
		memberTitleBarColor = "#103349";
		memberTitleBarBorder = "0px";
	}
	else if (memberTitle.match(/Ninja/gi))
	{
		memberTitleBarColor = "#103349";
		memberTitleBarBorder = "1px solid #FF9966";
	}
	else
	{
		memberTitleBarColor = "#27282C";
		memberTitleBarBorder = "0px";
	}

	outputBox.innerHTML += '<div class="hideavatar"><div class="forumpost"><div class="clear"></div><div class="forumavatar"><img style="height: 90px; width: 90px; border-width: 0px; margin-top: -9px; margin-left: -4px;" src="'+avatarSrc+'"></div><div class="postbody"><ul style="background: '+memberTitleBarColor+'; border: '+memberTitleBarBorder+'; margin-left: 86px; margin-top: -95px; width: 86%;" class="author_header_block"><li class="login"><a href="/Account/Profile.aspx">'+username+'</a></li><li>&nbsp;|&nbsp;</li><li class="title">'+memberTitle+'</li><li class="author_header_links"><a href="javascript: void(0);" class="expanded_arrows_collapsed"><img height="20px" width="21px" alt="" src="/images/spacer.gif"></a></li><li class="author_header_links">&nbsp;|&nbsp;more&nbsp;</li><li class="author_header_links"><a href="/Account/Profile.aspx?page=Chapters">groups</a></li><li class="author_header_links">&nbsp; |&nbsp;</li></ul><p id="preview_post_block" style="margin-left: 86px;"></p></div><div class="post-actions"><ul><li class="date">01.01.2011 12:00 AM PST</li><li></li></ul></div></div></div>';	

}

function realTimeUpdate(){
	var content = inputBox.value, previewText = document.getElementById("preview_post_block");
	previewText.innerHTML = parseText(content);
}

function main(){
	addCSSToHead();
	addOutputBoxToPage();
	addEventListenerToInputBox();
	addPrettiness();
}

main();