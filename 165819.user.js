// ==UserScript==
// @name        Activity Check Reminder
// @namespace   http://dshini.net
// @description Change to something useful
// @include     http://*.dshini.net/de/game/activity/play/*
// @include     http://*.dshini.net/de/entertainment/*
// @exclude     http://*.dshini.net/de/entertainment/start*
// @version     1.2
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant       unsafeWindow
// ==/UserScript==

var unsafeWindow = this['unsafeWindow'] || window;
unsafeWindow.$$$$ = jQuery.noConflict();
unsafeWindow.$$$$(document).ready(
    function()
    {
        unsafeWindow.$$$$('body').append('<audio id="soundHandle" style="display: none;" />');
        setInterval(repeat, 5000);
    }
);

function repeat()
{
    var soundHandle = document.getElementById('soundHandle');
    if(unsafeWindow.$$$$('#activity_captcha').filter(':visible').length > 0)
    {
        soundHandle.src = 'http://cdn.ngen-cast.de/beep.wav';
        soundHandle.play();
    }
    else if(unsafeWindow.$$$$('#activity_achieved_info').filter(':visible').length > 0)
    {
        soundHandle.src = 'http://cdn.ngen-cast.de/success.wav';
        soundHandle.play();
    }
}