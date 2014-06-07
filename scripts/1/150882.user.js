// ==UserScript==
// @name           Browse bakabt.com with system colors 1.2
// @namespace   bakabt.me/system colors
// @description    This script adds a border to the table and replaces category images on the left with text
// @include         http://www.bakabt.me/browse.php*
// @include         http://bakabt.me/browse.php*
// ==/UserScript==

//Give border to whole table
GM_addStyle('td.category { border-width: 1.5px !important; }');
GM_addStyle('td.name { border-width: 1.5px !important; }');
GM_addStyle('td.comments { border-width: 1.5px !important; }');
GM_addStyle('td.added { border-width: 1.5px !important; }');
GM_addStyle('td.size { border-width: 1.5px !important; }');
GM_addStyle('td.peers { border-width: 1.5px !important; }');

GM_addStyle('th.category { border-width: 1.5px !important; }');
GM_addStyle('th.name { border-width: 1.5px !important; }');
GM_addStyle('th.comments { border-width: 1.5px !important; }');
GM_addStyle('th.added { border-width: 1.5px !important; }');
GM_addStyle('th.size { border-width: 1.5px !important; }');
GM_addStyle('th.peers { border-width: 1.5px !important; }');

// Remove underline
GM_addStyle('a.title { text-decoration: none; !important; }');
GM_addStyle('a { text-decoration: none; !important; }');

//Make Title text Bold
var tags = document.querySelectorAll('a.title');
for (var i=0;i<tags.length;i++) {
tags[i].style.fontWeight = 'bold';
}

//Replace the images with normal text
//First get a list of all TD tags
var targets = document.querySelectorAll('td.category');
//now loop through the TD tag list
for (var i=0;i<targets.length;i++) {
	//this  variable a is our  whole <a> tag 
	var a = targets[i].firstElementChild.firstElementChild;
	//This returns  the name of the class of the first child that  happens to be the class name from the <img> tag
	var hmanga = a.firstElementChild.getAttribute('class');

	if (hmanga == 'icon h_manga_small')
		{
		targets[i].replaceChild(a,targets[i].firstElementChild);
		a.replaceChild(document.createTextNode('h-manga'),a.firstElementChild);
		}
		else
		{
		targets[i].replaceChild(a,targets[i].firstElementChild);
		a.replaceChild(document.createTextNode(a.firstElementChild.getAttribute('alt')),a.firstElementChild);
		}
}