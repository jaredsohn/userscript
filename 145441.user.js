// ==UserScript==
// @name        Steamgifts-Contributor only remover
// @namespace   DBS
// @description Simple script to hide contributor only giveaways
// @include     http://www.steamgifts.com*
// @version     1
// ==/UserScript==

var post = document.getElementsByClassName('contributor_only');
if ( post.length > 0){
	for (var i = 0; i<post.length; i++){
		post[i].parentNode.parentNode.parentNode.setAttribute("style", "display:none;");
	}
}