// ==UserScript==
// @name	htf quick load
// @version	0.2
// @author	masa
// @description	htf quick load
// @include	http://happytreefriends.atomfilms.com/watch_episodes/*

// ==/UserScript==

(function() {
tmp= document.URL.substr(0,68);
tm=document.URL.substr(68,(document.URL.length-68));
if (tmp == 'http://happytreefriends.atomfilms.com/watch_episodes/flash/play.asp?'){
window.location.href=('http://happytreefriends.atomfilms.com/watch_episodes/flash/loader_movie.swf?'+ tm);
}

})();


