// ==UserScript==
// @name       RespawnACTIF
// @include	http://respawn.jeuxvideo.com/*
// ==/UserScript==
document.getElementsByClassName('col-2-nb-connecte')[0].innerHTML = "<b>"+(Math.floor(Math.random()*1000+1)).toString()+" connectés sur ce forum</b>";
setInterval(function(){document.getElementsByClassName('col-2-nb-connecte')[0].innerHTML = "<b>"+(Math.floor(Math.random()*1000+1)).toString()+" connectés sur ce forum</b>";},5*1000);