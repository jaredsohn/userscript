// ==UserScript==
// @name        LyraLounge
// @description Because Lyra
// @namespace   http://userscripts.org/users/514441
// @include     http://*.reddit.com/r/MLPLounge*
// @version     1
// @grant       GM_getValue
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// ==/UserScript==

    $('a[href="http://redd.it/1bkvw7"]').css("background-image","url('http://i.imgur.com/wavkZCJ.png')");
    $("#header-img").attr("src","http://i.imgur.com/S3UrZNK.png");
    $("#header-bottom-left").css("background-image","url('http://i.imgur.com/pw2TVwO.png')");
    $('#search input[type="text"]').css("cssText","background: url('http://i.imgur.com/CnVy8Ry.png') no-repeat left center !important");
    $('.side a[href="http://www.reddit.com/r/MLPLounge/new/"]').css("background-image","url('http://i.imgur.com/0Neygp7.png')");    
    $('.side a[href="/ohnoes"]').attr('href','/lyrauhh');
    $('.side .md h2:last-of-type + p a').css('cssText','top: -86px !important');
    $('.footer-parent').css('background-image','url("http://i.imgur.com/zpe46Nv.png")');
    $('.footer-parent').css('height','1200px');
    $('body').css('cssText','background: url("http://i.imgur.com/eE78NBl.png") no-repeat fixed center top !important');
    $('#searchexpando.infobar').css('background-image','url("http://i.imgur.com/jX2zxCs.png")');

    var tmp = $('.side a[href="/re03"]').parent().parent();
    $('.side a[href="/re03"]').parent().remove();
    tmp.prepend('<p><a href="/re01"></a><a href="/e01-d"></a><a href="/re01"></a><a href="/e01"></a></p>');
    
    tmp = $('.side a[href="/rc08"]').parent().prev();
    $('.side a[href="/rc08"]').parent().remove();
    tmp.after('<p><a href="/mlyra"></a><a href="/mlyra-r"></a><a href="/mlyra"></a><a href="/mlyra-d"></a></p>');
