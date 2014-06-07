// ==UserScript==
// @name           Newgrounds BBS Direct Post Links
// @namespace      greasemonkey.knugen.com/ngbbspostlinks
// @description    Adds a button to each post, allowing you to link to it directly
// @include        http://*newgrounds.com/bbs/topic/*
// ==/UserScript==

var posts = document.getElementsByClassName('heading');

for (i = 0; i < posts.length; i++)
{
	if (!posts[i].id.match(/bbspost/)) continue;
	
	var btns = posts[i].getElementsByClassName('epicLinkBtn');
	if (btns.length > 0) continue; // Fix for Chrome (adding an extra button for each click)
	
	var insertBefore = posts[i].getElementsByTagName('p')[1];
	var e = document.createElement('span');	
	e.className = "btn epicLinkBtn";
	e.innerHTML = '<a href="#' + posts[i].id + '">Link</a>';
	
	posts[i].insertBefore(e, insertBefore);
}