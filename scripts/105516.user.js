// ==UserScript==
// @name 		   BSCF : activate spellchecker despite TinyMCE
// @namespace	   http://supportforums.blackberry.com/
// @description	version 3
// @include		http://supportforums.blackberry.com/t5/forums/replypage/*
// @include		http://supportforums.blackberry.com/t5/forums/postpage/board-id/*
// @include		http://supportforums.blackberry.com/t5/forums/editpage/board-id/*
// ==/UserScript==

window.addEventListener("load", function() {
	var a = document.getElementById('tinymce');
	if (a != null) a.setAttribute('spellcheck', true);
}, false);