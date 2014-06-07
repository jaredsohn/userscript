// ==UserScript==
// @author	   Gwindow
// @description    Hides recent snatches on your own profile page
// @name           HideRecentSnatches
// @namespace      http://userscripts.org
// @include        *what.cd/user.php?id=*
// ==/UserScript==

var username = document.getElementsByClassName('username')[0].innerHTML;
var profile = document.getElementsByTagName('h2')[0].innerHTML;
if(username == profile) {
	var recent = document.getElementsByClassName('recent');
	recent[0].style.display='none';
}
