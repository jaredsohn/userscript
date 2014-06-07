// ==UserScript==
// @name        douban musician scrobbler
// @namespace   http://userscripts.org/users/useridnumber
// @description scrobble plays to last.fm
// @include     http://music.douban.com/artists/player/*
// @require     http://justan.github.io/gmscrobber/simple_scrobbler_user.js
// @version     0.1
// ==/UserScript==

console.log("hello");

var init = function(){
	console.log("init function");
	scrob.setSongInfoFN(getSongInfo, {checktime: 4000});
	console.log("!!! logging after setSongInfoFN() is called");
	document.getElementsByClassName('bd')[1].addEventListener("click", function(e){
		var oldTime = getSongInfo().playTime;
		setTimeout(function(){
			var newTime = getSongInfo().playTime;
			offset = oldTime - newTime;
			scrob.seek(offset);
		}, 0);
	}, true);


	scrob.on('nowplaying', function(){
		var loveEle = document.getElementsByClassName('current')[0].getElementsByClassName('fav')[0];
		console.log("!!!! ", loveEle.innerHTML);
		loveEle.addEventListener('click', function(e){
			if(loveEle.title == "收藏"){
				scrob.love();
				console.log("!!! trigger love()");
			}else if(loveEle.title == "取消收藏"){
				scrob.unlove();
				console.log("!!! trigger unlove()");
			}
		}, false);
		scrob.getInfo(scrob.song, function(info){
			document.getElementsByClassName("pl-controls")[0].title = "在 last.fm 中记录：" + info.len + "次";
		});
	});



};

var scrob = new Scrobbler({
  name: 'douban musician scrobbler',
  ready: init
});


var getSongInfo = function(){
	var song = {};
	//console.log("!!! logging from inside");
	var songinfo = document.getElementsByClassName('hd')[1];
	//song.title = songinfo.getElementsByClassName('song-title')[0].innerHTML;
	song.title = document.getElementsByClassName("current")[0].getElementsByTagName("a")[1].title;
	song.artist = document.getElementsByClassName('pl-artist')[0].innerHTML;
	console.log("!!! logging title & artist:", song.title, song.artist);
	var remainTime = songinfo.getElementsByClassName('time pull-right')[0].innerHTML;
	console.log("!!! remainTime:", remainTime);
	var percent = document.getElementsByClassName('progress-bar progress-play')[0];
	//console.log("!!! percent: ",  percent.innerHTML);
	percent = percent.style.width.replace(/%/, '');
	console.log("!!! percent: ",  percent);
	// 这个地方必须floor()或ceil()取整一下....
	var duration = timeParse(remainTime)/( (100 - percent)/100 );
	song.duration = Math.floor(duration);
	song.playTime = Math.floor( song.duration * percent / 100 );
	console.log("!!! logging duration & playTime:", song.duration, song.playTime);
	song.album = song.artist;
	return song;
};

var timeParse = function(timeStr){
	var ts = timeStr.replace(/-/, '').split(':');
	return ts[0]*60 + ts[1]*1;
};

// console.log("yes?");
// setTimeout(fun1,3000);

// function fun1(){
// 	var song = {};
// 	console.log("!!! logging from inside");
// 	var songinfo = document.getElementsByClassName('hd')[1];
// 	//song.title = songinfo.getElementsByClassName('song-title')[0].innerHTML;
// 	song.title = document.getElementsByClassName("current")[0].getElementsByTagName("a")[1].title;
// 	song.artist = document.getElementsByClassName('pl-artist')[0].innerHTML;
// 	console.log("!!! logging title & artist:", song.title, song.artist);
// 	var remainTime = songinfo.getElementsByClassName('time pull-right')[0].innerHTML;
// 	console.log("!!! remainTime:", remainTime);
// 	var percent = document.getElementsByClassName('progress-bar progress-play')[0];
// 	console.log("!!! percent: ",  percent.innerHTML);
// 	percent = percent.style.width.replace(/%/, '');
// 	console.log("!!! percent: ",  percent);
// 	song.duration = timeParse(remainTime)/( (100 - percent)/100 );
// 	song.playTime = song.duration * percent / 100;
// 	console.log("!!! logging duration & playTime:", song.duration, song.playTime);
// 	song.album = song.artist;

// }

