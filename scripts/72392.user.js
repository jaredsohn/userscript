// ==UserScript==
// @name          Todayhumor refresh
// @namespace     Genesis
// @include       http://todayhumor.*
// ==/UserScript==

if (document.body.innerHTML.indexOf("You don't have permission to access /board/view.php") > -1)
{
	location.reload();
}