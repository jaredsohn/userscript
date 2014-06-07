// ==UserScript==
// @name          Todayhumor view_temp.php patch
// @namespace     http://blog.naver.com/bluelenz
// @description   Fix view_temp link
// @include       http://todayhumor.*
// @exclude       
// ==/UserScript==

var all_a;

all_a = document.getElementsByTagName("A");

for(var i = 0; i<all_a.length; i++)
{
	all_a[i].href = all_a[i].href.replace(/view_temp.php/g, "view.php");		
}