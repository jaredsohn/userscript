// ==UserScript==
// @name       		fm-button-for-baidu-music-single-song
// @description		百度音乐(music.baidu)单曲[收听]按钮，方便添加红心歌曲
// @version     	0.1
// @create			2013/04/11
// @match      		http://music.baidu.com/song/*
// @copyright  		2012+, twlz0ne
// ==/UserScript==

function goto_fm_func() {
	window.location.href = window.location.href.replace(/http:\/\/music\.baidu\.com\/song\/(\d+).*/, "http://fm.baidu.com/#!/play/$1");
}

(function(){
    var song_oper = document.getElementsByClassName("song-opera clearfix");
	var last_elem = song_oper[0].childNodes[song_oper[0].childNodes.length-1];
    var fm_button = document.createElement("input");
    fm_button.setAttribute("type", "button");
	fm_button.setAttribute("class", "inner");
    fm_button.setAttribute("name", "gotofm");
    fm_button.setAttribute("value", "收听");
    fm_button.setAttribute("style", "border-radius:4px; text-align:center; font-size:12px; cursor:pointer");
    fm_button.addEventListener('click', goto_fm_func, true);
	last_elem.parentNode.insertBefore(fm_button, last_elem.nextSibling);
})();

