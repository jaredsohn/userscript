// ==UserScript==
// @name           TurnTable Cleaner
// @description    Replaces the image-rich default TurnTable look with a safe-for-work, lower-overhead version. IN PRE-ALPHA DEVELOPMENT: DO NOT USE YET!
// @include        http://turntable.fm/*
// @include        http://www.turntable.fm/*
// @include        http://www.turntable.fm/*
// @include        https://turntable.fm/*
// @include        https://www.turntable.fm/*
// @exclude        http://turntable.fm/lobby
// @exclude        http://www.turntable.fm/lobby
// @exclude        https://turntable.fm/lobby
// @exclude        https://www.turntable.fm/lobby
// ==/UserScript==
function changeImg(){
var imag = document.getElementsByTagName('img');
for(var i=0;i<imag.length;i++){
if(imag[i].getAttribute('src')=='https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/avatars/23/headfront.png'){
imag[i].setAttribute('src','http://iamoptimuspri.me/junk/davis.png');
}
}
}
changeImg()