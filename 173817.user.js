// ==UserScript==
// @name       KKtvOnline 
// @namespace  http://liuyuanzhi.blogspot.com/
// @version    0.2
// @description  show online count of kugou ktv
// @include    *://ktv.kugou.com/*
// @match      *://ktv.kugou.com/*
// @copyright  2013+, Jarod Liu
// ==/UserScript==

var title = '在线人数:';

setInterval(updateOnline, 5000);

function updateOnline() {
    $.getJSON('/cache/servlet?header=100008&t='+new Date(),function(d){
        var t=0,i = 0;
        for(;i<d.roomList.length;i++){
            var r=d.roomList[i];
            t+=r.online;
        }
        $('title').text(title + t);
    });
}