// ==UserScript==
// @name Grooveshark Now Playing in Title (Simple)
// @namespace
// @version  0.1
// @description    Prints the current song, artist and album name in to Grooveshark page title.
// @include        http://grooveshark.com/*
// @include        http://*.grooveshark.com/*
// @author         Evren Esat Ozkan (http://userscripts.org/users/518082)
// @license        Public Domain
// ==/UserScript==

UPDATE_INTERVAL = 10 //secs

var gtu = {
    old_title: '',
    new_title: '',
    update: function () {
        var title = [];
        $('#now-playing-metadata a').each(function () { title.push($(this).attr('title'))});
        this.new_title = title.join(" - ");
        if (this.new_title && this.new_title != this.old_title) document.title = this.new_title;
    }
};
                     
setInterval(gtu.update, UPDATE_INTERVAL * 1000);
