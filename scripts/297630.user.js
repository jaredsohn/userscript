// ==UserScript==
// @name        Filtro MyGiovani
// @namespace   FiltroMyGiovani
// @description Rimuove il fastidioso videobanner
// @include     http://my.giovani.it/all/login.php
// @version     1
// @grant       none
// ==/UserScript==

var minibanner=
"<div style='background:black; color:white; padding-left:5px; margin-top:-5px; padding-top:5px;'>"+
"<p align='right'> Videobanner rimosso per evidente tediosità..."+
"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
"<a href='https://plus.google.com/u/0/+MarcoAntola'>"+
"<img src='http://s2.googleusercontent.com/s2/favicons?feature=youtube_channel&domain=plus.google.com'>"+
"</a>&nbsp;"+
"<a href='https://www.facebook.com/AnticoGuardiano'>"+
"<img src='http://s2.googleusercontent.com/s2/favicons?feature=youtube_channel&domain=www.facebook.com'>"+
"</a>&nbsp;"+
"<a href='https://play.google.com/store/apps/developer?id=MeToo'>"+
"<img src='http://s2.googleusercontent.com/s2/favicons?domain=play.google.com&feature=youtube_channel'/>"+
"</a>&nbsp;&nbsp;&nbsp;&nbsp;</p></div>";

replaceContentInContainer('leaderboard_top', minibanner);

function replaceContentInContainer(matchClass,content) {
    var elems = document.getElementsByTagName('*'), i;
    for (i in elems) {
        if((' ' + elems[i].className + ' ').indexOf(' ' + matchClass + ' ')
                > -1) {
            elems[i].innerHTML = content;
        }
    }
}

