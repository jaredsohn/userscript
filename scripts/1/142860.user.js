// ==UserScript==
// @name        Penny Arcade: The Series - Downloader
// @namespace   http://userscripts.org/users/levibuzolic
// @description Provides download links for episodes from the Penny Arcade TV Series
// @version     1
// @match       http://blip.tv/patv/*
// @match       http://a.blip.tv/*
// @match       http://penny-arcade.com/patv/*
// @copyright   2012 Levi Buzolic
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js
// @grant       none
// ==/UserScript==

function getFeed(feedurl) {
    $.ajax({
        url: feedurl,
        dataType: 'xml',
        success: function(data) {
            url = $(data).find('[height="720"]').attr('url');
            title = $(data).find('item title').eq(0).text();
            if( title.indexOf('The Series - Season') == -1 ) { // is first season?
                title = title.replace(/The Series -/, 'The Series - Season 1');
            }
            title = title.replace(/Penny Arcade:/, 'Penny Arcade').replace(/Season /, 'S0').replace(/, Episode ([0-9]+)/, 'E$1').replace(/ Episode ([0-9]+)/, 'E$1').replace(/,/, ' - ');
                $link = $('<div style="display:block;padding:10px;font:12px/15px sans-serif;color:#fff;position:absolute;top:0;left:0;right:0;z-index:99999;background:rgba(0,0,0,0.66);">Download PATV: <a style="color:#2ABAE1;" href="' + url + '" download="' + title + '">' + title + '</a>');
                $close = $('<span style="float:right;color:rgba(255,255,255,0.5);cursor:pointer;font-size:15px;">&times;</span>').prependTo($link).click(function(){ $link.hide(); });
        }
    });
}

$(document).ready(function(){
    var $feed = $('link[href*="/rss/flash/"]');
    if ($feed.length > 0) {
        getFeed($feed.attr('href'));
    } else {
        feedurl = window.location.href.replace(/%3A/g, ':').replace(/%2F/g, '/');
        feedurl = feedurl.match(/file=(.*)&ref/);
        getFeed(feedurl[1]);
    }
});