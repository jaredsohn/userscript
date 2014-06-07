// ==UserScript==
// @name           89wx
// @namespace      ViKing@Avalon
// @include        http://www.89wx.com/Html/Book/*
// ==/UserScript==

var prevpage = unsafeWindow.prevpage;
var bookpage = "list.htm";
var nextpage = unsafeWindow.nextpage.indexOf('?') > 0 ? bookpage : unsafeWindow.nextpage;

function KeyDown(event)
{
	var e = event;

	if (e.keyCode == '37')
		document.location = prevpage;
	else if (e.keyCode == '39')
		document.location = nextpage;
	else if (e.keyCode == '13')
		document.location = bookpage;
	return;
}

document.addEventListener('keypress', KeyDown, true);
