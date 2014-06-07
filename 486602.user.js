// ==UserScript==
// @name        网易云音乐Scrobbler
// @namespace   http://music.163.com/
// @description 记录网易云音乐播放记录到last.fm
// @match     http://music.163.com
// @match     http://music.163.com/?token=*
// @match     http://music.163.com/#
// @match     http://music.163.com/#/*
// @require     http://justan.github.io/gmscrobber/simple_scrobbler_user.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js
// @version     0.1
// ==/UserScript==
var init = function(){
  scrob.setSongInfoFN(get_song_info, {checktime: 4000});
};

var scrob = new Scrobbler({
  name: '网易云音乐',
  ready: init
});
 var get_song_info = function (){
 var song = {};
 var info_arr = $(".words").find("a");
 var play_time_span = $(".m-pbar").find("span")[1];
 song.playTime = time_parse($(play_time_span).find("em").html());
 song.duration = time_parse($(play_time_span).html().split("/")[2]);
 song.title = $(info_arr[0]).html().replace(/&nbsp;/ig, " ");
 song.artist = $(info_arr[1]).html().replace(/&nbsp;/ig, " ");
 return song;
}
var time_parse = function(timeStr){
	var ts = timeStr.replace(/-/, '').split(':');
	return ts[0]*60 + ts[1]*1;
};