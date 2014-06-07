// ==UserScript==
// @name          Goobe -- Google Bookmark Easyfier
// @namespace	  http://devadutta.net/goobe
// @description	  Adds a shortcut to bookmark current page with Google Bookmarks. CTRL + ALT + ']' opens a pop-up to  bookmark current page, CTRL + ALT + '[' shows all bookmarks in a new tab.
// @include       *
// @author        Devadutta Ghat
// ==/UserScript==

function dispBmP()
{
var a=window,b=document,c=encodeURIComponent,d=a.open('http://www.google.com/bookmarks/mark?op=edit&output=popup&bkmk='+c(b.location)+'&title='+c(b.title),'bkmk_popup','left='+((a.screenX||a.screenLeft)+10)+',top='+((a.screenY||a.screenTop)+10)+',height=420px,width=550px,resizable=1,alwaysRaised=1');a.setTimeout(function(){d.focus()},300);
}

function gotoBm()
{
	// Shows bookmarks sorted by time, insted of the senseless sort by title default
	window.open("https://www.google.com/bookmarks/l#!view=threadsmgmt&fo=Starred&q=&g=Time");
}

function keyPressEvent(event){
	var kcode = (event.keyCode)?event.keyCode:event.which;
	if(event.ctrlKey && event.altKey) {
		if( kcode == 221) dispBmP(); // ']'
		if( kcode == 219) gotoBm();  // '['
	}
} 

document.addEventListener("keydown", keyPressEvent, true);
