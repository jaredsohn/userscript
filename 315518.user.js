// ==UserScript==
// @name         YouTube to mp3
// @namespace    http://dvbris.com
// @version      1.1
// @description  Adds a button to convert YouTube videos to mp3 using video2mp3.net
// @copyright    2014, Geraint White
// @match        *://*.youtube.com/*
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

function download() {
    window.open('http://www.video2mp3.net/loading.php?url='+window.location);
}

function addButtn() {
    $('#watch7-sentiment-actions').append(
        $('<button />')
            .addClass('yt-uix-button yt-uix-button-text yt-uix-button-size-default')
            .attr('id', 'dl-button')
            .text('Convert to mp3')
            .css('padding', '0 5px')
            .click(download)
    );
}

function main() {
    // from http://userscripts.org/scripts/show/153699
    unsafeWindow.yt.pubsub.instance_.subscribe("init-watch", function(){
        //log(unsafeWindow.location.href); // Current video url.
        addButtn();
    });
}

main();