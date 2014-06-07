// ==UserScript==
// @name           PBU Troll Blocker
// @description    Blendet die Kommentare von who-ever auf www.partys-bei-uns.de einfach aus.
// @include        http://www.partys-bei-uns.de/*
// ==/UserScript==

var comments, oneComment, allCells, firstCell
comments = document.getElementsByTagName("table");
for( var i = 0; i < comments.length; i++)
{
	oneComment = comments[i];
	allCells = oneComment.getElementsByTagName("td")
	firstCell = allCells[0]
	if (firstCell.firstChild.nextSibling == "http://www.partys-bei-uns.de/mitglied/who-ever/")
	{
		oneComment.parentNode.removeChild(oneComment);
	}
}