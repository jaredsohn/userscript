// ==UserScript==
// @name    CzT auto-refresh
// @author  FaktorX
// @version 1.5
// @include http://tracker.cztorrent.net/*
// @require http://code.jquery.com/jquery-2.0.3.min.js
// ==/UserScript==
$('#user_panel').wrap('<div id="ajax">');
setInterval(function(){
    $('#ajax').load('/wishlist #user_panel');
},15000);
setInterval(function(){
    var msg=$('.panel_4').children().eq(2).text(),
        tit=$('title').text();
    if(msg!='Pošta'){
        if(tit=='CzTorrent - 1. CZ Free Torrent Tracker'){
            $('title').text(msg);
        }
        else{
            $('title').text('CzTorrent - 1. CZ Free Torrent Tracker');
        }
    }
    else{
        $('title').text('CzTorrent - 1. CZ Free Torrent Tracker');
    }
},1000);