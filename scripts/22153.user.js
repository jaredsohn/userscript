// ==UserScript==
// @name           Yobo_Download
// @namespace      com.yobo.www
// @description    Add "Download" Link to Yobo
// @include        http://www.yobo.com/*
// ==/UserScript==
 
 
 
var songs = []
var divs = document.getElementsByTagName('DIV');
var dc = divs.length;
 
for(var i=0;i<dc;i++){
    if(divs[i].className == 'sp_container'){
        songs.push(getSongInfo(divs[i]));
        showDownloadLink(songs[songs.length-1]);
    }
    if(divs[i].className == 'block_submenu'){
        if(divs[i].getElementsByTagName('A')[0].className='b13em_black_hblack'){
        	var defaultSinger = divs[i].getElementsByTagName('A')[0].innerHTML;
        	defaultSinger = defaultSinger.substr(0,defaultSinger.length - 2);
        }
    }
}
 
function getSongInfo(div){
 
	var as = div.getElementsByTagName('A');
 
	//获得歌曲名
	var n = as[1].innerHTML;
 
	//获得歌手名
 
	var s = 'unkown';
 
	if(as[2]){
		s = as[2].title;
	}else{
		if(defaultSinger) s = defaultSinger;
	}
 
	//获得MP3地址
	var u = as[0].getAttribute('onclick').substr(16);
	u = u.substr(0,u.indexOf("'"));
	if(u.toUpperCase().substr(u.length-4) != '.MP3') u+='.mp3';
 
 
 
 
	return {name:n,singer:s,url:u,ele:div};
}
 
function showDownloadLink(song){
	var link = ' <a href="'+song.url+'" singer="'+song.singer+'" song="'+song.name;
	link += '" style="font-weight:bold;text-decoration:none;color:#999">Donwload</a>';
	song.ele.getElementsByTagName('DIV')[0].style.width = '100px';
	song.ele.getElementsByTagName('DIV')[0].innerHTML += link;