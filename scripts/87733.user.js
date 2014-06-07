// ==UserScript==
// @name           Newgrounds News Post Links
// @namespace      http://userscripts.org/users/vitaminp
// @description    Adds a button to each comment, allowing you to link to it directly
// @include        http://*.newgrounds.com/news/post/*
// ==/UserScript==

// ---- Modified from 'Newgrounds BBS Direct Post Links' By Knugen --- http://userscripts.org/scripts/show/70271 ~ http://knugen.newgrounds.com/
// ---- Original idea by EJR --- http://ejr.newgrounds.com/

var posts = document.getElementsByClassName('subjectline');

for (i = 0; i < posts.length; i++)
{

	if (posts[i].parentNode.parentNode.className.match(/response/)) continue;
	comment=posts[i]
	commentid=posts[i].parentNode.parentNode.id
	var btns = comment.getElementsByClassName('epicLinkBtn');
	if (btns.length > 0) continue; // Fix for Chrome (adding an extra button for each click)
	var e = document.createElement('span');	
	e.className = "mod";
	e.style.margin = "0 -1px 0 5px"
	e.innerHTML = '[<a href="#' + commentid + '">Link</a>]'
	comment.insertBefore(e,comment.firstChild);
}