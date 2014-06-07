// ==UserScript==
// @name        Xiami Scrobbler(GM)
// @namespace   http://www.douban.com/people/rek/
// @description 记录虾米播放记录到last.fm
// @include     http://www.xiami.com/play*
// @require     http://justan.github.io/gmscrobber/simple_scrobbler_user.js
// @version     0.11
// ==/UserScript==


console.log("hello");

var init = function(){
	console.log("init function");
	scrob.setSongInfoFN(getSongInfo, {checktime: 4000});
	console.log("!!! logging after setSongInfoFN() is called");
	document.getElementById("J_playerWrap").addEventListener("click", function(e){
		var oldTime = getSongInfo().playTime;
		setTimeout(function(){
			var newTime = getSongInfo().playTime;
			offset = oldTime - newTime;
			scrob.seek(offset);
		}, 0);
	}, true);

	var loveEle = document.getElementById("J_trackFav");
	console.log("!!!! love element", loveEle.innerHTML);
	loveEle.addEventListener('click', function(e){
		if(loveEle.title == "收藏"){
			scrob.love();
		}else if(loveEle.title == "取消收藏"){
			scrob.unlove();
		}
	}, false);


};


var scrob = new Scrobbler({
  name: 'xiami GM scrobbler',
  ready: init
});

console.log("new scrobbler done");


var getSongInfo = function(){
	var song = {};
	// console.log("!!! logging from inside");
	var currentTrack = document.getElementsByClassName("ui-row-item ui-track-item ui-track-current")[0];
	song.title = currentTrack.getElementsByClassName("ui-row-item-column c1")[0].getElementsByTagName("span")[0].title;
	// console.log("title", song.title);
	song.artist = currentTrack.getElementsByClassName("ui-row-item-column c2")[0].getElementsByTagName("a")[0].title;
	// console.log("artist=", song.artist);
	song.album = currentTrack.getElementsByClassName("ui-row-item-column c3")[0].getElementsByTagName("a")[0].title;
	// console.log("album=", song.album);
	var timeStr = document.getElementById("J_durationTime").innerHTML;
	song.duration = timeParse(timeStr);
	song.duration = Math.floor(song.duration);
	// console.log("duration", song.duration);
	var playTime = document.getElementById("J_positionTime").innerHTML;
	song.playTime = timeParse(playTime);
	song.playTime = Math.floor(song.playTime);
	// console.log("playTime", song.playTime);
	var percent = document.getElementById("J_playerDot").style.left.replace(/%/, '');
	// console.log("percent", percent);
	return song;
}

var timeParse = function(timeStr){
	var ts = timeStr.replace(/-/, '').split(':');
	return ts[0]*60 + ts[1]*1;
};