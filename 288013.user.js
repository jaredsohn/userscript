// ==UserScript==
// @name        yizhansou magnet download torrent
// @namespace   idly-me.com
// @description download torrent file from every magnet link
// @include     http://videos.yizhansou.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==

$('a').each(function(){
    var u = $(this).attr('href');
    if (u.indexOf('magnet:') == 0){
        //magnet:?xt=urn:btih:c9793b1b98a482502447347f6e274c7cda19a804&tr.0=udp://open.demonii.com:1337
        var a = u.split('&');
        var b = a[0].split(':'); //b[3] is hash (may be lowercase)
        var h = b[3].toUpperCase();
        //http://bt.box.n0808.com/特征码前两位/后两位/特征码.torrent
        $(this).append('&nbsp;/<a href="http://bt.box.n0808.com/'+h.substr(0,2)+'/'+h.substr(-2,2)+'/'+h+'.torrent" title="Torrent Download"><font color=red><B>T</B></font></a>');
    }
    
});