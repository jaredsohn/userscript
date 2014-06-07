// ==UserScript==
// @name             Re-titler
// @description  Changes the title of a page
// @include         *
// ==/UserScript==

//Name        :   Re-titler
//Author      :   BrainCoder
//Last Update :   06/22/07

//User Variables
var defaultTitle = 'Main Page - Wikipedia, the free encyclopedia'; //Change the text between the quotes with a name you want to use by default

var title = document.title;
var ctitle = function ChangeTitle()
{
	var new_title = prompt('Enter the new title:', defaultTitle);
	if ( new_title == null )
	{	return;	  }
	document.title = new_title;
}
GM_registerMenuCommand('Change the title of this page', ctitle);