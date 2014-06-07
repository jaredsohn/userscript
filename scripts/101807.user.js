// ==UserScript== 
// @name             AniDB Mute User
// @namespace        Mute AniDB trolls
// @description      Hides posts from known troublemakers on AniDB
// @match            http://anidb.net/perl-bin/animedb.pl?show=cmt&id=*
// @run_at           document_end
// ==/UserScript==
// version 1.1.2 - updated on 2013-08-09

function addid(){
	var Posts = document.getElementsByClassName('g_bubble comment');
	var re = /((\d)*)$/i;
	var uidtoblock = /^(382602|378955|454601|391005|354131|554834|595714)$/;
    
	var i,PostR,UserR,match;
	var toclean = [];
    
	for (i = 0; i < Posts.length; i++) {
		PostR = Posts[i];
		UserR = Posts[i].getElementsByTagName('a');
		match = UserR[0].href.match(re);
		PostR.classList.add(match[0]);
		if (uidtoblock.test(match[0])) {
			toclean.push(PostR);
		}
	}
    
	for (i = 0; i < toclean.length; i++) {    
		toclean[i].parentNode.removeChild(toclean[i]);
	}
}
addid();