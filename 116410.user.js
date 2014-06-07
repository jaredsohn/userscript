// ==UserScript==
// @name           	fizy lyrics
// @description    	make lyrics visible on fizy
// @author		yzbasbug
// @namespace      	http://userscripts.org/users/useridnumber
// @include        	http://fizy.com/*
// @version		1.4
// ==/UserScript==

function showLyrics() {
	if(fizy.playingSong && fizy.playingSong.lyric_id !== "") {
fizy.openModal('/lyric/'+fizy.playingSong.lyric_id);
}else if (fizy.playingSong && fizy.playingSong.title !== "") {
fizy.openModal('/lyric_by_title/'+encodeURIComponent(fizy.playingSong.title));
}else {
alert(language.noLyric);
} 
} 
window.addEventListener('load', showLyrics ,false);