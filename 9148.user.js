// ==UserScript==
// @name           Google Corner Links
// @description    Gives you google corner links on all google pages.
// @include        http*://*.google.*/*
// ==/UserScript==

//Site Url
var siteUrl = document.location.href;

//Style
var headTag = document.getElementsByTagName("head")[0];
if (!headTag || headTag < 0) return;
var style = document.createElement("style");
//Corner links style
var text = document.createTextNode("#googleLinks {position:absolute; top:0px; left:0; background:#DFECF5; padding:0 0 3px 0; font-size:8.5pt; -moz-border-radius-bottomright:5px; z-index:20; font-family:arial; display:block !important;} /*#googleLinks:hover {top:0;}*/ #googleLinks a {margin:0 7px 0 0; color:#0000CC;} .cornerLink-iGoogle {padding-left:4px;}");
style.setAttribute("type","text/css");
style.appendChild(text);
headTag.appendChild(style);

//Make div
var bodyTag = document.getElementsByTagName("body")[0];
if (!bodyTag || bodyTag < 0) return;
var div = document.createElement("div");
div.setAttribute("id", "googleLinks");
bodyTag.appendChild(div);

//Name of link and link urls
var linkName = new Array("iGoogle", "Mail", "Reader", "Calendar", "Bookmarks", "Docs & Spreadsheets","Notebook", "my services »");
var linkUrl = new Array("http://www.google.com/ig", "https://mail.google.com/mail/", "https://www.google.com/reader/view/", "https://www.google.com/calendar/render", "https://www.google.com/bookmarks/", "https://docs.google.com/", "http://www.google.com/gn", "http://www.google.com/accounts/ManageAccount");
var div = document.getElementById("googleLinks");
//Check that the arrays are the same length
if (linkName.length != linkUrl.length) alert ("Missing linkUrl or linkName.");
//Make links
for (var i=0; i<linkName.length; i++) {
	var a = document.createElement("a");
	var text = document.createTextNode(linkName[i]);
	if (siteUrl.match("mail") == "mail") {
		a.setAttribute("target","_top");	
	}
	a.setAttribute("class","cornerLink-"+linkName[i]);
	a.setAttribute("href",linkUrl[i]);
	a.appendChild(text);
	div.appendChild(a);
}

//Hide Google corner bookmarks
var fixStyle = document.createElement("style");
//Google Mail
if (siteUrl.match("mail") == "mail") {
var fixText = document.createTextNode("table[class='bookmarks'] {display:none !important;}");
//Google Calendar
} else if (siteUrl.match("calendar") == "calendar") {
//var fixText = document.createTextNode("div[id='cornerBookmarks'] {display:none !important;}");
var calFix = document.getElementById("cornerBookmarks");
calFix.setAttribute("style","display:none !important;");
//Google Docs
} else if (siteUrl.match("docs") == "docs") {
var fixText = document.createTextNode("td[class='bubble cornerBookmarks'] {display:none !important;}");
//iGoogle
} else if (siteUrl.match("ig") == "ig") {
var fixText = document.createTextNode("div[id^='cbid'] {display:none !important;}");
//Google Reader
} else if (siteUrl.match("reader") == "reader") {
var settings = document.getElementById("settings");
var readerFix = document.getElementById("googleLinks");
if (!settings) return;
readerFix.setAttribute("style","display:none !important;");
}
fixStyle.setAttribute("type","text/css");
fixStyle.appendChild(fixText);
headTag.appendChild(fixStyle);