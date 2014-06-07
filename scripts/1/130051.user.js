// ==UserScript==
// @name					Tagged Topics
// @namespace			pendevin
// @description		Adds a tagged topics link before the boards link on the menubar
// @include				http://endoftheinter.net*
// @include				http://boards.endoftheinter.net*
// @include				http://archives.endoftheinter.net*
// @include				https://endoftheinter.net*
// @include				https://boards.endoftheinter.net*
// @include				https://archives.endoftheinter.net*
// ==/UserScript==

var as=document.getElementsByClassName('menubar')[0].getElementsByTagName('a');
for(var i=0;i<as.length;i++){
	if(as[i].textContent=='Stats'){
		var s=document.createElement('span');
		s.innerHTML='<a href="http://endoftheinter.net/showfavorites.php">Tagged</a> | ';
		as[i].parentNode.insertBefore(s,as[i].nextElementSibling);
		break;
	}
}