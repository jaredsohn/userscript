// ==UserScript==
// @name       Full size Youtube video playback
// @namespace  http://hansihe.com/
// @version    0.1
// @description  Makes youtube videos in large mode *actually* large
// @match      http://*.youtube.com/*
// @match      https://*.youtube.com/*
// @match      http://youtube.com/*
// @match      https://youtube.com/*
// @require    http://code.jquery.com/jquery-1.9.1.min.js
// @copyright  2012+, HansiHE
// ==/UserScript==

var big_video = true;

var head = $('head');
var body = $('body');

//Make the large video button actually large
//This shit is hackish as fuck, but it works rather neatly
if(big_video) {
    function generate_full_width_css() {
        var width = $(window).width();
        var height = $(window).height();
        var sidebar_width = $('#player').css('padding-left'); //##watch7-video-container #player
        sidebar_width = sidebar_width.substring(0, sidebar_width.length - 2);
            
        var max_vid_width = width - sidebar_width - 15;
        var max_vid_height = height - 110;
        
        var top_bar_right = max_vid_width - $('.watch7-playlist-bar-right').width();
        
        return('.watch-medium #player-api{width:'+max_vid_width+'px; height:'+max_vid_height+'px;} .watch-wide #watch7-sidebar{padding-top: 50px;} .watch-medium .watch7-playlist-bar {width: '+max_vid_width+'px;} .watch-medium #watch7-creator-bar {width: '+(max_vid_width-40)+'px;} .watch-medium .watch7-playlist-bar-left {width: '+top_bar_right+'px;}');
		//#player-api
    };
    
    function update_full_width_css() {
        var injected_watch_width_css = $('#injected-full-width-video-css');
        injected_watch_width_css.html(generate_full_width_css());
    };
    
    function update_full_width_css_repeat() {
        update_full_width_css();
        setTimeout(update_full_width_css, 200);
    };
    
    if(window.location.href.indexOf("/watch?") != -1) { //If we are on a view page
        //var css = '.watch-medium #watch7-player{width:300px;}';
        var style = document.createElement('style');
        
        style.type = 'text/css';
        style.id = 'injected-full-width-video-css';
        
        if (style.styleSheet){
            style.styleSheet.cssText = generate_full_width_css();
        } else {
            style.appendChild(document.createTextNode(generate_full_width_css()));
        };
        head.append(style);
        
        $(window).resize(function() {
            update_full_width_css_repeat();
        });
    }
};