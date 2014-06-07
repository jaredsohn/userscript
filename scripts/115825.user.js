// ==UserScript==
// @name           downVote
// @namespace      http://hobowars.com
// @include        http://www.hobowars.com/game/game.php?sr=*&cmd=gathering&do=vpost&board=*&post=*
// @include        http://hobowars.com/game/game.php?sr=*&cmd=gathering&do=vpost&board=*&post=*
// @include        http://www.hobowars.com/game/game.php?sr=*&cmd=gathering&do=vpost&post=*
// @include        http://hobowars.com/game/game.php?sr=*&cmd=gathering&do=vpost&post=*
// ==/UserScript==

//This script shall downvote all downvotable posts on every single thread you visit. :)

patt = /\d+, '[a-zA-Z0-9%]+', -1, (\d+|-\d+)/g;
t = document.body.innerHTML.match(patt);
for (var i in t) {
	p = t[i].split(",")[1];
	p = p.replace(/ /g,"").replace(/'/g,"");
	link = "http://www.hobowars.com/game/game.php?cmd=gathering&post="+p+"&do=vote&type=-1";
	GM_xmlhttpRequest({
	  method: "GET",
	  url: link,
	});
}