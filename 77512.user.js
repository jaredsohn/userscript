// ==UserScript==
// @name           22tracks Title Reorganizer
// @namespace      22tracksTitleReorganizer
// @description    Reorganizes the title bar on 22tracks so it is easier to see the currently playing song and genre.
// @include        http://www.22tracks.com/*
// @include        http://22tracks.com/*
// @include        http://www.22tracks.nl/*
// @include        http://22tracks.nl/*
// ==/UserScript==

setInterval(retitle,5000)

function retitle() {
    var ttext = document.title;
    
    ttext = ttext.split(" | ");
    var newT='';
    
    if(ttext[0].match("22tracks")) {
        ttext[0] = ttext[0].split(" - ");
        ttext[1] = ttext[1].split(" - ");
        newT = ttext[1][1] + " - " + ttext[1][0] +" - " + ttext[0][1] + " | " + ttext[0][0];
        document.title=newT;
    } else {
        return false;
    }
}

GM_registerMenuCommand("Organize Title Now! (Temporarily until song changes)",retitle)