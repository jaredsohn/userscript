// ==UserScript==
// @name           Remind AlloShowTV
// @namespace      AlloShowTV
// @include        http://www.alloshowtv.com/series/details_s.php*
// ==/UserScript==

var lastClickColor = "#006B0E";

var cookieName = "AlloRemind";
var cookieDelimiter = "#";
var cookieTimeout = 30;

var cookie = readCookie(cookieName);
var cookies = new Array();

var id = getUrlVars()["id"];

//read cookie
if(cookie)
{
	var splitted = cookie.split(cookieDelimiter);
	if(splitted.length % 2 == 0)
	{
		for(var i = 0; i < splitted.length; i = i+2)
		{
			var left = splitted[i];
			var right = splitted[i+1];
			cookies[left] = right;
		}
	}
	else
	{
		eraseCookie(cookieName);
	}
}

var colOne = document.getElementById("colOne");
var links = getElementsByClassName("b", colOne);

for(var i = 0; i < links.length; i++)
{
	var link = links[i];
	if(!link.href.match("view_s.php"))
		if(!link.href.match("view_m.php"))
			continue;
	link.addEventListener("click", function() { onLinkClick(this); }, false);
	
	if(link == cookies[id])
		link.style.background = lastClickColor;
}

function onLinkClick(link)
{
	cookies[id] = link;
	saveCookies();
}

function saveCookies()
{
	var cookieContent = "";
	for(key in cookies)
	{
		cookieContent += key + cookieDelimiter + cookies[key] + cookieDelimiter;
	}
	cookieContent = cookieContent.slice(0, -1);
	
	alert(cookieContent);
	createCookie(cookieName, cookieContent, cookieTimeout);
}

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function getElementsByClassName(classname, node) {
	if(!node) node = document.getElementsByTagName("body")[0];
	var a = [];
	var re = new RegExp('\\b' + classname + '\\b');
	var els = node.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++)
	if(re.test(els[i].className))a.push(els[i]);
	return a;
}

//cookie management

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}
