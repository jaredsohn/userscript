// ==UserScript==
// @name           Newgrounds BBS User Stats Links
// @namespace      greasemonkey.knugen.com/ngbbm00dlinks
// @description    Adds extra links above each post to some sweet user stats on m00d.net
// @include        http://*newgrounds.com/bbs/topic/*
// ==/UserScript==


var posts = document.getElementsByClassName('heading');

for (i = 0; i < posts.length; i++)
{
	if (!posts[i].id.match(/bbspost/)) continue;
	
	var btns = posts[i].getElementsByClassName('epicLink');
	if (btns.length > 1) continue; // Fix for Chrome (adding extra buttons for each click)
	
	var insertInto = posts[i].getElementsByClassName('userlinks')[0];
	var username = String(posts[i].getElementsByTagName('h3')[0].firstChild.innerHTML).toLowerCase();
	
	var linkThreads = document.createElement('a');
	linkThreads.className = "epicLink"; linkThreads.innerHTML = "Threads";
	linkThreads.href = 'http://m00d.net/threads/' + username;
	
	var linkOnline = document.createElement('a');	
	linkOnline.className = "epicLink"; linkOnline.innerHTML = "Online";
	linkOnline.href = 'http://m00d.net/online/' + username;
	
	var delimit = document.createTextNode(' | ');
	
	insertInto.insertBefore(linkThreads, insertInto.childNodes[5]);
	insertInto.insertBefore(delimit.cloneNode(true), insertInto.childNodes[6]);
	insertInto.insertBefore(linkOnline, insertInto.childNodes[7]);
	insertInto.insertBefore(delimit.cloneNode(true), insertInto.childNodes[8]);
	
	var p = posts[i].getElementsByTagName('p')[1];
	p.innerHTML = p.innerHTML.replace(/Posted at:/, '');
}
