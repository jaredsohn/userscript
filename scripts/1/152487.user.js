// ==UserScript==
// @name			Nowplaying Share
// @namespace		http://music.wayshine.us/
// @author			Apollo Wayne
// @description		Share Your Music
// @version			1.2.1
// @include			https://play.google.com/music/*
// @include			http://play.google.com/music/*
// ==/UserScript==

//==Insert share label==
function nowplaying_insert(){
if(document.getElementsByClassName('now-playing-menu')[0]!=null){
var sharediv = '<div class="goog-menuitem" role="menuitem" style="-webkit-user-select: none;" id=":s"><div class="goog-menuitem-content" id="nowplayingshare" style="-webkit-user-select: none;" >Share Nowplaying</div>';
document.getElementsByClassName('now-playing-menu')[0].innerHTML=document.getElementsByClassName('now-playing-menu')[0].innerHTML+sharediv;
document.getElementById('nowplayingshare').onclick=function(){nowplaying_share()}
}
else{
window.setTimeout(function(){nowplaying_insert();}, 1000);
}
}

function nowplaying_share(){
if(document.getElementsByClassName('now-playing-menu-wrapper')[0]!=null){
//==Get the music information==
if(navigator.userAgent.indexOf('Firefox') >= 0)var length = document.getElementById('time_container_duration').textContent;
else var length = document.getElementById('time_container_duration').innerText;

if(navigator.userAgent.indexOf('Firefox') >= 0)var title = document.getElementById('playerSongTitle').textContent;
else var title = document.getElementById('playerSongTitle').innerText;

if(navigator.userAgent.indexOf('Firefox') >= 0)var artist = document.getElementById('player-artist').textContent;
else var artist = document.getElementById('player-artist').innerText;

if(navigator.userAgent.indexOf('Firefox') >= 0)var album = document.getElementsByClassName('player-album')[0].textContent;
else var album = document.getElementsByClassName('player-album')[0].innerText;

var d = new Date();
var playdate = d.getFullYear() + '-' +(d.getMonth()+1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
var surl = 'http://music.wayshine.us/nowplaying.php?album='+album+'&artist='+artist+'&title='+title+'&length='+length+'&date='+playdate+'&from=553&c=0&s=0';
window.open(surl);
}
}

nowplaying_insert();