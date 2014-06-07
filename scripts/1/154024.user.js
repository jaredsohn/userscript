// ==UserScript==
// @name        Center YouTube
// @author	Michael J Scarchilli & Bunnies... lots and lots of bunnies!
// @namespace   http://www.mikevision.com
// @version     1.5
// @description Center's YouTube content
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*
// @updateURL	https://userscripts.org/scripts/source/154024.user.js
// @downloadURL	https://userscripts.org/scripts/source/154024.user.js

// ==/UserScript==

function youTubeCenter(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {return;}
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

youTubeCenter('.exp-new-site-width #page{margin:0 auto !important;}.site-left-aligned #page.watch, .site-left-aligned #page.watch #guide, .site-left-aligned .watch7-playlist, .site-left-aligned #watch7-video, .site-left-aligned #watch7-main{width:945px;margin:0 auto !important;}.site-left-aligned.guide-enabled .watch7-playlist, .site-left-aligned.guide-enabled #watch7-video-container, .site-left-aligned.guide-enabled #watch7-main-container{padding-left:0 !important;}.site-left-aligned.guide-enabled .watch7-playlist, .site-left-aligned.guide-enabled #watch7-video-container, .site-left-aligned.guide-enabled #watch7-main-container{padding-left:0 !important;}.site-left-aligned.guide-enabled .watch7-playlist, .site-left-aligned.guide-enabled #watch7-video-container, .site-left-aligned.guide-enabled #watch7-main-container{padding-left:0 !important;}.site-left-aligned #page.watch #guide-container{left:-180px !important;}.ad-div.mastad{display:none;}.exp-new-site-width #masthead-subnav{margin:0 auto !important}.site-left-aligned #page, .site-left-aligned #yt-masthead, .site-left-aligned #alerts, .site-left-aligned #ad_creative_1, .site-left-aligned #footer-hh, .site-left-aligned #masthead_child_div, .site-left-aligned #masthead-expanded-lists-container, .site-left-aligned #ticker .ytg-wide, .site-left-aligned #baseDiv{margin:0 auto !important;}.exp-new-site-width #yt-admin.hh{margin-left:14px; !important;width:970px !important;}#yt-masthead-content{margin:0 auto !important;}.site-left-aligned.guide-collapsed .watch7-playlist, .site-left-aligned.guide-collapsed #player, .site-left-aligned.guide-collapsed #watch7-main-container{padding:0 !important;}.site-left-aligned.guide-enabled .watch7-playlist, .site-left-aligned.guide-enabled #player, .site-left-aligned.guide-enabled #watch7-main-container{padding:0 !important;} .site-left-aligned.guide-enabled #player-legacy{padding-left: 0 !important;} #player-legacy{ min-width: 945px !important;}');

// REMOVE ADS //
youTubeCenter('.ad-div.mastad, #watch-channel-brand-div{display:none !important;}');