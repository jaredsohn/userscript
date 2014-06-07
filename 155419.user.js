// ==UserScript==
// @name		Rai.tv video player
// @namespace	
// @description	This script allows you to watch videos on Rai.tv.
// @include		http://www.rai.tv/dl/RaiTV/*
// @version		0.2
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant		GM_xmlhttpRequest
// ==/UserScript==
var loadVideo = function(url){
	console.log('loadVideo', url);
    $("#hls-links").replaceWith('<a style="color: grey; font-weight: bold;" href="'+url+'">Stream link</a>');
    $($("div.Player div").get(0)).replaceWith("<embed id='video-embed' width='100%' height='100%'"
        + " src='"+url+"' type='application/x-mplayer2' autoplay='true' />");
}
var showLinks = function(base_url, levels) {
    $($("div.Player div").get(0)).replaceWith('<div style="color: grey; font-size: 2em;">Select a level or use the <a href="'+base_url+'">HLS link</a>.</div>');
	$("#direct-link").remove();
	$("div.Player").after("<ul id='hls-links' />");
    levels.forEach(function(level){
        $("#hls-links").append("<li><a href=\"javascript:loadVideo('"+level.url+"')\">"
                               +level.desc+"</a></li>");
    });
    $("#hls-links a").css('color', 'grey');
    $("#hls-links a").css('font-weight', 'bold');
}
var loadPlaylist = function(playlist_url){
    console.log('loadPlaylist', playlist_url);
    GM_xmlhttpRequest({
		method: 'GET',
		url: playlist_url,
		onload: function(response){
            console.log(response.responseText);
            var base_url = response['finalUrl'].replace('Manifest(format=m3u8-aapl)', '');
            var levels = [];
            var cur_level = null;
            response.responseText.split('\n').forEach(function(line){
               	var m = line.match(/#EXT-X-STREAM-INF:PROGRAM-ID=1,(.*)/);
                if(m && m.length >= 2){
                    cur_level = {'desc': m[1]};
                }else if(cur_level){
                    if(line.search('http://') == 0){
                    	cur_level.url = line;
                    }else{
                		cur_level.url = base_url+line;
                    }
                    levels.push(cur_level);
                    cur_level = null;
                }
            });
            console.log(levels);
            showLinks(response['finalUrl'], levels);
        }
    });
}
var loadHTML5Video = function(url){
	console.log('loadHTML5Video', url);
    $($("div.Player div").get(0)).replaceWith("<video id='video-embed' width='100%' height='100%'"
        + " src='"+url+"' controls autoplay></video>");
    $("div.Player").after("<a style='color: grey; font-weight: bold;' href='"+url+"'>Stream link</a>");
}
$(document).ready(function(){
    console.log('Page url', window.location.href);
    unsafeWindow.loadVideo = loadVideo;
    $($("div.Player div").get(0)).replaceWith('<div style="color: grey; font-size: 2em;">Loading video data...</div>');
    //
    GM_xmlhttpRequest({
        method: 'GET', 
        url: window.location.href+'&json',
        onload: function(response){
        	var r = JSON.parse(response.responseText);
            console.log(r);
            if(r.h264){
            	loadHTML5Video(r.h264);
            }else if(r.m3u8){
        		loadPlaylist(r.m3u8);
            }
        }
    });
});