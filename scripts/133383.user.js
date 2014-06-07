// ==UserScript==
// @name          YouTube Amplifier HTML5
// @namespace     youtubehtml5.akasokarika
// @description   I make the YouTube UI more sounding.
// @version       0.2.11
// @author        akasokarika (c) 2012
// @licence       http://creativecommons.org/licenses/by/3.0/
// @license       This work is licensed under a Creative Commons Attribution 3.0 License.
// @require       http://code.jquery.com/jquery-1.7.2.min.js
// @include       http://youtube.*/*
// @include       http://*.youtube.*/*
// @include       https://youtube.*/*
// @include       https://*.youtube.*/*
// @include       http://userscripts.org/scripts/show/133383
// @exclude       http://*.youtube.*/js/*_watch_request_ad.html
// ==/UserScript==
// Clear and verbose so they just works. No poem.

// ==== metaphysical stuffs

// Sync jQuery by itself
jQuery('<script src="http://code.jquery.com/jquery-1.7.2.min.js"></script>').appendTo('body');

// [[Content Script Injection]]
function contentEval(source) {
  if ('function' == typeof source) source = '(' + source + ')();';
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;
  document.body.appendChild(script);
  document.body.removeChild(script);
}

// ==== welcome to reality

//HTML 5 switch BROKEN
//jQuery('<li>\
//  <form id="html5form" method="post" action="/html5">\
//    <input type="hidden" value="true" name="'+'enable'+'_html5">\
//    <input type="hidden" name="session_token" value="6jPWgxQA-JpHb5QpBqrvMpNSTwh8MTMzNzEwMDc1M0AxMzM3MDE0MzUz">\
//    <botton id="togglehtml5"\
//      class="yt-uix-button yt-uix-button-text"\
//      onclick=""\
//      type="submit">\
//        '+'Enable'+' HTML5 and Amplifier\
//    </botton>\
//  </form>\
//</li>').appendTo('#footer-main .pickers.yt-uix-button-group');


//Add direct link
if (jQuery('#watch-player video.video-stream').length) {
  jQuery('<a id="directLink"\
    href="'+jQuery('#watch-player video.video-stream').attr('src')+'"\
    class="yt-uix-button yt-uix-button-default"\
    title="Right-click to download."\
    onclick="jQuery(this).text(\'Right click then save as to Download.\');return false;"\
    onmouseout="jQuery(this).text(\'Direct link\');">\
      Direct link\
  </a>').appendTo('#watch-actions');
}