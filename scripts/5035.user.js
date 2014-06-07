// ==UserScript==
// @name          Title or Author Search for Utsunomiya City Library
// @namespace     http://d.hatena.ne.jp/Koumei_S/
// @description   Searches Utsunomiya City Library by Title or Author. Select keywords and push Alt+z(title) or Alt+x (author).
// @include       *
// @version       1.0
// ==/UserScript==

(function(){
	var keyword='';
	document.addEventListener('mouseup', selectkeyword, false);
	
	GM_registerMenuCommand( "Utsunomiya City Library Search (by Title)", Searchbytitle, "z", "alt", "t" );
	GM_registerMenuCommand( "Utsunomiya City Library Search (by Author)", Searchbyauthor, "x", "alt", "a" );
	
	function selectkeyword(){
		keyword = window.getSelection();
	}
	function Searchbytitle(){
		window.open('http://www.lib-utsunomiya.jp/UTCLIB/servlet/search.result?title1=' + keyword);
	}
	function Searchbyauthor(){
		window.open('http://www.lib-utsunomiya.jp/UTCLIB/servlet/search.result?author1=' + keyword);
	}
})();