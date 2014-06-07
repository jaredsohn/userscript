// ==UserScript==
// @name           ftpPlayer
// @namespace      http://fastchair.org
// @include	ftp://thedamager.dyndns.org/*
// ==/UserScript==

var player = document.createElement('div');
document.childNodes[1].appendChild(player);
player.setAttribute('id', 'player');
player.style.position = 'fixed';
player.style.width = '100%';
player.style.height = '27px';
player.style.top = '0px';
player.style.left = '0px';
player.style.backgroundColor = '#FFFFFF';
var elemA = document.getElementsByTagName('a');
for(var i=0; i<elemA.length; i++){
    if(elemA[i].href.indexOf('.mp3') > 0 || elemA[i].href.indexOf('.m4a') > 0 || elemA[i].href.indexOf('.mp4') > 0){
        elemA[i].addEventListener('click', setPlay, false);
        elemA[i].href = '#' + elemA[i].href;
    }
}


function setPlay(event){
    var player = document.getElementById('player');
    var url = event.target.href.split('#')[1];
	player.innerHTML = '<embed type="application/x-shockwave-flash" flashvars="audioUrl='+url+'&autoPlay=true" src="http://www.google.com/reader/ui/3523697345-audio-player.swf" width="100%" height="27" quality="best"></embed>';

}

