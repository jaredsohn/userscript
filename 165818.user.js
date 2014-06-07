// ==UserScript==
// @name        Dshini Activity Bot
// @namespace   http://dshini.net
// @description Fills the activity bar
// @include     http://*.dshini.net/de/dshins/daily*
// @version     1.3
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant       unsafeWindow
// ==/UserScript==

var unsafeWindow = this['unsafeWindow'] || window;
unsafeWindow.$$$$ = jQuery.noConflict();
unsafeWindow.$$$$(document).ready(
    function()
    {
        setTimeout(execute, 50);
        setTimeout(refresh, 60000);
    }
);

function execute()
{
    if(unsafeWindow.$$$$('div.col1:contains("Aktivitäts-Zustand:")').length > 0 || unsafeWindow.$$$$('#power_user_countdown > span.countdown_amount').text() == '00:00:00')
    {
        refresh();
        return;
    }
    setTimeout(execute, 50);
}

function refresh()
{
    location.href = 'http://www.dshini.net/de/dshins/daily';
}