// ==UserScript==
// @name      Outwitters-OSN Redirect
// @version    1.31
// @description  Linkifies then redirects local Outwitters replay links to the online Outwitters Sports Network.
// @Copyright "One Man Left" and "Outwitters" are registered trademarks of One Man Left, LLC. Outwitters Sports Network is developed by David Lambert.
// @include *onemanleft.com/*
// ==/UserScript==
var links = document.links;
for (i=0; i<links.length; i++) {
    var present = links[i].href.search(/outwitters:\/\/viewgame\?id=/gi);
    var replayid = links[i].href.replace(/(outwitters:\/\/viewgame\?id=|http:\/\/outwitters\/\/viewgame\?id=)/,"");
    var wrong = links[i].href.search(/http:\/\/outwitters\/\/viewgame\?id=/gi);
    if ((present != -1) && (replayid.length == 47)) {
        links[i].href = links[i].href.replace("outwitters://viewgame?id=","http://osn.codepenguin.com/replays/view/");
        links[i].innerHTML = links[i].innerHTML.replace(/outwitters:\/\/viewgame\?id=(\b[-A-Z0-9+&@#\/%?=~_|!:.,;]*[-A-Z0-9+&@#\/%=~_|])/gi,"Outwitters Replay");
    } else if ((wrong != -1) && (replayid.length == 47)) {
        links[i].href = links[i].href.replace("outwitters//viewgame?id=","osn.codepenguin.com/replays/view/");
        links[i].innerHTML = links[i].innerHTML.replace(/http:\/\/outwitters\/\/viewgame\?id=(\b[-A-Z0-9+&@#\/%?=~_|!:.,;]*[-A-Z0-9+&@#\/%=~_|])/gi,"Outwitters Replay");
    }else if ((wrong != -1) && (replayid.length != 47)) {
        links[i].href = links[i].href.replace("outwitters//viewgame?id=","outwitters://v?i?e?w?g?a?m?e?id=");
        links[i].innerHTML = links[i].innerHTML.replace(/http:\/\/outwitters\/\/viewgame\?id=(\b[-A-Z0-9+&@#\/%?=~_|!:.,;]*[-A-Z0-9+&@#\/%=~_|])/gi,"Invalid Replay");
    }else{
        links[i].href = links[i].href.replace("outwitters://viewgame?id=","outwitters://v?i?e?w?g?a?m?e?id=");
        links[i].innerHTML = links[i].innerHTML.replace(/outwitters:\/\/viewgame\?id=(\b[-A-Z0-9+&@#\/%?=~_|!:.,;]*[-A-Z0-9+&@#\/%=~_|])/gi,"Invalid Replay");
    }}
var str = document.getElementsByClassName('post_body');
for (e=0; e<str.length; e++) {
str[e].innerHTML = str[e].innerHTML.replace(/outwitters:\/\/viewgame\?id=(\b[-A-Z0-9+&@#\/%?=~_|!:.,;]*[-A-Z0-9+&@#\/%=~_|])/gi,"\<a href=\"http://osn.codepenguin.com/replays/view/$1\" target=\"_blank\">Outwitters Replay\</a\>");
}
for (i=0; i<links.length; i++) {
	links[i].href = links[i].href.replace("outwitters://v?i?e?w?g?a?m?e?id=","outwitters://viewgame?id=");
var replayid = links[i].href.replace(/(http:\/\/osn.codepenguin.com\/replays\/view\/|outwitters:\/\/viewgame\?id=|http:\/\/outwitters\/\/viewgame\?id=)/,"");
if ((replayid.length != 47)) {
	links[i].href = links[i].href.replace("http://osn.codepenguin.com/replays/view/","outwitters://viewgame?id=");
    links[i].innerHTML = links[i].innerHTML.replace(/outwitters replay/gi,"Invalid Replay");
}
}