// ==UserScript==
// @name        Minitwitch Redirect
// @namespace   grady_wilson
// @description Adds a button that redirects to Minitwtch
// @version     1
// @match      http://www.twitch.tv/*
// @match      https://www.twitch.tv/*
// ==/UserScript==

var streamer = $(".channel .channel_name").text(),
    button_html = '<a href="http://minitwitch.tv/' + streamer + '" class="normal_button action" data-content_type="live" data-id="' + streamer + '" style="display: inline;"><span>Minitwitch</span></a>';

$("#channel_actions").append(button_html);