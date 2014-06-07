// ==UserScript==
// @name WafflesShowNewPosts
// @namespace Uknown
// @description Changes the 'post' link on Waffles page to redirect to 'Only show new posts'.
// @include *waffles.fm*
// ==/UserScript==

var leftHeader = document.getElementById('header-left');
var table = leftHeader.getElementsByTagName('table');
var rows = table[0].getElementsByTagName('tr');
var columns = rows[3].getElementsByTagName('td');
var postsLink = columns[2].getElementsByTagName('A');
postsLink[0].href += "&onlynew=1";

if(window.location.href == postsLink[0].href )
{
	var center = document.getElementsByTagName("CENTER");
	var table = center[0].getElementsByTagName("TABLE");
	var tr = table[0].getElementsByTagName("TR");
	var td = tr[0].getElementsByTagName("TD");
	var innerTable = td[0].getElementsByTagName("TABLE");
	var innerTr = innerTable[0].getElementsByTagName("TR");
	var innerTd = innerTr[0].getElementsByTagName("TD");
	var h2 = innerTd[0].getElementsByTagName("H2");
	
	if(h2[0].innerHTML == "Error")
	{
		var url = window.location.href;
		var newUrl = url.substring(0, url.lastIndexOf('&'));
		
		var showAllPostsB = document.createElement("BUTTON");
		showAllPostsB.innerHTML = "Show all posts";
		showAllPostsB.addEventListener("click", function(e) { window.location.href = newUrl; }, false);
		
		innerTable[0].parentNode.insertBefore(showAllPostsB, innerTable[0].nextSibling);
	}
}