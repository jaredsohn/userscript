// ==UserScript==
// @name        Dshini Banner and Logo Bot
// @namespace   http://dshini.net
// @description Change to something useful
// @include     http://*.dshini.net/de/dshins/daily*
// @include     http://*.dshini.net/de/game/found/*
// @version     1.3
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant       unsafeWindow
// ==/UserScript==

var unsafeWindow = this['unsafeWindow'] || window;
unsafeWindow.$$$$ = jQuery.noConflict();
unsafeWindow.$$$$(document).ready(
    function()
    {
        setTimeout(execute, 800);
    }
);

function execute()
{
    if(location.href.search(/.*\/de\/game\/found\/.*/) != -1)
    {
        location.href = 'http://www.dshini.net/de/dshins/daily';
        return;
    }
    var logo = unsafeWindow.$$$$('a[onclick*="/de/game/found/logo/"]').add('a[onmousedown*="/de/game/found/logo/"]');
    if(logo.length > 0 && !(unsafeWindow.$$$$('div.col1:contains("Dshinzilla-Zeichnungen")').hasClass('achieved')))
    {
        logo.first().children('img').first().click();
        return;
    }
    
    var banner = unsafeWindow.$$$$('div[onmousedown*="/de/game/found/banner/"]').add('div[onclick*="/de/game/found/banner/"]');
    if(banner.length > 0 && !(unsafeWindow.$$$$('div.col1:contains("Dshini-Banner")').hasClass('achieved')))
    {
        banner.first().children('object').first().children('object').first().mousedown();
        banner.first().children('object').first().children('object').first().click();
        return;
    }
    
    if(!(unsafeWindow.$$$$('div.col1:contains("Dshinzilla-Zeichnungen")').hasClass('achieved')) || !(unsafeWindow.$$$$('div.col1:contains("Dshini-Banner")').hasClass('achieved')))
    	location.href = 'http://www.dshini.net/de/dshins/daily';
}