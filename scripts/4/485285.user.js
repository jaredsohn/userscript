// ==UserScript==
// @name         Popout YouTube
// @namespace    http://dvbris.com
// @version      1.1
// @description  Adds a button to watch a popout version of the video
// @copyright    2014, Geraint White
// @match        *://*.youtube.com/*
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

function popout() {
    var width, height, player
    width = $('#player').width()
    height = $('#player').height()
    player = $('#movie_player')[0]
    window.open(window.location.href.replace('watch?v=','/v/') + '?start=' + player.getCurrentTime().toString().split('.')[0] + '&autoplay=1', document.title, 'width='+width+',height='+height)
    player.stopVideo()
}

function addButtn() {
    $('#watch7-sentiment-actions').append(
        $('<button />')
            .addClass('yt-uix-button yt-uix-button-text yt-uix-button-size-default')
            .text('Open popout')
            .css('padding', '0 5px')
            .click(popout)
    )
}

function main() {
    // from http://userscripts.org/scripts/show/153699
    unsafeWindow.yt.pubsub.instance_.subscribe("init-watch", function(){
        addButtn()
    })
}

main()