// ==UserScript==
// @name        hide sticky posts
// @namespace   fm
// @include     https://what.cd/forums.php?*threadid*
// @version     1
// @grant       none
// ==/UserScript==

var sticky = document.getElementsByClassName('sticky_post');

//Ignores the very first initial sticky post (only if it's on the very first page in the thread)
if(document.URL.match("page=1&") == null)
{
	// hides the top sticky post
	sticky[0].style.display = "none"; 
	}

// hides the bottom sticky post
sticky[1].style.display = "none";