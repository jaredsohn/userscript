// ==UserScript==
// @name      Muggy version of BigBubba's Babby Script for Cannabis
// @namespace  http://www.synchtube.com/
// @version    0.1
// @description  Adds javascript back to cannabis
// @match      http://www.synchtube.com/*
// @copyright  2012+, BigBubba, Rape
// ==/UserScript==

with(unsafeWindow) {
    if(config.room_name == 'cannabis')
        $.getScript('http://dl.dropbox.com/u/63799200/cannabis/MuggyContent.Js')