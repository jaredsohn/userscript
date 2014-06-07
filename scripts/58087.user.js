// ==UserScript==
// @name           Vesti Redirect v1.0
// @namespace      SumPersonGuy
// @description    Replaces breadcrumb link to new(crap) vesti with link to better //                 looking vesti.
// @include        http://boards.ign.com/*
// @include        http://boards.ign.com/teh_vestibule/*
// ==/UserScript==


var aEls = document.getElementById('boards_breadcrumb').getElementsByTagName('a');
for (var i = 0, aEl; aEl = aEls[i]; i++) {
	aEl.href = aEl.href.replace('http://boards.ign.com/teh_vestibule/b5296/p1','http://boards.ign.com/board.asp?brd=5296');
			
}


