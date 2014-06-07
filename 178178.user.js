// ==UserScript==
// @name       Big Twitch View Button
// @namespace  http://timmart.in/
// @version    0.1
// @description  Click a button to take you to multitwitch.tv, which will expand the video stream much larger than twitch.tv while still allowing you to chat
// @match      http://www.twitch.tv/*
// @match      https://www.twitch.tv/*
// ==/UserScript==

var streamer = $(".channel .channel_name").text(),
    button_html = '<a href="http://multitwitch.tv/' + streamer + '" class="normal_button action" data-content_type="live" data-id="' + streamer + '" style="display: inline;"><span>Multitwitch</span></a>';

$("#channel_actions").append(button_html);
