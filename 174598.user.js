// ==UserScript==
// @name         Twitch Player Larger
// @namespace    https://userscripts.org/scripts/show/174598
// @version      6.2
// @description  Resizes content on Twitch page for ultimate player space
// @downloadURL  https://userscripts.org/scripts/source/174598.user.js
// @updateURL    https://userscripts.org/scripts/source/174598.meta.js
// @match        *://*.twitch.tv/*
// @exclude      *://*.twitch.tv/*/popout
// @exclude      *://*.twitch.tv/chat/*
// @exclude      *://api.twitch.tv/*
// @exclude      *://chatdepot.twitch.tv/*
// @copyright    2013+, https://userscripts.org/users/274679
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle('\
#broadcast-meta { margin-bottom: 40px !important }\
.js-player { margin: -20px -30px auto; width: calc(100% + 60px) !important }\
');

function main() {
    if (!window.App) return;

    App.__container__.lookup("controller:layout").reopen({
        playerStyle: Ember.computed(function () {
            var w = this.get("contentWidth") + 60, h = this.get("windowHeight");
            return "<style>.dynamic-player, .dynamic-player object, .dynamic-player video{width:" + Math.floor(w) + "px !important;height:" + Math.floor(h) + "px !important}</style>";
        }).property("contentWidth", "windowHeight")
    }).notifyPropertyChange('playerStyle');

    App.__container__.lookup("controller:player").addObserver('player.isReady', function() {
        Mousetrap.trigger("alt+c");
    });

    $("#main_col .tse-scroll-content").on("mousewheel DOMMouseScroll", function (e) {
        var player = $(".js-player"), top = player.offset().top;
        if ((e.originalEvent.deltaY || e.originalEvent.detail) > 0
            ? top > 0
            : top < 0 && 0.95 * player.height() + top > 0) {
            e.preventDefault();
            $(this).stop().animate({ scrollTop: $(this).scrollTop() + top });
        }
    });
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
