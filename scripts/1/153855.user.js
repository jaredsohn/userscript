// ==UserScript==
// @name        centered-youtube
// @namespace   http://htsz.pl/
// @include     *youtube.com*
// @version     0.5
// ==/UserScript==

//if(document.getElementById("body-container") == null) return;

var headID = document.getElementsByTagName('head')[0];
var style = document.createElement('style');   
    style.type = 'text/css';
style.innerHTML = '<!-- #body-container #yt-masthead {width: 970px !important; margin: 0 auto !important;} .site-left-aligned #page, .site-left-aligned #yt-masthead, .site-left-aligned #alerts, .site-left-aligned #ad_creative_1, .site-left-aligned #footer-hh, .site-left-aligned #masthead-subnav, .site-left-aligned #masthead_child_div, .site-left-aligned #masthead-expanded-lists-container, .site-left-aligned #ticker .ytg-wide, .site-left-aligned #baseDiv {margin: 0 auto !important;} .sidebar-expanded #body-container #content {margin: 0px auto !important; max-width: 1400px !important; min-width: 970px !important;} -->';
  headID.appendChild(style);