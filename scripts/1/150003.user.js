// ==UserScript==
// @name       Goontube Script Loader
// @namespace  http://www.synchtube.com/
// @version    0.1
// @match      http://www.synchtube.com/*
// ==/UserScript==

with(unsafeWindow) {
    if(config.room_name == 'Gtubes')
        $.getScript('http://goonbot.it.cx/goontubeloader.js')
}
