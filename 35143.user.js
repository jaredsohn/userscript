// ==UserScript==
// @name           Dave's ESL Cafe - Nix Sticky Posts on Forums
// @namespace      http://www.eslcafe.com
// @description    Removes sticky posts on forums
// @include        http://forums.eslcafe.com/*
// ==/UserScript==


allRows = document.getElementsByTagName("tr");
allRows = allRows[13].parentNode.rows;

for (var a=0;a<allRows.length;a++)
{
	if (allRows[a].textContent.toLowerCase().indexOf("sticky:") >= 0)
	{
		allRows[a].style.display = "none";
	}
}
