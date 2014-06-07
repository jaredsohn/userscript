// ==UserScript==
// @name           Gros smileys lol.
// @namespace      Limera1n
// @description    GrosHap, GrosFier et GroSvp.
// @include        http://*.jeuxvideo.com/*
// ==/UserScript==
//Merci NPlay. :)

function smileys() {
    for(var i in document.images) {
        if(document.images[i].src === 'http://image.jeuxvideo.com/smileys_img/18.gif') {
            document.images[i].src = 'http://image.noelshack.com/fichiers/2013/32/1375696871-groshap.gif';
        }
        if(document.images[i].src === 'http://image.jeuxvideo.com/smileys_img/53.gif') {
            document.images[i].src = 'http://image.noelshack.com/fichiers/2013/32/1375696951-grosfier.gif';
        }
        if(document.images[i].src === 'http://image.jeuxvideo.com/smileys_img/59.gif') {
            document.images[i].src = 'http://image.noelshack.com/fichiers/2013/32/1375700483-grosvp.gif';
        }
    }
}

window.onload = setInterval(smileys, 1000);