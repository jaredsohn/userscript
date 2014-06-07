// ==UserScript==
// @name           Newgrounds BBS Last Read Post Jump
// @namespace      greasemonkey.knugen.com/bbslastreadpostjump
// @description    Adds a link to the last read post on the current topic page. If it's the first time you open the current page "the last read post" will not be available, otherwise it will be the latest post on the page at the time of your last visit. Cookies are only stored three days for performance reasons (they are all saved in the same place, and a new one is created every time a new thread or page is visited).
// @include        http://*newgrounds.com/bbs/topic/*
// ==/UserScript==

// Create button //
var caption 	= "Last read post";
var jumpbtn 	= document.createElement('span');
var insertInto 	= document.getElementsByClassName('right')[0];
insertInto.insertBefore(jumpbtn, insertInto.firstChild);
var btnInnerElement;

// Read cookie //
var threadID 	= new RegExp("topic\/([0-9]+)").exec(document.location)[1];
var page 		= new RegExp("topic\/" + threadID + "\/([0-9]+)").exec(document.location);
var pageNum;

if (!page) 	pageNum = 1;
else 		pageNum = page[1];

var lastRead = readCookie("lastReadPost_" + threadID + "_" + pageNum);
if (lastRead)
{
	btnInnerElement 		= document.createElement('a');
	btnInnerElement.href 	= "#" + lastRead;
	jumpbtn.className 		= "btn";
}
else
{
	btnInnerElement 	= document.createElement('span');
	jumpbtn.className 	= "btn dead";
}

btnInnerElement.innerHTML = caption;
jumpbtn.appendChild(btnInnerElement);

// Update cookie //
var posts = document.getElementsByClassName('heading');
var newLastRead;

for (i = 0; i < posts.length; i++)
{
	if (!posts[i].id.match(/bbspost/)) continue;	
	
	newLastRead = posts[i].id;
}

var expireDate 	= new Date();
expireDate.setTime(expireDate.getTime() + 180*24*60*60*1000);
var expires 	= '; expires=' + expireDate.toGMTString();

document.cookie = "lastReadPost_" + threadID + "_" + pageNum + "=" + newLastRead + expires;

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