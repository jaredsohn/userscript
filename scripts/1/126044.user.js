// ==UserScript==
// @name           Boards.ie - Reformat Homepage
// @namespace      http://userscripts.org/users/436255
// @description    Makes logo smaller, cuts down on whitespace
// @version        1.3
// @icon           http://s3.amazonaws.com/uso_ss/icon/125952/large.png
// @include        http://www.boards.ie/
// @include        http://www.boards.ie/?
// @include        https://www.boards.ie/
// @include        https://www.boards.ie/?
// @include        http://www.boards.ie/?filter=*
// @include        https://www.boards.ie/?filter=*
// ==/UserScript==

// v1.2 - Updated for new Beta skin
// v1.3 - Removed superfluous space at the bottom,top of the page

if(document.getElementById("user_search_input") != null)
{
	document.getElementsByClassName("home_ads")[0].style.display = "none";
	GM_addStyle("td.alt2{padding:2px;}td.alt1{padding:2px}");
	document.getElementsByClassName("wrapper")[0].style.paddingBottom = "0";
	document.getElementsByClassName("holder")[1].style.paddingBottom = "0";
	document.getElementById("footer").style.minHeight = "0";
	document.getElementById("footer").style.marginTop = "0";
	document.getElementById("footer").style.height = "auto";
	document.getElementsByClassName("home-container")[0].style.marginTop = "0";
	document.getElementsByClassName("tabs-bottom")[0].style.display = "none";
}
else
{
	document.getElementById("topbar").getElementsByTagName("td")[0].firstChild.style.height = "66px";
	document.getElementsByClassName("footer")[0].style.display = "none";
	document.getElementById("topbar").getElementsByTagName("td")[2].height = "10px";
	document.getElementById("topbar").getElementsByTagName("td")[2].getElementsByTagName("tr")[1].style.display = "none";
	document.getElementsByClassName("page")[0].getElementsByTagName("td")[0].style.padding = "0";
	document.getElementsByClassName("page")[1].cellSpacing = "0";
}