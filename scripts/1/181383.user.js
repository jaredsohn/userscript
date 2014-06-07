// ==UserScript==
// @name        magnet2torrent
// @namespace   magnet_to_torrent
// @description 
// @include     http://www.hacg.me/*
// @version     1
// @grant       none
// @require http://code.jquery.com/jquery-1.8.2.min.js
// ==/UserScript==
$(".entry-content pre").each(function(){
    s = $(this).html();
    s = s.replace(/magnet\:\?xt\=urn\:btih\:([a-z0-9]+)$/gm,function(url,hash){
        hash = hash.toUpperCase();
        return "<a href=\"http://bt.box.n0808.com/"+hash.slice(0,2)+"/"+hash.slice(-2)+"/"+hash+".torrent\">就知道撸，撸你麻痹</a>";
    });
    $(this).html(s);
});