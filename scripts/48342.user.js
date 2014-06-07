//
// 16.09.2008
//

// ==UserScript==
// @name          Lastfm_No_Player
// @namespace     http://phpdev.ru/gm/
// @description   Remove player from user pages
// @include       *last.fm/user/*
// @include       *lastfm.*/user/*

// ==/UserScript==


document.getElementById('player').style.display = 'none';

var tmp = document.getElementsByTagName('div');
for (var i = 0; i < tmp.length; i++) {
    if (tmp[i].className == 'rightCol') {
        var rC = tmp[i];
    }
}

var fH = rC.getElementsByTagName('h2')[0];

fH.style.margin = 0;
fH.style.border = 0;

