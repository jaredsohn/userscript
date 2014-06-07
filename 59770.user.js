// ==UserScript==
// @name           birdsee.com
// @namespace      ViKing@Avalon
// @include        http://book.birdsee.com/files/article/html/*
// ==/UserScript==

var prevpage = unsafeWindow.preview_page;
var bookpage = unsafeWindow.index_page;
var nextpage = unsafeWindow.next_page.indexOf('?') > 0 ? bookpage : unsafeWindow.next_page;

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
