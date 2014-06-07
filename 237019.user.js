// ==UserScript==
// @name       torrentkitty迅雷云播放
// @namespace  http://94cat.com/
// @version    0.7
// @updateURL      http://userscripts.org/scripts/source/237019.meta.js
// @downloadURL    http://userscripts.org/scripts/source/237019.user.js
// @description  torrentkitty迅雷云播放
// @match      http://vod.xunlei.com/*
// @match      http://www.torrentkitty.com/search/*
// @match      http://www.btspread.com/search/*
// @match      http://www.xunlei4.us/search/*
// @match      http://btdigg.org/search?info_hash=&q=*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @copyright  2014+, Bmm
// ==/UserScript==

function hash2magnet(str){
    arrStr = str.split('/');
    hash = arrStr.slice(-1);
    return encodeURIComponent( 'magnet:?xt=urn:btih:' + hash );
}
function process(str){
    arrStr = str.split('&');
    return encodeURIComponent(arrStr[0]);
}
function xURL(torrent){
    return 'http://vod.xunlei.com/client/cplayer.html?uvs=_4_&url=' + torrent + '&tryplay=1&from=vodHome';
}

switch(window.location.host){

    case 'vod.xunlei.com':
        if ( $("title").html() == '403 Forbidden' ){
            location.reload();
        }
    break;

    case 'www.torrentkitty.com':
        $("[rel='magnet']").each(function(){
            torrent = process(this.href);
            $(this).after( '<a href="' + xURL(torrent) +'"target="_blank">云播</a>' );
        });
    break;
    
    case 'btdigg.org':
        $("[onclick='fclck(this.href)']").each(function(){
            torrent = process(this.href);
            $(this).after( ' <img src="http://vod.xunlei.com/favicon.ico"><a href="' + xURL(torrent) +'"target="_blank">[云播]</a>' );
        });
    break;
    
    case 'www.btspread.com':
        $("a.btn").each(function(){
            torrent = hash2magnet(this.href);
            $(this).attr('href',xURL(torrent));
            $(this).html('云播');
        });
    break;
    
    case 'www.xunlei4.us':
        $(".item").each(function(){
            torrent = $(this).find(".qrcode").attr("downloadurl");
            torrent = process(torrent);
            $(this).find("a:contains('会员点播')").attr('href',xURL(torrent));
        });
    break;
}