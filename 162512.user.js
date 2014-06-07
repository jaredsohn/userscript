// ==UserScript==
// @name         Tweetdeck Follower Count Userscript
// @namespace    http://web.tweetdeck.com/
// @version      0.1
// @description  Add a follower count underneath avatars
// @include      https://web.tweetdeck.com/*
// @run-at       document-end
// ==/UserScript==
(function(window) {
    var $ = window.$, TD, _gaq;
    $(window.document).on('TD.ready', function() {
        TD = window.TD;
        var oldRender = TD.services.TwitterStatus.prototype.render;
        TD.services.TwitterStatus.prototype.render = function (e) {
            var html = oldRender.call(this),
                temp = $('<div />');
            temp.append(html).find('.tweet-img').append('<span class="text-mute" style="display: inline-block; width: 48px; text-align: center; font-size: 0.875rem;">' +this.user.followersCount +'</span>');
            return temp.html();
        }
    });
}(unsafeWindow));