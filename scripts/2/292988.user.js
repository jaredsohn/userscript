// ==UserScript==
// @name            Disable Twitch Emotes
// @version         0.1
// @author          waedt
// @namespace       http://wayedt.com
// @description     Prevents emotes from being displayed in Twitch.tv chat
// @include         http://www.twitch.tv/*
// @grant           none
// ==/UserScript==


var code = '(' + (function ()
{
    var ALLOWED_EMOTES = {
        'SMSkull': true,
        'KZskull': true,
        'probroOwls': true,
        'RoundCookie': true,
        'YoshiCookie': true,
        'SquareCookie': true,
        'GreenCookie': true,
        'FlowerCookie': true,
        'HeartCookie': true,
        'YoureLousey': true,
    }

    window.Chat.prototype.emoticonize_ = window.Chat.prototype.emoticonize;
    window.Chat.prototype.emoticonize = function(text, user)
    {
        if(text in ALLOWED_EMOTES)
            return this.emoticonize_(text, user);
        else
            return text;
    };
}).toString() + ')();';

var script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.textContent = code;
document.body.appendChild(script);
